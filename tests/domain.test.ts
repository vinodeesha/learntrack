import { test } from 'node:test'
import assert from 'node:assert/strict'
import { emptyAnswers, recommendHelpers, nextAssignment, toggleStep, localDate } from '../src/domain.ts'
import type { Assignment } from '../src/domain.ts'

test('different check-in answers produce different helpers', () => {
  assert.deepEqual(recommendHelpers({ ...emptyAnswers(), focus: 2 }), ['focus'])
  assert.deepEqual(recommendHelpers({ ...emptyAnswers(), steps: 2, ahead: 1 }), ['steps', 'ahead'])
})
test('ties are stable, recommendations are limited, and no difficulties has a gentle default', () => {
  assert.deepEqual(recommendHelpers({ remember: 2, steps: 2, prioritize: 2, focus: 2, ahead: 2 }), ['remember', 'steps'])
  assert.deepEqual(recommendHelpers(emptyAnswers()), ['remember'])
})
const assignment: Assignment = { id: 'one', title: 'Math', subject: 'Math', dueDate: '2026-09-10', steps: [{ id: 'step', title: 'First five', done: false, plannedDate: '' }], completed: false, plannedFor: '', createdAt: '2026-09-01' }
test('finishing all steps completes homework, undoing a step reopens it', () => {
  const finished = toggleStep(assignment, 'step')
  assert.equal(finished.completed, true)
  assert.equal(toggleStep(finished, 'step').completed, false)
  assert.equal(assignment.steps[0].done, false)
})
test('today plan takes priority, then nearest due date, excluding finished homework', () => {
  const planned = { ...assignment, id: 'two', dueDate: '2026-10-01', plannedFor: '2026-09-06' }
  assert.equal(nextAssignment([assignment, planned], '2026-09-06')?.id, 'two')
  assert.equal(nextAssignment([assignment, { ...planned, completed: true }])?.id, 'one')
  assert.equal(nextAssignment([]), undefined)
})
test('dates use local calendar values', () => {
  assert.equal(localDate(new Date(2026, 8, 6, 23, 59)), '2026-09-06')
})