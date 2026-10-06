# LearnTrack: Manual Test Data

Use this guide to enter sample data into the local LearnTrack app. All names and passwords below are fictional, disposable test values. Do not reuse a real password or enter real student information.

## 1. Open the App

Open http://127.0.0.1:5173/ while the web server and Firebase emulators are running.

To start them again, run these commands in PowerShell:

```powershell
cd C:\EeshaGS\learntrack
npm run local
```

Wait for Firebase to report that its emulators are ready, not just for Vite to print the web address. If Vite chooses a different port, use the URL it prints.

The app should show **LOCAL TEST MODE**. These accounts belong only to the local Firebase emulator, not to a live Firebase project. The test-name field is not an email field.

## 2. Create These Test Accounts

Enter a test name and password, then select **Create test account**. Enter the nickname and grade on the next screen.

| Test name | Test password | My nickname | My grade | Test purpose |
| --- | --- | --- | --- | --- |
| `test-maya` | `MayaTest123!` | Maya | Grades 3 - 5 | Small steps and planning ahead |
| `test-sam` | `SamTest123!` | Sam | Grades 6 - 8 | Focus and choosing priorities |
| `test-robin` | `RobinTest123!` | Robin | Kindergarten - grade 2 | Simple starting setup |

If an account already exists, select **Already have a test account? Sign in**, then use its password. For a fresh test without deleting anything, append a number to the test name, such as `test-maya-2`.

## 3. Study Check-In Answers

Select **Let's begin**, enter the answers below one question at a time, and select **See my helpers** after the last question.

| Question | Maya | Sam | Robin |
| --- | --- | --- | --- |
| Do you forget what homework you need to do? | Sometimes | Not often | Not often |
| Does a big assignment feel hard to start? | Often | Not often | Not often |
| Is it hard to choose what to work on first? | Not often | Sometimes | Not often |
| Do other things pull your attention away from homework? | Not often | Often | Not often |
| Do you start homework just before it is due? | Often | Not often | Not often |

### Expected Starting Helpers

| Student | Helpers that should already be selected |
| --- | --- |
| Maya | Small steps; Plan ahead |
| Sam | Focus timer; My first task |
| Robin | Homework checklist |

Leave these choices unchanged for the first test and select **Save my helpers**.

These are educational suggestions, not diagnoses or ability scores. The current rules recommend at most two helpers; when all answers are **Not often**, the default is **Homework checklist**. You can select additional helpers or turn suggestions off.

## 4. Enter Maya's Homework

Sign in as Maya. Select **Add homework** for each row.

The dates below assume you are testing on **September 6, 2026**. If testing later, replace them using the relative dates in parentheses. The browser's local date determines Today, Tomorrow, and overdue styling. Date inputs may display dates in your local format.

| What is the homework? | Subject | Due date | Work on it | Step template |
| --- | --- | --- | --- | --- |
| My book report | Reading | September 11, 2026 (five days from today) | September 6, 2026 (today) | Book report |
| Fractions practice | Math | September 7, 2026 (tomorrow) | Leave blank | Math practice |
| Plant life cycle poster | Science | September 9, 2026 (three days from today) | September 7, 2026 (tomorrow) | My own steps |
| Spelling practice | Writing | September 5, 2026 (yesterday) | Leave blank | My own steps |
| Read for fun | Reading | Leave blank | Leave blank | My own steps |

**Small steps** should be selected automatically for Maya. The dropdown labeled **Add a starter set** supplies the templates in the table. After you choose a template, its steps appear and the dropdown returns to **My own steps**. Do not choose it repeatedly unless you want to append the steps again.

### My Book Report

The **Book report** template supplies these four steps. Enter each step's **Day** as follows:

| Step | Day |
| --- | --- |
| Choose my book | September 6, 2026 (today) |
| Read and take notes | September 7, 2026 (tomorrow) |
| Write a first draft | September 9, 2026 (three days from today) |
| Check and finish my report | September 10, 2026 (four days from today) |

Select **Save homework**.

### Plant Life Cycle Poster

Use **Add a step** three times and enter:

| Step | Day |
| --- | --- |
| Find three facts about plants | September 7, 2026 (tomorrow) |
| Draw and label the life cycle | September 8, 2026 (two days from today) |
| Check labels and finish the poster | September 9, 2026 (three days from today) |

For **Spelling practice** and **Read for fun**, leave the steps empty. Select **Save homework** after each assignment.

### What to Check

- [ ] All five assignments appear under **To do**.
- [ ] **My book report** appears under **One place to begin**, because it is planned for today. Today's plan takes priority over earlier due dates.
- [ ] **Fractions practice** shows **Due Tomorrow**.
- [ ] **Spelling practice** has an overdue-colored due-date label. No notification or email is expected.
- [ ] **Read for fun** shows **No due date**.
- [ ] Book-report steps are expanded for Maya, with their planned dates visible.

## 5. Complete, Undo, Edit, and Delete

Perform these checks while signed in as Maya:

1. Check **Choose my book**. Expect **1 of 4 steps done**.
2. Refresh the page. Expect that step to remain checked.
3. Check the remaining three book-report steps. Expect the assignment to leave **To do** and appear under **Done**.
4. In **Done**, uncheck **Choose my book**. Return to **To do**. Expect the assignment to be back, showing **3 of 4 steps done**.
5. Use the pencil button on **Fractions practice**. Rename it to `Fractions practice - page 12`, save, and refresh. Expect the new title to remain.
6. Use the trash button on **Spelling practice**, then select **Keep it**. Expect the assignment to remain.
7. Use the trash button again, then select **Delete homework**. Expect the assignment to disappear. This deletion has no undo.

The circle beside an assignment completes the entire assignment and checks all its steps. Reopening it with the same button clears all its steps; unchecking just one step is the more selective undo test.

