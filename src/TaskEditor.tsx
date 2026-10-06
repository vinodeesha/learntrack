import { useEffect, useRef, useState } from 'react'
import { Plus, Save, Trash2, X } from 'lucide-react'
import { stepTemplates } from './domain'
import type { Assignment } from './domain'

export function TaskEditor({ task, useSteps, useDates, busy, onSave, onClose }: { task: Assignment; useSteps: boolean; useDates: boolean; busy: boolean; onSave: (task: Assignment) => void; onClose: () => void }) {
  const [draft, setDraft] = useState(task)
  const [showSteps, setShowSteps] = useState(useSteps || task.steps.length > 0)
  const dialog = useRef<HTMLDialogElement>(null)
  useEffect(() => { dialog.current?.showModal() }, [])
  return <dialog ref={dialog} onCancel={(event) => { event.preventDefault(); if (!busy) onClose() }} aria-labelledby="editor-title">
    <form onSubmit={(event) => { event.preventDefault(); const steps = draft.steps.filter((step) => step.title.trim()).map((step) => ({ ...step, title: step.title.trim() })); onSave({ ...draft, title: draft.title.trim(), steps, completed: steps.length ? steps.every((step) => step.done) : draft.completed }) }}>
      <div className="section-heading"><h2 id="editor-title">{task.title ? 'Edit homework' : 'Add homework'}</h2><button type="button" title="Close" aria-label="Close" className="icon-button" disabled={busy} onClick={onClose}><X /></button></div>
      <label>What is the homework?<input autoFocus required maxLength={120} value={draft.title} onChange={(event) => setDraft({ ...draft, title: event.target.value })} /></label>
      <div className="form-grid"><label>Subject<select value={draft.subject} onChange={(event) => setDraft({ ...draft, subject: event.target.value })}>{['Math', 'Reading', 'Writing', 'Science', 'Social studies', 'Other'].map((subject) => <option key={subject}>{subject}</option>)}</select></label><label>Due date<input type="date" value={draft.dueDate} onChange={(event) => setDraft({ ...draft, dueDate: event.target.value })} /></label></div>
      <label>Work on it<input type="date" value={draft.plannedFor} onChange={(event) => setDraft({ ...draft, plannedFor: event.target.value })} /></label>
      <label className="check-label"><input type="checkbox" checked={showSteps} onChange={(event) => setShowSteps(event.target.checked)} />Small steps</label>
      {showSteps && <div className="step-editor"><label>Add a starter set<select aria-label="Step template" value="My own steps" onChange={(event) => setDraft({ ...draft, steps: [...draft.steps, ...stepTemplates[event.target.value].map((title) => ({ id: crypto.randomUUID(), title, done: false, plannedDate: '' }))].slice(0, 20) })}>{Object.keys(stepTemplates).map((name) => <option key={name}>{name}</option>)}</select></label>
        {draft.steps.map((step, index) => <div className="step-edit-row" key={step.id}><label className="grow">Step {index + 1}<input required maxLength={120} value={step.title} onChange={(event) => setDraft({ ...draft, steps: draft.steps.map((item) => item.id === step.id ? { ...item, title: event.target.value } : item) })} /></label>{useDates && <label>Day<input type="date" value={step.plannedDate} onChange={(event) => setDraft({ ...draft, steps: draft.steps.map((item) => item.id === step.id ? { ...item, plannedDate: event.target.value } : item) })} /></label>}<button type="button" className="icon-button" title={`Remove step ${index + 1}`} aria-label={`Remove step ${index + 1}`} onClick={() => setDraft({ ...draft, steps: draft.steps.filter((item) => item.id !== step.id) })}><Trash2 size={18} /></button></div>)}
        <button type="button" disabled={draft.steps.length >= 20} onClick={() => setDraft({ ...draft, steps: [...draft.steps, { id: crypto.randomUUID(), title: '', done: false, plannedDate: '' }] })}><Plus size={18} />Add a step</button>
      </div>}
      <div className="actions"><button className="primary" disabled={busy || !draft.title.trim()}><Save size={18} />{busy ? 'Saving...' : 'Save homework'}</button><button type="button" disabled={busy} onClick={onClose}>Cancel</button></div>
    </form>
  </dialog>
}