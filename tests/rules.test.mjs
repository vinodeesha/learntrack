import { after, before, test } from 'node:test'
import { readFile } from 'node:fs/promises'
import { initializeTestEnvironment, assertFails, assertSucceeds } from '@firebase/rules-unit-testing'
import { collection, deleteDoc, doc, getDoc, getDocs, setDoc } from 'firebase/firestore'

let environment
before(async () => {
  environment = await initializeTestEnvironment({ projectId: 'demo-learntrack-rules', firestore: { host: '127.0.0.1', port: 8180, rules: await readFile(new URL('../firestore.rules', import.meta.url), 'utf8') } })
})
after(async () => { await environment?.cleanup() })
const profile = { nickname: 'Test Learner', gradeBand: '3-5', answers: { remember: 0, steps: 2, prioritize: 1, focus: 0, ahead: 0 }, enabledHelpers: ['steps', 'prioritize'], checkedInAt: '2026-09-06' }
const task = { id: 'math', title: 'Math practice', subject: 'Math', dueDate: '2026-09-10', steps: [], completed: false, plannedFor: '', createdAt: '2026-09-06' }
test('owner can create, read, update, and delete their homework', async () => {
  const database = environment.authenticatedContext('owner').firestore()
  await assertSucceeds(setDoc(doc(database, 'users/owner'), profile))
  const reference = doc(database, 'users/owner/assignments/math')
  await assertSucceeds(setDoc(reference, task))
  await assertSucceeds(getDoc(reference))
  await assertSucceeds(getDocs(collection(database, 'users/owner/assignments')))
  await assertSucceeds(setDoc(reference, { ...task, completed: true }))
  await assertSucceeds(deleteDoc(reference))
})
test('another account cannot read, list, write, or delete private data', async () => {
  const database = environment.authenticatedContext('other').firestore()
  for (const path of ['users/owner', 'users/owner/assignments/math', 'users/owner/reflections/2026-09-06']) {
    await assertFails(getDoc(doc(database, path)))
    await assertFails(setDoc(doc(database, path), path.endsWith('math') ? task : profile))
    await assertFails(deleteDoc(doc(database, path)))
  }
  await assertFails(getDocs(collection(database, 'users/owner/assignments')))
})
test('signed-out requests and unknown collections are denied', async () => {
  const database = environment.unauthenticatedContext().firestore()
  await assertFails(getDoc(doc(database, 'users/owner')))
  await assertFails(setDoc(doc(database, 'users/owner/assignments/math'), task))
  await assertFails(setDoc(doc(environment.authenticatedContext('owner').firestore(), 'public/data'), { value: 1 }))
})
test('malformed profiles and assignments are rejected', async () => {
  const database = environment.authenticatedContext('owner').firestore()
  await assertFails(setDoc(doc(database, 'users/owner'), { ...profile, enabledHelpers: ['unknown'] }))
  await assertFails(setDoc(doc(database, 'users/owner'), { ...profile, answers: { ...profile.answers, focus: 99 } }))
  await assertFails(setDoc(doc(database, 'users/owner/assignments/math'), { ...task, title: '' }))
  await assertFails(setDoc(doc(database, 'users/owner/assignments/math'), { ...task, id: 'different' }))
})
test('owner can store a reflection but not unbounded or unexpected fields', async () => {
  const reference = doc(environment.authenticatedContext('owner').firestore(), 'users/owner/reflections/2026-09-06')
  await assertSucceeds(setDoc(reference, { feeling: 'Good', note: 'Small steps helped.' }))
  await assertFails(setDoc(reference, { feeling: 'Good', note: 'x'.repeat(301) }))
  await assertFails(setDoc(reference, { feeling: 'Good', note: '', extra: true }))
})