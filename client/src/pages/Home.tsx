/* Python Path — Field Guide to Python: an asymmetric learning map with tactile study cards and coral route cues. */
import { useEffect, useMemo, useState } from "react";
import {
  ArrowRight,
  BookOpen,
  Braces,
  Check,
  CheckCircle2,
  Circle,
  ClipboardCheck,
  Code2,
  Copy,
  Lightbulb,
  List,
  Play,
  RotateCcw,
  Sparkles,
  Terminal,
  Trophy,
} from "lucide-react";

const EDITOR_URL = "https://coddy.tech/embed?editorLang=python";
const HERO_IMAGE = "/manus-storage/python-path-hero_6bf96d7d.png";
const CONCEPT_IMAGE = "/manus-storage/python-path-concepts_7e5f6d03.png";
const PRACTICE_IMAGE = "/manus-storage/python-path-practice_86e8ecfd.png";
const LOGO_IMAGE = "/manus-storage/python-path-logo_809cf313.png";

type Lesson = {
  id: string;
  number: string;
  title: string;
  eyebrow: string;
  description: string;
  icon: typeof Braces;
  tint: string;
  duration: string;
};

const lessons: Lesson[] = [
  { id: "foundations", number: "01", title: "Foundations", eyebrow: "Print · variables · types", description: "Make Python say something useful, then give your data a name.", icon: Braces, tint: "bg-[#e7edf0]", duration: "12 min" },
  { id: "decisions", number: "02", title: "Decisions", eyebrow: "if · elif · else", description: "Teach your program how to choose its next move.", icon: Lightbulb, tint: "bg-[#fce2dc]", duration: "15 min" },
  { id: "loops", number: "03", title: "Loops", eyebrow: "for · while · range", description: "Repeat a pattern precisely, without repeating yourself.", icon: RotateCcw, tint: "bg-[#e1eee6]", duration: "18 min" },
  { id: "collections", number: "04", title: "Collections", eyebrow: "lists · dictionaries", description: "Keep related ideas together and retrieve what matters.", icon: List, tint: "bg-[#f7e8c9]", duration: "20 min" },
  { id: "functions", number: "05", title: "Functions", eyebrow: "def · return", description: "Package a useful idea so you can use it again.", icon: Code2, tint: "bg-[#e5e6f6]", duration: "16 min" },
  { id: "exam", number: "06", title: "Exam sprint", eyebrow: "trace · test · explain", description: "Combine the essentials in a focused final review.", icon: Trophy, tint: "bg-[#e1eee6]", duration: "25 min" },
];

const codeExample = `# Your first tiny Python program\nname = input("What is your name? ")\nscore = 84\n\nif score >= 70:\n    print(f"Nice work, {name}. You passed!")\nelse:\n    print(f"Keep practicing, {name}.")`;

type LessonContent = {
  headline: string;
  emphasis: string;
  summary: string;
  tags: string[];
  code: string;
  hint: string;
  prompt: string;
  answer: string;
  companionPrompt: string;
  companionAnswer: string;
};

