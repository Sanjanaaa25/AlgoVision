import { useState } from "react";
import axios from "axios";

function App() {
  const [problem, setProblem] = useState("");

  const [result, setResult] = useState<any>(null);

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  const analyzeProblem = async () => {
    if (!problem.trim()) {
      setError("Please enter a DSA problem");
      return;
    }

    setLoading(true);
    setError("");
    setResult(null);

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/analyze",
        {
          text: problem,
        }
      );

      console.log(response.data);

      setResult(response.data);
    } catch (err) {
      console.log(err);
      setError("Backend or AI error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center px-6 py-10">

      {/* HEADER */}
      <div className="text-center">
        <h1 className="text-7xl font-extrabold bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
          AlgoVision
        </h1>

        <p className="text-zinc-400 mt-4 text-xl">
          AI-Powered DSA Problem Analyzer
        </p>
      </div>

      {/* INPUT */}
      <div className="w-full max-w-5xl mt-10">
        <textarea
          value={problem}
          onChange={(e) => setProblem(e.target.value)}
          placeholder="Paste your DSA problem here..."
          className="
            w-full
            h-72
            bg-zinc-900
            border
            border-zinc-700
            rounded-3xl
            p-6
            text-lg
            outline-none
            focus:border-blue-500
            resize-none
          "
        />
      </div>

      {/* BUTTON */}
      <button
        onClick={analyzeProblem}
        className="
          mt-8
          bg-gradient-to-r
          from-blue-500
          to-cyan-400
          hover:scale-105
          transition-all
          duration-300
          px-10
          py-4
          rounded-2xl
          text-xl
          font-bold
        "
      >
        {loading ? "Analyzing..." : "Analyze Problem"}
      </button>

      {/* ERROR */}
      {error && (
        <div className="mt-6 text-red-400 text-lg">
          {error}
        </div>
      )}

      {/* LOADING */}
      {loading && (
        <div className="mt-10 flex flex-col items-center">

          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-400"></div>

          <p className="mt-4 text-zinc-400 text-lg">
            AI is analyzing the problem...
          </p>

        </div>
      )}

      {/* RESULT */}
      {result && (
        <div className="
          w-full
          max-w-5xl
          mt-10
          bg-zinc-900
          border
          border-zinc-700
          rounded-3xl
          p-8
        ">

          <h2 className="text-4xl font-bold text-blue-400 mb-8">
            AI Analysis
          </h2>

          <div className="grid gap-6">

            <div>
              <h3 className="text-cyan-400 text-xl font-bold">
                Pattern
              </h3>

              <p className="text-zinc-300 mt-2">
                {result.pattern}
              </p>
            </div>

            <div>
              <h3 className="text-cyan-400 text-xl font-bold">
                Difficulty
              </h3>

              <p className="text-zinc-300 mt-2">
                {result.difficulty}
              </p>
            </div>

            <div>
              <h3 className="text-cyan-400 text-xl font-bold">
                Core Idea
              </h3>

              <p className="text-zinc-300 mt-2">
                {result.coreIdea}
              </p>
            </div>

            <div>
              <h3 className="text-cyan-400 text-xl font-bold">
                Hints
              </h3>

              <ul className="list-disc ml-6 mt-2 text-zinc-300 space-y-2">
                <li>{result.hint1}</li>
                <li>{result.hint2}</li>
                <li>{result.hint3}</li>
              </ul>
            </div>

            <div className="flex gap-16">

              <div>
                <h3 className="text-cyan-400 text-xl font-bold">
                  Time Complexity
                </h3>

                <p className="text-zinc-300 mt-2">
                  {result.timeComplexity}
                </p>
              </div>

              <div>
                <h3 className="text-cyan-400 text-xl font-bold">
                  Space Complexity
                </h3>

                <p className="text-zinc-300 mt-2">
                  {result.spaceComplexity}
                </p>
              </div>

            </div>

            <div>
              <h3 className="text-cyan-400 text-xl font-bold mb-3">
                Pseudocode
              </h3>

              <pre className="
                bg-black
                p-5
                rounded-xl
                overflow-auto
                text-green-400
                whitespace-pre-wrap
              ">
                {result.pseudocode}
              </pre>
            </div>

          </div>

        </div>
      )}

    </div>
  );
}

export default App;