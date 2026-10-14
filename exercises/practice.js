import { makeMath } from "./math.js";

const math = makeMath();
const ROUND = 8;
const STORAGE_KEY = "grade2-math-practice";

const COPY = {
  pt: {
    kicker: "2ª classe",
    title: "Exercícios de matemática",
    intro: "Adição, subtração, multiplicação, divisão e decomposição de números.",
    pick: "Escolhe um tema",
    levelTitle: "Escolhe o nível",
    easy: "Fácil",
    medium: "Médio",
    hard: "Desafio",
    back: "Voltar",
    check: "Verificar",
    next: "Seguinte",
    question: "Pergunta",
    of: "de",
    correct: "Muito bem!",
    again: "Quase. Tenta outra vez.",
    reveal: "A resposta é",
    tens: "Dezenas",
    ones: "Unidades",
    howMany: "Quanto é?",
    complete: "Completa.",
    breakApart: "Decompõe o número.",
    whatNumber: "Que número mostram os blocos?",
    which: "Qual destas somas é igual a",
    resultTitle: "Fim da ronda",
    perfect: "Acertaste tudo.",
    good: "Bom trabalho.",
    keep: "Vamos praticar mais um pouco.",
    blocksKey: "Cada barra vale 10. Cada bola vale 1.",
    score: "certas",
    againRound: "Outra vez",
    menu: "Temas",
    done: "feitas",
    skills: {
      add: ["Adição", "Juntar quantidades"],
      sub: ["Subtração", "Tirar uma quantidade"],
      mul: ["Multiplicação", "Grupos iguais"],
      div: ["Divisão", "Partilhar em grupos iguais"],
      decomp: ["Decomposição", "Dezenas, unidades e somas"],
      mixed: ["Mistura", "Um pouco de cada tema"],
    },
    levels: {
      add: ["Somas até 20", "Até 100, um passo de cada vez", "Dois números com dois dígitos"],
      sub: ["Tirar até 20", "Até 100, sem empréstimo", "Até 100, com empréstimo"],
      mul: ["Tabuadas do 2, 5 e 10", "Também 3 e 4", "Tabuadas até ao 9"],
      div: ["Dividir por 2, 5 e 10", "Também por 3 e 4", "Dividir até por 9"],
      decomp: ["Até 50 e pares do 10", "Até 100", "Outras formas de decompor"],
      mixed: ["Números pequenos", "Números até 100", "Um pouco mais difícil"],
    },
  },
  en: {
    kicker: "2nd grade",
    title: "Math practice",
    intro: "Addition, subtraction, multiplication, division, and breaking numbers apart.",
    pick: "Choose a topic",
    levelTitle: "Choose a level",
    easy: "Easy",
    medium: "Medium",
    hard: "Challenge",
    back: "Back",
    check: "Check",
    next: "Next",
    question: "Question",
    of: "of",
    correct: "Well done!",
    again: "Close. Try once more.",
    reveal: "The answer is",
    tens: "Tens",
    ones: "Ones",
    howMany: "How many?",
    complete: "Complete.",
    breakApart: "Break the number apart.",
    whatNumber: "What number do the blocks show?",
    which: "Which sum is equal to",
    resultTitle: "Round complete",
    perfect: "You got them all.",
    good: "Good work.",
    keep: "Let's practice a little more.",
    blocksKey: "Each bar is 10. Each dot is 1.",
    score: "correct",
    againRound: "Again",
    menu: "Topics",
    done: "answered",
    skills: {
      add: ["Addition", "Put amounts together"],
      sub: ["Subtraction", "Take an amount away"],
      mul: ["Multiplication", "Equal groups"],
      div: ["Division", "Share into equal groups"],
      decomp: ["Break apart", "Tens, ones, and sums"],
      mixed: ["Mixed", "A little of each topic"],
    },
    levels: {
      add: ["Sums to 20", "Up to 100, one step at a time", "Two two-digit numbers"],
      sub: ["Within 20", "Up to 100, no regrouping", "Up to 100, with regrouping"],
      mul: ["Times 2, 5, and 10", "Also 3 and 4", "Tables through 9"],
      div: ["Divide by 2, 5, and 10", "Also by 3 and 4", "Divide by numbers through 9"],
      decomp: ["Up to 50 and bonds of 10", "Up to 100", "More ways to break numbers"],
      mixed: ["Small numbers", "Numbers up to 100", "A bit harder"],
    },
  },
};

