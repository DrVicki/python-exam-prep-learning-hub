/* Python Path — Field Guide to Python: full lesson library with tactile study cards, practical code, and coral route cues. */
import { useState } from "react";
import type { LucideIcon } from "lucide-react";
import {
  ArrowRight,
  BookOpen,
  Braces,
  Bug,
  Calculator,
  Check,
  ChevronDown,
  ClipboardCheck,
  Code2,
  Copy,
  Lightbulb,
  List,
  Play,
  RotateCcw,
  Terminal,
  Trophy,
} from "lucide-react";

const visuals = {
  programCycle: "https://pyexamhub-6uz2bmvu.manus.space/manus-storage/python_program_cycle_cd6fa4c7.png",
  stringIndexing: "https://pyexamhub-6uz2bmvu.manus.space/manus-storage/string_indexing_19fa596d.png",
  decisionFlow: "https://pyexamhub-6uz2bmvu.manus.space/manus-storage/decision_flow_34c44253.png",
  loopTrace: "https://pyexamhub-6uz2bmvu.manus.space/manus-storage/for_loop_trace_74b6198c.png",
  functionFlow: "https://pyexamhub-6uz2bmvu.manus.space/manus-storage/function_data_flow_24d9c7ba.png",
  examFlow: "https://pyexamhub-6uz2bmvu.manus.space/manus-storage/exam_problem_solving_338a813b.png",
};

type Example = { title: string; code: string; result?: string };
type Row = { term: string; detail: string; example: string };
type GuideLesson = {
  id: string;
  number: string;
  title: string;
  skill: string;
  overview: string;
  icon: LucideIcon;
  tint: string;
  visual?: { src: string; alt: string; caption: string };
  examples: Example[];
  rows?: Row[];
  activity: string;
  activityHint: string;
  question: string;
  answer: string;
};