## 6. Test the Daily Plan

1. Open **My plan** and set **My day** to today.
2. Expect **My book report** in **My plan**.
3. Under **Choose some homework**, select **Add to day** for **Fractions practice - page 12**.
4. Expect both assignments in the day's plan.
5. Select **Remove from day** for the fractions assignment. Expect it to return to the available homework list without being deleted.
6. Set **My day** to tomorrow. Expect **Plant life cycle poster** in the plan.
7. With Maya's **Plan ahead** helper enabled, check **Steps for this day**. Expect unfinished steps whose **Day** matches the selected date, including **Read and take notes** if it has not already been completed.

Each assignment has one planned work date. Adding it to a different day moves it; it does not create a copy. Individual steps may have different dates.

## 7. Enter Sam's Homework and Test the Timer

Sign out of Maya's account, create or sign in to Sam's account, and complete Sam's check-in above.

| What is the homework? | Subject | Due date | Work on it |
| --- | --- | --- | --- |
| Review fractions for quiz | Math | Tomorrow | Today |
| Read chapter 3 | Reading | Three days from today | Leave blank |

Enter actual dates in the date fields. Leave steps empty for this test.

- [ ] Sam starts with no Maya assignments or reflections visible.
- [ ] Sam's homework screen shows **Focus timer** and the **My first task** helper.
- [ ] The timer starts at **15:00** for Sam's grade band.
- [ ] Set **Minutes** to **1**, then select **Start**. Expect the timer to count down.
- [ ] Select **Pause**. Expect the time to stop changing.
- [ ] Select **Start** again. Expect it to resume from the paused time.
- [ ] Let it finish. Expect **Session finished. Time for a break!**
- [ ] Select **Break**. Expect a five-minute break timer.
- [ ] Use the reset-arrow button. Expect the selected duration to reset.

Keep the timer screen open during this test. The current timer is not persisted: refreshing, signing out, or navigating away from the view containing it resets it. Sound and browser notifications are not part of this version.

## 8. Change Helpers and Retake the Check-In

While signed in as Sam:

1. Open **My helpers**. Turn **Small steps** on and **Focus timer** off.
2. Return to **My homework**. Expect the timer to be absent from the homework screen and the Small steps helper to appear.
3. Select **Add homework**. Expect **Small steps** to be selected in the editor. Cancel without saving.
4. Open **My helpers**, then **Retake my check-in**.
5. Keep Sam's nickname and grade. Answer **Often** only for forgetting homework; answer **Not often** for the other four questions.
6. Expect only **Homework checklist** to be selected initially on the results screen.
7. Select **Save my helpers**. Expect the updated helper on the homework screen and Sam's existing assignments to remain.

The standalone timer remains available on **My helpers**, even when it is not enabled on the homework screen. Retaking and saving the check-in replaces the previous answers and helper selection; it does not delete homework or reflections.

## 9. Test Robin's Simpler Setup

Create or sign in to Robin's account and use the all-**Not often** answers above.

- [ ] **Homework checklist** is the only initial suggestion.
- [ ] Neither Maya's nor Sam's homework is visible.
- [ ] Open **My helpers** and try its timer. Expect the default work session to be **05:00** for Kindergarten - grade 2.
- [ ] Add `Read one short story`, choose **Reading**, and leave both dates and steps blank. Expect it to save without requiring unnecessary details.

## 10. Save a Reflection

Use **My progress** in each account and enter:

| Student | Today's feeling | What helped? What could you try next? |
| --- | --- | --- |
| Maya | Good | Breaking my book report into small steps helped me start. |
| Sam | Okay | The short timer helped. Tomorrow I will choose my first task before starting. |
| Robin | Tricky | I will ask an adult to help me choose one small step. |

Select **Save reflection**, refresh, and reopen **My progress**. Expect the reflection to remain in that account only. There is one reflection per local calendar day; saving again updates that day's entry.

Progress counts describe the assignments and steps currently stored, not an immutable lifetime history. Deleting an assignment changes those counts.

## 11. Account and Input Checks

- [ ] Sign out of Sam and sign back in as Maya. Expect Maya's homework and reflection to return, with no Sam data mixed in.
- [ ] Try signing in as `test-maya` with `WrongTest123!`. Expect an error and no access to the workspace.
- [ ] Try creating `test-maya` again. Expect the app to say that the name already exists.
- [ ] Try submitting a blank nickname or homework title. Expect saving to be blocked.
- [ ] Try a test name shorter than three characters or containing spaces. Expect browser validation to block submission.
- [ ] Resize the browser to a narrow phone-sized window. Check navigation, the check-in, the homework editor, and helper controls for overlapping text or horizontal scrolling.

## Local Data and Limitations

- Refreshing the browser preserves data while the emulators are running.
- The startup command imports from `.emulator-data` and requests an export there on graceful shutdown. Wait for export to finish when stopping; force-closing or killing processes can lose changes since the last export.
- Emulator data and test passwords are not production-secure storage. Keep them on this machine and out of source control.
- This checklist describes expected behavior for manual testing; it is not a claim that every check has already passed. Automated homework-flow tests are still being debugged as of this guide's creation.
- No cloud project has been deployed. Real student accounts, parental or organization ownership, consent, privacy/retention policy, educator review of the check-in, and production verification are still required before a student pilot.

## Record Any Problems

For each issue, note the following without including passwords:

| Field | Example |
| --- | --- |
| Test account | test-maya |
| Screen | My plan |
| Action | Added fractions homework to today |
| Expected | Assignment appears in today's plan |
| Actual | Describe what appeared instead |
| Browser and window size | Chrome, narrow phone-sized window |
| Screenshot | Attach a screenshot containing only fictional test data |