const SKILLS = ["add", "sub", "mul", "div", "decomp", "mixed"];
const LEVELS = ["easy", "medium", "hard"];

const state = {
  lang: "pt",
  screen: "menu",
  skill: "add",
  level: "easy",
  items: [],
  index: 0,
  tries: 0,
  outcomes: [],
  hint: false,
  revealed: false,
  picked: null,
  focus: 0,
};

const root = document.querySelector("#math-app");

function text() {
  return COPY[state.lang];
}

function load() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
    if (saved.lang === "en" || saved.lang === "pt") state.lang = saved.lang;
    state.stats = saved.stats || {};
  } catch {
    state.stats = {};
  }
}

function save() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify({ lang: state.lang, stats: state.stats }));
}

function statCount(skill) {
  const bag = state.stats[skill] || { correct: 0, done: 0 };
  return bag;
}

function record(skill, ok) {
  const bag = statCount(skill);
  bag.done += 1;
  if (ok) bag.correct += 1;
  state.stats[skill] = bag;
  save();
}

function el(html) {
  root.innerHTML = html;
}

function current() {
  return state.items[state.index];
}

function render() {
  if (state.screen === "menu") renderMenu();
  else if (state.screen === "level") renderLevel();
  else if (state.screen === "result") renderResult();
  else renderQuestion();
}

function renderMenu() {
  const t = text();
  const cards = SKILLS.map((skill) => {
    const [name, blurb] = t.skills[skill];
    const stats = statCount(skill);
    const note = stats.done ? `${stats.correct} ${t.score} · ${stats.done} ${t.done}` : blurb;
    return `<button class="skill-card${skill === "mixed" ? " wide" : ""}" data-skill="${skill}"><strong>${name}</strong><span>${note}</span></button>`;
  }).join("");
  el(`
    <div class="math-top">
      <div>
        <p class="math-kicker">${t.kicker}</p>
        <h1>${t.title}</h1>
        <p class="math-intro">${t.intro}</p>
      </div>
      ${langButtons()}
    </div>
    <p class="section-label">${t.pick}</p>
    <div class="skill-grid">${cards}</div>
  `);
  root.querySelectorAll("[data-skill]").forEach((button) => {
    button.addEventListener("click", () => {
      state.skill = button.dataset.skill;
      state.screen = "level";
      render();
    });
  });
  bindLanguage();
}

function langButtons() {
  return `<div class="lang-toggle" role="group" aria-label="Language">
    <button type="button" data-lang="pt" aria-pressed="${state.lang === "pt"}">PT</button>
    <button type="button" data-lang="en" aria-pressed="${state.lang === "en"}">EN</button>
  </div>`;
}

function bindLanguage() {
  root.querySelectorAll("[data-lang]").forEach((button) => {
    button.addEventListener("click", () => {
      state.lang = button.dataset.lang;
      save();
      render();
    });
  });
}

function renderLevel() {
  const t = text();
  const hints = t.levels[state.skill];
  const names = [t.easy, t.medium, t.hard];
  const cards = LEVELS.map((level, index) => {
    return `<button class="level-card" data-level="${level}"><strong>${names[index]}</strong><span>${hints[index]}</span></button>`;
  }).join("");
  el(`
    <div class="math-top">
      <div>
        <p class="math-kicker">${t.skills[state.skill][0]}</p>
        <h1>${t.levelTitle}</h1>
      </div>
      ${langButtons()}
    </div>
    <div class="level-list">${cards}</div>
    <div class="actions"><button class="ghost-btn" data-back>${t.back}</button></div>
  `);
  bindLanguage();
  root.querySelector("[data-back]").addEventListener("click", () => {
    state.screen = "menu";
    render();
  });
  root.querySelectorAll("[data-level]").forEach((button) => {
    button.addEventListener("click", () => startRound(button.dataset.level));
  });
}