const guideLessons: GuideLesson[] = [
  {
    id: "mindset",
    number: "01",
    title: "Python mindset",
    skill: "Instructions · data · decisions",
    overview: "A program is a precise sequence of instructions. Python usually runs from top to bottom; decisions, loops, functions, and errors change that flow. Indentation shows which instructions belong together, so it is part of the meaning of a Python program.",
    icon: Braces,
    tint: "bg-[#e7edf0]",
    visual: { src: visuals.programCycle, alt: "Python program thinking cycle showing input, process, decision, output, and improvement", caption: "A useful first model: input enters, Python processes it, a condition may choose a path, and the program produces output." },
    examples: [
      { title: "Your first statements", code: `print("Welcome to Python!")\nprint("One step at a time.")`, result: "Welcome to Python!\nOne step at a time." },
      { title: "Text versus arithmetic", code: `print("3 + 4")\nprint(3 + 4)`, result: "3 + 4\n7" },
    ],
    activity: "Change the second welcome message so it names one thing you hope to build with Python. Then add a third print statement.",
    activityHint: "Quotation marks make text. Remove them only when you want Python to calculate an expression.",
    question: "Why does the first line print 3 + 4 while the second prints 7?",
    answer: "The first expression is a string because it sits inside quotation marks. The second is a numeric expression, so Python evaluates the addition.",
  },
  {
    id: "variables",
    number: "02",
    title: "Variables, types & arithmetic",
    skill: "Store · convert · calculate",
    overview: "A variable is a named label for a value. Use = to store a value and == to ask whether two values are equal. Choose a type that fits the information: whole number, decimal, text, or a true/false value.",
    icon: Calculator,
    tint: "bg-[#fce2dc]",
    examples: [
      { title: "Four common types", code: `student_name = "Amina"\nscore = 92\nhours_studied = 3.5\nis_ready = True\n\nprint(student_name)\nprint(score)` },
      { title: "Arithmetic operators", code: `price = 18\nquantity = 3\nsubtotal = price * quantity\nsplit_bill = subtotal / 2\nremainder = 17 % 5\npower = 2 ** 4\n\nprint(subtotal)\nprint(split_bill)\nprint(remainder)\nprint(power)`, result: "54\n27.0\n2\n16" },
      { title: "Convert user input", code: `age_text = input("How old are you? ")\nage = int(age_text)\nnext_year = age + 1\nprint(f"Next year you will be \${next_year}.")` },
    ],
    rows: [
      { term: "int", detail: "A whole number", example: "92" },
      { term: "float", detail: "A number with a decimal", example: "3.5" },
      { term: "str", detail: "Text inside quotes", example: "\"Amina\"" },
      { term: "bool", detail: "A true/false value", example: "True" },
      { term: "%", detail: "The remainder after division", example: "17 % 5 → 2" },
    ],
    activity: "Create variables named price and quantity. Calculate subtotal, then ask the user for their age and print their age next year.",
    activityHint: "input() always creates text. Use int() before adding or comparing a whole-number answer.",
    question: "What does points contain after points = 14; points = points + 3?",
    answer: "17. Python calculates the right side first, then stores the new result in points.",
  },
  {
    id: "strings",
    number: "03",
    title: "Strings, input & output",
    skill: "Index · format · clean text",
    overview: "Strings are ordered sequences of characters. Python starts indexing at 0, so the first character is position 0. A negative index counts backward from the end; -1 is the last character.",
    icon: BookOpen,
    tint: "bg-[#f7e8c9]",
    visual: { src: visuals.stringIndexing, alt: "String indexing visual for the word Python", caption: "The word Python has six characters. Its first index is 0 and its final index is 5, while -1 also selects the final character." },
    examples: [
      { title: "Index a string", code: `word = "Python"\nprint(word[0])\nprint(word[5])\nprint(word[-1])\nprint(len(word))`, result: "P\nn\nn\n6" },
      { title: "Build a personalized message", code: `first_name = input("First name: ")\nfavorite_food = input("Favorite food: ")\nmessage = f"\${first_name} recommends \${favorite_food}."\nprint(message)` },
    ],
    rows: [
      { term: ".upper()", detail: "Makes text uppercase", example: "\"python\".upper() → PYTHON" },
      { term: ".lower()", detail: "Makes text lowercase", example: "\"Python\".lower() → python" },
      { term: ".strip()", detail: "Removes extra edge spaces", example: "\"  hi  \".strip() → hi" },
      { term: ".replace()", detail: "Replaces matching text", example: "\"cat\".replace(\"c\", \"h\") → hat" },
    ],
    activity: "Ask for a learner’s first name and favorite food. Print one clear sentence using an f-string, then try turning the name into uppercase.",
    activityHint: "Use curly braces around the variable name inside an f-string, such as f\"Hello, {name}!\".",
    question: "What value does letter contain after word = \"exam\" and letter = word[2]?",
    answer: "a. The indexes are 0 → e, 1 → x, 2 → a, and 3 → m.",
  },
  {
    id: "decisions-full",
    number: "04",
    title: "Decisions",
    skill: "if · elif · else",
    overview: "A condition evaluates to True or False. Python checks an if / elif / else sequence from top to bottom and stops at the first true condition. This makes order especially important when you are checking score ranges.",
    icon: Lightbulb,
    tint: "bg-[#e5e6f6]",
    visual: { src: visuals.decisionFlow, alt: "Grade decision flow with if and elif branches", caption: "This flow shows how Python tests a grade threshold in order and takes one output path." },
    examples: [
      { title: "Choose a letter grade", code: `score = 84\n\nif score >= 90:\n    grade = "A"\nelif score >= 80:\n    grade = "B"\nelif score >= 70:\n    grade = "C"\nelse:\n    grade = "Needs improvement"\n\nprint(grade)`, result: "B" },
      { title: "Eligibility checker", code: `age = int(input("Age: "))\nhas_ticket = input("Do you have a ticket? (yes/no) ").lower()\n\nif age >= 13 and has_ticket == "yes":\n    print("You may enter.")\nelse:\n    print("You need to be at least 13 and have a ticket.")` },
    ],
    rows: [
      { term: "==", detail: "Equal to", example: "5 == 5" },
      { term: "!=", detail: "Not equal to", example: "5 != 3" },
      { term: ">=", detail: "Greater than or equal to", example: "8 >= 8" },
      { term: "and", detail: "Both conditions must be true", example: "age >= 16 and has_id" },
      { term: "or", detail: "At least one condition is true", example: "day == \"Sat\" or day == \"Sun\"" },
    ],
    activity: "Build the eligibility checker, then change its age rule and test a user who has a ticket but is too young.",
    activityHint: "Use .lower() on a yes/no answer so YES, Yes, and yes can all be checked consistently.",
    question: "What prints when temperature = 60 and the program asks if temperature > 70?",
    answer: "Cool. The comparison 60 > 70 is false, so Python runs the else block.",
  },
  {
    id: "loops-full",
    number: "05",
    title: "Loops",
    skill: "for · while · range",
    overview: "A loop repeats code. Use for when you are moving through a sequence or a known range, and while when repetition should continue while a condition remains true. The accumulator pattern is an essential exam skill for totals and counts.",
    icon: RotateCcw,
    tint: "bg-[#e1eee6]",
    visual: { src: visuals.loopTrace, alt: "For-loop trace showing total grow from 0 to 10", caption: "An accumulator changes after each loop pass. Trace every value rather than guessing at the final total." },
    examples: [
      { title: "A simple range", code: `for number in range(1, 6):\n    print(number)`, result: "1\n2\n3\n4\n5" },
      { title: "Accumulator pattern", code: `total = 0\n\nfor number in range(1, 5):\n    total = total + number\n\nprint(total)`, result: "10" },
      { title: "while, break, and continue", code: `attempts = 3\nwhile attempts > 0:\n    print(f"Attempts remaining: \${attempts}")\n    attempts = attempts - 1\n\nfor number in range(1, 8):\n    if number == 4:\n        continue\n    if number == 7:\n        break\n    print(number)` },
    ],
    rows: [
      { term: "range(3)", detail: "Creates three values", example: "0, 1, 2" },
      { term: "break", detail: "Exits the nearest loop", example: "Stop when found" },
      { term: "continue", detail: "Skips to the next pass", example: "Skip 4" },
      { term: "accumulator", detail: "A changing running total", example: "total = total + number" },
    ],
    activity: "Write a for loop that adds the numbers 1 through 5. Then change it to count only even numbers.",
    activityHint: "range(1, 6) includes 1 through 5 because the stop number is excluded.",
    question: "How many times does for count in range(3): print(\"Go\") print Go?",
    answer: "Three times. range(3) creates 0, 1, and 2.",
  },
  {
    id: "collections-full",
    number: "06",
    title: "Collections",
    skill: "Lists · dictionaries · sets",
    overview: "Collections let one variable hold related values. Lists are ordered and changeable, tuples are ordered but fixed, sets hold unique values, and dictionaries connect a key to a value.",
    icon: List,
    tint: "bg-[#f7e8c9]",
    examples: [
      { title: "Add and select list items", code: `scores = [88, 91, 76]\nscores.append(95)\nprint(scores)\nprint(scores[0])`, result: "[88, 91, 76, 95]\n88" },
      { title: "Remove a completed task", code: `tasks = ["study", "practice", "review"]\ncompleted_task = tasks.pop()\nprint(completed_task)\nprint(tasks)` },
      { title: "Look up a labeled value", code: `student = {\n    "name": "Jordan",\n    "score": 88,\n    "passed": True\n}\n\nprint(student["name"])\nstudent["score"] = 93` },
    ],
    rows: [
      { term: "List []", detail: "Ordered values that can change", example: "Duplicates allowed" },
      { term: "Tuple ()", detail: "Ordered values that do not change", example: "Immutable" },
      { term: "Set {}", detail: "Unique values", example: "No duplicates" },
      { term: "Dictionary {key: value}", detail: "Label-to-value mapping", example: "student[\"score\"]" },
    ],
    activity: "Create a list of three study tasks. Append one new task, remove the completed task with pop(), and print the updated list.",
    activityHint: "The first item in a list is index 0. append() adds at the end; pop() removes and returns an item.",
    question: "After colors = [\"red\", \"blue\"] and colors.append(\"green\"), what does colors[1] print?",
    answer: "blue. The list becomes [red, blue, green], and index 1 is the second item.",
  },
  {
    id: "functions-full",
    number: "07",
    title: "Functions",
    skill: "def · parameters · return",
    overview: "A function groups a task under a meaningful name. Parameters are input placeholders inside the function, arguments are the actual values you provide, and return sends a result back to the caller.",
    icon: Code2,
    tint: "bg-[#e5e6f6]",
    visual: { src: visuals.functionFlow, alt: "Function data flow from arguments to return value", caption: "Arguments enter a function, its process creates a result, return sends that result back to the calling line." },
    examples: [
      { title: "Return a calculated value", code: `def calculate_total(price, quantity):\n    total = price * quantity\n    return total\n\nbill = calculate_total(12, 4)\nprint(bill)`, result: "48" },
      { title: "Return a true/false decision", code: `def is_passing(score):\n    return score >= 70\n\nresult = is_passing(72)\nprint(result)`, result: "True" },
    ],
    rows: [
      { term: "Function name", detail: "The label you call", example: "calculate_total" },
      { term: "Parameter", detail: "Input placeholder", example: "price, quantity" },
      { term: "Argument", detail: "Actual input value", example: "12, 4" },
      { term: "Return value", detail: "Result sent back", example: "48" },
    ],
    activity: "Write a square function that accepts one number and returns its square. Call it with at least two different arguments.",
    activityHint: "return sends a value back for later use. print only displays something on the screen.",
    question: "What value is stored in answer after answer = add_two(5), when add_two returns number + 2?",
    answer: "7. The argument 5 becomes the parameter number, then the function returns 5 + 2.",
  },
  {
    id: "debugging",
    number: "08",
    title: "Debugging",
    skill: "Syntax errors · exceptions",
    overview: "A syntax error means Python cannot understand a program’s structure. An exception occurs when Python can understand the code but something goes wrong while it runs. Read the final traceback line first: it names the error type and tells you what happened.",
    icon: Bug,
    tint: "bg-[#fce2dc]",
    examples: [
      { title: "Repair a type error", code: `# Problem: input gives text\nage = input("Age: ")\nprint(age + 1)\n\n# Repair: convert the input\nage = int(input("Age: "))\nprint(age + 1)` },
      { title: "Handle invalid input", code: `try:\n    score = int(input("Enter score: "))\n    print(f"You entered \${score}.")\nexcept ValueError:\n    print("Please enter a whole number.")` },
    ],
    rows: [
      { term: "SyntaxError", detail: "A missing colon, quote, parenthesis, or indent", example: "Read this line and the one before it" },
      { term: "NameError", detail: "A name is not defined or misspelled", example: "Check spelling and capitalization" },
      { term: "TypeError", detail: "Incompatible kinds of values", example: "\"2\" + 2" },
      { term: "ValueError", detail: "A value cannot be used as requested", example: "int(\"hello\")" },
      { term: "IndexError", detail: "A list/string position does not exist", example: "Check length and index" },
    ],
    activity: "Run the age TypeError, read the error message, then repair it with int(). Next, test the try/except example with a word instead of a number.",
    activityHint: "Catch the error you expect, such as ValueError, rather than using a broad catch-all.",
    question: "Why does age + 1 fail when age came directly from input()?",
    answer: "input() returns a string, while 1 is an integer. Python does not add those two different types together without conversion.",
  },
  {
    id: "project",
    number: "09",
    title: "Mini-project",
    skill: "Exam score analyzer",
    overview: "This project combines input, conversion, a list, loops, a decision, and a function. Before you run it, read the code in small blocks and predict what each block contributes to the final output.",
    icon: Trophy,
    tint: "bg-[#e1eee6]",
    examples: [
      { title: "Exam score analyzer", code: `def letter_grade(average):\n    if average >= 90:\n        return "A"\n    elif average >= 80:\n        return "B"\n    elif average >= 70:\n        return "C"\n    else:\n        return "Needs improvement"\n\nscores = []\nfor number in range(3):\n    score = float(input(f"Enter score \${number + 1}: "))\n    scores.append(score)\n\ntotal = 0\nfor score in scores:\n    total = total + score\n\naverage = total / len(scores)\ngrade = letter_grade(average)\nprint(f"Scores: \${scores}")\nprint(f"Average: \${average:.1f}")\nprint(f"Letter grade: \${grade}")` },
    ],
    rows: [
      { term: "scores = []", detail: "Creates a place to collect answers", example: "Empty list" },
      { term: "First for loop", detail: "Collects the three scores", example: "Input + append" },
      { term: "Second for loop", detail: "Builds a total", example: "Accumulator" },
      { term: "len(scores)", detail: "Counts items", example: "Number of scores" },
      { term: "letter_grade()", detail: "Turns an average into a grade", example: "Function + decisions" },
    ],
    activity: "Extend the score analyzer so it reports the highest score. Start with highest = scores[0], then compare each later score to highest in a loop.",
    activityHint: "Use the analyzer as a map of prior skills: list, loop, accumulator, function, decision, and formatted output.",
    question: "Which line calculates the average in the score analyzer?",
    answer: "average = total / len(scores). It divides the accumulated total by the number of collected scores.",
  },
];

