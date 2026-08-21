# Python Path — Exam Prep Learning Hub

[![Python Path — Exam Prep Learning Hub](https://i.postimg.cc/xTbMh2Sx/Screenshot-2026-08-21-at-12-13-49-PM.png)](https://drvicki.github.io/python-exam-prep-learning-hub/)

## About the project

**Python Path** is an interactive learning hub for beginner Python students preparing for an end-of-course exam. The experience pairs a nine-lesson Field Guide with complete explanations, code examples, visual models, practice activities, knowledge checks, a browser-based Python editor, and a ten-question practice exam. It is designed to help learners read, trace, test, and explain Python with growing confidence.

Visit the live site: [Python Path — Exam Prep Learning Hub](https://drvicki.github.io/python-exam-prep-learning-hub/).

## Use the learning hub

Start with the Field Guide and work through the nine route cards in order. Each card opens its matching full lesson, including examples, visualizations, and a short practice task. Use the **Open code editor** button to run or adapt the exercises in the browser, then finish with the practice exam and answer key for a focused review.

## Run locally

This project uses React, Vite, and pnpm. After cloning the repository, install dependencies and start the local development server:

```bash
git clone https://github.com/DrVicki/python-exam-prep-learning-hub.git
cd python-exam-prep-learning-hub
pnpm install
pnpm dev
```

Open the local URL shown in the terminal, typically `http://localhost:3000`.

## Build the static site

Use the following command to create the static GitHub Pages build:

```bash
pnpm build:pages
```

The production artifact is generated in `dist/public`.

---

Created by **Dr. Vicki Bealman**.