function startRound(level) {
  state.level = level;
  state.items = Array.from({ length: ROUND }, () => math.generate(state.skill, level));
  state.index = 0;
  state.outcomes = [];
  state.screen = "quiz";
  beginQuestion();
}

function beginQuestion() {
  state.tries = 0;
  state.hint = false;
  state.revealed = false;
  state.picked = null;
  state.focus = 0;
  render();
}

function renderQuestion() {
  const t = text();
  const question = current();
  const pips = state.outcomes.map((outcome) => `<i class="${outcome}"></i>`).join("") +
    `<i class="now"></i>` +
    "<i></i>".repeat(ROUND - state.outcomes.length - 1);
  el(`
    <div class="progress-row">
      <p class="prompt-label">${t.question} ${state.index + 1} ${t.of} ${ROUND}</p>
      <div class="pips" aria-hidden="true">${pips}</div>
    </div>
    <p class="prompt-label">${promptFor(question)}</p>
    ${question.visualRole === "prompt" ? visualHtml(question.visual) : ""}
    ${state.hint && question.visual && question.visualRole !== "prompt" ? `<div class="hint-box">${visualHtml(question.visual)}</div>` : ""}
    ${bodyFor(question)}
    ${question.template === "choice" ? "" : keypad()}
    <p class="feedback" aria-live="polite"></p>
    <button class="primary-btn" data-check>${t.check}</button>
    <div class="actions"><button class="ghost-btn" data-back>${t.back}</button></div>
  `);
  const feedback = root.querySelector(".feedback");
  root.querySelector("[data-back]").addEventListener("click", () => {
    state.screen = "level";
    render();
  });
  root.querySelectorAll(".key").forEach((key) => {
    key.addEventListener("click", () => typeKey(key.dataset.key));
  });
  root.querySelectorAll(".math-input, .place-inputs input").forEach((input, index) => {
    input.addEventListener("focus", () => {
      state.focus = index;
    });
    input.addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
        event.preventDefault();
        submit();
      }
    });
  });
  root.querySelectorAll(".choice-btn").forEach((button) => {
    button.addEventListener("click", () => {
      if (state.revealed) return;
      state.picked = button.dataset.choice;
      root.querySelectorAll(".choice-btn").forEach((item) => item.classList.remove("picked"));
      button.classList.add("picked");
    });
  });
  root.querySelector("[data-check]").addEventListener("click", submit);
  const first = root.querySelector("input");
  if (first) first.focus();

  function submit() {
    if (state.revealed) {
      advance();
      return;
    }
    const given = readAnswer(question);
    if (given.some((value) => value === "")) return;
    if (math.isCorrect(question, given)) {
      feedback.textContent = t.correct;
      feedback.className = "feedback ok";
      markChoices(question, { solved: true });
      finishQuestion(true);
      return;
    }
    state.tries += 1;
    state.hint = true;
    if (state.tries >= 2) {
      feedback.textContent = `${t.reveal} ${spokenAnswer(question)}.`;
      feedback.className = "feedback show";
      markChoices(question, { solved: false, showAnswer: true });
      finishQuestion(false);
      return;
    }
    feedback.textContent = t.again;
    feedback.className = "feedback try";
    if (question.visual && question.visualRole !== "prompt" && !root.querySelector(".hint-box")) {
      feedback.insertAdjacentHTML("beforebegin", `<div class="hint-box">${visualHtml(question.visual)}</div>`);
    }
    markChoices(question, { solved: false, showAnswer: false });
  }
}

function finishQuestion(ok) {
  state.revealed = true;
  state.outcomes.push(ok ? "ok" : "miss");
  record(state.skill, ok);
  const button = root.querySelector("[data-check]");
  button.textContent = text().next;
  button.disabled = false;
}

function advance() {
  if (state.index + 1 >= state.items.length) {
    state.screen = "result";
    render();
    return;
  }
  state.index += 1;
  beginQuestion();
}

function readAnswer(question) {
  if (question.template === "choice") return [state.picked || ""];
  return [...root.querySelectorAll("input")].map((input) => input.value.trim());
}

function markChoices(question, { solved, showAnswer }) {
  if (question.template !== "choice") return;
  root.querySelectorAll(".choice-btn").forEach((button) => {
    button.classList.remove("good", "bad");
    if ((solved || showAnswer) && button.dataset.choice === question.answer[0]) button.classList.add("good");
    if (!solved && button.dataset.choice === state.picked) button.classList.add("bad");
  });
}

