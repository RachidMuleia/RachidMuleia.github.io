import { makeMath } from "./math.js";

const math = makeMath();
const ROUND = 8;
const STORAGE_KEY = "grade2-math-practice";

const COPY = {
  pt: {
    kicker: "2ª classe",
    title: "Exercícios de matemática",
    intro: "Contas, tabuada, contas em coluna e ideias para perceber os números.",
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
    again: "Ainda não. Olha como se faz e tenta outra vez.",
    together: "Vamos fazer juntos",
    reveal: "A resposta é",
    tens: "Dezenas",
    ones: "Unidades",
    hundreds: "Centenas",
    howMany: "Quanto é?",
    complete: "Completa.",
    breakApart: "Decompõe o número.",
    whatNumber: "Que número mostram os blocos?",
    which: "Qual destas somas é igual a",
    columnCue: "Começa pelas unidades.",
    familyCue: "Usa a conta que já sabes.",
    skipCue: "Qual é o número que falta?",
    parity: "Este número é par ou ímpar?",
    greater: "é maior",
    smaller: "é menor",
    equal: "são iguais",
    even: "par",
    odd: "ímpar",
    groups: {
      ops: "Contas",
      column: "Em coluna",
      ideas: "Compreender",
    },
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
      tables: ["Tabuada do 11 ao 16", "Separa o 10 e o que sobra"],
      vadd: ["Adição em coluna", "Alinha dezenas e unidades"],
      vsub: ["Subtração em coluna", "Alinha e começa pelas unidades"],
      doubles: ["Dobros", "O mesmo número duas vezes"],
      family: ["Famílias", "A conta e a sua inversa"],
      compare: ["Comparar", "Qual é maior"],
      skip: ["Contar aos saltos", "2, 5, 10 e outros"],
      parity: ["Par e ímpar", "Olha para as unidades"],
      mixed: ["Mistura", "Um pouco de cada tema"],
    },
    levels: {
      add: ["Somas até 20", "Até 100, um passo de cada vez", "Dois números com dois dígitos"],
      sub: ["Tirar até 20", "Até 100, sem empréstimo", "Até 100, com empréstimo"],
      mul: ["Tabuadas do 2, 5 e 10", "Também 3 e 4", "Tabuadas até ao 9"],
      div: ["Dividir por 2, 5 e 10", "Também por 3 e 4", "Dividir até por 9"],
      decomp: ["Até 50 e pares do 10", "Até 100", "Outras formas de decompor"],
      tables: ["11 e 12", "13 e 14", "15 e 16"],
      vadd: ["Sem transporte", "Com transporte", "Números de três dígitos"],
      vsub: ["Sem empréstimo", "Pedir 1 às dezenas", "Números de três dígitos"],
      doubles: ["Dobros até 10", "Quase o dobro", "Dobros até 20"],
      family: ["Somar e tirar", "Vezes e dividir", "Mais tabuadas"],
      compare: ["Dezenas diferentes", "A mesma dezena", "Uma soma e um número"],
      skip: ["De 2, de 5 e de 10", "De 3 e de 4", "De 10 a partir de qualquer número"],
      parity: ["Até 20", "Até 100", "Números maiores"],
      mixed: ["Números pequenos", "Números até 100", "Um pouco mais difícil"],
    },
  },
  en: {
    kicker: "2nd grade",
    title: "Math practice",
    intro: "Sums, times tables, column work, and ideas that make the numbers clear.",
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
    again: "Not yet. Look how it works, then try once more.",
    together: "Let's do it together",
    reveal: "The answer is",
    tens: "Tens",
    ones: "Ones",
    hundreds: "Hundreds",
    howMany: "How many?",
    complete: "Complete.",
    breakApart: "Break the number apart.",
    whatNumber: "What number do the blocks show?",
    which: "Which sum is equal to",
    columnCue: "Start with the ones.",
    familyCue: "Use the fact you already know.",
    skipCue: "Which number is missing?",
    parity: "Is this number even or odd?",
    greater: "is greater",
    smaller: "is smaller",
    equal: "are equal",
    even: "even",
    odd: "odd",
    groups: {
      ops: "Operations",
      column: "In columns",
      ideas: "Understand",
    },
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
      tables: ["Tables of 11 to 16", "Split off the ten"],
      vadd: ["Column addition", "Line up tens and ones"],
      vsub: ["Column subtraction", "Line up and start at the ones"],
      doubles: ["Doubles", "The same number twice"],
      family: ["Fact families", "A fact and its partner"],
      compare: ["Compare", "Which is greater"],
      skip: ["Skip counting", "2, 5, 10, and more"],
      parity: ["Even and odd", "Look at the ones"],
      mixed: ["Mixed", "A little of each topic"],
    },
    levels: {
      add: ["Sums to 20", "Up to 100, one step at a time", "Two two-digit numbers"],
      sub: ["Within 20", "Up to 100, no regrouping", "Up to 100, with regrouping"],
      mul: ["Times 2, 5, and 10", "Also 3 and 4", "Tables through 9"],
      div: ["Divide by 2, 5, and 10", "Also by 3 and 4", "Divide by numbers through 9"],
      decomp: ["Up to 50 and bonds of 10", "Up to 100", "More ways to break numbers"],
      tables: ["11 and 12", "13 and 14", "15 and 16"],
      vadd: ["No regrouping", "With regrouping", "Three-digit numbers"],
      vsub: ["No regrouping", "Borrow from the tens", "Three-digit numbers"],
      doubles: ["Doubles to 10", "Near doubles", "Doubles to 20"],
      family: ["Add and take away", "Times and divide", "More tables"],
      compare: ["Different tens", "The same ten", "A sum and a number"],
      skip: ["By 2, 5, and 10", "By 3 and 4", "By 10 from any number"],
      parity: ["Up to 20", "Up to 100", "Larger numbers"],
      mixed: ["Small numbers", "Numbers up to 100", "A bit harder"],
    },
  },
};