const practiceExam = [
  { number: "1", part: "Predict the output", code: `number = 4\nnumber = number * 2\nprint(number + 1)`, answer: "9. number becomes 8, then Python adds 1." },
  { number: "2", part: "Predict the output", code: `for value in range(2, 5):\n    print(value)`, answer: "2, 3, 4. The stop value 5 is excluded." },
  { number: "3", part: "Predict the output", code: `items = ["pen", "book", "bag"]\nprint(items[-1])`, answer: "bag. The index -1 selects the final item." },
  { number: "4", part: "Predict the output", code: `score = 70\nif score > 70:\n    print("Passing")\nelse:\n    print("Check again")`, answer: "Check again. 70 > 70 is false; use >= if 70 should pass." },
  { number: "5", part: "Find and fix the error", code: `if age >= 18\n    print("Adult")`, answer: "Add a colon after 18: if age >= 18:" },
  { number: "6", part: "Find and fix the error", code: `name = input("Name: ")\nprint("Hello " + name + 1)`, answer: "Remove + 1 or convert that number to text. A string cannot be concatenated with an integer." },
  { number: "7", part: "Write a short program", prompt: "Ask for a whole number. Print Even if it is divisible by 2; otherwise print Odd.", answer: `number = int(input("Whole number: "))\n\nif number % 2 == 0:\n    print("Even")\nelse:\n    print("Odd")` },
  { number: "8", part: "Write a short program", prompt: "Given temperatures = [72, 68, 75, 70], write a loop that finds and prints the total.", answer: `temperatures = [72, 68, 75, 70]\ntotal = 0\n\nfor temperature in temperatures:\n    total = total + temperature\n\nprint(total)` },
  { number: "9", part: "Write a short program", prompt: "Write a function called square that accepts one number and returns its square.", answer: `def square(number):\n    return number ** 2` },
  { number: "10", part: "Write a short program", prompt: "Ask for three quiz scores, calculate their average, and print Ready for exam when the average is at least 75; otherwise print Keep practicing.", answer: `total = 0\n\nfor number in range(3):\n    score = float(input(f"Quiz score \${number + 1}: "))\n    total = total + score\n\naverage = total / 3\n\nif average >= 75:\n    print("Ready for exam")\nelse:\n    print("Keep practicing")` },
];