const lessonContent: Record<string, LessonContent> = {
  foundations: {
    headline: "Start with data that has a",
    emphasis: "clear name.",
    summary: "Variables let you store a value, retrieve it later, and change it when the program needs to respond. Think of each one as a labeled container on your study desk.",
    tags: ["STRINGS", "INTEGERS", "BOOLEANS", "INPUT"],
    code: codeExample,
    hint: "Inputs arrive as text. Convert them with int() before doing number math.",
    prompt: 'What will print: print("3 + 4") ?',
    answer: "It prints the text 3 + 4, not 7. Quotation marks tell Python to treat those characters as a string.",
    companionPrompt: "When would you write int(input()) instead of input()?",
    companionAnswer: "Use int(input()) when you need a whole number for arithmetic or a numeric comparison. Plain input() always returns text.",
  },
  decisions: {
    headline: "Let your program choose a",
    emphasis: "useful path.",
    summary: "Conditions evaluate to True or False. Python checks an if / elif / else ladder from top to bottom and takes the first path whose condition is true.",
    tags: ["IF", "ELIF", "ELSE", "COMPARISONS"],
    code: `score = 84\n\nif score >= 90:\n    grade = "A"\nelif score >= 80:\n    grade = "B"\nelse:\n    grade = "Keep practicing"\n\nprint(grade)`,
    hint: "Order matters: place the most specific or highest threshold first.",
    prompt: "Why does a score of 84 print B in this program?",
    answer: "84 is not at least 90, so Python checks the next condition. It is at least 80, so grade becomes B and the remaining branch is skipped.",
    companionPrompt: "What is the difference between = and ==?",
    companionAnswer: "Use = to assign a value to a variable. Use == to compare two values and produce True or False.",
  },
  loops: {
    headline: "Repeat a pattern without",
    emphasis: "repeating yourself.",
    summary: "A for loop moves through a sequence or range one item at a time. An accumulator gives you a reliable way to add, count, or build a result as the loop runs.",
    tags: ["FOR", "RANGE", "WHILE", "ACCUMULATOR"],
    code: `total = 0\n\nfor number in range(1, 5):\n    total = total + number\n\nprint(total)`,
    hint: "range(1, 5) includes 1, 2, 3, and 4. The final stop value is not included.",
    prompt: "What value does total hold at the end of this loop?",
    answer: "10. Follow the accumulator: 0 → 1 → 3 → 6 → 10.",
    companionPrompt: "When should you use a while loop?",
    companionAnswer: "Use while when you want to repeat as long as a condition remains true and the number of repetitions is not known in advance.",
  },
  collections: {
    headline: "Keep related values in one",
    emphasis: "useful place.",
    summary: "Lists hold ordered values that can change. Dictionaries connect a meaningful key to a value. Choose the collection that matches the relationship in the problem.",
    tags: ["LISTS", "INDEXING", "DICTIONARIES", "APPEND"],
    code: `scores = [88, 91, 76]\nscores.append(95)\n\nprint(scores[0])\nprint(len(scores))`,
    hint: "List indexes start at 0, so scores[0] selects the first score.",
    prompt: "What is printed by scores[0] after this code runs?",
    answer: "88. append(95) changes the list at the end, but the item at index 0 remains the first value, 88.",
    companionPrompt: "When is a dictionary more useful than a list?",
    companionAnswer: "Use a dictionary when you want to retrieve a value by a label, such as student[\"score\"], rather than by a numeric position.",
  },
  functions: {
    headline: "Bundle a useful job, then",
    emphasis: "use it again.",
    summary: "Functions help you name a task, pass in the information it needs, and return a result. They make longer exam programs easier to read and test.",
    tags: ["DEF", "PARAMETERS", "RETURN", "ARGUMENTS"],
    code: `def calculate_total(price, quantity):\n    total = price * quantity\n    return total\n\nbill = calculate_total(12, 4)\nprint(bill)`,
    hint: "print displays a value. return sends a value back to the line that called the function.",
    prompt: "What value is stored in bill?",
    answer: "48. The call calculate_total(12, 4) runs the function with price = 12 and quantity = 4, then returns 12 × 4.",
    companionPrompt: "What is the difference between a parameter and an argument?",
    companionAnswer: "A parameter is the placeholder in a function definition, such as price. An argument is the actual value supplied when calling it, such as 12.",
  },
  exam: {
    headline: "Turn a prompt into a calm,",
    emphasis: "correct solution.",
    summary: "Use the same exam routine for every program: identify the input, write the process, check the output, and test a normal case plus an edge case before you submit.",
    tags: ["TRACE", "TEST", "DEBUG", "EXPLAIN"],
    code: `number = int(input("Whole number: "))\n\nif number % 2 == 0:\n    print("Even")\nelse:\n    print("Odd")`,
    hint: "The % operator gives the remainder. A remainder of 0 means the number divides evenly by 2.",
    prompt: "Why does the condition use number % 2 == 0?",
    answer: "It checks whether division by 2 leaves a remainder. Even numbers leave no remainder, so the result is 0.",
    companionPrompt: "What should you check before submitting code?",
    companionAnswer: "Check variable spelling, colons, indentation, quotation marks, and at least one normal and edge-case test.",
  },
};

function RouteButton({ lesson, complete, onClick }: { lesson: Lesson; complete: boolean; onClick: () => void }) {
  const Icon = lesson.icon;
  return (
    <button onClick={onClick} className="group flex w-full items-start gap-3 rounded-2xl px-3 py-3 text-left transition hover:bg-[#f4eedf] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#f2634a]">
      <span className={`mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-full border ${complete ? "border-[#4d7c61] bg-[#4d7c61] text-white" : "border-[#cfc3ae] bg-[#fffdf7] text-[#17243a]"}`}>
        {complete ? <Check size={15} strokeWidth={3} /> : <span className="font-mono-guide text-[10px] font-semibold">{lesson.number}</span>}
      </span>
      <span className="min-w-0">
        <span className="block text-sm font-bold tracking-tight text-[#17243a] group-hover:text-[#b94331]">{lesson.title}</span>
        <span className="mt-0.5 block text-xs leading-4 text-[#6c6b67]">{lesson.eyebrow}</span>
      </span>
      <Icon className="ml-auto mt-1 hidden text-[#f2634a] lg:block" size={16} />
    </button>
  );
}

