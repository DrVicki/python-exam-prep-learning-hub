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
import { CompleteGuide } from "@/components/CompleteGuide";

const EDITOR_URL = "https://coddy.tech/embed?editorLang=python";
const PUBLIC_ASSET_ORIGIN = "https://pyexamhub-6uz2bmvu.manus.space";
const HERO_IMAGE = `${PUBLIC_ASSET_ORIGIN}/manus-storage/python-path-hero_6bf96d7d.png`;
const CONCEPT_IMAGE = `${PUBLIC_ASSET_ORIGIN}/manus-storage/python-path-concepts_7e5f6d03.png`;
const PRACTICE_IMAGE = `${PUBLIC_ASSET_ORIGIN}/manus-storage/python-path-practice_86e8ecfd.png`;
const LOGO_IMAGE = `${PUBLIC_ASSET_ORIGIN}/manus-storage/python-path-logo_809cf313.png`;

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
  { id: "mindset", number: "01", title: "Python mindset", eyebrow: "instructions · data · decisions", description: "Read code as a clear sequence of instructions.", icon: Braces, tint: "bg-[#e7edf0]", duration: "10 min" },
  { id: "variables", number: "02", title: "Variables, types & arithmetic", eyebrow: "store · convert · calculate", description: "Name values, work with types, and calculate correctly.", icon: Code2, tint: "bg-[#fce2dc]", duration: "16 min" },
  { id: "strings", number: "03", title: "Strings, input & output", eyebrow: "index · format · clean text", description: "Use text, input, and formatted output with confidence.", icon: List, tint: "bg-[#f7e8c9]", duration: "14 min" },
  { id: "decisions-full", number: "04", title: "Decisions", eyebrow: "if · elif · else", description: "Teach your program how to choose its next move.", icon: Lightbulb, tint: "bg-[#e5e6f6]", duration: "15 min" },
  { id: "loops-full", number: "05", title: "Loops", eyebrow: "for · while · range", description: "Repeat a pattern precisely, without repeating yourself.", icon: RotateCcw, tint: "bg-[#e1eee6]", duration: "18 min" },
  { id: "collections-full", number: "06", title: "Collections", eyebrow: "lists · dictionaries · sets", description: "Keep related data together and retrieve what matters.", icon: List, tint: "bg-[#f7e8c9]", duration: "20 min" },
  { id: "functions-full", number: "07", title: "Functions", eyebrow: "def · parameters · return", description: "Package a useful job so you can test and reuse it.", icon: Code2, tint: "bg-[#e5e6f6]", duration: "16 min" },
  { id: "debugging", number: "08", title: "Debugging", eyebrow: "syntax errors · exceptions", description: "Turn an error message into a practical clue.", icon: ClipboardCheck, tint: "bg-[#fce2dc]", duration: "14 min" },
  { id: "project", number: "09", title: "Mini-project", eyebrow: "exam score analyzer", description: "Combine the core skills in one exam-style program.", icon: Trophy, tint: "bg-[#e1eee6]", duration: "25 min" },
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
  mindset: { headline: "Read each program as a", emphasis: "clear sequence.", summary: "Python runs instructions in order unless a decision, loop, function, or error changes the path. Indentation shows which instructions belong together.", tags: ["PRINT", "STRINGS", "INDENTATION", "FLOW"], code: `print("Welcome to Python!")\nprint("One step at a time.")`, hint: "Quotation marks make text. Remove them only when you want Python to calculate an expression.", prompt: 'Why does print("3 + 4") not calculate a total?', answer: "The quotation marks make 3 + 4 a string of text rather than a mathematical expression.", companionPrompt: "What does indentation show in Python?", companionAnswer: "It shows which lines belong inside a decision, loop, or function." },
  variables: { headline: "Store a value under a", emphasis: "useful name.", summary: "Variables let you store data, retrieve it later, convert user input, and calculate a new result. The type of a value determines what Python can do with it.", tags: ["INT", "FLOAT", "STR", "BOOL"], code: `price = 18\nquantity = 3\nsubtotal = price * quantity\nprint(subtotal)`, hint: "input() always produces text. Use int() or float() before doing arithmetic with numeric input.", prompt: "What is the difference between = and ==?", answer: "= assigns or stores a value. == compares two values and produces True or False.", companionPrompt: "What type is 3.5?", companionAnswer: "A float, because it is a number with a decimal point." },
  strings: { headline: "Make text precise, readable, and", emphasis: "ready to use.", summary: "Strings are sequences of characters. Indexes begin at 0, negative indexes count back from the end, and f-strings make it easy to insert variable values into a message.", tags: ["INDEX", "F-STRING", "INPUT", "METHODS"], code: `word = "Python"\nprint(word[0])\nprint(word[-1])\nprint(len(word))`, hint: "Use f before quotation marks and wrap variable names in curly braces to create an f-string.", prompt: 'What does word[2] produce when word = "exam"?', answer: "a. The indexes are 0 → e, 1 → x, 2 → a, and 3 → m.", companionPrompt: "What does word[-1] select?", companionAnswer: "The final character in the string." },
  "decisions-full": { headline: "Let your program choose the", emphasis: "right path.", summary: "Conditions evaluate to True or False. Python tests an if / elif / else sequence from top to bottom and stops at the first true condition.", tags: ["IF", "ELIF", "ELSE", "AND"], code: `score = 84\n\nif score >= 90:\n    grade = "A"\nelif score >= 80:\n    grade = "B"\nelse:\n    grade = "Keep practicing"\n\nprint(grade)`, hint: "Order matters. Put the highest or most specific threshold first.", prompt: "Why does a score of 84 receive B?", answer: "84 is not at least 90, but it is at least 80, so the second branch runs and the remaining branch is skipped.", companionPrompt: "When is and true?", companionAnswer: "Only when both conditions connected by and are true." },
  "loops-full": { headline: "Repeat the right pattern without", emphasis: "repeating yourself.", summary: "Use for loops with a sequence or known range. Use while when a condition should keep the program running. Trace an accumulator after every loop pass.", tags: ["FOR", "WHILE", "RANGE", "TOTAL"], code: `total = 0\n\nfor number in range(1, 5):\n    total = total + number\n\nprint(total)`, hint: "range(1, 5) includes 1, 2, 3, and 4. The stop value is excluded.", prompt: "What total remains after this loop?", answer: "10. Trace the accumulator: 0 → 1 → 3 → 6 → 10.", companionPrompt: "What does continue do?", companionAnswer: "It skips the rest of the current loop pass and begins the next one." },
  "collections-full": { headline: "Keep related values in a", emphasis: "useful place.", summary: "Lists keep ordered values that can change, dictionaries connect a label to a value, tuples stay fixed, and sets hold unique values.", tags: ["LISTS", "DICTS", "INDEX", "APPEND"], code: `scores = [88, 91, 76]\nscores.append(95)\nprint(scores[0])`, hint: "The first list item is index 0. append() adds at the end; pop() removes and returns an item.", prompt: "What does scores[0] print after append(95)?", answer: "88. Adding an item at the end does not change the first item.", companionPrompt: "When is a dictionary useful?", companionAnswer: "When you want to look up a value by a meaningful label, such as student[\"score\"]." },
  "functions-full": { headline: "Bundle a useful job, then", emphasis: "use it again.", summary: "Functions make a program easier to read, test, and reuse. Parameters accept inputs, arguments provide actual values, and return sends a result back to the calling line.", tags: ["DEF", "PARAMETERS", "RETURN", "ARGUMENTS"], code: `def calculate_total(price, quantity):\n    return price * quantity\n\nbill = calculate_total(12, 4)\nprint(bill)`, hint: "return sends a value back for later use. print only displays a value.", prompt: "What value is stored in bill?", answer: "48. The function receives 12 and 4, multiplies them, and returns the result.", companionPrompt: "What is a parameter?", companionAnswer: "A placeholder inside a function definition that receives an input value." },
  debugging: { headline: "Turn an error message into a", emphasis: "useful clue.", summary: "Syntax errors prevent Python from reading the program. Exceptions occur while valid-looking code runs. Read the final traceback line to identify the error type.", tags: ["SYNTAX", "TYPE", "VALUE", "TRACEBACK"], code: `age = input("Age: ")\nprint(age + 1)\n\n# Repair\nage = int(input("Age: "))\nprint(age + 1)`, hint: "Catch the error you expect, such as ValueError, rather than using an overly broad exception handler.", prompt: "Why does age + 1 fail after input()?", answer: "input() returns a string, but 1 is an integer. Convert the input with int() before adding.", companionPrompt: "What does a SyntaxError often mean?", companionAnswer: "A colon, quote, parenthesis, or indentation is missing or misplaced." },
  project: { headline: "Combine the core skills in one", emphasis: "exam-style program.", summary: "The score analyzer uses a list, input conversion, loops, an accumulator, a function, decisions, and formatted output—the same building blocks used repeatedly on beginner exams.", tags: ["LIST", "LOOP", "FUNCTION", "AVERAGE"], code: `scores = [88, 91, 76]\ntotal = 0\nfor score in scores:\n    total = total + score\n\naverage = total / len(scores)\nprint(f"Average: \${average:.1f}")`, hint: "Plan the program as input → process → output. Then test it with ordinary and edge-case scores.", prompt: "Which expression calculates the average?", answer: "total / len(scores). It divides the accumulated total by the number of scores.", companionPrompt: "What extension should you try next?", companionAnswer: "Find and report the highest score by comparing each score to a current highest value." },
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
  const [activeLesson, setActiveLesson] = useState("mindset");

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
    window.setTimeout(() => jumpTo(`guide-${id}`), 0);
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
            <span className="flex flex-col leading-none"><span className="text-lg font-bold tracking-tight">Python <span className="font-display italic font-semibold">Path</span></span><span className="mt-1 hidden font-mono-guide text-[8px] font-semibold tracking-[0.16em] text-[#b94331] lg:block">EXAM PREP FIELD GUIDE</span></span>
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
              <span className="rounded-full bg-[#fce2dc] px-2 py-1 text-[10px] font-bold text-[#9a2f23]">{completeCount}/{lessons.length}</span>
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
                <button onClick={() => openLesson("mindset")} className="inline-flex items-center gap-2 rounded-full bg-[#f2634a] px-5 py-3 text-sm font-bold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-[#b94331] active:scale-[0.97]">Start route <ArrowRight size={17} /></button>
                <a href={EDITOR_URL} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-[#d8cdbb] bg-[#fffdf7]/80 px-5 py-3 text-sm font-bold text-[#17243a] transition hover:border-[#17243a] active:scale-[0.97]"><Play size={16} fill="currentColor" /> Practice in browser</a>
              </div>
            </div>
            <div className="relative mt-12 grid max-w-xl grid-cols-3 gap-3 sm:gap-5">
              {[['9', 'guide lessons'], ['10', 'exam questions'], ['1', 'guided project']].map(([value, label]) => <div key={label} className="border-l-2 border-[#f2634a] pl-3"><p className="font-display text-3xl font-semibold">{value}</p><p className="mt-0.5 text-xs font-semibold text-[#59616d]">{label}</p></div>)}
            </div>
          </section>

          <section id="lessons" className="scroll-mt-24 px-5 py-12 sm:px-8 lg:px-12">
            <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
              <div><p className="font-mono-guide text-[10px] font-semibold tracking-[0.14em] text-[#9a5a4d]">THE FIELD GUIDE · LINKED TO THE COMPLETE STUDY GUIDE</p><h2 className="font-display mt-2 text-4xl font-semibold tracking-[-0.035em]">Follow the path. <em>Make it yours.</em></h2><p className="mt-2 text-sm text-[#59616d]">Each route card opens its matching full lesson, practice activity, visual, and knowledge check below.</p></div>
              <div className="rounded-full border border-[#d8cdbb] bg-[#fffdf7] px-4 py-2 text-sm font-semibold text-[#59616d]"><span className="text-[#b94331]">{completeCount}</span> of {lessons.length} lessons complete</div>
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
                  <div className="mt-5 flex items-center justify-between"><button onClick={() => openLesson(lesson.id)} className="inline-flex items-center gap-1.5 text-sm font-bold text-[#17243a] underline decoration-[#17243a]/30 underline-offset-4 hover:text-[#b94331]">Open full guide <ArrowRight size={15} /></button><button onClick={() => toggleComplete(lesson.id)} className={`grid h-9 w-9 place-items-center rounded-full transition active:scale-[0.97] ${done ? "bg-[#4d7c61] text-white" : "border border-[#17243a]/20 bg-[#fffdf7]/70 text-[#17243a] hover:border-[#4d7c61] hover:text-[#4d7c61]"}`} aria-label={`Mark ${lesson.title} as ${done ? "not complete" : "complete"}`}>{done ? <Check size={17} strokeWidth={3} /> : <Circle size={16} />}</button></div>
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

          <CompleteGuide editorUrl={EDITOR_URL} />

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

      <footer className="border-t border-[#d8cdbb] bg-[#fffdf7] px-5 py-7 sm:px-8 lg:px-12"><div className="mx-auto flex max-w-[1500px] flex-col gap-3 text-sm text-[#59616d] sm:flex-row sm:items-center sm:justify-between"><p className="font-semibold text-[#17243a]">Python Path <span className="font-display italic">— make the next step visible.</span></p><div className="flex flex-col gap-1 text-left sm:text-right"><p className="font-mono-guide text-[10px] font-semibold tracking-[0.12em] text-[#b94331]">CREATED BY: DR. VICKI BEALMAN</p><p>Progress is saved in this browser.</p></div></div></footer>

    </div>
  );
}
