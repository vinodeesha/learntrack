import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './learntrack.css'
import LearnTrack from './LearnTrack.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <LearnTrack />
  </StrictMode>,
)