function SpecimenTag({ children }: { children: React.ReactNode }) {
  return <span className="font-mono-guide inline-flex items-center rounded-full border border-[#d4c9b7] bg-[#fffdf7]/80 px-2.5 py-1 text-[10px] font-semibold tracking-[0.12em] text-[#58616e]">{children}</span>;
}

function Checkpoint({ prompt, answer }: { prompt: string; answer: string }) {
  const [revealed, setRevealed] = useState(false);
  return (
    <div className="rounded-2xl border border-[#d8cdbb] bg-[#fffdf7] p-5">
      <div className="flex items-start gap-3">
        <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-[#fce2dc] text-[#b94331]"><ClipboardCheck size={16} /></span>
        <div>
          <p className="font-mono-guide text-[10px] font-semibold tracking-[0.12em] text-[#9a5a4d]">KNOWLEDGE CHECK</p>
          <p className="mt-1 text-sm font-semibold leading-5 text-[#17243a]">{prompt}</p>
          <button onClick={() => setRevealed(!revealed)} className="mt-3 inline-flex items-center gap-1.5 text-xs font-bold text-[#b94331] underline decoration-[#f2634a]/40 underline-offset-4 transition hover:text-[#17243a]">
            {revealed ? "Hide explanation" : "Reveal explanation"} <ArrowRight size={13} />
          </button>
          {revealed && <p className="mt-3 rounded-xl bg-[#f4eedf] px-3 py-3 text-sm leading-5 text-[#48515b]">{answer}</p>}
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  const [completed, setCompleted] = useState<Record<string, boolean>>({});
  const [copied, setCopied] = useState(false);
  const [activeLesson, setActiveLesson] = useState("foundations");

  useEffect(() => {
    const saved = window.localStorage.getItem("python-path-progress");
    if (saved) setCompleted(JSON.parse(saved));
  }, []);

  useEffect(() => {
    window.localStorage.setItem("python-path-progress", JSON.stringify(completed));
  }, [completed]);

  const completeCount = useMemo(() => lessons.filter((lesson) => completed[lesson.id]).length, [completed]);
  const progress = Math.round((completeCount / lessons.length) * 100);
  const activeMeta = lessons.find((lesson) => lesson.id === activeLesson) ?? lessons[0];
  const currentLesson = lessonContent[activeLesson];

  const jumpTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  const openLesson = (id: string) => {
    setActiveLesson(id);
    window.setTimeout(() => jumpTo(id === "exam" ? "review" : "focus"), 0);
  };
  const toggleComplete = (id: string) => setCompleted((current) => ({ ...current, [id]: !current[id] }));
  const copyCode = async () => {
    await navigator.clipboard.writeText(currentLesson.code);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  };

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#f4eedf] text-[#17243a]">
      <header className="sticky top-0 z-40 border-b border-[#d8cdbb]/80 bg-[#f4eedf]/95 backdrop-blur">
        <div className="mx-auto flex max-w-[1500px] items-center justify-between gap-4 px-5 py-3 lg:px-8">
          <a href="#top" className="flex items-center gap-3" aria-label="Python Path home">
            <img src={LOGO_IMAGE} alt="Python Path" className="h-10 w-10 object-contain" />
            <span className="text-lg font-bold tracking-tight">Python <span className="font-display italic font-semibold">Path</span></span>
          </a>
          <div className="hidden items-center gap-6 md:flex">
            <a href="#lessons" className="text-sm font-semibold text-[#58616e] transition hover:text-[#b94331]">Lessons</a>
            <a href="#review" className="text-sm font-semibold text-[#58616e] transition hover:text-[#b94331]">Exam review</a>
            <a href={EDITOR_URL} target="_blank" rel="noreferrer" className="rounded-full bg-[#17243a] px-4 py-2 text-sm font-bold text-[#fffdf7] shadow-sm transition hover:-translate-y-0.5 hover:bg-[#b94331] active:scale-[0.97]">Open code editor</a>
          </div>
          <a href={EDITOR_URL} target="_blank" rel="noreferrer" className="grid h-10 w-10 place-items-center rounded-full bg-[#17243a] text-white md:hidden" aria-label="Open code editor"><Terminal size={18} /></a>
        </div>
      </header>

      <main id="top" className="mx-auto grid max-w-[1500px] gap-0 lg:grid-cols-[278px_minmax(0,1fr)]">
        <aside className="relative hidden border-r border-[#d8cdbb] bg-[#fffdf7]/70 lg:block">
          <div className="sticky top-[68px] h-[calc(100vh-68px)] overflow-auto px-5 py-8">
            <div className="mb-7 flex items-center justify-between">
              <p className="font-mono-guide text-[10px] font-semibold tracking-[0.15em] text-[#78808a]">YOUR ROUTE</p>
              <span className="rounded-full bg-[#fce2dc] px-2 py-1 text-[10px] font-bold text-[#9a2f23]">{completeCount}/6</span>
            </div>
            <div className="relative">
              <div className="route-pulse absolute bottom-5 left-[26px] top-5 border-l-2 border-dashed border-[#f2634a]/50" />
              <div className="relative space-y-1">
                {lessons.map((lesson) => <RouteButton key={lesson.id} lesson={lesson} complete={Boolean(completed[lesson.id])} onClick={() => openLesson(lesson.id)} />)}
              </div>
            </div>
            <div className="mt-9 rounded-2xl bg-[#17243a] p-4 text-[#fffdf7] paper-shadow">
              <p className="font-mono-guide text-[10px] tracking-[0.12em] text-[#b7c7d5]">STUDY COMPASS</p>
              <p className="mt-2 text-sm font-semibold leading-5">Small, finished lessons beat long, unfocused sessions.</p>
              <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-white/20"><div className="h-full rounded-full bg-[#f2634a] transition-all duration-300" style={{ width: `${progress}%` }} /></div>
              <p className="mt-2 text-xs text-[#d9e4ec]">{progress}% of the route marked complete</p>
            </div>
          </div>
        </aside>

        <div>
          <section className="relative overflow-hidden border-b border-[#d8cdbb] bg-[#fffdf7] px-5 py-12 sm:px-8 lg:px-12 lg:py-16">
            <div className="absolute inset-0 opacity-95"><img src={HERO_IMAGE} alt="Study desk with Python workbook and learning route" className="h-full w-full object-cover object-right" /><div className="absolute inset-0 bg-gradient-to-r from-[#fffdf7] via-[#fffdf7]/92 to-[#fffdf7]/15" /></div>
            <div className="relative max-w-2xl float-in">
              <div className="flex flex-wrap gap-2"><SpecimenTag>PYTHON BEGINNER</SpecimenTag><SpecimenTag>EXAM FOCUS</SpecimenTag></div>
              <h1 className="font-display mt-6 text-balance text-5xl font-semibold leading-[0.95] tracking-[-0.045em] text-[#17243a] sm:text-6xl lg:text-7xl">Turn Python concepts into <em className="text-[#b94331]">exam instincts.</em></h1>
              <p className="mt-6 max-w-xl text-lg leading-7 text-[#4f5966]">A hands-on study map for building confidence with variables, decisions, loops, collections, functions, and code tracing.</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <button onClick={() => openLesson("foundations")} className="inline-flex items-center gap-2 rounded-full bg-[#f2634a] px-5 py-3 text-sm font-bold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-[#b94331] active:scale-[0.97]">Start route <ArrowRight size={17} /></button>
                <a href={EDITOR_URL} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-[#d8cdbb] bg-[#fffdf7]/80 px-5 py-3 text-sm font-bold text-[#17243a] transition hover:border-[#17243a] active:scale-[0.97]"><Play size={16} fill="currentColor" /> Practice in browser</a>
              </div>
            </div>
            <div className="relative mt-12 grid max-w-xl grid-cols-3 gap-3 sm:gap-5">
              {[['6', 'core modules'], ['4', 'exam drills'], ['1', 'guided project']].map(([value, label]) => <div key={label} className="border-l-2 border-[#f2634a] pl-3"><p className="font-display text-3xl font-semibold">{value}</p><p className="mt-0.5 text-xs font-semibold text-[#59616d]">{label}</p></div>)}
            </div>
          </section>

          <section id="lessons" className="scroll-mt-24 px-5 py-12 sm:px-8 lg:px-12">
            <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
              <div><p className="font-mono-guide text-[10px] font-semibold tracking-[0.14em] text-[#9a5a4d]">THE FIELD GUIDE</p><h2 className="font-display mt-2 text-4xl font-semibold tracking-[-0.035em]">Follow the path. <em>Make it yours.</em></h2></div>
              <div className="rounded-full border border-[#d8cdbb] bg-[#fffdf7] px-4 py-2 text-sm font-semibold text-[#59616d]"><span className="text-[#b94331]">{completeCount}</span> of 6 lessons complete</div>
            </div>

            <div className="mt-9 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {lessons.map((lesson, index) => {
                const Icon = lesson.icon;
                const done = Boolean(completed[lesson.id]);
                return <article id={lesson.id} key={lesson.id} className={`scroll-mt-24 ${lesson.tint} group relative min-h-[260px] overflow-hidden rounded-[1.5rem] border border-[#d8cdbb] p-6 paper-shadow transition duration-200 hover:-translate-y-1 hover:shadow-[0_20px_50px_rgba(42,41,32,0.14)]`}>
                  <div className="flex items-start justify-between"><span className="font-mono-guide text-xs font-semibold tracking-[0.12em] text-[#58616e]">{lesson.number}</span><span className="font-mono-guide rounded-full border border-[#17243a]/15 bg-[#fffdf7]/70 px-2 py-1 text-[10px] font-semibold text-[#58616e]">{lesson.duration}</span></div>
                  <Icon className="mt-8 text-[#17243a]" size={31} strokeWidth={1.65} />
                  <p className="font-mono-guide mt-5 text-[10px] font-semibold tracking-[0.12em] text-[#9a5a4d]">{lesson.eyebrow.toUpperCase()}</p>
                  <h3 className="font-display mt-1 text-3xl font-semibold tracking-[-0.04em]">{lesson.title}</h3>
                  <p className="mt-2 max-w-[30ch] text-sm leading-5 text-[#4f5966]">{lesson.description}</p>
                  <div className="mt-5 flex items-center justify-between"><button onClick={() => openLesson(lesson.id)} className="inline-flex items-center gap-1.5 text-sm font-bold text-[#17243a] underline decoration-[#17243a]/30 underline-offset-4 hover:text-[#b94331]">Explore <ArrowRight size={15} /></button><button onClick={() => toggleComplete(lesson.id)} className={`grid h-9 w-9 place-items-center rounded-full transition active:scale-[0.97] ${done ? "bg-[#4d7c61] text-white" : "border border-[#17243a]/20 bg-[#fffdf7]/70 text-[#17243a] hover:border-[#4d7c61] hover:text-[#4d7c61]"}`} aria-label={`Mark ${lesson.title} as ${done ? "not complete" : "complete"}`}>{done ? <Check size={17} strokeWidth={3} /> : <Circle size={16} />}</button></div>
                </article>;
              })}
            </div>
          </section>

          <section id="focus" className="scroll-mt-24 border-y border-[#d8cdbb] bg-[#fffdf7] px-5 py-12 sm:px-8 lg:px-12">
            <div className="grid gap-9 xl:grid-cols-[0.92fr_1.08fr] xl:items-center">
              <div>
                <div className="flex flex-wrap gap-2"><SpecimenTag>{activeMeta.number} — {activeMeta.title.toUpperCase()}</SpecimenTag><SpecimenTag>{activeMeta.duration.toUpperCase()}</SpecimenTag></div>
                <h2 className="font-display mt-5 text-balance text-4xl font-semibold leading-[1.02] tracking-[-0.035em]">{currentLesson.headline} <em className="text-[#b94331]">{currentLesson.emphasis}</em></h2>
                <p className="mt-5 max-w-xl text-base leading-7 text-[#4f5966]">{currentLesson.summary}</p>
                <div className="mt-6 flex flex-wrap gap-2">{currentLesson.tags.map((tag) => <SpecimenTag key={tag}>{tag}</SpecimenTag>)}</div>
                <div className="mt-7 flex flex-wrap gap-3"><a href={EDITOR_URL} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full bg-[#17243a] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#b94331] active:scale-[0.97]">Try in the editor <Terminal size={16} /></a><button onClick={() => toggleComplete(activeLesson)} className="inline-flex items-center gap-2 rounded-full border border-[#d8cdbb] bg-[#fffdf7] px-5 py-3 text-sm font-bold text-[#17243a] transition hover:border-[#4d7c61] active:scale-[0.97]">{completed[activeLesson] ? <CheckCircle2 size={16} className="text-[#4d7c61]" /> : <Circle size={16} />} {completed[activeLesson] ? "Marked complete" : "Mark complete"}</button></div>
              </div>
              <div className="relative overflow-hidden rounded-[1.5rem] bg-[#17243a] paper-shadow">
                <div className="flex items-center justify-between border-b border-white/10 px-5 py-3"><div className="flex gap-1.5"><span className="h-2.5 w-2.5 rounded-full bg-[#f2634a]"/><span className="h-2.5 w-2.5 rounded-full bg-[#d7ad55]"/><span className="h-2.5 w-2.5 rounded-full bg-[#4d7c61]"/></div><span className="font-mono-guide text-[10px] tracking-[0.13em] text-[#b7c7d5]">FIRST_PROGRAM.PY</span><button onClick={copyCode} className="inline-flex items-center gap-1.5 rounded-lg bg-white/10 px-2.5 py-1.5 text-xs font-semibold text-white transition hover:bg-white/20">{copied ? <Check size={13} /> : <Copy size={13} />}{copied ? "Copied" : "Copy"}</button></div>
                <pre className="overflow-x-auto p-6 font-mono-guide text-sm leading-7 text-[#edf3f7]"><code>{currentLesson.code}</code></pre>
                <div className="border-t border-white/10 bg-[#121c2d] px-6 py-3 font-mono-guide text-xs text-[#9fceaa]">✓ Hint: {currentLesson.hint}</div>
              </div>
            </div>
            <div className="mt-7 grid gap-4 md:grid-cols-2"><Checkpoint prompt={currentLesson.prompt} answer={currentLesson.answer} /><Checkpoint prompt={currentLesson.companionPrompt} answer={currentLesson.companionAnswer} /></div>
          </section>

          <section className="grid gap-0 border-b border-[#d8cdbb] bg-[#f4eedf] xl:grid-cols-[0.92fr_1.08fr]">
            <div className="p-5 sm:p-8 lg:p-12"><img src={CONCEPT_IMAGE} alt="Illustrated Python concepts field guide" className="h-full min-h-[340px] w-full rounded-[1.5rem] object-cover paper-shadow" /></div>
            <div className="flex flex-col justify-center px-5 py-10 sm:px-8 lg:px-12"><p className="font-mono-guide text-[10px] font-semibold tracking-[0.14em] text-[#9a5a4d]">EXAM PATTERN LIBRARY</p><h2 className="font-display mt-3 text-balance text-4xl font-semibold tracking-[-0.035em]">Five ideas, used <em>again and again.</em></h2><p className="mt-5 max-w-lg text-base leading-7 text-[#4f5966]">Beginner Python questions may look different on the surface, but most ask you to trace data, make a decision, repeat a pattern, manage a collection, or return a result.</p><div className="mt-7 grid gap-3 sm:grid-cols-2">{[["Variable", "Store a value under a clear name."], ["Decision", "Choose a path with a true/false condition."], ["Loop", "Repeat a known or conditional action."], ["List", "Keep ordered values together."], ["Function", "Bundle a reusable job." ]].map(([term, description]) => <div key={term} className="rounded-2xl border border-[#d8cdbb] bg-[#fffdf7]/75 px-4 py-3"><p className="font-mono-guide text-xs font-semibold text-[#b94331]">{term.toUpperCase()}</p><p className="mt-1 text-sm leading-5 text-[#59616d]">{description}</p></div>)}</div></div>
          </section>

          <section id="review" className="scroll-mt-24 bg-[#17243a] px-5 py-12 text-[#fffdf7] sm:px-8 lg:px-12">
            <div className="grid gap-10 xl:grid-cols-[1fr_0.9fr] xl:items-center">
              <div><div className="flex flex-wrap gap-2"><span className="font-mono-guide rounded-full border border-white/20 px-2.5 py-1 text-[10px] font-semibold tracking-[0.12em] text-[#c8d8e4]">06 — EXAM SPRINT</span><span className="font-mono-guide rounded-full bg-[#f2634a] px-2.5 py-1 text-[10px] font-semibold tracking-[0.12em] text-white">25 MIN</span></div><h2 className="font-display mt-6 text-balance text-5xl font-semibold leading-[0.96] tracking-[-0.04em]">Read. Trace. Test. <em className="text-[#f6b5a8]">Explain.</em></h2><p className="mt-5 max-w-xl text-lg leading-7 text-[#c8d8e4]">The strongest exam answers rarely start with typing. First identify the input, the process, and the output. Then trace changing values on paper before you run the code.</p><div className="mt-8 grid gap-3 sm:grid-cols-2">{[["Trace", "Write down each new value as the program runs."], ["Translate", "Turn a word problem into input → process → output."], ["Test", "Try one normal case and one edge case."], ["Explain", "Name the Python idea your code uses." ]].map(([title, desc], index) => <div key={title} className="rounded-2xl border border-white/15 bg-white/5 p-4"><span className="font-mono-guide text-xs text-[#f6b5a8]">0{index + 1}</span><p className="mt-2 font-bold">{title}</p><p className="mt-1 text-sm leading-5 text-[#c8d8e4]">{desc}</p></div>)}</div></div>
              <div className="rounded-[1.5rem] bg-[#fffdf7] p-5 text-[#17243a] paper-shadow sm:p-6"><div className="flex items-center justify-between"><div><p className="font-mono-guide text-[10px] font-semibold tracking-[0.14em] text-[#9a5a4d]">FINAL DRILL</p><h3 className="font-display mt-1 text-3xl font-semibold">Even or odd?</h3></div><span className="grid h-11 w-11 place-items-center rounded-full bg-[#fce2dc] text-[#b94331]"><Sparkles size={20} /></span></div><p className="mt-5 text-sm leading-6 text-[#59616d]">Ask the user for a whole number. Print <strong>Even</strong> if it divides by 2 with no remainder; otherwise print <strong>Odd</strong>.</p><pre className="mt-5 overflow-x-auto rounded-2xl bg-[#f4eedf] p-4 font-mono-guide text-xs leading-6 text-[#17243a]"><code>{`number = int(input("Whole number: "))\n\nif number % 2 == 0:\n    print("Even")\nelse:\n    print("Odd")`}</code></pre><div className="mt-5 flex flex-wrap gap-3"><a href={EDITOR_URL} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full bg-[#f2634a] px-4 py-2.5 text-sm font-bold text-white transition hover:bg-[#b94331] active:scale-[0.97]">Run this drill <Play size={15} fill="currentColor" /></a><button onClick={() => toggleComplete("exam")} className="inline-flex items-center gap-2 rounded-full border border-[#d8cdbb] px-4 py-2.5 text-sm font-bold text-[#17243a] transition hover:border-[#4d7c61] active:scale-[0.97]">{completed.exam ? <Check size={15} className="text-[#4d7c61]" /> : <Circle size={15} />} Complete sprint</button></div></div>
            </div>
          </section>

          <section className="relative overflow-hidden bg-[#e7edf0] px-5 py-10 sm:px-8 lg:px-12"><img src={PRACTICE_IMAGE} alt="Laptop and practice materials for Python coding" className="absolute inset-0 h-full w-full object-cover opacity-40 mix-blend-multiply"/><div className="relative flex flex-col gap-6 md:flex-row md:items-center md:justify-between"><div className="max-w-xl"><p className="font-mono-guide text-[10px] font-semibold tracking-[0.14em] text-[#496d89]">PRACTICE LAB</p><h2 className="font-display mt-2 text-4xl font-semibold tracking-[-0.035em]">Open the editor. Make one idea <em>real.</em></h2><p className="mt-3 text-base leading-6 text-[#4f5966]">The browser-based Python editor opens in a dedicated tab, so your code has the full screen and focus it deserves.</p></div><a href={EDITOR_URL} target="_blank" rel="noreferrer" className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-[#17243a] px-5 py-3 text-sm font-bold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-[#b94331] active:scale-[0.97]">Open browser editor <ArrowRight size={17} /></a></div></section>
        </div>
      </main>

      <footer className="border-t border-[#d8cdbb] bg-[#fffdf7] px-5 py-7 sm:px-8 lg:px-12"><div className="mx-auto flex max-w-[1500px] flex-col gap-3 text-sm text-[#59616d] sm:flex-row sm:items-center sm:justify-between"><p className="font-semibold text-[#17243a]">Python Path <span className="font-display italic">— make the next step visible.</span></p><p>Progress is saved in this browser.</p></div></footer>

    </div>
  );
}