const GROUPS = [
  { id: "ops", skills: ["add", "sub", "mul", "div", "tables"] },
  { id: "column", skills: ["vadd", "vsub"] },
  { id: "ideas", skills: ["decomp", "doubles", "family", "compare", "skip", "parity", "mixed"] },
];
const SKILLS = GROUPS.flatMap((group) => group.skills);
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

function skillCard(skill, t) {
  const [name, blurb] = t.skills[skill];
  const stats = statCount(skill);
  const note = stats.done ? `${stats.correct} ${t.score} · ${stats.done} ${t.done}` : blurb;
  return `<button class="skill-card${skill === "mixed" ? " wide" : ""}" data-skill="${skill}"><strong>${name}</strong><span>${note}</span></button>`;
}

function renderMenu() {
  const t = text();
  const sections = GROUPS.map((group) => `
    <p class="section-label">${t.groups[group.id]}</p>
    <div class="skill-grid">${group.skills.map((skill) => skillCard(skill, t)).join("")}</div>
  `).join("");
  el(`
    <div class="math-top">
      <div>
        <p class="math-kicker">${t.kicker}</p>
        <h1>${t.title}</h1>
        <p class="math-intro">${t.intro}</p>
      </div>
      ${langButtons()}
    </div>
    ${sections}
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
    ${state.hint ? lessonHtml(question) : ""}
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
    if (!root.querySelector(".lesson")) {
      const picture = question.visual && question.visualRole !== "prompt" ? `<div class="hint-box">${visualHtml(question.visual)}</div>` : "";
      feedback.insertAdjacentHTML("beforebegin", `${picture}${lessonHtml(question)}`);
    }
    if (state.tries >= 2) {
      feedback.textContent = `${t.reveal} ${spokenAnswer(question)}.`;
      feedback.className = "feedback show";
      markChoices(question, { solved: false, showAnswer: true });
      finishQuestion(false);
      return;
    }
    feedback.textContent = t.again;
    feedback.className = "feedback try";
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
  if (question.promptKey === "compare") return `${question.leftText} ? ${question.rightText}`;
  if (question.promptKey === "parity") return `${t.parity}`;
  if (question.promptKey === "which") return `${t.which} ${question.n}?`;
  if (question.template === "place" || question.template === "expand" || question.template === "split") return t.breakApart;
  if (question.template === "bond" || question.template === "missing" || question.template === "shift") return t.complete;
  if (question.template === "read-blocks") return t.whatNumber;
  if (question.template === "vertical") return t.columnCue;
  if (question.template === "family") return t.familyCue;
  if (question.template === "skip") return t.skipCue;
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
  if (question.template === "vertical") {
    return `<div class="column-problem" aria-label="${text().howMany}">
      <span>${question.a}</span>
      <span><i>${question.op}</i>${question.b}</span>
      <input class="math-input" inputmode="numeric" aria-label="${text().howMany}">
    </div>`;
  }
  if (question.template === "family") {
    return `<p class="known-fact">${question.a} ${question.factOp} ${question.b} = ${question.c}</p>
      <div class="equation"><span>${question.askLeft}</span><span>${question.askOp}</span><span>${question.askRight}</span><span>=</span><input class="math-input" inputmode="numeric" aria-label="${text().complete}"></div>`;
  }
  if (question.template === "skip") {
    const cells = question.sequence.map((value, index) => {
      if (index !== question.blankAt) return `<span>${value}</span>`;
      return `<input class="math-input" inputmode="numeric" aria-label="${text().skipCue}">`;
    }).join("");
    return `<div class="sequence">${cells}</div>`;
  }
  if (question.template === "choice") {
    return `<div class="choices">${question.choices.map((choice) => `<button type="button" class="choice-btn" data-choice="${choice.id}">${choiceLabel(choice)}</button>`).join("")}</div>`;
  }
  return "";
}

function choiceLabel(choice) {
  return choice.labelKey ? text()[choice.labelKey] : choice.text;
}

function spokenAnswer(question) {
  if (question.template === "place") return `${question.answer[0]} ${text().tens.toLowerCase()}, ${question.answer[1]} ${text().ones.toLowerCase()}`;
  if (question.template === "choice") {
    const found = question.choices.find((choice) => choice.id === question.answer[0]);
    return found ? choiceLabel(found) : "";
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

function lessonHtml(question) {
  const t = text();
  const steps = math.lesson(question).map((step) => `<li>${sentence(step, t)}</li>`).join("");
  return `<div class="lesson"><p class="lesson-title">${t.together}</p><ol>${steps}</ol></div>`;
}

function placeName(place, t) {
  if (place === "ones") return t.ones.toLowerCase();
  if (place === "tens") return t.tens.toLowerCase();
  return t.hundreds.toLowerCase();
}

function sentence(step, t) {
  const pt = state.lang === "pt";
  if (step.id === "count-on") {
    const path = step.jumps.join(", ");
    return pt
      ? `Começa em ${step.from} e conta: ${path}. Chegas a ${step.total}.`
      : `Start at ${step.from} and count on: ${path}. You land on ${step.total}.`;
  }
  if (step.id === "make10") {
    if (step.rest === 0) {
      return pt
        ? `${step.big} precisa de ${step.need} para chegar a 10. Usa o ${step.small} todo e ficas em 10.`
        : `${step.big} needs ${step.need} to make 10. Use all of ${step.small} and you land on 10.`;
    }
    return pt
      ? `${step.big} precisa de ${step.need} para chegar a 10. De ${step.small} sobram ${step.rest}. 10 + ${step.rest} = ${step.total}.`
      : `${step.big} needs ${step.need} to make 10. ${step.rest} is left from ${step.small}. 10 + ${step.rest} = ${step.total}.`;
  }
  if (step.id === "plus-zero") {
    return pt ? `Somar 0 não muda o número. Fica ${step.n}.` : `Adding 0 changes nothing. It stays ${step.n}.`;
  }
  if (step.id === "count-back") {
    const path = step.jumps.join(", ");
    return pt
      ? `Começa em ${step.from} e conta para trás: ${path}. Ficas em ${step.total}.`
      : `Start at ${step.from} and count back: ${path}. You land on ${step.total}.`;
  }
  if (step.id === "add-col") {
    const place = placeName(step.place, t);
    const extra = step.carryIn ? (pt ? ` + ${step.carryIn} que vinha` : ` + ${step.carryIn} carried`) : "";
    const carry = step.carryOut ? (pt ? ` Vai ${step.carryOut}.` : ` Carry ${step.carryOut}.`) : "";
    return pt
      ? `Nas ${place}: ${step.x} + ${step.y}${extra} = ${step.sum}. Escreve ${step.write}.${carry}`
      : `In the ${place}: ${step.x} + ${step.y}${extra} = ${step.sum}. Write ${step.write}.${carry}`;
  }
  if (step.id === "add-carry-end") {
    const place = placeName(step.place, t);
    return pt ? `O ${step.carry} que vai fica nas ${place}.` : `The ${step.carry} you carried becomes the ${place}.`;
  }
  if (step.id === "sub-col") {
    const place = placeName(step.place, t);
    if (step.borrowed) {
      return pt
        ? `Nas ${place} não chega. Pede 1 à casa ao lado: ${step.used} − ${step.y} = ${step.diff}.`
        : `The ${place} are not enough. Borrow 1 from the next place: ${step.used} − ${step.y} = ${step.diff}.`;
    }
    return pt
      ? `Nas ${place}: ${step.x} − ${step.y} = ${step.diff}.`
      : `In the ${place}: ${step.x} − ${step.y} = ${step.diff}.`;
  }
  if (step.id === "double") {
    return pt
      ? `${step.n} + ${step.n} é o dobro de ${step.n}. Conta duas vezes: ${step.total}.`
      : `${step.n} + ${step.n} is double ${step.n}. Count it twice: ${step.total}.`;
  }
  if (step.id === "near-double") {
    return pt
      ? `O dobro de ${step.n} é ${step.n * 2}. Este número é mais 1, por isso ${step.total}.`
      : `Double ${step.n} is ${step.n * 2}. This one is 1 more, so ${step.total}.`;
  }
  if (step.id === "repeated") {
    return pt
      ? `${step.times} grupos de ${step.factor}: ${step.parts.join(" + ")} = ${step.total}.`
      : `${step.times} groups of ${step.factor}: ${step.parts.join(" + ")} = ${step.total}.`;
  }
  if (step.id === "split-factor") {
    return pt
      ? `${step.big} é ${step.tens} + ${step.ones}. ${step.tens} × ${step.other} = ${step.tensProduct} e ${step.ones} × ${step.other} = ${step.onesProduct}. ${step.tensProduct} + ${step.onesProduct} = ${step.total}.`
      : `${step.big} is ${step.tens} + ${step.ones}. ${step.tens} × ${step.other} = ${step.tensProduct} and ${step.ones} × ${step.other} = ${step.onesProduct}. ${step.tensProduct} + ${step.onesProduct} = ${step.total}.`;
  }
  if (step.id === "times-nine") {
    const ten = step.other * 10;
    return pt
      ? `10 grupos de ${step.other} são ${ten}. Tira um grupo: ${ten} − ${step.other} = ${step.total}.`
      : `10 groups of ${step.other} make ${ten}. Take one group away: ${ten} − ${step.other} = ${step.total}.`;
  }
  if (step.id === "groups") {
    return pt
      ? `${step.groups} grupos de ${step.each} são ${step.total}.`
      : `${step.groups} groups of ${step.each} make ${step.total}.`;
  }
  if (step.id === "divide") {
    return pt
      ? `${step.divisor} × ${step.quotient} = ${step.dividend}. Por isso ${step.dividend} ÷ ${step.divisor} = ${step.quotient}.`
      : `${step.divisor} × ${step.quotient} = ${step.dividend}. So ${step.dividend} ÷ ${step.divisor} = ${step.quotient}.`;
  }
  if (step.id === "missing-sub") {
    return pt
      ? `${step.a} − ${step.answer} = ${step.c}. O número que se tira é ${step.answer}.`
      : `${step.a} − ${step.answer} = ${step.c}. The number you take away is ${step.answer}.`;
  }
  if (step.id === "missing-times") {
    return pt
      ? `${step.factor} × ${step.answer} = ${step.product}.`
      : `${step.factor} × ${step.answer} = ${step.product}.`;
  }
  if (step.id === "place") {
    return pt
      ? `${step.n} tem ${step.tens} dezenas e ${step.ones} unidades.`
      : `${step.n} has ${step.tens} tens and ${step.ones} ones.`;
  }
  if (step.id === "read-blocks") {
    return pt
      ? `${step.tens} barras são ${step.tens * 10} e ${step.ones} bolas. Juntos fazem ${step.n}.`
      : `${step.tens} bars make ${step.tens * 10}, and there are ${step.ones} dots. Together they make ${step.n}.`;
  }
  if (step.id === "expand") {
    return `${step.n} = ${step.tensPart} + ${step.ones}.`;
  }
  if (step.id === "bond") {
    return `${step.known} + ${step.missing} = ${step.total}.`;
  }
  if (step.id === "split") {
    return `${step.n} = ${step.part} + ${step.rest}.`;
  }
  if (step.id === "shift") {
    const sign = step.delta > 0 ? "+" : "−";
    return pt
      ? `${step.n} ${sign} 10 muda a dezena. Fica ${step.result}.`
      : `${step.n} ${sign} 10 changes the tens. It becomes ${step.result}.`;
  }
  if (step.id === "family") {
    return pt
      ? `Como ${step.a} ${step.factOp} ${step.b} = ${step.c}, a conta inversa dá ${step.answer}.`
      : `Because ${step.a} ${step.factOp} ${step.b} = ${step.c}, the partner fact is ${step.answer}.`;
  }
  if (step.id === "skip") {
    return pt
      ? `Saltas de ${step.step} em ${step.step}. Depois de ${step.prev} vem ${step.next}.`
      : `You jump by ${step.step}. After ${step.prev} comes ${step.next}.`;
  }
  if (step.id === "compare") {
    const word = step.relation === "gt" ? t.greater : step.relation === "lt" ? t.smaller : t.equal;
    return `${step.leftText} ${word} ${step.relation === "eq" ? "" : step.rightText}`.replace(/\s+/g, " ").trim() + ".";
  }
  if (step.id === "parity") {
    const digit = step.n % 10;
    const kind = step.even ? t.even : t.odd;
    return pt
      ? `O último algarismo de ${step.n} é ${digit}. O número é ${kind}.`
      : `The last digit of ${step.n} is ${digit}. The number is ${kind}.`;
  }
  if (step.id === "which") return `${step.text} = ${step.n}.`;
  return String(step.value ?? "");
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
  expect(root.querySelector(".lesson li"), "lesson");
  expect(!root.querySelector(".choice-btn.good"), "answer stays hidden");
  root.querySelector("[data-back]").click();

  const wanted = ["expr", "missing", "place", "read-blocks", "expand", "bond", "split", "shift", "choice", "vertical", "family", "skip"];
  const found = {};
  const direct = ["add", "sub", "mul", "div", "decomp", "tables", "vadd", "vsub", "doubles", "family", "compare", "skip", "parity"];
  for (let i = 0; i < 400 && Object.keys(found).length < wanted.length; i++) {
    for (const level of LEVELS) {
      for (const skill of direct) {
        const question = math.generate(skill, level);
        if (!found[question.template]) found[question.template] = question;
      }
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

  for (const skill of direct) {
    for (const level of LEVELS) {
      state.skill = skill;
      state.items = [math.generate(skill, level)];
      state.index = 0;
      state.outcomes = [];
      state.screen = "quiz";
      beginQuestion();
      answerCurrent(false);
      const lesson = root.querySelector(".lesson li");
      if (!lesson || !lesson.textContent.trim()) errors.push(`lesson ${skill}/${level}`);
    }
  }

  const report = document.createElement("p");
  report.id = "selftest-result";
  report.textContent = errors.length ? errors.join("; ") : "ok";
  document.body.appendChild(report);
}
