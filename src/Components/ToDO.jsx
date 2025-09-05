import React, { useMemo, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import quizLogo from '../assets/quiz.png'


const QUESTIONS = [
  {
    id: 1,
    question: "Which HTML tag is semantic?",
    options: ["<div>", "<span>", "<article>", "<b>"],
    correct: 2,
    explanation: "<article> conveys meaning about the content it wraps (a self‑contained composition).",
    category: "HTML",
  },
  {
    id: 2,
    question: "Which CSS unit scales with the root font-size?",
    options: ["px", "em", "rem", "%"],
    correct: 2,
    explanation: "rem is relative to the root (<html>) font-size, unlike em which is relative to the parent.",
    category: "CSS",
  },
  {
    id: 3,
    question: "In JavaScript, what does `===` check?",
    options: ["Value only", "Type only", "Value and type", "Reference only"],
    correct: 2,
    explanation: "Strict equality checks both value and type without coercion.",
    category: "JavaScript",
  },
  {
    id: 4,
    question: "Which HTTP method is idempotent by spec?",
    options: ["POST", "PATCH", "PUT", "DELETE"],
    correct: 2,
    explanation: "PUT is idempotent: repeating the same request yields the same result.",
    category: "HTTP",
  },
  {
    id: 5,
    question: "What does DNS translate?",
    options: ["MAC to IP", "Domain to IP", "IP to MAC", "Port to IP"],
    correct: 1,
    explanation: "DNS resolves human‑readable domain names to IP addresses.",
    category: "Networking",
  },
  {
    id: 6,
    question: "Which array method returns a new array with elements that pass a test?",
    options: ["forEach", "filter", "reduce", "some"],
    correct: 1,
    explanation: "filter creates a new array including only elements where the callback returns true.",
    category: "JavaScript",
  },
  {
    id: 7,
    question: "What does `flex: 1` roughly mean in CSS Flexbox?",
    options: ["Grow only", "Shrink only", "Grow & shrink, base 0", "No growth"],
    correct: 2,
    explanation: "flex: 1 is shorthand for flex-grow:1; flex-shrink:1; flex-basis:0%.",
    category: "CSS",
  },
  {
    id: 8,
    question: "Which HTML attribute improves image loading performance?",
    options: ["preload", "loading=\"lazy\"", "defer", "async"],
    correct: 1,
    explanation: "`loading=\"lazy\"` defers offscreen image loading until needed.",
    category: "HTML",
  },
  {
    id: 9,
    question: "Node.js uses which JavaScript runtime?",
    options: ["SpiderMonkey", "V8", "Chakra", "Nitro"],
    correct: 1,
    explanation: "Node.js is built on Google’s V8 engine.",
    category: "Node.js",
  },
  {
    id: 10,
    question: "What is the time complexity of binary search on a sorted array?",
    options: ["O(n)", "O(log n)", "O(n log n)", "O(1)"],
    correct: 1,
    explanation: "Each step halves the search space: O(log n).",
    category: "DSA",
  },
  {
    id: 11,
    question: "Which React hook is used for side effects?",
    options: ["useState", "useMemo", "useEffect", "useRef"],
    correct: 2,
    explanation: "useEffect runs after render and is used for side effects.",
    category: "React",
  },
  {
    id: 12,
    question: "What does CORS primarily control?",
    options: ["Cookie size", "Cross-origin requests", "HTTP version", "TLS version"],
    correct: 1,
    explanation: "CORS is a browser security feature that controls which origins can access a resource.",
    category: "Security",
  },
  {
    id: 13,
    question: "Which MongoDB command creates an index?",
    options: ["ensureIndex", "createIndex", "makeIndex", "addIndex"],
    correct: 1,
    explanation: "`db.collection.createIndex({...})` creates an index.",
    category: "MongoDB",
  },
  {
    id: 14,
    question: "What does HTTP status 201 mean?",
    options: ["OK", "Created", "Accepted", "No Content"],
    correct: 1,
    explanation: "201 Created indicates a new resource has been successfully created.",
    category: "HTTP",
  },
  {
    id: 15,
    question: "Which is NOT a JavaScript primitive?",
    options: ["string", "number", "object", "boolean"],
    correct: 2,
    explanation: "object is not a primitive.",
    category: "JavaScript",
  },
  {
    id: 16,
    question: "In Git, which command creates a new branch and switches to it?",
    options: ["git branch new && git checkout new", "git switch -c new", "git create new", "git start new"],
    correct: 1,
    explanation: "`git switch -c <name>` creates and switches in one step.",
    category: "Git",
  },
  {
    id: 17,
    question: "Which tag is used for table headers in HTML?",
    options: ["<th>", "<thead>", "<tr>", "<td>"],
    correct: 0,
    explanation: "<th> defines a header cell in a table.",
    category: "HTML",
  },
  {
    id: 18,
    question: "Which CSS property creates a stacking context most directly?",
    options: ["display", "position + z-index", "gap", "outline"],
    correct: 1,
    explanation: "Positioned elements with z-index create a stacking context.",
    category: "CSS",
  },
  {
    id: 19,
    question: "What does `Array.prototype.reduce` return by default if no initial value and empty array?",
    options: ["0", "undefined", "Throws error", "[]"],
    correct: 2,
    explanation: "Calling reduce on an empty array without an initial value throws a TypeError.",
    category: "JavaScript",
  },
  {
    id: 20,
    question: "Which tool bundles React apps by default (Vite project)?",
    options: ["Rollup", "Parcel", "esbuild", "Webpack"],
    correct: 2,
    explanation: "Vite uses esbuild for dev and Rollup for production, but the fast transform is powered by esbuild.",
    category: "Build Tools",
  },
  {
    id: 21,
    question: "Which of these is a REST constraint?",
    options: ["Graph traversal", "HATEOAS", "WebSockets only", "Binary payloads only"],
    correct: 1,
    explanation: "HATEOAS is one of the REST architectural constraints.",
    category: "HTTP",
  },
  {
    id: 22,
    question: "Which Node.js module handles file system operations?",
    options: ["net", "fs", "http", "url"],
    correct: 1,
    explanation: "The `fs` module provides an API for interacting with the file system.",
    category: "Node.js",
  },
  {
    id: 23,
    question: "What is the default HTTP method used by HTML forms if not specified?",
    options: ["GET", "POST", "PUT", "PATCH"],
    correct: 0,
    explanation: "The default is GET.",
    category: "HTML",
  },
  {
    id: 24,
    question: "In CSS Grid, which property defines the columns?",
    options: ["grid-template-rows", "grid-template-columns", "grid-auto-flow", "grid-gap"],
    correct: 1,
    explanation: "grid-template-columns defines column track sizes.",
    category: "CSS",
  },
  {
    id: 25,
    question: "Which statement about `let` is true?",
    options: ["Function-scoped", "Block-scoped", "Creates globals", "Hoisted and initialized"],
    correct: 1,
    explanation: "`let` is block-scoped and hoisted but not initialized (temporal dead zone).",
    category: "JavaScript",
  },
  {
    id: 26,
    question: "Which MongoDB type is best for unique identifiers?",
    options: ["Int32", "String", "ObjectId", "Binary"],
    correct: 2,
    explanation: "ObjectId is the default unique identifier type for _id.",
    category: "MongoDB",
  },
  {
    id: 27,
    question: "What does `npm run build` usually produce for React apps?",
    options: ["Dev server", "Optimized static assets", "Node server", "Database"],
    correct: 1,
    explanation: "It outputs minified static files ready to deploy.",
    category: "Build Tools",
  },
  {
    id: 28,
    question: "Which is true about `async/await` in JS?",
    options: ["Blocks the thread", "Built on Promises", "Not usable in Node", "Faster than sync code always"],
    correct: 1,
    explanation: "async/await is syntax sugar over Promises.",
    category: "JavaScript",
  },
  {
    id: 29,
    question: "Which HTTP header carries the bearer token typically?",
    options: ["X-Auth", "Authorization", "Cookie", "Auth-Token"],
    correct: 1,
    explanation: "Authorization: Bearer <token> is the common pattern.",
    category: "Security",
  },
  {
    id: 30,
    question: "What is Big-O of pushing/popping from end of JS array?",
    options: ["O(1) amortized", "O(log n)", "O(n)", "O(n log n)"],
    correct: 0,
    explanation: "Push/pop at end is amortized O(1).",
    category: "DSA",
  },
  {
    id: 31,
    question: "Which React prop passes data from parent to child?",
    options: ["state", "props", "context", "ref"],
    correct: 1,
    explanation: "Props are the parent→child data channel.",
    category: "React",
  },
  {
    id: 32,
    question: "Which CSS property makes a container a flex container?",
    options: ["flex", "flex-direction", "display: flex", "align-items"],
    correct: 2,
    explanation: "display: flex activates Flexbox layout.",
    category: "CSS",
  },
  {
    id: 33,
    question: "Which protocol is used to secure HTTP?",
    options: ["SSL/TLS", "SSH", "SFTP", "FTP"],
    correct: 0,
    explanation: "HTTPS is HTTP over TLS (formerly SSL).",
    category: "Security",
  },
  {
    id: 34,
    question: "What does `Array.isArray([])` return?",
    options: ["null", "undefined", "true", "false"],
    correct: 2,
    explanation: "It returns true for arrays.",
    category: "JavaScript",
  },
  {
    id: 35,
    question: "Which tag adds metadata to an HTML document?",
    options: ["<meta>", "<data>", "<info>", "<header>"],
    correct: 0,
    explanation: "<meta> defines metadata in the head.",
    category: "HTML",
  },
  {
    id: 36,
    question: "Which command stages all changes in Git?",
    options: ["git add .", "git push", "git commit -a", "git stage *"],
    correct: 0,
    explanation: "`git add .` stages new/modified files (not deletions unless -A).",
    category: "Git",
  },
  {
    id: 37,
    question: "Which HTTP status is commonly used for validation errors in APIs?",
    options: ["200", "301", "400", "500"],
    correct: 2,
    explanation: "400 Bad Request is typical for client validation errors.",
    category: "HTTP",
  },
  {
    id: 38,
    question: "Which method converts a JSON string to an object?",
    options: ["JSON.parse", "JSON.stringify", "Object.fromJSON", "toJSON"],
    correct: 0,
    explanation: "JSON.parse converts string → object.",
    category: "JavaScript",
  },
  {
    id: 39,
    question: "What does `npm i -D` do?",
    options: ["Installs globally", "Installs dev dependency", "Uninstalls", "Updates"],
    correct: 1,
    explanation: "Adds a package to devDependencies.",
    category: "NPM",
  },
  {
    id: 40,
    question: "What pattern is used to protect routes on the client in React?",
    options: ["HOC only", "ProtectedRoute component", "Service workers", "Reducers"],
    correct: 1,
    explanation: "A common approach is a ProtectedRoute wrapper that checks auth state.",
    category: "React",
  },
  {
    id: 41,
    question: "What does `this` reference in a regular function (non-arrow) depends on?",
    options: ["Always window", "How the function is called", "Where it’s defined", "Strict mode only"],
    correct: 1,
    explanation: "`this` is determined by the call site (bind/call/apply/obj.method).",
    category: "JavaScript",
  },
  {
    id: 42,
    question: "Which database property set does MongoDB emphasize by default?",
    options: ["ACID over all", "BASE (eventual consistency)", "No durability", "Only SQL"],
    correct: 1,
    explanation: "MongoDB leans toward BASE in distributed setups (though modern versions support transactions).",
    category: "MongoDB",
  },
  {
    id: 43,
    question: "Which header allows browsers to cache static assets effectively?",
    options: ["Cache-Control", "X-Powered-By", "Accept", "Origin"],
    correct: 0,
    explanation: "Cache-Control dictates caching policies.",
    category: "HTTP",
  },
  {
    id: 44,
    question: "Which method removes the last element of an array and returns it?",
    options: ["shift", "pop", "splice", "slice"],
    correct: 1,
    explanation: "pop removes and returns the last element.",
    category: "JavaScript",
  },
  {
    id: 45,
    question: "What is the purpose of React keys in lists?",
    options: ["Styling", "Unique identity for diffing", "Security", "Accessibility"],
    correct: 1,
    explanation: "Keys help React identify which items changed for efficient re-rendering.",
    category: "React",
  },
  {
    id: 46,
    question: "What does HTTP 204 represent?",
    options: ["No Content", "Partial Content", "Reset Content", "Moved Permanently"],
    correct: 0,
    explanation: "204 indicates success with no response body.",
    category: "HTTP",
  },
  {
    id: 47,
    question: "Which CSS feature lets you define reusable design tokens (like colors)?",
    options: ["Mixins", "CSS Variables (custom properties)", "Sass only", "@apply"],
    correct: 1,
    explanation: "CSS custom properties (e.g., --brand) are native variables.",
    category: "CSS",
  },
  {
    id: 48,
    question: "Which MongoDB operation updates or inserts if not found?",
    options: ["insertMany", "updateOne with upsert", "replaceMany", "aggregate"],
    correct: 1,
    explanation: "Use { upsert: true } with updateOne/updateMany.",
    category: "MongoDB",
  },
  {
    id: 49,
    question: "What does `event.preventDefault()` do in the browser?",
    options: ["Stops JS", "Cancels default action", "Stops propagation", "Reloads page"],
    correct: 1,
    explanation: "It cancels the default browser behavior for the event.",
    category: "JavaScript",
  },
  {
    id: 50,
    question: "Which HTTP header is used for CORS preflight response to allow methods?",
    options: ["Access-Control-Allow-Origin", "Access-Control-Allow-Methods", "Allow-Methods", "CORS-Methods"],
    correct: 1,
    explanation: "Servers return Access-Control-Allow-Methods in preflight responses.",
    category: "Security",
  },
];

function shuffle(arr) {
  return [...arr].sort(() => Math.random() - 0.5);
}

function ProgressBar({ value }) {
  return (
    <div className="w-full h-3 bg-gray-200 rounded-xl overflow-hidden">
      <div
        className="h-3 bg-gradient-to-r from-indigo-500 to-fuchsia-500" 
        style={{ width: `${value}%` }}
      />
    </div>
  );
}

function formatTime(seconds) {
  const m = Math.floor(seconds / 60)
    .toString()
    .padStart(2, "0");
  const s = (seconds % 60).toString().padStart(2, "0");
  return `${m}:${s}`;
}

export default function QuizApp() {
  const [shuffled, setShuffled] = useState(true);
  const [questions, setQuestions] = useState(() =>
    shuffled ? shuffle(QUESTIONS) : QUESTIONS
  );
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [seconds, setSeconds] = useState(0);

  // Simple timer
  useEffect(() => {
    const t = setInterval(() => setSeconds((s) => s + 1), 1000);
    return () => clearInterval(t);
  }, []);

  const current = questions[index];
  const total = questions.length;

  const score = useMemo(() => {
    return questions.reduce((acc, q) => {
      const a = answers[q.id];
      return acc + (a === q.correct ? 1 : 0);
    }, 0);
  }, [answers, questions]);

  const progress = Math.round(((Object.keys(answers).length) / total) * 100);

  function pickOption(qid, i) {
    if (submitted) return;
    setAnswers((prev) => ({ ...prev, [qid]: i }));
  }

  function next() {
    setIndex((i) => Math.min(i + 1, total - 1));
  }

  function prev() {
    setIndex((i) => Math.max(i - 1, 0));
  }

  function restart() {
    const nextQs = shuffled ? shuffle(QUESTIONS) : QUESTIONS;
    setQuestions(nextQs);
    setIndex(0);
    setAnswers({});
    setSubmitted(false);
    setSeconds(0);
  }

  function submit() {
    setSubmitted(true);
  }

  function toggleShuffle() {
    setShuffled((s) => !s);
    setQuestions((_) => (!shuffled ? shuffle(QUESTIONS) : QUESTIONS));
    setIndex(0);
    setAnswers({});
    setSubmitted(false);
  }

  const categories = useMemo(() => {
    const set = new Set(QUESTIONS.map((q) => q.category));
    return ["All", ...Array.from(set)];
  }, []);

  const [category, setCategory] = useState("All");

  useEffect(() => {
    let list = QUESTIONS;
    if (category !== "All") list = QUESTIONS.filter((q) => q.category === category);
    setQuestions(shuffled ? shuffle(list) : list);
    setIndex(0);
    setAnswers({});
    setSubmitted(false);
  }, [category]);

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-slate-50 to-slate-100 text-slate-800 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="mb-4">
             <img
      src={quizLogo}  
      alt="Quiz Logo"
      className="w-20 h-20 object-contain"
    />
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">React Quiz App</h1>
          <p className="text-sm text-slate-600">50 questions • Timer • Review • Shuffle • Category filter</p>
        </motion.div>

        <div className="flex flex-col md:flex-row md:items-center gap-3 mb-4">
          <div className="flex items-center gap-2 text-sm">
            <span className="px-2 py-1 rounded-full bg-indigo-50 border border-indigo-200">Time: {formatTime(seconds)}</span>
            <span className="px-2 py-1 rounded-full bg-emerald-50 border border-emerald-200">Score: {score}/{total}</span>
            <span className="px-2 py-1 rounded-full bg-fuchsia-50 border border-fuchsia-200">Answered: {Object.keys(answers).length}/{total}</span>
          </div>

          <div className="flex-1"><ProgressBar value={progress} /></div>

          <div className="flex items-center gap-2">
            <button
              onClick={toggleShuffle}
              className={`px-3 py-2 rounded-2xl border text-sm shadow-sm transition ${
                shuffled ? "bg-slate-900 text-white border-slate-900" : "bg-white border-slate-200"
              }`}
            >
              {shuffled ? "Shuffled" : "In Order"}
            </button>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="px-3 py-2 rounded-2xl border border-slate-200 bg-white text-sm shadow-sm"
            >
              {categories.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
            <button
              onClick={restart}
              className="px-3 py-2 rounded-2xl border border-slate-200 bg-white text-sm shadow-sm"
            >
              Restart
            </button>
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={current?.id ?? "done"}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4 md:p-6"
          >
            {!submitted && current && (
              <div>
                <div className="flex items-start justify-between gap-3 mb-4">
                  <div>
                    <div className="text-xs text-slate-500">Question {index + 1} of {total} • <span className="uppercase tracking-wide">{current.category}</span></div>
                    <h2 className="text-lg md:text-xl font-semibold mt-1">{current.question}</h2>
                  </div>
                </div>

                <div className="grid gap-2">
                  {current.options.map((opt, i) => {
                    const picked = answers[current.id] === i;
                    return (
                      <button
                        key={i}
                        onClick={() => pickOption(current.id, i)}
                        className={`text-left px-4 py-3 rounded-xl border transition shadow-sm ${
                          picked
                            ? "bg-indigo-600 text-white border-indigo-600"
                            : "bg-white hover:bg-slate-50 border-slate-200"
                        }`}
                      >
                        <span className="font-medium">{String.fromCharCode(65 + i)}.</span> {" "}
                        {opt}
                      </button>
                    );
                  })}
                </div>

                <div className="flex items-center justify-between mt-4">
                  <div className="text-sm text-slate-600">Select an option then use Next/Prev. You can also jump after submitting.</div>
                  <div className="flex items-center gap-2">
                    <button onClick={prev} className="px-3 py-2 rounded-xl border border-slate-200 bg-white text-sm">Prev</button>
                    {index < total - 1 ? (
                      <button onClick={next} className="px-3 py-2 rounded-xl bg-slate-900 text-white text-sm">Next</button>
                    ) : (
                      <button onClick={submit} className="px-3 py-2 rounded-xl bg-emerald-600 text-white text-sm">Submit</button>
                    )}
                  </div>
                </div>
              </div>
            )}

            {submitted && (
              <div>
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 mb-3">
                  <h2 className="text-xl font-semibold">Results</h2>
                  <div className="flex items-center gap-2 text-sm">
                    <span className="px-2 py-1 rounded-full bg-emerald-50 border border-emerald-200">Score: {score}/{total}</span>
                    <span className="px-2 py-1 rounded-full bg-indigo-50 border border-indigo-200">Time: {formatTime(seconds)}</span>
                    <button onClick={restart} className="px-3 py-2 rounded-xl border border-slate-200 bg-white">Try Again</button>
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-2 mb-4">
                  {questions.map((q, i) => {
                    const a = answers[q.id];
                    const correct = a === q.correct;
                    return (
                      <button
                        key={q.id}
                        onClick={() => setIndex(i)}
                        className={`px-2 py-2 rounded-lg text-sm border shadow-sm ${
                          correct
                            ? "bg-emerald-50 border-emerald-200"
                            : typeof a === "number"
                            ? "bg-rose-50 border-rose-200"
                            : "bg-slate-50 border-slate-200"
                        }`}
                        title={q.question}
                      >
                        Q{i + 1}
                      </button>
                    );
                  })}
                </div>

                {/* Review card for currently selected question */}
                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4">
                  <div className="text-xs text-slate-500">Review • <span className="uppercase">{current.category}</span></div>
                  <h3 className="text-lg font-semibold mt-1">{current.question}</h3>

                  <div className="mt-3 grid gap-2">
                    {current.options.map((opt, i) => {
                      const a = answers[current.id];
                      const correct = i === current.correct;
                      const picked = i === a;
                      return (
                        <div
                          key={i}
                          className={`px-4 py-3 rounded-xl border text-sm ${
                            correct
                              ? "bg-emerald-50 border-emerald-300"
                              : picked
                              ? "bg-rose-50 border-rose-300"
                              : "bg-white border-slate-200"
                          }`}
                        >
                          <span className="font-medium">{String.fromCharCode(65 + i)}.</span> {opt}
                        </div>
                      );
                    })}
                  </div>

                  {current.explanation && (
                    <div className="mt-3 text-sm text-slate-700">
                      <span className="font-semibold">Why:</span> {current.explanation}
                    </div>
                  )}
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        <div className="mt-4 flex items-center justify-between text-sm">
          <div className="flex items-center gap-2">
            <button onClick={() => setIndex(0)} className="px-3 py-2 rounded-xl border border-slate-200 bg-white">First</button>
            <button onClick={prev} className="px-3 py-2 rounded-xl border border-slate-200 bg-white">Prev</button>
            <button onClick={next} className="px-3 py-2 rounded-xl bg-slate-900 text-white">Next</button>
            <button onClick={() => setIndex(total - 1)} className="px-3 py-2 rounded-xl border border-slate-200 bg-white">Last</button>
          </div>
          {!submitted && (
            <button onClick={submit} className="px-3 py-2 rounded-xl bg-[#932F67] hover:bg-[#C6D870] text-white cursor-pointer">Submit Quiz</button>
          )}
        </div>

        <footer className="text-center text-xs text-slate-500 mt-6">
          Tip: Use the category filter to focus (HTML/CSS/JS/React/HTTP/MongoDB/etc.).
        </footer>
      </div>
    </div>
  );
}

// export default ToDo