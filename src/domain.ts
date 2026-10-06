export const helpers = {
  remember: { title: 'Homework checklist', description: 'Keep your homework and due dates together.', action: 'Check my homework' },
  steps: { title: 'Small steps', description: 'Start with one small part of a bigger task.', action: 'Break it into steps' },
  prioritize: { title: 'My first task', description: 'Choose a few things to work on today.', action: 'Make my plan' },
  focus: { title: 'Focus timer', description: 'Try a short work session, then take a break.', action: 'Start a focus session' },
  ahead: { title: 'Plan ahead', description: 'Give each step its own day.', action: 'Plan my steps' },
} as const

export type HelperId = keyof typeof helpers
export type Answers = Record<HelperId, number>
export type GradeBand = 'K-2' | '3-5' | '6-8'
export type Profile = { nickname: string; gradeBand: GradeBand; answers: Answers; enabledHelpers: HelperId[]; checkedInAt: string }
export type Step = { id: string; title: string; done: boolean; plannedDate: string }
export type Assignment = { id: string; title: string; subject: string; dueDate: string; steps: Step[]; completed: boolean; plannedFor: string; createdAt: string }
export const questions: { id: HelperId; text: string }[] = [
  { id: 'remember', text: 'Do you forget what homework you need to do?' },
  { id: 'steps', text: 'Does a big assignment feel hard to start?' },
  { id: 'prioritize', text: 'Is it hard to choose what to work on first?' },
  { id: 'focus', text: 'Do other things pull your attention away from homework?' },
  { id: 'ahead', text: 'Do you start homework just before it is due?' },
]
export const emptyAnswers = (): Answers => ({ remember: 0, steps: 0, prioritize: 0, focus: 0, ahead: 0 })
export function recommendHelpers(answers: Answers): HelperId[] {
  const ranked = questions.map(({ id }, order) => ({ id, order, score: answers[id] }))
    .filter(({ score }) => score > 0).sort((left, right) => right.score - left.score || left.order - right.order)
  return ranked.length ? ranked.slice(0, 2).map(({ id }) => id) : ['remember']
}
export function localDate(date = new Date()): string {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`
}
export function dateLabel(value: string): string {
  if (!value) return 'No due date'
  if (value === localDate()) return 'Today'
  const tomorrow = new Date()
  tomorrow.setDate(tomorrow.getDate() + 1)
  if (value === localDate(tomorrow)) return 'Tomorrow'
  return new Date(`${value}T12:00:00`).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })
}
export function nextAssignment(assignments: Assignment[], today = localDate()): Assignment | undefined {
  return assignments.filter((assignment) => !assignment.completed).sort((left, right) =>
    Number(right.plannedFor === today) - Number(left.plannedFor === today) ||
    (left.dueDate || '9999').localeCompare(right.dueDate || '9999') || left.createdAt.localeCompare(right.createdAt))[0]
}
export function toggleStep(assignment: Assignment, stepId: string): Assignment {
  const steps = assignment.steps.map((step) => step.id === stepId ? { ...step, done: !step.done } : step)
  return { ...assignment, steps, completed: steps.length > 0 && steps.every((step) => step.done) }
}
export const stepTemplates: Record<string, string[]> = {
  'My own steps': [],
  'Math practice': ['Get my worksheet and pencil', 'Try the first five questions', 'Finish the next questions', 'Check my answers'],
  'Book report': ['Choose my book', 'Read and take notes', 'Write a first draft', 'Check and finish my report'],
  'Study for a test': ['Choose one topic', 'Review my notes', 'Try practice questions', 'Check what I need to review'],
}