function promptFor(question) {
  const t = text();
  if (question.template === "place" || question.template === "expand" || question.template === "split") return t.breakApart;
  if (question.template === "bond" || question.template === "missing" || question.template === "shift") return t.complete;
  if (question.template === "read-blocks") return t.whatNumber;
  if (question.template === "choice") return `${t.which} ${question.n}?`;
  return t.howMany;
}

function bodyFor(question) {
  if (question.template === "expr") {
    return `<div class="equation"><span>${question.a}</span><span>${question.op}</span><span>${question.b}</span><span>=</span><input class="math-input" inputmode="numeric" aria-label="${text().howMany}"></div>`;
  }
  if (question.template === "missing") {
    return `<div class="equation"><span>${question.a}</span><span>${question.op}</span><input class="math-input" inputmode="numeric" aria-label="${text().complete}"><span>=</span><span>${question.c}</span></div>`;
  }
  if (question.template === "place") {
    return `<div class="equation"><span>${question.n}</span></div>
      <div class="place-inputs">
        <label>${text().tens}<input inputmode="numeric" aria-label="${text().tens}"></label>
        <label>${text().ones}<input inputmode="numeric" aria-label="${text().ones}"></label>
      </div>`;
  }
  if (question.template === "expand") {
    return `<div class="equation"><span>${question.n}</span><span>=</span><span>${question.tensPart}</span><span>+</span><input class="math-input" inputmode="numeric" aria-label="${text().complete}"></div>`;
  }
  if (question.template === "bond") {
    return `<div class="equation"><span>${question.known}</span><span>+</span><input class="math-input" inputmode="numeric" aria-label="${text().complete}"><span>=</span><span>${question.total}</span></div>`;
  }
  if (question.template === "split") {
    return `<div class="equation"><span>${question.n}</span><span>=</span><span>${question.part}</span><span>+</span><input class="math-input" inputmode="numeric" aria-label="${text().complete}"></div>`;
  }
  if (question.template === "shift") {
    const sign = question.delta > 0 ? "+" : "−";
    return `<div class="equation"><span>${question.n}</span><span>${sign}</span><span>${Math.abs(question.delta)}</span><span>=</span><input class="math-input" inputmode="numeric" aria-label="${text().howMany}"></div>`;
  }
  if (question.template === "read-blocks") {
    return `<div class="equation"><input class="math-input" inputmode="numeric" aria-label="${text().whatNumber}"></div>`;
  }
  if (question.template === "choice") {
    return `<div class="choices">${question.choices.map((choice) => `<button type="button" class="choice-btn" data-choice="${choice.id}">${choice.text}</button>`).join("")}</div>`;
  }
  return "";
}

function spokenAnswer(question) {
  if (question.template === "place") return `${question.answer[0]} ${text().tens.toLowerCase()}, ${question.answer[1]} ${text().ones.toLowerCase()}`;
  if (question.template === "choice") {
    const found = question.choices.find((choice) => choice.id === question.answer[0]);
    return found ? found.text : "";
  }
  return question.answer.join(", ");
}

function visualHtml(visual) {
  if (!visual) return "";
  if (visual.type === "place") {
    const rods = "<span class=\"ten-rod\"></span>".repeat(visual.tens);
    const dots = "<i class=\"one-dot\"></i>".repeat(visual.ones);
    return `<div class="blocks"><span>${rods}</span><span class="ones">${dots}</span></div><p class="prompt-label">${text().blocksKey}</p>`;
  }
  if (visual.type === "groups") {
    return `<div class="dot-groups" aria-hidden="true">${visual.groups.map((count, index) => `<span class="dot-group">${"<i class=\"dot" + (index ? " second" : "") + "\"></i>".repeat(count)}</span>`).join("")}</div>`;
  }
  if (visual.type === "equal-groups") {
    const group = `<span class="dot-group">${"<i class=\"dot\"></i>".repeat(visual.each)}</span>`;
    return `<div class="dot-groups" aria-hidden="true">${group.repeat(visual.groups)}</div>`;
  }
  if (visual.type === "takeaway") {
    const dots = Array.from({ length: visual.total }, (_, index) => {
      const gone = index >= visual.total - visual.remove;
      return `<i class="dot${gone ? " gone" : ""}"></i>`;
    }).join("");
    return `<div class="dot-groups" aria-hidden="true"><span class="dot-group">${dots}</span></div>`;
  }
  return "";
}

