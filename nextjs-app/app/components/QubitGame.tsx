'use client';
import { useState, useRef } from 'react';
import styles from './QubitGame.module.css';
import { useEffect } from 'react';

export default function QubitGame() {
  const [observed, setObserved] = useState(false);
  const [result, setResult] = useState<number | null>(null);
  const [text, setText] = useState('The state is uncertain.');

  const [probability, setProbability] = useState(0.5);

  useEffect(() => {
  const saved = localStorage.getItem('probability');
  if (saved) setProbability(parseFloat(saved));
}, []);

useEffect(() => {
  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'o' || e.key === 'O') observe();
    if (e.key === 'd' || e.key === 'D') ignore();
    if (e.key === 'r' || e.key === 'R') reset();
  };

  window.addEventListener('keydown', handleKeyDown);
  return () => window.removeEventListener('keydown', handleKeyDown);
}, [observed]);



  const audioRef = useRef<HTMLAudioElement | null>(null);

  const observe = () => {
    if (observed) return;
    const res = Math.random() < probability ? 0 : 1;
    setObserved(true);
    setResult(res);
    setText(
      res === 0
        ? 'Through observing, the Qubit was found in position 0.'
        : 'Through observing, the Qubit was found in position 1.'
    );
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play();
    }
  };

  const ignore = () => {
    if (observed) return;
    setText('The state remains unobserved...\nWhat could possibly happen if it were observed?');
  };

  const reset = () => {
    setObserved(false);
    setResult(null);
    setText('The state is uncertain.');
  };

  // Der Wrapper verschiebt sich horizontal – die Animation läuft ungestört auf .qubit
  const wrapperTransform =
    result === 0 ? 'translateX(-80px)' :
    result === 1 ? 'translateX(80px)'  :
    'translateX(0px)';

  const qubitBackground =
    result === 0 ? '#6cf' :
    result === 1 ? '#c6f' :
  `linear-gradient(135deg, #6cf ${(probability * 100) - 45}%, #c6f ${(probability * 100) + 45}%)`;

  return (
    <div className={styles.gameContainer}>
      <h1 style={{ marginBottom: '10px' }}>Level 1 - Superposition</h1>

      <div className={styles.scene}>
        {/* Wrapper bewegt sich horizontal */}
        <div className={styles.qubitWrapper} style={{ transform: wrapperTransform }}>
          {/* Qubit animiert sich vertikal & rotiert */}
          <div
            className={styles.qubit}
            style={{ background: qubitBackground }}
          />
        </div>
      </div>

      <p style={{ whiteSpace: 'pre-line', marginBottom: '20px' }}>{text}</p>

      <div style={{ marginBottom: '20px' }}>
        <p style ={{ marginBottom: '8px'}}>
          Probability for state 0: <strong>{probability.toFixed(2)}</strong>
        </p>
        <p style ={{ marginBottom: '8px'}}>
          Probability for state 1: <strong>{(1 - probability).toFixed(2)}</strong>
        </p>
        <input 
          key="probability-slider"
          type="range"
          min={0}
          max={1}
          step={0.01}
          value={1 - probability}
          onChange={(e) => {
            const val = 1 - parseFloat(e.target.value);
            setProbability(val);
            localStorage.setItem('probability', val.toString());
          }}          
          style={{ width: '200px' }}
        />
        <div style={{ display: 'flex', justifyContent: 'space-between', width: '200px' }}>
          <span>0</span>
          <span>0.5</span>
          <span>1</span>
        </div>
      </div>


      <div>
        <button className={`${styles.button} ${styles.observe}`} onClick={observe}>Observe <kbd>(O)</kbd></button>
        <button className={`${styles.button} ${styles.ignore}`} onClick={ignore}>Don&apos;t observe <kbd>(D)</kbd></button>
        <button className={`${styles.button} ${styles.reset}`} onClick={reset}>Reset <kbd>(R)</kbd></button>
      </div>

      <audio ref={audioRef} src="/BlipSound.mp3" />
    </div>
  );
}