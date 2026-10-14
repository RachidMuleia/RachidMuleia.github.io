// Second-grade practice questions. Pure functions so the problems can be checked
// without a browser.

export function makeMath(random = Math.random) {
  const randInt = (min, max) => min + Math.floor(random() * (max - min + 1));
  const pick = (items) => items[randInt(0, items.length - 1)];

  function shuffle(items) {
    const copy = items.slice();
    for (let i = copy.length - 1; i > 0; i--) {
      const j = randInt(0, i);
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
  }

  function expr(skill, a, op, b, result, visual = null) {
    return { skill, template: "expr", a, op, b, answer: [result], visual };
  }

  function groupsVisual(a, b) {
    if (a + b <= 20 && a >= 0 && b >= 0) return { type: "groups", groups: [a, b] };
    return null;
  }

  function addition(level) {
    if (level === "easy") {
      const x = randInt(0, 10);
      const y = randInt(x === 0 ? 1 : 0, 10);
      return expr("add", x, "+", y, x + y, groupsVisual(x, y));
    }
    if (level === "medium") {
      if (random() < 0.45) {
        const sum = randInt(8, 20);
        const known = randInt(1, sum - 1);
        return { skill: "add", template: "missing", a: known, op: "+", c: sum, answer: [sum - known], visual: null };
      }
      const ones = randInt(0, 9);
      const addend = randInt(1, 9);
      const tens = randInt(1, 8);
      const a = tens * 10 + ones;
      return expr("add", a, "+", addend, a + addend, null);
    }
    const a = randInt(16, 58);
    const b = randInt(13, 100 - a);
    return expr("add", a, "+", b, a + b, null);
  }

  function subtraction(level) {
    if (level === "easy") {
      const a = randInt(5, 18);
      const b = randInt(1, Math.min(9, a));
      return expr("sub", a, "−", b, a - b, a <= 20 ? { type: "takeaway", total: a, remove: b } : null);
    }
    if (level === "medium") {
      if (random() < 0.4) {
        const a = randInt(10, 20);
        const b = randInt(1, a - 1);
        return { skill: "sub", template: "missing", a, op: "−", c: a - b, answer: [b], visual: null };
      }
      const aTens = randInt(2, 9);
      const aOnes = randInt(1, 9);
      const bTens = randInt(0, aTens - (aOnes === 0 ? 1 : 0));
      const bOnes = randInt(0, aOnes);
      const a = aTens * 10 + aOnes;
      let b = bTens * 10 + bOnes;
      if (b === 0) b = 1;
      if (b >= a) b = a - 1;
      return expr("sub", a, "−", b, a - b, null);
    }
    const aOnes = randInt(0, 8);
    const bOnes = randInt(aOnes + 1, 9);
    const aTens = randInt(2, 9);
    const bTens = randInt(0, aTens - 1);
    const a = aTens * 10 + aOnes;
    const b = bTens * 10 + bOnes;
    return expr("sub", a, "−", b, a - b, null);
  }

  function multiplication(level) {
    const tables = level === "easy" ? [2, 5, 10] : level === "medium" ? [2, 3, 4, 5, 10] : [2, 3, 4, 5, 6, 7, 8, 9];
    const factor = pick(tables);
    const other = randInt(1, 10);
    const product = factor * other;
    if (level === "hard" && random() < 0.35 && other > 1) {
      return { skill: "mul", template: "missing", a: factor, op: "×", c: product, answer: [other], visual: null };
    }
    const left = random() < 0.5 ? other : factor;
    const right = left === factor ? other : factor;
    const visual = product <= 20 ? { type: "equal-groups", groups: left, each: right } : null;
    return expr("mul", left, "×", right, product, visual);
  }

  function division(level) {
    const tables = level === "easy" ? [2, 5, 10] : level === "medium" ? [2, 3, 4, 5, 10] : [2, 3, 4, 5, 6, 7, 8, 9];
    const divisor = pick(tables);
    const quotient = randInt(1, 10);
    const dividend = divisor * quotient;
    const visual = dividend <= 20 ? { type: "equal-groups", groups: quotient, each: divisor } : null;
    return expr("div", dividend, "÷", divisor, quotient, visual);
  }

  function placeQuestion(n) {
    const tens = Math.floor(n / 10);
    const ones = n % 10;
    return {
      skill: "decomp",
      template: "place",
      n,
      answer: [tens, ones],
      visual: { type: "place", tens, ones },
    };
  }

  function decomposition(level) {
    if (level === "easy") {
      const roll = random();
      if (roll < 0.34) {
        const n = randInt(11, 50);
        return placeQuestion(n);
      }
      if (roll < 0.67) {
        const total = 10;
        const known = randInt(1, 9);
        return { skill: "decomp", template: "bond", total, known, answer: [total - known], visual: null };
      }
      const tens = randInt(1, 4);
      const ones = randInt(0, 9);
      return {
        skill: "decomp",
        template: "read-blocks",
        tens,
        ones,
        answer: [tens * 10 + ones],
        visual: { type: "place", tens, ones },
        visualRole: "prompt",
      };
    }
    if (level === "medium") {
      const roll = random();
      if (roll < 0.25) {
        const n = randInt(10, 99);
        return placeQuestion(n);
      }
      if (roll < 0.5) {
        const n = randInt(11, 99);
        const tensPart = Math.floor(n / 10) * 10;
        return {
          skill: "decomp",
          template: "expand",
          n,
          tensPart,
          answer: [n - tensPart],
          visual: { type: "place", tens: Math.floor(n / 10), ones: n % 10 },
        };
      }
      if (roll < 0.75) {
        const total = 20;
        const known = randInt(1, 19);
        return { skill: "decomp", template: "bond", total, known, answer: [total - known], visual: null };
      }
      const n = randInt(0, 89);
      const delta = random() < 0.5 ? 10 : -10;
      const start = delta < 0 ? n + 10 : n;
      return { skill: "decomp", template: "shift", n: start, delta, answer: [start + delta], visual: null };
    }
    const roll = random();
    if (roll < 0.33) {
      const n = randInt(21, 99);
      const tensPart = Math.floor(n / 10) * 10;
      let part = randInt(1, Math.floor((n - 1) / 10)) * 10;
      if (part === tensPart) part = Math.max(10, tensPart - 10);
      if (part <= 0 || part >= n) part = 10;
      return { skill: "decomp", template: "split", n, part, answer: [n - part], visual: null };
    }
    if (roll < 0.66) {
      const total = 100;
      const known = pick([10, 20, 30, 40, 50, 60, 70, 80, 90]);
      return { skill: "decomp", template: "bond", total, known, answer: [total - known], visual: null };
    }
    return choiceQuestion(randInt(21, 98));
  }

  function choiceQuestion(n) {
    const tens = Math.floor(n / 10) * 10;
    const ones = n % 10;
    const pairs = [
      [tens, ones],
      [tens, ones + 1],
      [Math.max(0, tens - 10), ones + 10 > 9 ? ones : ones + 3],
      [tens + 10, ones],
      [Math.max(0, tens - 10), ones],
    ];
    const seen = new Set();
    const options = [];
    for (const [a, b] of pairs) {
      if (a < 0 || b < 0) continue;
      const text = `${a} + ${b}`;
      if (seen.has(text)) continue;
      seen.add(text);
      options.push({ text, sum: a + b });
    }
    while (options.filter((item) => item.sum !== n).length < 3) {
      const bump = options.length + 2;
      const text = `${tens} + ${ones + bump}`;
      if (!seen.has(text)) {
        seen.add(text);
        options.push({ text, sum: tens + ones + bump });
      } else break;
    }
    const correct = options.find((item) => item.sum === n) || { text: `${tens} + ${ones}`, sum: n };
    const wrongs = options.filter((item) => item.sum !== n).slice(0, 3);
    const choices = shuffle([correct, ...wrongs]).map((item, index) => ({
      id: `c${index}`,
      text: item.text,
      sum: item.sum,
    }));
    return {
      skill: "decomp",
      template: "choice",
      n,
      choices,
      answer: [choices.find((item) => item.sum === n).id],
      visual: null,
    };
  }

  function generate(skill, level) {
    const chosen = skill === "mixed" ? pick(["add", "sub", "mul", "div", "decomp"]) : skill;
    if (chosen === "add") return addition(level);
    if (chosen === "sub") return subtraction(level);
    if (chosen === "mul") return multiplication(level);
    if (chosen === "div") return division(level);
    return decomposition(level);
  }

  function isCorrect(question, given) {
    if (!Array.isArray(given) || given.length !== question.answer.length) return false;
    return question.answer.every((expected, index) => {
      const text = String(given[index] ?? "").trim();
      if (question.template === "choice") return text === String(expected);
      if (!/^\d+$/.test(text)) return false;
      return Number(text) === Number(expected);
    });
  }

  return { generate, isCorrect, randInt, pick };
}