function keypad() {
  const keys = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "", "0", "back"];
  return `<div class="keypad">${keys.map((key) => {
    if (!key) return "<span></span>";
    const label = key === "back" ? "⌫" : key;
    return `<button type="button" class="key" data-key="${key}">${label}</button>`;
  }).join("")}</div>`;
}

function typeKey(key) {
  const inputs = [...root.querySelectorAll("input")];
  if (!inputs.length || state.revealed) return;
  const input = inputs[Math.min(state.focus, inputs.length - 1)];
  if (key === "back") input.value = input.value.slice(0, -1);
  else if (input.value.length < 4) input.value += key;
  input.focus();
}

function renderResult() {
  const t = text();
  const correct = state.outcomes.filter((item) => item === "ok").length;
  const message = correct === ROUND ? t.perfect : correct >= 5 ? t.good : t.keep;
  el(`
    <p class="math-kicker">${t.skills[state.skill][0]}</p>
    <h1>${t.resultTitle}</h1>
    <p class="result-score">${correct}/${ROUND}</p>
    <p>${message}</p>
    <div class="actions">
      <button class="primary-btn" data-again>${t.againRound}</button>
      <button class="ghost-btn" data-menu>${t.menu}</button>
    </div>
  `);
  root.querySelector("[data-again]").addEventListener("click", () => startRound(state.level));
  root.querySelector("[data-menu]").addEventListener("click", () => {
    state.screen = "menu";
    render();
  });
}

load();
render();

if (new URLSearchParams(location.search).get("selftest") === "1") {
  const errors = [];
  const expect = (condition, message) => {
    if (!condition) errors.push(message);
  };
  const answerCurrent = (correctly) => {
    const question = current();
    if (question.template === "choice") {
      const id = correctly
        ? question.answer[0]
        : question.choices.find((choice) => choice.id !== question.answer[0]).id;
      root.querySelector(`[data-choice="${id}"]`).click();
    } else {
      const inputs = [...root.querySelectorAll("input")];
      question.answer.forEach((value, index) => {
        inputs[index].value = String(correctly ? value : Number(value) + 1);
      });
    }
    root.querySelector("[data-check]").click();
  };

  expect(root.querySelector("[data-skill='add']"), "menu");
  root.querySelector("[data-lang='en']").click();
  expect(root.querySelector("h1").textContent.includes("Math"), "english");
  root.querySelector("[data-skill='add']").click();
  root.querySelector("[data-level='easy']").click();
  answerCurrent(true);
  expect(root.querySelector(".feedback").classList.contains("ok"), "correct");
  root.querySelector("[data-check]").click();
  answerCurrent(false);
  expect(root.querySelector(".feedback").classList.contains("try"), "retry");
  expect(!root.querySelector(".choice-btn.good"), "answer stays hidden");
  root.querySelector("[data-back]").click();

  const wanted = ["expr", "missing", "place", "read-blocks", "expand", "bond", "split", "shift", "choice"];
  const found = {};
  for (let i = 0; i < 500 && Object.keys(found).length < wanted.length; i++) {
    for (const level of LEVELS) {
      const question = math.generate("mixed", level);
      if (!found[question.template]) found[question.template] = question;
    }
  }
  for (const template of wanted) {
    const question = found[template];
    if (!question) {
      errors.push(`missing ${template}`);
      continue;
    }
    state.skill = question.skill;
    state.items = [question];
    state.index = 0;
    state.outcomes = [];
    state.screen = "quiz";
    beginQuestion();
    answerCurrent(true);
    if (!root.querySelector(".feedback").classList.contains("ok")) errors.push(`ui ${template}`);
  }

  const report = document.createElement("p");
  report.id = "selftest-result";
  report.textContent = errors.length ? errors.join("; ") : "ok";
  document.body.appendChild(report);
}
