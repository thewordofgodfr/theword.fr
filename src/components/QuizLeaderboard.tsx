import { useCallback, useEffect, useRef, useState } from 'react';
import { ArrowUpToLine, LocateFixed, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { useTranslation } from '../hooks/useTranslation';
import { useApp } from '../contexts/AppContext';
import { joinRanking, ensurePlayer, leaveRanking, loadRanking, syncScores, type RankingPage } from '../services/quizLeaderboard';
import { hasQuizConsent, queueScore, readPlayer, type ScoreSnapshot } from '../services/quizPlayer';
import QuizBadge from './QuizBadge';
import { quizTier } from '../services/quizService';

type Props = { score: ScoreSnapshot; onClose: () => void };
export default function QuizLeaderboard({ score, onClose }: Props) {
  const { t, lang } = useTranslation();
  const { state } = useApp();
  const [joined, setJoined] = useState(() => hasQuizConsent(readPlayer()));
  const [adult, setAdult] = useState(false);
  const [consent, setConsent] = useState(false);
  const [data, setData] = useState<RankingPage | null>(null);
  const [busy, setBusy] = useState(false);
  const [failed, setFailed] = useState(false);
  const dialog = useRef<HTMLDialogElement>(null);
  const scroller = useRef<HTMLDivElement>(null);
  const ownRow = useRef<HTMLTableRowElement>(null);
  const latestScore = useRef(score); latestScore.current = score;
  const sequence = useRef(0);
  const target = useRef<'me' | 'page'>('me');
  const dark = state.settings.theme === 'dark';
  const button = 'min-h-[44px] rounded-lg px-3 py-2 text-sm border border-blue-400/30 disabled:opacity-40 focus-visible:ring-2 focus-visible:ring-blue-400';
  const load = useCallback(async (view: 'me' | 'page' = 'me', page = 0) => {
    const request = ++sequence.current;
    setBusy(true); setFailed(false); target.current = view;
    try {
      try { await ensurePlayer(); } finally { queueScore(lang, latestScore.current); }
      await syncScores();
      const result = await loadRanking(lang, view, page);
      if (request === sequence.current) setData(result);
    } catch { if (request === sequence.current) setFailed(true); }
    finally { if (request === sequence.current) setBusy(false); }
  }, [lang]);
  useEffect(() => {
    const element = dialog.current;
    const requests = sequence;
    element?.showModal();
    return () => { requests.current++; element?.close(); };
  }, []);
  useEffect(() => {
    if (joined) void load();
  }, [joined, load]);
  useEffect(() => {
    if (!data) return;
    const frame = requestAnimationFrame(() => {
      const container = scroller.current;
      if (!container) return;
      if (target.current === 'me' && ownRow.current) {
        const row = ownRow.current.getBoundingClientRect(), area = container.getBoundingClientRect();
        container.scrollTop += row.top - area.top - container.clientHeight / 2 + row.height / 2;
      } else container.scrollTop = 0;
    });
    return () => cancelAnimationFrame(frame);
  }, [data]);
  useEffect(() => {
    const reset = () => { setJoined(false); setData(null); setAdult(false); setConsent(false); };
    window.addEventListener('twog:quiz:consent-required', reset);
    return () => window.removeEventListener('twog:quiz:consent-required', reset);
  }, []);
  const join = async () => {
    if (!adult || !consent || busy) return;
    setBusy(true); setFailed(false);
    try { await joinRanking(lang); setJoined(true); } catch { setFailed(true); }
    finally { setBusy(false); }
  };
  const leave = async () => {
    if (!window.confirm(t('quiz.rankingLeaveConfirm'))) return;
    setBusy(true);
    try { await leaveRanking(); onClose(); } catch { setFailed(true); setBusy(false); }
  };
  return <dialog ref={dialog} aria-labelledby="ranking-title" onCancel={onClose}
    className={`w-[calc(100%-1.5rem)] max-w-xl rounded-2xl p-0 border border-blue-400/30 backdrop:bg-black/70 ${dark ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}`}
    dir={lang === 'ar' || lang === 'he' ? 'rtl' : 'ltr'}>
    <div className="flex flex-col max-h-[88dvh]">
      <header className="px-4 pt-3 pb-2 shrink-0 border-b border-blue-400/20">
        <div className="flex items-center justify-between gap-2">
          <h2 id="ranking-title" className="text-lg font-semibold">{t('quiz.ranking')}</h2>
          <button type="button" className={button} onClick={onClose} aria-label={t('quiz.rankingClose')}><X size={19} /></button>
        </div>
        {joined && <p className="text-xs opacity-70 mt-1">{t('quiz.rankingBest')} · {lang.toUpperCase()}</p>}
        {data?.myCode && <p className="text-sm mt-2 text-blue-400">{t('quiz.rankingYou')} : <b dir="ltr">{data.myCode}</b>{data.myRank ? ` · #${data.myRank.toLocaleString(lang)}` : ''}</p>}
        {data && !data.myRank && <p className="text-xs mt-2 opacity-70">{t('quiz.rankingEmpty')}</p>}
        {joined && <div className="flex gap-2 mt-3">
          <button type="button" disabled={busy} className={`${button} flex items-center gap-1`} onClick={() => void load('page', 0)}><ArrowUpToLine size={16} />{t('quiz.rankingTop')}</button>
          <button type="button" disabled={busy} className={`${button} flex items-center gap-1`} onClick={() => void load('me')}><LocateFixed size={16} />{t('quiz.rankingMine')}</button>
        </div>}
      </header>
      {!joined ? <div className="p-4 space-y-4 overflow-y-auto">
        <p className="text-sm">{t('quiz.rankingIntro')}</p>
        <p className="text-sm">{t('quiz.rankingRetention')}</p>
        <a href="/privacy.html" target="_blank" rel="noopener noreferrer" className="block text-sm text-blue-400 underline">{t('quiz.rankingPrivacy')}</a>
        <label className="flex items-start gap-3 text-sm"><input type="checkbox" checked={adult} onChange={e => setAdult(e.target.checked)} className="mt-1 h-5 w-5 shrink-0" />{t('quiz.rankingAdult')}</label>
        <label className="flex items-start gap-3 text-sm"><input type="checkbox" checked={consent} onChange={e => setConsent(e.target.checked)} className="mt-1 h-5 w-5 shrink-0" />{t('quiz.rankingConsent')}</label>
        {failed && <p role="alert" className="text-sm">{t('quiz.rankingOffline')}</p>}
        <button type="button" disabled={busy || !adult || !consent} className={`${button} bg-blue-600 text-white w-full`} onClick={() => void join()}>{t('quiz.rankingJoin')}</button>
        {readPlayer() && <button type="button" disabled={busy} className={button} onClick={() => void leave()}>{t('quiz.rankingLeave')}</button>}
      </div> : <>
        {busy && <p className="px-4 py-2 text-sm" role="status">{t('loading')}</p>}
        {failed && <div role="alert" className="p-3 text-sm space-y-2"><p>{t('quiz.rankingOffline')}</p><button type="button" disabled={busy} className={button} onClick={() => void load()}>{t('quiz.retry')}</button></div>}
        <div ref={scroller} className="overflow-y-auto min-h-0 overscroll-contain flex-1" aria-busy={busy}>
          {data && data.total > 0 ? <table className="w-full text-sm border-collapse">
            <thead className={`sticky top-0 ${dark ? 'bg-gray-800' : 'bg-blue-50'}`}><tr>
              <th scope="col" className="p-2 text-start">#</th><th scope="col" className="p-2 text-start">{t('quiz.rankingPlayer')}</th>
              <th scope="col" className="p-2 text-end">{t('quiz.level')}</th><th scope="col" className="p-2 text-end">{t('quiz.rankingPoints')}</th>
            </tr></thead>
            <tbody>{data.rows.map(row => {
              const mine = row.code === data.myCode;
              const tier = quizTier(row.solved, data.corpusTotal);
              return <tr key={row.code} ref={mine ? ownRow : undefined} aria-current={mine ? 'true' : undefined}
                className={`border-b border-blue-400/10 ${mine ? 'bg-blue-500/20 font-semibold' : ''}`}>
                <td className="p-2 tabular-nums">{row.rank.toLocaleString(lang)}</td>
                <th scope="row" className="p-2 text-start font-normal"><span dir="ltr" className="text-xs whitespace-nowrap">{row.code}</span>{mine && <span className="block text-xs text-blue-400">{t('quiz.rankingYou')}</span>}</th>
                <td className="p-2 text-end"><div className="flex items-center justify-end gap-1"><span>{row.solved.toLocaleString(lang)}</span><QuizBadge tier={tier} label={t(`quiz.badge${tier}`)} /></div></td>
                <td className="p-2 text-end tabular-nums"><span>{row.points.toLocaleString(lang, { maximumFractionDigits: 2 })}</span><span className="block text-xs opacity-70">{(row.solved / row.attempts * 100).toLocaleString(lang, { maximumFractionDigits: 1 })} %</span></td>
              </tr>;
            })}</tbody>
          </table> : data && <p className="p-4 text-sm">{t('quiz.rankingEmpty')}</p>}
        </div>
        <footer className="p-3 shrink-0 border-t border-blue-400/20 space-y-2">
          {data && data.total > data.pageSize && <div className="flex items-center justify-between gap-2">
            <button type="button" className={button} disabled={busy || data.page === 0} onClick={() => void load('page', data.page - 1)} aria-label={t('quiz.rankingPrevious')}><ChevronLeft size={18} /></button>
            <span className="text-xs">{data.page + 1} / {Math.ceil(data.total / data.pageSize)}</span>
            <button type="button" className={button} disabled={busy || (data.page + 1) * data.pageSize >= data.total} onClick={() => void load('page', data.page + 1)} aria-label={t('quiz.rankingNext')}><ChevronRight size={18} /></button>
          </div>}
          <details className="text-xs opacity-80"><summary className="cursor-pointer py-1">{t('quiz.rankingHow')}</summary><p className="py-2">{t('quiz.rankingFormula')}</p>
            <button type="button" disabled={busy} className={button} onClick={() => void leave()}>{t('quiz.rankingLeave')}</button>
          </details>
        </footer>
      </>}
    </div>
  </dialog>;
}
