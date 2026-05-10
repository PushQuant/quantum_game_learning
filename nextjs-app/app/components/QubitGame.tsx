'use client';
import { useState, useRef } from 'react';
import styles from './QubitGame.module.css';

export default function QubitGame() {
  const [observed, setObserved] = useState(false);
  const [result, setResult] = useState<number | null>(null);
  const [text, setText] = useState('The state is uncertain.');
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const observe = () => {
    if (observed) return;
    const res = Math.random() < 0.5 ? 0 : 1;
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
    result === 0 ? '#4fc3f7' :
    result === 1 ? '#f06292' :
    'linear-gradient(45deg, #6cf, #c6f)';

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

      <div>
        <button className={`${styles.button} ${styles.observe}`} onClick={observe}>Observe</button>
        <button className={`${styles.button} ${styles.ignore}`} onClick={ignore}>Don&apos;t observe</button>
        <button className={`${styles.button} ${styles.reset}`} onClick={reset}>Reset</button>
      </div>

      <audio ref={audioRef} src="/BlipSound.mp3" />
    </div>
  );
}