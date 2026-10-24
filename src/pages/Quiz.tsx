import { useEffect, useRef, useState } from 'react';
import { ArrowLeft, CheckCircle2, HelpCircle, Share2, Trophy } from 'lucide-react';
import { useApp } from '../contexts/AppContext';
import { useTranslation } from '../hooks/useTranslation';
import { getQuizVerses, quizReference } from '../services/bibleService';
import { QUIZ_KEY, readQuiz, saveQuiz, emptyProgress, nextQuestion, answerQuestion, isSolved,
  type QuizProgress, type QuizVerse, type Question } from '../services/quizService';

export default function Quiz() {
  const { state, dispatch } = useApp();
  const { t, lang } = useTranslation();
  const [rows, setRows] = useState<QuizVerse[]>([]);
  const [progress, setProgress] = useState<QuizProgress>(emptyProgress);
  const [question, setQuestion] = useState<Question | null>(null);
  const [selected, setSelected] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [retry, setRetry] = useState(0);
  const [copyStatus, setCopyStatus] = useState(false);
  const locked = useRef(false);
  const isDark = state.settings.theme === 'dark';
  const surface = isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200';
  const button = 'rounded-xl border px-4 py-3 min-h-[48px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400';
  const level = rows.reduce((n, r) => n + Number(isSolved(progress, r.id)), 0);
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
    } catch { setError(true); }
  };
  const score = `${t('quiz.title')} — The Word\n${t('quiz.level')} ${level} / ${rows.length}\n${t('quiz.attempts')} : ${progress.attempts}\nhttps://theword.fr/#quiz`;
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
    <div className={`min-h-screen px-4 py-6 ${isDark ? 'bg-gray-900 text-white' : 'bg-blue-50 text-gray-900'}`} dir={lang === 'ar' || lang === 'he' ? 'rtl' : 'ltr'}>
      <div className="max-w-xl mx-auto space-y-5">
        <header className="flex items-center justify-between gap-3">
          <button type="button" className={`${button} ${surface} inline-flex items-center gap-2`} onClick={() => dispatch({ type: 'SET_PAGE', payload: 'home' })}>
            <ArrowLeft size={18} aria-hidden="true" />{t('home')}
          </button>
          <h1 className="text-xl font-semibold flex items-center gap-2"><HelpCircle className="text-blue-400" aria-hidden="true" />{t('quiz.title')}</h1>
        </header>
        <p className="text-sm opacity-80">{t('quiz.rules')}</p>
        {loading ? <p role="status">{t('loading')}</p> : error ? (
          <div role="alert" className={`${surface} rounded-2xl border p-5 space-y-3`}>
            <p>{t('quiz.error')}</p>
            <button type="button" className={`${button} bg-blue-600 text-white`} onClick={() => setRetry(n => n + 1)}>{t('quiz.retry')}</button>
          </div>
        ) : (
          <>
            <section aria-label={t('quiz.level')} className={`${surface} rounded-2xl border p-4`}>
              <div className="flex justify-between items-center gap-3 flex-wrap">
                <strong className="text-blue-400 text-lg">{t('quiz.level')} {level.toLocaleString(lang)} <span className="text-sm font-normal opacity-75">/ {rows.length.toLocaleString(lang)}</span></strong>
                <span className="text-sm">{t('quiz.attempts')} : {progress.attempts.toLocaleString(lang)}</span>
              </div>
              <progress className="w-full h-2 mt-3 accent-blue-500" value={level} max={rows.length || 1} aria-label={t('quiz.level')} />
            </section>
            {complete ? (
              <section role="status" className={`${surface} rounded-2xl border p-6 text-center space-y-3`}>
                <Trophy size={42} className="mx-auto text-yellow-400" aria-hidden="true" />
                <h2 className="text-2xl font-semibold">{t('quiz.complete')}</h2>
                <p>{t('quiz.level')} {level.toLocaleString(lang)} · {t('quiz.attempts')} : {progress.attempts.toLocaleString(lang)}</p>
              </section>
            ) : verse && question ? (
              <section className={`${surface} rounded-2xl border p-5 space-y-5`}>
                <h2 className="text-sm text-blue-400 font-semibold">{t('quiz.question')}</h2>
                <blockquote style={{ fontSize: state.settings.fontSize }} className="leading-relaxed break-words">{verse.t}</blockquote>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {question.options.map(id => {
                    const correct = selected !== null && id === question.id;
                    const wrong = selected === id && id !== question.id;
                    return <button type="button" key={id} disabled={selected !== null} onClick={() => answer(id)}
                      className={`${button} text-start transition-colors ${correct ? 'border-green-500 bg-green-500/15' : wrong ? 'border-red-400 bg-red-500/15' : `${surface} enabled:hover:border-blue-400`}`}>
                      {correct ? '✓ ' : wrong ? '✗ ' : ''}{reference(id)}
                    </button>;
                  })}
                </div>
                {selected !== null && <div role="status" aria-live="polite" className="space-y-3">
                  <p className="font-semibold flex items-start gap-2">
                    {selected === question.id && <CheckCircle2 size={20} className="text-green-400 shrink-0" aria-hidden="true" />}
                    {selected === question.id ? `${t('quiz.correct')} ${t('quiz.level')} ${level.toLocaleString(lang)} !` : `${t('quiz.wrong')} ${reference(question.id)}`}
                  </p>
                  <button type="button" onClick={next} className={`${button} w-full bg-blue-600 hover:bg-blue-700 text-white`}>{t('quiz.next')}</button>
                </div>}
              </section>
            ) : null}
            <div className="flex flex-wrap items-center justify-center gap-3">
              <button type="button" onClick={share} className={`${button} ${surface} flex items-center gap-2`}><Share2 size={18} aria-hidden="true" />{t('quiz.share')}</button>
              <a className={`${button} ${surface}`} href={`mailto:?subject=${encodeURIComponent('The Word — ' + t('quiz.title'))}&body=${encodeURIComponent(score)}`}>{t('quiz.email')}</a>
            </div>
            {copyStatus && <p role="status" className="text-center text-sm">{t('quiz.copied')}</p>}
          </>
        )}
        <p className="text-xs opacity-70">{t('quiz.saved')}</p>
        <button type="button" className="text-sm text-blue-400 underline min-h-[44px]" onClick={() => dispatch({ type: 'SET_PAGE', payload: 'settings' })}>{t('backupCreate')}</button>
      </div>
    </div>
  );
}
