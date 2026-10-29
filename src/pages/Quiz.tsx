import { useEffect, useRef, useState } from 'react';
import { BookOpen, CheckCircle2, RotateCcw, Share2, Trophy } from 'lucide-react';
import { useApp } from '../contexts/AppContext';
import { useTranslation } from '../hooks/useTranslation';
import { getQuizVerses, quizReference, quizLocation } from '../services/bibleService';
import { QUIZ_KEY, readQuiz, saveQuiz, emptyProgress, nextQuestion, answerQuestion, isSolved, quizTier, resetQuizLanguage,
  type QuizProgress, type QuizVerse, type Question } from '../services/quizService';

import QuizBadge from '../components/QuizBadge';
import QuizLeaderboard from '../components/QuizLeaderboard';
import { queueScore, readPlayer } from '../services/quizPlayer';
import { syncScores } from '../services/quizLeaderboard';
import { saveSlot } from '../services/readingSlots';

export default function Quiz() {
  const { state, navigateToVerse } = useApp();
  const { t, lang } = useTranslation();
  const [rows, setRows] = useState<QuizVerse[]>([]);
  const [progress, setProgress] = useState<QuizProgress>(emptyProgress);
  const [question, setQuestion] = useState<Question | null>(null);
  const [selected, setSelected] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [retry, setRetry] = useState(0);
  const [rankingOpen, setRankingOpen] = useState(false);
  const [copyStatus, setCopyStatus] = useState(false);
  const locked = useRef(false);
  const questionHeading = useRef<HTMLHeadingElement>(null);
  const isDark = state.settings.theme === 'dark';
  const surface = isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200';
  const button = 'rounded-xl border px-3 py-2 min-h-[44px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400';
  const level = rows.reduce((n, r) => n + Number(isSolved(progress, r.id)), 0);
  const rate = progress.attempts ? Math.round(level / progress.attempts * 100) : null;
  const tier = quizTier(level, rows.length);
  const complete = rows.length > 0 && level === rows.length;
  const verse = rows.find(r => r.id === question?.id);
  const reference = (id: string) => {
    const row = rows.find(r => r.id === id);
    return row ? quizReference(row, lang) : '';
  };

  useEffect(() => {
    let cancelled = false;
    setLoading(true); setError(false);
    getQuizVerses(lang).then(corpus => {
      if (cancelled) return;
      const store = readQuiz();
      const previous = store.languages[lang] ?? emptyProgress();
      const q = nextQuestion(corpus, previous);
      const p = { ...previous, pending: q };
      saveQuiz({ ...store, languages: { ...store.languages, [lang]: p } });
      setRows(corpus); setProgress(p); setQuestion(q); setSelected(null);
      locked.current = false;
    }).catch(() => { if (!cancelled) setError(true); })
      .finally(() => { if (!cancelled) setLoading(false); });
    const onStorage = (event: StorageEvent) => {
      if (event.key === QUIZ_KEY || event.key === null) setRetry(n => n + 1);
    };
    window.addEventListener('storage', onStorage);
    return () => { cancelled = true; window.removeEventListener('storage', onStorage); };
  }, [lang, retry]);

  useEffect(() => {
    if (loading || error) return;
    const sync = () => {
      try {
        if (!readPlayer()) return;
        queueScore(lang, { solved: level, attempts: progress.attempts });
        void syncScores().catch(() => { /* Keep the offline outbox for the next connection. */ });
      } catch { /* Online ranking must never block the local quiz. */ }
    };
    // Persist immediately, including a peak score obtained offline.
    try { queueScore(lang, { solved: level, attempts: progress.attempts }); } catch { /* storage unavailable */ }
    const timer = setTimeout(sync, 1500);
    window.addEventListener('online', sync);
    window.addEventListener('focus', sync);
    return () => { clearTimeout(timer); window.removeEventListener('online', sync); window.removeEventListener('focus', sync); };
  }, [loading, error, lang, level, progress.attempts]);

  const answer = (id: string) => {
    if (!question || locked.current || selected !== null) return;
    locked.current = true;
    try {
      const store = readQuiz();
      const p = answerQuestion(store.languages[lang] ?? emptyProgress(), question, id);
      saveQuiz({ ...store, languages: { ...store.languages, [lang]: p } });
      setProgress(p); setSelected(id); setCopyStatus(false);
    } catch { setError(true); }
  };
  const next = () => {
    try {
      const store = readQuiz();
      const p = store.languages[lang] ?? emptyProgress();
      const q = nextQuestion(rows, p);
      const updated = { ...p, pending: q };
      saveQuiz({ ...store, languages: { ...store.languages, [lang]: updated } });
      setProgress(updated); setQuestion(q); setSelected(null); locked.current = false;
      requestAnimationFrame(() => questionHeading.current?.scrollIntoView({ block: 'start' }));
    } catch { setError(true); }
  };
  const openVerse = () => {
    if (!verse || selected === null) return;
    const location = quizLocation(verse);
    saveSlot(0, location);
    navigateToVerse(location.book, location.chapter, location.verse);
  };
  const restart = () => {
    if (!window.confirm(t('quiz.resetConfirm'))) return;
    try {
      const store = readQuiz();
      saveQuiz(resetQuizLanguage(store, lang));
      setCopyStatus(false); setRetry(n => n + 1);
    } catch { setError(true); }
  };
  const score = `${t('quiz.title')} — The Word\n${t('quiz.level')} ${level.toLocaleString(lang)} / ${rows.length.toLocaleString(lang)} — ${t(`quiz.badge${tier}`)}\n${t('quiz.attempts')} : ${progress.attempts.toLocaleString(lang)}\n${t('quiz.accuracy')} : ${rate === null ? '—' : `${rate.toLocaleString(lang)} %`}\nhttps://theword.fr/#quiz`;
  const share = async () => {
    try {
      if (navigator.share) { await navigator.share({ title: 'The Word', text: score }); return; }
      await navigator.clipboard.writeText(score); setCopyStatus(true);
    } catch (e) {
      if (e instanceof DOMException && e.name === 'AbortError') return;
      // Email remains available even when native sharing/clipboard is unavailable.
      window.location.href = `mailto:?subject=${encodeURIComponent('The Word — ' + t('quiz.title'))}&body=${encodeURIComponent(score)}`;
    }
  };

  return (
    <div className={`quiz-screen px-3 py-3 ${isDark ? 'bg-gray-900 text-white' : 'bg-blue-50 text-gray-900'}`} dir={lang === 'ar' || lang === 'he' ? 'rtl' : 'ltr'}>
      {rankingOpen && <QuizLeaderboard score={{ solved: level, attempts: progress.attempts }} onClose={() => setRankingOpen(false)} />}
      <div className="max-w-xl mx-auto space-y-3">
        <h1 className="sr-only">{t('quiz.title')}</h1>
        {loading ? <p role="status">{t('loading')}</p> : error ? (
          <div role="alert" className={`${surface} rounded-2xl border p-5 space-y-3`}>
            <p>{t('quiz.error')}</p>
            <button type="button" className={`${button} bg-blue-600 text-white`} onClick={() => setRetry(n => n + 1)}>{t('quiz.retry')}</button>
          </div>
        ) : (
          <>
            <section aria-label={t('quiz.level')} className={`${surface} rounded-2xl border p-3`}>
              <div className="flex justify-between items-center gap-2 flex-wrap">
                <strong className="text-blue-400 text-lg inline-flex items-center gap-1">{t('quiz.level')} {level.toLocaleString(lang)} <span className="text-sm font-normal opacity-75">/ {rows.length.toLocaleString(lang)}</span><QuizBadge tier={tier} label={t(`quiz.badge${tier}`)} /></strong>
                <span className="text-xs whitespace-nowrap">{t('quiz.attempts')} : {progress.attempts.toLocaleString(lang)} <span className="text-blue-400" aria-label={t('quiz.accuracy')} title={t('quiz.accuracy')}>· {rate === null ? '—' : `${rate.toLocaleString(lang)} %`}</span></span>
              </div>
              <progress className="w-full h-1 mt-2 accent-blue-500" value={level} max={rows.length || 1} aria-label={t('quiz.level')} />
            </section>
            {complete ? (
              <section role="status" className={`${surface} rounded-2xl border p-6 text-center space-y-3`}>
                <div className="flex justify-center"><QuizBadge tier={tier} label={t(`quiz.badge${tier}`)} large /></div>
                <h2 className="text-2xl font-semibold">{t('quiz.complete')}</h2>
                <p>{t('quiz.level')} {level.toLocaleString(lang)} · {t('quiz.attempts')} : {progress.attempts.toLocaleString(lang)}</p>
              </section>
            ) : null}
            {verse && question && !complete ? (
              <section className={`${surface} rounded-2xl border p-3 space-y-3`}>
                <h2 ref={questionHeading} className="text-sm text-blue-400 font-semibold scroll-mt-20">{t('quiz.question')}</h2>
                <blockquote style={{ fontSize: state.settings.fontSize }} className="quiz-verse leading-snug break-words">{verse.t}</blockquote>
                <div className="grid grid-cols-2 gap-2">
                  {question.options.map(id => {
                    const correct = selected !== null && id === question.id;
                    const wrong = selected === id && id !== question.id;
                    return <button type="button" key={id} disabled={selected !== null} onClick={() => answer(id)}
                      className={`${button} text-start text-sm break-words transition-colors ${correct ? 'border-green-500 bg-green-500/15' : wrong ? 'border-red-400 bg-red-500/15' : `${surface} enabled:hover:border-blue-400`}`}>
                      {correct ? '✓ ' : wrong ? '✗ ' : ''}{reference(id)}
                    </button>;
                  })}
                </div>
                {selected !== null && <div role="status" aria-live="polite" className="space-y-2">
                  <p className="font-semibold flex items-start gap-2">
                    {selected === question.id && <CheckCircle2 size={20} className="text-green-400 shrink-0" aria-hidden="true" />}
                    {selected === question.id ? t('quiz.correct') : t('quiz.wrong')}
                  </p>
                  <div className="flex items-center gap-1 text-blue-400 text-sm">
                    <span>{reference(question.id)}</span>
                    <button type="button" onClick={openVerse} title={t('searchOpenInReading')} aria-label={t('searchOpenInReading')}
                      className="inline-flex items-center justify-center min-w-[44px] min-h-[44px] rounded-lg hover:bg-blue-500/10 focus-visible:ring-2 focus-visible:ring-blue-400">
                      <BookOpen size={19} aria-hidden="true" />
                    </button>
                  </div>
                  <button type="button" onClick={next} className={`${button} w-full bg-blue-600 hover:bg-blue-700 text-white`}>{t('quiz.next')}</button>
                </div>}
              </section>
            ) : null}
            {complete && selected !== null && verse && <div className="flex items-center justify-center gap-1 text-sm text-blue-400">
              <span>{reference(verse.id)}</span>
              <button type="button" onClick={openVerse} title={t('searchOpenInReading')} aria-label={t('searchOpenInReading')} className="min-w-[44px] min-h-[44px] inline-flex items-center justify-center rounded-lg focus-visible:ring-2 focus-visible:ring-blue-400"><BookOpen size={19} aria-hidden="true" /></button>
            </div>}
            <div className="flex items-center justify-between gap-2 flex-wrap">
              <button type="button" onClick={share} className={`${button} ${surface} flex items-center gap-2`}><Share2 size={18} aria-hidden="true" />{t('quiz.share')}</button>
              <button type="button" onClick={() => setRankingOpen(true)} title={t('quiz.ranking')} aria-label={t('quiz.ranking')} className={`${button} ${surface} inline-flex items-center justify-center`}><Trophy size={20} aria-hidden="true" /></button>
              <button type="button" onClick={restart} title={t('quiz.reset')} aria-label={t('quiz.reset')}
                className="min-w-[44px] min-h-[44px] inline-flex items-center justify-center rounded-lg opacity-60 hover:opacity-100 focus-visible:ring-2 focus-visible:ring-blue-400"><RotateCcw size={16} aria-hidden="true" /></button>
            </div>
            {copyStatus && <p role="status" className="text-center text-sm">{t('quiz.copied')}</p>}
          </>
        )}

      </div>
    </div>
  );
}