function Specimen({ children }: { children: React.ReactNode }) {
  return <span className="font-mono-guide inline-flex rounded-full border border-[#d8cdbb] bg-[#fffdf7] px-2.5 py-1 text-[10px] font-semibold tracking-[0.12em] text-[#58616e]">{children}</span>;
}

function CopyCode({ code, label }: { code: string; label: string }) {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1400);
  };
  return <button onClick={copy} className="inline-flex items-center gap-1.5 rounded-lg bg-white/10 px-2.5 py-1.5 text-xs font-semibold text-white transition hover:bg-white/20" aria-label={`Copy ${label}`}>{copied ? <Check size={13} /> : <Copy size={13} />}{copied ? "Copied" : "Copy"}</button>;
}

function CodePanel({ example }: { example: Example }) {
  return <div className="overflow-hidden rounded-2xl border border-[#253653] bg-[#17243a] paper-shadow"><div className="flex items-center justify-between border-b border-white/10 px-4 py-2.5"><span className="font-mono-guide text-[10px] font-semibold tracking-[0.12em] text-[#b7c7d5]">{example.title.toUpperCase()}</span><CopyCode code={example.code} label={example.title} /></div><pre className="overflow-x-auto p-4 font-mono-guide text-xs leading-6 text-[#f3f6f9]"><code>{example.code}</code></pre>{example.result && <div className="border-t border-white/10 bg-[#121c2d] px-4 py-2.5 font-mono-guide text-xs text-[#9fceaa]"><span className="mr-2 text-[#f6cd69]">OUTPUT →</span>{example.result}</div>}</div>;
}

