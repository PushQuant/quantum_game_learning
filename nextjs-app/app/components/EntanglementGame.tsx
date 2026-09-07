'use client';

import { useState, useRef } from 'react';
import styles from './EntanglementGame.module.css';
import { useEffect } from 'react';

type Measurement = 0 | 1 | null;

export default function EntanglementGame() {
  const [result, setResult] = useState<Measurement>(null);
  const [measuredQubit, setMeasuredQubit] = useState<'A' | 'B' | null>(null);
  const [text, setText] = useState(
    'The two qubits are entangled. Neither has been measured yet.'
  );

  // Button Shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'a' || e.key === 'A') measure('A');
      if (e.key === 'b' || e.key === 'B') measure('B');
      if (e.key === 'r' || e.key === 'R') reset();
    };

    window.addEventListener('keydown', handleKeyDown);
  return () => window.removeEventListener('keydown', handleKeyDown);
}, [result]);





  const audioRef = useRef<HTMLAudioElement | null>(null);

  const measure = (qubit: 'A' | 'B') => {
    // Wenn bereits gemessen wurde, passiert nichts mehr
    if (result !== null) return;

    // 50% Wahrscheinlichkeit für 0 oder 1
    const measuredResult: 0 | 1 = Math.random() < 0.5 ? 0 : 1;

    setResult(measuredResult);
    setMeasuredQubit(qubit);

    setText(
      `Qubit ${qubit} was measured as ${measuredResult}. ` +
      `Because the qubits are entangled, the other qubit is also ${measuredResult}.`
    );

    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play();
    }
  };

  const reset = () => {
    setResult(null);
    setMeasuredQubit(null);
    setText(
      'The two qubits are entangled. Neither has been measured yet.'
    );
  };

  return (
    <div className={styles.gameContainer}>
      <h1 className={styles.title}>Level 2 - Quantum Entanglement</h1>

      <p className={styles.description}>
        These two qubits share an entangled quantum state.
        Measure either one and observe what happens to the other.
      </p>

      <div className={styles.scene}>

        <div className={styles.qubitArea}>
          <p>Qubit A</p>

          <div className={styles.qubitWrapper}>
            <div
              className={`${styles.qubit} ${
                result !== null
                  ? result === 0
                    ? styles.stateZero
                    : styles.stateOne
                  : ''
              }`}
            >
              {result !== null ? result : '?'}
            </div>
          </div>

          <button
            className={`${styles.button} ${styles.measure}`}
            onClick={() => measure('A')}
            disabled={result !== null}
          >
            Measure A<kbd> (A)</kbd></button>
        </div>

        <div className={styles.entanglement}>
          <div className={styles.line} />
          <span>Entangled</span>
          <div className={styles.line} />
        </div>

        <div className={styles.qubitArea}>
          <p>Qubit B</p>

          <div className={styles.qubitWrapper}>
            <div
              className={`${styles.qubit} ${
                result !== null
                  ? result === 0
                    ? styles.stateZero
                    : styles.stateOne
                  : ''
              }`}
            >
              {result !== null ? result : '?'}
            </div>
          </div>

          <button className={`${styles.button} ${styles.measure}`} onClick={() => measure('B')} disabled={result !== null}>Measure B<kbd> (B)</kbd></button>
        </div>

      </div>

      <p className={styles.resultText}>{text}</p>

      {measuredQubit !== null && (
        <p className={styles.measurementInfo}>
          Qubit {measuredQubit} was measured first.
        </p>
      )}

      <button className={`${styles.button} ${styles.reset}`} onClick={reset}>Reset<kbd>(R)</kbd></button>

      <audio ref={audioRef} src="/BlipSound.mp3" />
    </div>
  );
}