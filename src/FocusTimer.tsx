import { useEffect, useRef, useState } from 'react'
import { Pause, Play, RotateCcw, Timer } from 'lucide-react'

export function FocusTimer({ younger }: { younger: boolean }) {
  const [minutes, setMinutes] = useState(younger ? 5 : 15)
  const [mode, setMode] = useState<'Work' | 'Break'>('Work')
  const [seconds, setSeconds] = useState(minutes * 60)
  const [running, setRunning] = useState(false)
  const [finished, setFinished] = useState(false)
  const deadline = useRef(0)
  useEffect(() => {
    if (!running) return
    const interval = window.setInterval(() => {
      const remaining = Math.max(0, Math.ceil((deadline.current - Date.now()) / 1000))
      setSeconds(remaining)
      if (remaining === 0) { setRunning(false); setFinished(true) }
    }, 250)
    return () => window.clearInterval(interval)
  }, [running])
  function reset(duration = minutes) { setRunning(false); setSeconds(duration * 60); setFinished(false) }
  return <section className="timer-panel" aria-label="Focus timer"><h2><Timer size={22} /> Focus timer</h2>
    <div className="segmented">{(['Work', 'Break'] as const).map((value) => <button key={value} aria-pressed={mode === value} onClick={() => { setMode(value); const duration = value === 'Break' ? 5 : younger ? 5 : 15; setMinutes(duration); reset(duration) }}>{value}</button>)}</div>
    <div className="clock" role="timer" aria-label={`${seconds} seconds remaining`}>{String(Math.floor(seconds / 60)).padStart(2, '0')}:{String(seconds % 60).padStart(2, '0')}</div>
    <label className="timer-length">Minutes<select aria-label="Timer minutes" disabled={running} value={minutes} onChange={(event) => { const duration = Number(event.target.value); setMinutes(duration); reset(duration) }}>{[1, 5, 10, 15, 20, 25].map((value) => <option key={value}>{value}</option>)}</select></label>
    <div className="actions"><button className="primary" disabled={seconds === 0} onClick={() => { if (!running) deadline.current = Date.now() + seconds * 1000; setRunning(!running) }}>{running ? <Pause size={18} /> : <Play size={18} />}{running ? 'Pause' : 'Start'}</button><button className="icon-button" aria-label="Reset timer" title="Reset timer" onClick={() => reset()}><RotateCcw size={18} /></button></div>
    <p role="status">{finished ? mode === 'Work' ? 'Session finished. Time for a break!' : 'Break finished. Ready when you are.' : running ? mode === 'Work' ? 'One small step at a time.' : 'Take a moment for yourself.' : 'Your pace. Your time.'}</p>
  </section>
}