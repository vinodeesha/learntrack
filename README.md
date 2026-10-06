# LearnTrack

LearnTrack is a student-friendly homework planning application. It helps learners decide what to work on, break assignments into smaller steps, plan work for a particular day, use a focus timer, and reflect on their progress.

The application uses supportive educational prompts rather than grades, diagnoses, or ability scores. A short study check-in recommends up to two optional helpers based on the learner's answers.

> **Current status:** LearnTrack is deployed to Firebase Hosting at [ltrack-f7aeb.web.app](https://ltrack-f7aeb.web.app/). Local development continues to use isolated Firebase emulators. The current username-based identity flow is suitable for controlled demonstrations but still needs account recovery and lifecycle work before broader student use.

For a learner-focused walkthrough of every screen, see the [LearnTrack User Guide](docs/USER-GUIDE.md). A shorter four-step guide is also available directly on the signed-out home page.

## Features

- Account creation and sign-in, with isolated local accounts for testing
- A five-question study check-in
- Personalized helper recommendations
- Homework creation, editing, completion, reopening, and deletion
- Assignment steps and reusable starter templates
- Due dates and daily work planning
- Grade-adjusted focus timers
- Daily reflections and progress summaries
- Per-account data isolation through Firestore Security Rules
- Responsive desktop and mobile layouts

## Technology

- React 19 and TypeScript
- Vite
- Firebase Authentication
- Cloud Firestore
- Firebase Local Emulator Suite
- Firebase Hosting configuration
- Node.js test runner
- Playwright browser tests
- Oxlint

## Local Development

### Prerequisites

- Node.js 20 or later
- npm
- Java, required by the Firebase Local Emulator Suite

### Install and start

```powershell
cd C:\EeshaGS\learntrack
npm ci
npm run local
```

Wait for both Vite and the Firebase emulators to report that they are ready. Then open:

- Application: http://127.0.0.1:5173/
- Firebase Emulator UI: http://127.0.0.1:4000/

The application should display **LOCAL TEST MODE**. Use only fictional names and test passwords.

Press `Ctrl+C` to stop the local services. Allow Firebase to finish exporting emulator data before closing the terminal. Local data is imported from and exported to `.emulator-data/`, which is excluded from Git.

For sample users, homework, check-in answers, and a complete manual workflow, see [TESTING-README.md](TESTING-README.md).

## Testing

Install dependencies before running the checks:

```powershell
npm ci
```

Run unit tests:

```powershell
npm test
```

Run Firestore Security Rules tests:

```powershell
npm run test:rules
```

Install the Playwright browser once:

```powershell
npx playwright install chromium
```

Start the app and emulators in one terminal:

```powershell
npm run local
```

Then run the desktop and mobile browser tests in another terminal:

```powershell
npm run test:e2e
```

Run static checks and create a production bundle:

```powershell
npm run lint
npm run build
```

Playwright writes failure screenshots and traces to `test-results/`.

## Data Model

Each authenticated user owns a document and two subcollections:

```text
users/{uid}
users/{uid}/assignments/{assignmentId}
users/{uid}/reflections/{localDate}
```

The rules in `firestore.rules` restrict access to the authenticated owner and validate the primary fields. The browser communicates directly with Firebase Authentication and Cloud Firestore; this version does not have a separate application server.

## Hosting on Firebase

The production deployment uses Firebase project `ltrack-f7aeb`:

- Application: [https://ltrack-f7aeb.web.app/](https://ltrack-f7aeb.web.app/)
- Firebase console: [https://console.firebase.google.com/project/ltrack-f7aeb/overview](https://console.firebase.google.com/project/ltrack-f7aeb/overview)
- Hosting source: `dist/`
- Firestore rules source: `firestore.rules`
- Project alias: `.firebaserc`

`src/firebase.ts` uses Vite production variables in deployed builds and automatically connects to the local Authentication and Firestore emulators in development. Store the production Web app configuration in the ignored `.env.production.local` file:

```dotenv
VITE_FIREBASE_API_KEY=your-api-key
VITE_FIREBASE_AUTH_DOMAIN=your-project-id.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project-id.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
VITE_FIREBASE_APP_ID=your-app-id
```

Firebase Web app configuration is embedded in the browser bundle and is not a server secret. Authorization must be enforced by Authentication, Firestore Security Rules, and optional App Check. Keep service-account private keys and administrative credentials out of the frontend and out of Git.

### Firebase Console Setup

The default Cloud Firestore database and security rules are deployed. In **Authentication > Sign-in method**, Email/Password authentication must be enabled for the current username flow.

The Spark plan may be sufficient for a controlled demonstration within its quotas. Configure billing and budget alerts before enabling services that require the Blaze plan.

### Production Identity Follow-up

The current login converts a private username into an internal address such as `learner-7@learntrack.test`. It does not provide email verification, password recovery, or a managed child-account lifecycle. Before broader student use, adopt an intentional identity model such as parent/guardian accounts with child profiles, school-managed accounts, or an approved identity provider. Add account recovery, account deletion, data deletion, and appropriate abuse controls.

### Security Checklist

Before a broader launch:

- Run all Firestore rule tests.
- Add validation for every object inside an assignment's `steps` list.
- Validate stored date and timestamp formats more strictly.
- Test attempts to read and write another user's documents.
- Enable Firebase App Check for the deployed application.
- Restrict authorized Authentication domains to expected domains.
- Configure usage monitoring, budget alerts, and operational ownership.
- Define backup, retention, export, and deletion procedures.

### Deploy An Update

```powershell
npx firebase login
npm ci
npm run lint
npm test
npm run test:rules
npm run build
npx firebase deploy --only firestore:rules,hosting --project ltrack-f7aeb
```

Verify the live home page and one fictional test account after deployment. Never use real student information for deployment testing.

Use **Firebase Console > Hosting** to connect a custom domain. Add that domain to the authorized domains in Firebase Authentication when required by the chosen sign-in provider.

## Production Responsibility

LearnTrack may process information about children, study habits, homework, and reflections. Firebase deployment does not by itself make the application suitable for real student use.

Before a public or school pilot, obtain qualified review of:

- Parent, guardian, school, and student consent requirements
- COPPA, FERPA, GDPR-K, and other applicable privacy obligations
- Data minimization and purpose limitation
- Privacy notice and terms of use
- Account recovery and ownership
- Data access, correction, export, retention, and deletion
- Incident response and support procedures
- Accessibility and educator review of learner-facing language

Do not migrate emulator accounts or fictional test data into production.

## Available Scripts

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start only the Vite development server |
| `npm run emulators` | Start Auth, Firestore, and Emulator UI |
| `npm run local` | Start Vite and Firebase emulators together |
| `npm test` | Run domain unit tests |
| `npm run test:rules` | Run Firestore Security Rules tests |
| `npm run test:e2e` | Run Playwright desktop and mobile tests |
| `npm run lint` | Run Oxlint |
| `npm run build` | Type-check and create the Vite production bundle |
| `npm run preview` | Preview the built application locally |
