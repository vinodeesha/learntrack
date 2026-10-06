import { useState } from 'react'
import { ArrowLeft, ArrowRight, Check, Sparkles } from 'lucide-react'
import { emptyAnswers, helpers, questions, recommendHelpers } from './domain'
import type { GradeBand, HelperId, Profile } from './domain'

export function StudyCheckIn({ profile, busy, onSave, onCancel }: { profile: Profile | null; busy: boolean; onSave: (profile: Profile) => void; onCancel?: () => void }) {
  const [page, setPage] = useState(-1)
  const [nickname, setNickname] = useState(profile?.nickname ?? '')
  const [gradeBand, setGradeBand] = useState<GradeBand>(profile?.gradeBand ?? '3-5')
  const [answers, setAnswers] = useState(profile?.answers ?? emptyAnswers())
  const [answered, setAnswered] = useState<HelperId[]>(profile ? questions.map(({ id }) => id) : [])
  const [selected, setSelected] = useState<HelperId[]>([])
  const question = questions[page]
  return <section className="checkin" aria-labelledby="checkin-title">
    <span className="eyebrow">A little about you</span>
    <h1 id="checkin-title">My Study Check-In</h1>
    {page === -1 ? <form onSubmit={(event) => { event.preventDefault(); setPage(0) }}>
      <label>My nickname<input autoFocus required maxLength={30} value={nickname} onChange={(event) => setNickname(event.target.value)} /></label>
      <label>My grade<select value={gradeBand} onChange={(event) => setGradeBand(event.target.value as GradeBand)}><option value="K-2">Kindergarten - grade 2</option><option value="3-5">Grades 3 - 5</option><option value="6-8">Grades 6 - 8</option></select></label>
      <div className="actions"><button className="primary" disabled={!nickname.trim()}>Let's begin <ArrowRight size={18} /></button>{onCancel && <button type="button" onClick={onCancel}>Cancel</button>}</div>
    </form> : page < questions.length ? <>
      <div className="question-progress"><span>Question {page + 1} of {questions.length}</span><progress value={page + 1} max={questions.length} /></div>
      <h2 className="question" key={page}>{question.text}</h2>
      <fieldset className="answer-options"><legend className="sr-only">My answer</legend>{['Not often', 'Sometimes', 'Often'].map((label, score) => <label key={label} className={answered.includes(question.id) && answers[question.id] === score ? 'selected' : ''}><input type="radio" name={question.id} checked={answered.includes(question.id) && answers[question.id] === score} onChange={() => { setAnswers({ ...answers, [question.id]: score }); setAnswered([...answered, question.id]) }} />{label}</label>)}</fieldset>
      <div className="actions spread"><button onClick={() => setPage(page - 1)}><ArrowLeft size={18} /> Back</button><button className="primary" disabled={!answered.includes(question.id)} onClick={() => { if (page === questions.length - 1) setSelected(recommendHelpers(answers)); setPage(page + 1) }}>{page === questions.length - 1 ? 'See my helpers' : 'Next'}<ArrowRight size={18} /></button></div>
    </> : <>
      <h2><Sparkles size={24} /> Your starting helpers</h2>
      <div className="helper-options">{questions.map(({ id }) => <label key={id}><input type="checkbox" checked={selected.includes(id)} onChange={() => setSelected(selected.includes(id) ? selected.filter((value) => value !== id) : [...selected, id])} /><span><strong>{helpers[id].title}</strong>{recommendHelpers(answers).includes(id) && <small className="tag">Suggested for you</small>}<span>{helpers[id].description}</span></span></label>)}</div>
      <div className="actions spread"><button disabled={busy} onClick={() => setPage(4)}><ArrowLeft size={18} /> Back</button><button className="primary" disabled={busy} onClick={() => onSave({ nickname: nickname.trim(), gradeBand, answers, enabledHelpers: selected, checkedInAt: new Date().toISOString() })}><Check size={18} />{busy ? 'Saving...' : 'Save my helpers'}</button></div>
    </>}
  </section>
}