function LessonCard({ lesson, active, onSelect }: { lesson: GuideLesson; active: boolean; onSelect: () => void }) {
  const Icon = lesson.icon;
  return <button onClick={onSelect} className={`group min-w-[188px] rounded-2xl border border-l-4 border-l-[#f2634a] p-4 text-left transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#f2634a] ${active ? "border-[#f2634a] bg-[#fffdf7] shadow-[0_10px_20px_rgba(42,41,32,0.10)]" : "border-[#d8cdbb] bg-[#fffdf7]/60 hover:-translate-y-0.5 hover:bg-[#fffdf7]"}`}><div className="flex items-center justify-between"><span className="font-mono-guide text-[10px] font-semibold tracking-[0.12em] text-[#b94331]">{lesson.number}</span><Icon size={17} className="text-[#17243a]" /></div><p className="font-display mt-4 text-xl font-semibold tracking-[-0.03em] text-[#17243a]">{lesson.title}</p><p className="font-mono-guide mt-1 text-[9px] font-semibold tracking-[0.1em] text-[#6f7780]">{lesson.skill.toUpperCase()}</p></button>;
}

function GuideLessonModule({ lesson, editorUrl }: { lesson: GuideLesson; editorUrl: string }) {
  const [answerVisible, setAnswerVisible] = useState(false);
  const Icon = lesson.icon;
  return <article id={`guide-${lesson.id}`} className="scroll-mt-24 overflow-hidden rounded-[1.5rem] border border-l-4 border-[#d8cdbb] border-l-[#f2634a] bg-[#fffdf7] paper-shadow">
    <div className="grid gap-0 xl:grid-cols-[0.82fr_1.18fr]">
      <div className="p-6 sm:p-8"><div className="flex items-start justify-between gap-4"><div><div className="flex flex-wrap gap-2"><Specimen>{lesson.number} — GUIDE LESSON</Specimen><Specimen>{lesson.skill}</Specimen></div><h3 className="font-display mt-6 text-4xl font-semibold leading-[0.98] tracking-[-0.04em] text-[#17243a]">{lesson.title}</h3></div><span className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-[#17243a]/10 bg-[#fffdf7]/70 text-[#b94331]"><Icon size={21} /></span></div><p className="mt-5 text-base leading-7 text-[#4f5966]">{lesson.overview}</p>{lesson.rows && <div className="mt-7 overflow-hidden rounded-2xl border border-[#17243a]/10 bg-[#fffdf7]/65"><div className="grid grid-cols-[0.8fr_1.3fr_1.1fr] gap-2 border-b border-[#d8cdbb] px-4 py-2.5 font-mono-guide text-[9px] font-semibold tracking-[0.12em] text-[#66707b]"><span>TERM</span><span>MEANING</span><span>EXAMPLE</span></div>{lesson.rows.map((row) => <div key={row.term} className="grid grid-cols-[0.8fr_1.3fr_1.1fr] gap-2 border-b border-[#d8cdbb]/70 px-4 py-3 text-xs leading-4 last:border-b-0"><strong className="font-mono-guide text-[#b94331]">{row.term}</strong><span className="text-[#4f5966]">{row.detail}</span><code className="font-mono-guide break-words text-[#59616d]">{row.example}</code></div>)}</div>}</div>
      <div className="border-t border-[#d8cdbb] bg-[#fffdf7]/60 p-5 sm:p-7 xl:border-l xl:border-t-0"><div className="grid gap-4">{lesson.examples.map((example) => <CodePanel key={example.title} example={example} />)}</div></div>
    </div>
    {lesson.visual && <figure className="border-t border-[#d8cdbb] bg-[#fffdf7] px-5 py-7 sm:px-8"><img src={lesson.visual.src} alt={lesson.visual.alt} className="mx-auto max-h-[520px] w-full rounded-2xl border border-[#d8cdbb] bg-white object-contain p-2"/><figcaption className="mx-auto mt-3 max-w-3xl text-center text-sm leading-6 text-[#59616d]">{lesson.visual.caption}</figcaption></figure>}
    <div className="grid gap-0 border-t border-[#d8cdbb] bg-[#fffdf7] lg:grid-cols-2"><div className="p-6 sm:p-8"><div className="flex items-start gap-3"><span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[#fce2dc] text-[#b94331]"><Play size={16} fill="currentColor" /></span><div><p className="font-mono-guide text-[10px] font-semibold tracking-[0.14em] text-[#9a5a4d]">RUN IT YOURSELF</p><h4 className="font-display mt-1 text-2xl font-semibold tracking-[-0.03em]">Practice activity</h4><p className="mt-3 text-sm leading-6 text-[#4f5966]">{lesson.activity}</p><div className="mt-4 rounded-xl bg-[#f4eedf] px-3 py-3 text-sm leading-5 text-[#59616d]"><strong className="text-[#17243a]">Helpful hint: </strong>{lesson.activityHint}</div><a href={editorUrl} target="_blank" rel="noreferrer" className="mt-5 inline-flex items-center gap-2 rounded-full bg-[#17243a] px-4 py-2.5 text-sm font-bold text-white transition hover:bg-[#b94331] active:scale-[0.97]">Practice in browser <ArrowRight size={15} /></a></div></div></div><div className="border-t border-[#d8cdbb] bg-[#f4eedf] p-6 sm:p-8 lg:border-l lg:border-t-0"><div className="flex items-start gap-3"><span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[#e1eee6] text-[#276143]"><ClipboardCheck size={16} /></span><div><p className="font-mono-guide text-[10px] font-semibold tracking-[0.14em] text-[#3a7052]">KNOWLEDGE CHECK</p><h4 className="mt-2 text-base font-bold leading-6 text-[#17243a]">{lesson.question}</h4><button onClick={() => setAnswerVisible(!answerVisible)} className="mt-4 inline-flex items-center gap-1.5 text-sm font-bold text-[#b94331] underline decoration-[#f2634a]/40 underline-offset-4">{answerVisible ? "Hide explanation" : "Reveal explanation"}<ChevronDown className={`transition ${answerVisible ? "rotate-180" : ""}`} size={15} /></button>{answerVisible && <p className="mt-4 rounded-xl border border-[#d8cdbb] bg-[#fffdf7] px-4 py-3 text-sm leading-6 text-[#4f5966]">{lesson.answer}</p>}</div></div></div></div>
  </article>;
}

export function CompleteGuide({ editorUrl }: { editorUrl: string }) {
  const [activeId, setActiveId] = useState("mindset");
  const [answerVisible, setAnswerVisible] = useState(false);
  const [examAnswers, setExamAnswers] = useState(false);
  const active = guideLessons.find((lesson) => lesson.id === activeId) ?? guideLessons[0];
  const Icon = active.icon;

  return <section id="complete-guide" className="scroll-mt-24 border-y border-[#d8cdbb] bg-[#f4eedf] px-5 py-12 sm:px-8 lg:px-12">
    <div className="flex flex-col gap-5 border-l-4 border-[#f2634a] pl-5 xl:flex-row xl:items-end xl:justify-between"><div className="max-w-2xl"><p className="font-mono-guide text-[10px] font-semibold tracking-[0.14em] text-[#9a5a4d]">THE COMPLETE EXAM-PREP GUIDE</p><h2 className="font-display mt-3 text-balance text-4xl font-semibold tracking-[-0.04em] text-[#17243a] sm:text-5xl">Every lesson. Every visual. <em className="text-[#b94331]">One clear route.</em></h2><p className="mt-4 text-base leading-7 text-[#4f5966]">Trace the idea, test the code, explain the result. Work through all nine guide lessons with complete explanations, visual models, practice activities, and knowledge checks.</p></div><a href={editorUrl} target="_blank" rel="noreferrer" className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-[#17243a] px-5 py-3 text-sm font-bold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-[#b94331] active:scale-[0.97]">Open Python code editor <Terminal size={16} /></a></div>

    <div className="-mx-1 mt-8 flex gap-3 overflow-x-auto px-1 pb-3">{guideLessons.map((lesson) => <LessonCard key={lesson.id} lesson={lesson} active={active.id === lesson.id} onSelect={() => { setActiveId(lesson.id); setAnswerVisible(false); }} />)}</div>

    <article id="guide-mindset" className="scroll-mt-24 mt-5 overflow-hidden rounded-[1.5rem] border border-l-4 border-[#d8cdbb] border-l-[#f2634a] bg-[#fffdf7] paper-shadow">
      <div className="grid gap-0 xl:grid-cols-[0.82fr_1.18fr]">
        <div className="p-6 sm:p-8"><div className="flex items-start justify-between gap-4"><div><div className="flex flex-wrap gap-2"><Specimen>{active.number} — GUIDE LESSON</Specimen><Specimen>{active.skill}</Specimen></div><h3 className="font-display mt-6 text-4xl font-semibold leading-[0.98] tracking-[-0.04em] text-[#17243a]">{active.title}</h3></div><span className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-[#17243a]/10 bg-[#fffdf7]/70 text-[#b94331]"><Icon size={21} /></span></div><p className="mt-5 text-base leading-7 text-[#4f5966]">{active.overview}</p>{active.rows && <div className="mt-7 overflow-hidden rounded-2xl border border-[#17243a]/10 bg-[#fffdf7]/65"><div className="grid grid-cols-[0.8fr_1.3fr_1.1fr] gap-2 border-b border-[#d8cdbb] px-4 py-2.5 font-mono-guide text-[9px] font-semibold tracking-[0.12em] text-[#66707b]"><span>TERM</span><span>MEANING</span><span>EXAMPLE</span></div>{active.rows.map((row) => <div key={row.term} className="grid grid-cols-[0.8fr_1.3fr_1.1fr] gap-2 border-b border-[#d8cdbb]/70 px-4 py-3 text-xs leading-4 last:border-b-0"><strong className="font-mono-guide text-[#b94331]">{row.term}</strong><span className="text-[#4f5966]">{row.detail}</span><code className="font-mono-guide break-words text-[#59616d]">{row.example}</code></div>)}</div>}</div>
        <div className="border-t border-[#d8cdbb] bg-[#fffdf7]/60 p-5 sm:p-7 xl:border-l xl:border-t-0"><div className="grid gap-4">{active.examples.map((example) => <CodePanel key={example.title} example={example} />)}</div></div>
      </div>
      {active.visual && <figure className="border-t border-[#d8cdbb] bg-[#fffdf7] px-5 py-7 sm:px-8"><img src={active.visual.src} alt={active.visual.alt} className="mx-auto max-h-[520px] w-full rounded-2xl border border-[#d8cdbb] bg-white object-contain p-2"/><figcaption className="mx-auto mt-3 max-w-3xl text-center text-sm leading-6 text-[#59616d]">{active.visual.caption}</figcaption></figure>}
      <div className="grid gap-0 border-t border-[#d8cdbb] bg-[#fffdf7] lg:grid-cols-2"><div className="p-6 sm:p-8"><div className="flex items-start gap-3"><span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[#fce2dc] text-[#b94331]"><Play size={16} fill="currentColor" /></span><div><p className="font-mono-guide text-[10px] font-semibold tracking-[0.14em] text-[#9a5a4d]">RUN IT YOURSELF</p><h4 className="font-display mt-1 text-2xl font-semibold tracking-[-0.03em]">Practice activity</h4><p className="mt-3 text-sm leading-6 text-[#4f5966]">{active.activity}</p><div className="mt-4 rounded-xl bg-[#f4eedf] px-3 py-3 text-sm leading-5 text-[#59616d]"><strong className="text-[#17243a]">Helpful hint: </strong>{active.activityHint}</div><a href={editorUrl} target="_blank" rel="noreferrer" className="mt-5 inline-flex items-center gap-2 rounded-full bg-[#17243a] px-4 py-2.5 text-sm font-bold text-white transition hover:bg-[#b94331] active:scale-[0.97]">Practice in browser <ArrowRight size={15} /></a></div></div></div><div className="border-t border-[#d8cdbb] bg-[#f4eedf] p-6 sm:p-8 lg:border-l lg:border-t-0"><div className="flex items-start gap-3"><span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[#e1eee6] text-[#276143]"><ClipboardCheck size={16} /></span><div><p className="font-mono-guide text-[10px] font-semibold tracking-[0.14em] text-[#3a7052]">KNOWLEDGE CHECK</p><h4 className="mt-2 text-base font-bold leading-6 text-[#17243a]">{active.question}</h4><button onClick={() => setAnswerVisible(!answerVisible)} className="mt-4 inline-flex items-center gap-1.5 text-sm font-bold text-[#b94331] underline decoration-[#f2634a]/40 underline-offset-4">{answerVisible ? "Hide explanation" : "Reveal explanation"}<ChevronDown className={`transition ${answerVisible ? "rotate-180" : ""}`} size={15} /></button>{answerVisible && <p className="mt-4 rounded-xl border border-[#d8cdbb] bg-[#fffdf7] px-4 py-3 text-sm leading-6 text-[#4f5966]">{active.answer}</p>}</div></div></div></div>
    </article>

    <div className="mt-6 space-y-6"><div className="flex items-start gap-4 rounded-2xl border border-[#d8cdbb] border-l-4 border-l-[#f2634a] bg-[#17243a] px-5 py-5 text-sm leading-6 text-[#d7e2ea]"><span className="font-mono-guide mt-0.5 rounded-full bg-[#f2634a] px-2 py-1 text-[10px] font-semibold tracking-[0.12em] text-white">PATH 02–09</span><p><strong className="text-white">Continue the guide below.</strong> Every remaining lesson is fully expanded with its explanation, code, practice activity, knowledge check, and any matching visualization. Your goal in each stop: <em className="text-[#f6b5a8]">trace it, test it, explain it.</em></p></div>{guideLessons.slice(1).map((lesson) => <GuideLessonModule key={lesson.id} lesson={lesson} editorUrl={editorUrl} />)}</div>

    <section id="exam-strategy" className="mt-10 overflow-hidden rounded-[1.5rem] bg-[#17243a] p-6 text-[#fffdf7] paper-shadow sm:p-8"><div className="grid gap-8 xl:grid-cols-[0.86fr_1.14fr] xl:items-center"><div><div className="flex flex-wrap gap-2"><span className="font-mono-guide rounded-full border border-white/20 px-2.5 py-1 text-[10px] font-semibold tracking-[0.12em] text-[#c8d8e4]">EXAM STRATEGY</span><span className="font-mono-guide rounded-full bg-[#f2634a] px-2.5 py-1 text-[10px] font-semibold tracking-[0.12em] text-white">TRACE · TRANSLATE · TEST</span></div><h3 className="font-display mt-5 text-4xl font-semibold leading-[0.98] tracking-[-0.04em]">Read. Trace. Test. <em className="text-[#f6b5a8]">Explain.</em></h3><p className="mt-4 text-base leading-7 text-[#c8d8e4]">When you predict output, trace the values line by line instead of guessing. When you write a program, translate the prompt into input, process, and output. Then test an ordinary case and an edge case.</p><div className="mt-6 grid grid-cols-2 gap-3">{[["01", "Trace", "Record each changing value."], ["02", "Translate", "Plan input → process → output."], ["03", "Test", "Try a normal and edge case."], ["04", "Explain", "Name the Python idea used."]].map(([number, title, desc]) => <div key={title} className="rounded-xl border border-white/15 bg-white/5 p-3"><span className="font-mono-guide text-xs text-[#f6b5a8]">{number}</span><p className="mt-2 font-bold">{title}</p><p className="mt-1 text-xs leading-5 text-[#c8d8e4]">{desc}</p></div>)}</div></div><figure className="rounded-2xl bg-white p-2"><img src={visuals.examFlow} alt="Exam problem solving process from reading prompt to submitting solution" className="w-full rounded-xl object-contain"/><figcaption className="px-3 py-3 text-center text-sm leading-5 text-[#59616d]">A dependable route: identify input, process, and output; code in small steps; then test and inspect results.</figcaption></figure></div></section>

    <section id="practice-exam" className="mt-10 rounded-[1.5rem] border border-[#d8cdbb] bg-[#fffdf7] p-6 paper-shadow sm:p-8"><div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between"><div><p className="font-mono-guide text-[10px] font-semibold tracking-[0.14em] text-[#9a5a4d]">FINAL PRACTICE EXAM</p><h3 className="font-display mt-2 text-4xl font-semibold tracking-[-0.04em]">Show what you know.</h3><p className="mt-3 max-w-2xl text-sm leading-6 text-[#59616d]">Work independently first. Use the code editor to test only after you have made your best prediction or solution. Then reveal the answer key and explain every correction in your own words.</p></div><button onClick={() => setExamAnswers(!examAnswers)} className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full border border-[#d8cdbb] bg-[#f4eedf] px-4 py-2.5 text-sm font-bold text-[#17243a] transition hover:border-[#17243a] active:scale-[0.97]">{examAnswers ? "Hide answer key" : "Reveal answer key"}<ChevronDown className={`transition ${examAnswers ? "rotate-180" : ""}`} size={16} /></button></div><div className="mt-7 grid gap-4 lg:grid-cols-2">{practiceExam.map((item) => <article key={item.number} className="rounded-2xl border border-[#d8cdbb] bg-[#fffdf7] p-5"><div className="flex items-center justify-between"><span className="font-mono-guide text-[10px] font-semibold tracking-[0.12em] text-[#b94331]">QUESTION {item.number}</span><span className="rounded-full bg-[#f4eedf] px-2.5 py-1 text-[10px] font-semibold text-[#59616d]">{item.part}</span></div>{item.code ? <pre className="mt-4 overflow-x-auto rounded-xl bg-[#17243a] p-4 font-mono-guide text-xs leading-6 text-[#f3f6f9]"><code>{item.code}</code></pre> : <p className="mt-4 text-sm leading-6 text-[#4f5966]">{item.prompt}</p>}{examAnswers && <div className="mt-4 rounded-xl border border-[#cde2d4] bg-[#edf7f0] p-4"><p className="font-mono-guide text-[10px] font-semibold tracking-[0.12em] text-[#3a7052]">ANSWER</p><pre className="mt-2 whitespace-pre-wrap font-mono-guide text-xs leading-6 text-[#29523a]"><code>{item.answer}</code></pre></div>}</article>)}</div><div className="mt-6 flex flex-col gap-4 rounded-2xl bg-[#fce2dc] p-5 sm:flex-row sm:items-center sm:justify-between"><div><p className="font-mono-guide text-[10px] font-semibold tracking-[0.12em] text-[#9a5a4d]">FINAL STUDY ACTION</p><p className="mt-1 text-sm leading-6 text-[#4f5966]">Complete the mini-project and Questions 7–10 without the answer key. If you can explain each line afterward, you are ready to demonstrate your learning.</p></div><a href={editorUrl} target="_blank" rel="noreferrer" className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-[#f2634a] px-4 py-2.5 text-sm font-bold text-white transition hover:bg-[#b94331] active:scale-[0.97]">Open editor <Play size={15} fill="currentColor" /></a></div></section>

    <section className="mt-10 rounded-[1.5rem] border border-[#d8cdbb] bg-[#e7edf0] p-6 sm:p-8"><p className="font-mono-guide text-[10px] font-semibold tracking-[0.14em] text-[#496d89]">ONE-PAGE LAST-MINUTE REVIEW</p><h3 className="font-display mt-2 text-3xl font-semibold tracking-[-0.035em]">Keep these exam cues close.</h3><div className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">{[["Assignment", "= stores a value", "name = \"Kai\""], ["Comparison", "== checks equality", "score == 100"], ["Input", "input() gives text", "int(input())"], ["Decision", "Colon + indentation matter", "if score >= 70:"], ["range()", "Stop value is excluded", "range(3) → 0, 1, 2"], ["List index", "First item is index 0", "items[0]"], ["List update", "append() adds at the end", "items.append(\"pen\")"], ["Function", "return sends back a value", "return total"], ["Error reading", "Last traceback line names the error", "TypeError: ..."]].map(([term, reminder, example]) => <div key={term} className="rounded-xl border border-[#b9ccd8] bg-[#fffdf7]/80 p-4"><p className="font-mono-guide text-xs font-semibold text-[#496d89]">{term.toUpperCase()}</p><p className="mt-2 text-sm font-semibold text-[#17243a]">{reminder}</p><code className="mt-2 block font-mono-guide text-xs text-[#59616d]">{example}</code></div>)}</div><div className="mt-6 border-t border-[#b9ccd8] pt-5 text-sm text-[#59616d]">Source references for the learning content: <a href="https://docs.python.org/3/tutorial/controlflow.html" target="_blank" rel="noreferrer" className="font-semibold text-[#b94331] underline underline-offset-4">Python control flow</a>, <a href="https://docs.python.org/3/tutorial/datastructures.html" target="_blank" rel="noreferrer" className="font-semibold text-[#b94331] underline underline-offset-4">data structures</a>, and <a href="https://docs.python.org/3/tutorial/errors.html" target="_blank" rel="noreferrer" className="font-semibold text-[#b94331] underline underline-offset-4">errors and exceptions</a>.</div></section>
  </section>;
}
