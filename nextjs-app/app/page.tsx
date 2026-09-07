import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,#141a2e,#05070f)] text-white flex flex-col items-center justify-center px-6 py-12">
      <div className="w-full max-w-5xl text-center">

        <h1 className="text-4xl md:text-6xl font-bold mb-4">
          Quantum Game Learning
        </h1>

        <p className="text-gray-300 text-lg mb-12">
          Learn quantum computing by playing.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          {/* Level 1 */}
          <Link
            href="/level/1"
            className="rounded-2xl border border-blue-400/40 bg-white/5 p-8 transition hover:-translate-y-2 hover:bg-white/10 hover:border-blue-400"
          >
            <p className="text-sm text-blue-300 mb-2">
              LEVEL 1
            </p>

            <h2 className="text-2xl font-bold mb-3">
              Superposition
            </h2>

            <p className="text-gray-400 mb-6">
              Discover how a qubit can exist in multiple states before measurement.
            </p>

            <span className="text-blue-300 font-semibold">
              Play →
            </span>
          </Link>

          {/* Level 2 */}
          <Link
            href="/level/2"
            className="rounded-2xl border border-purple-400/40 bg-white/5 p-8 transition hover:-translate-y-2 hover:bg-white/10 hover:border-purple-400"
          >
            <p className="text-sm text-purple-300 mb-2">
              LEVEL 2
            </p>

            <h2 className="text-2xl font-bold mb-3">
              Quantum Entanglement
            </h2>

            <p className="text-gray-400 mb-6">
              Explore how two entangled qubits share a connected quantum state.
            </p>

            <span className="text-purple-300 font-semibold">
              Play →
            </span>
          </Link>

          {/* Level 3 */}
          <div
            className="rounded-2xl border border-gray-600 bg-white/[0.03] p-8 opacity-50 cursor-not-allowed"
          >
            <p className="text-sm text-gray-400 mb-2">
              LEVEL 3
            </p>

            <h2 className="text-2xl font-bold mb-3">
              Quantum Gates
            </h2>

            <p className="text-gray-500 mb-6">
              Manipulate qubits using quantum gates.
            </p>

            <span className="text-gray-500 font-semibold">
              Coming soon
            </span>
          </div>

        </div>
      </div>
    </main>
  );
}