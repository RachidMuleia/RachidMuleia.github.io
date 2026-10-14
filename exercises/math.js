// Second-grade practice questions. Pure functions so the problems can be checked
// without a browser.

const PLACES = ["ones", "tens", "hundreds"];

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

  function expr(skill, a, op, b, result, visual = null, extra = {}) {
    return { skill, template: "expr", a, op, b, answer: [result], visual, ...extra };
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
      const bTens = randInt(0, aTens);
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

  function tables(level) {
    const factors = level === "easy" ? [11, 12] : level === "medium" ? [13, 14] : [15, 16];
    const big = pick(factors);
    const other = randInt(1, 10);
    return expr("tables", big, "×", other, big * other, null, { method: "split-factor" });
  }

  function verticalAdd(level) {
    if (level === "easy") {
      const aOnes = randInt(0, 8);
      const bOnes = randInt(0, 9 - aOnes);
      const aTens = randInt(1, 8);
      const bTens = randInt(1, 9 - aTens);
      return vertical("vadd", "+", aTens * 10 + aOnes, bTens * 10 + bOnes);
    }
    if (level === "medium") {
      const aOnes = randInt(2, 9);
      const bOnes = randInt(10 - aOnes, 9);
      const aTens = randInt(1, 7);
      const bTens = randInt(0, 8 - aTens);
      return vertical("vadd", "+", aTens * 10 + aOnes, bTens * 10 + bOnes);
    }
    const aHundreds = randInt(1, 4);
    const bHundreds = randInt(1, 4);
    const aTens = randInt(0, 7);
    const bTens = randInt(0, 7 - aTens);
    const aOnes = randInt(3, 9);
    const bOnes = randInt(10 - aOnes, 9);
    const a = aHundreds * 100 + aTens * 10 + aOnes;
    const b = bHundreds * 100 + bTens * 10 + bOnes;
    return vertical("vadd", "+", a, b);
  }

  function verticalSub(level) {
    if (level === "easy") {
      const aOnes = randInt(1, 9);
      const bOnes = randInt(0, aOnes);
      const aTens = randInt(3, 9);
      const bTens = randInt(1, aTens - 1);
      return vertical("vsub", "−", aTens * 10 + aOnes, bTens * 10 + bOnes);
    }
    if (level === "medium") {
      const aOnes = randInt(0, 7);
      const bOnes = randInt(aOnes + 1, 9);
      const aTens = randInt(3, 9);
      const bTens = randInt(1, aTens - 1);
      return vertical("vsub", "−", aTens * 10 + aOnes, bTens * 10 + bOnes);
    }
    const aHundreds = randInt(3, 8);
    const bHundreds = randInt(1, aHundreds - 1);
    const aTens = randInt(2, 9);
    const bTens = randInt(0, aTens - 1);
    const aOnes = randInt(0, 7);
    const bOnes = randInt(aOnes + 1, 9);
    const a = aHundreds * 100 + aTens * 10 + aOnes;
    const b = bHundreds * 100 + bTens * 10 + bOnes;
    return vertical("vsub", "−", a, b);
  }

  function vertical(skill, op, a, b) {
    const result = op === "+" ? a + b : a - b;
    return { skill, template: "vertical", op, a, b, answer: [result], visual: null };
  }

  function doubles(level) {
    if (level === "medium") {
      const n = randInt(2, 9);
      return expr("doubles", n, "+", n + 1, n + n + 1, null, { method: "near-double", base: n });
    }
    const n = level === "easy" ? randInt(1, 10) : randInt(11, 20);
    return expr("doubles", n, "+", n, n + n, null, { method: "double", base: n });
  }

  function family(level) {
    if (level === "easy") {
      const a = randInt(2, 9);
      const b = randInt(2, 9);
      const c = a + b;
      const askRight = random() < 0.5 ? b : a;
      const answer = c - askRight;
      return { skill: "family", template: "family", factOp: "+", a, b, c, askOp: "−", askLeft: c, askRight, answer: [answer], visual: null };
    }
    const tables = level === "medium" ? [2, 5, 10] : [3, 4, 6];
    const b = pick(tables);
    const a = randInt(2, 9);
    const c = a * b;
    return { skill: "family", template: "family", factOp: "×", a, b, c, askOp: "÷", askLeft: c, askRight: b, answer: [a], visual: null };
  }

  function compare(level) {
    if (level === "hard") {
      const a = randInt(2, 9);
      const b = randInt(1, 9);
      const sum = a + b;
      const other = Math.max(0, sum + pick([-2, -1, 1, 2]));
      return compareQuestion(sum, other, `${a} + ${b}`, String(other));
    }
    if (level === "medium") {
      const tens = randInt(1, 9);
      const leftOnes = randInt(0, 9);
      let rightOnes = randInt(0, 9);
      if (rightOnes === leftOnes) rightOnes = (rightOnes + 3) % 10;
      const left = tens * 10 + leftOnes;
      const right = tens * 10 + rightOnes;
      return compareQuestion(left, right, String(left), String(right));
    }
    const left = randInt(10, 98);
    let right = randInt(10, 98);
    if (Math.floor(left / 10) === Math.floor(right / 10)) right = left + pick([-10, 10]);
    right = Math.max(0, right);
    if (right === left) right = left + 10;
    return compareQuestion(left, right, String(left), String(right));
  }

  function compareQuestion(leftValue, rightValue, leftText, rightText) {
    const answer = leftValue > rightValue ? "gt" : leftValue < rightValue ? "lt" : "eq";
    return {
      skill: "compare",
      template: "choice",
      promptKey: "compare",
      leftValue,
      rightValue,
      leftText,
      rightText,
      choices: [
        { id: "gt", labelKey: "greater" },
        { id: "lt", labelKey: "smaller" },
        { id: "eq", labelKey: "equal" },
      ],
      answer: [answer],
      visual: null,
    };
  }

  function skip(level) {
    const step = level === "easy" ? pick([2, 5, 10]) : level === "medium" ? pick([3, 4]) : 10;
    const start = level === "hard" ? pick([3, 4, 6, 7, 8, 9]) : step;
    const sequence = Array.from({ length: 5 }, (_, index) => start + index * step);
    const blankAt = randInt(1, 3);
    return { skill: "skip", template: "skip", sequence, blankAt, step, answer: [sequence[blankAt]], visual: null };
  }

  function parity(level) {
    const n = level === "easy" ? randInt(1, 20) : level === "medium" ? randInt(10, 99) : randInt(21, 99);
    const even = n % 2 === 0;
    return {
      skill: "parity",
      template: "choice",
      promptKey: "parity",
      n,
      choices: [
        { id: "even", labelKey: "even" },
        { id: "odd", labelKey: "odd" },
      ],
      answer: [even ? "even" : "odd"],
      visual: null,
    };
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
      if (roll < 0.34) return placeQuestion(randInt(11, 50));
      if (roll < 0.67) {
        const known = randInt(1, 9);
        return { skill: "decomp", template: "bond", total: 10, known, answer: [10 - known], visual: null };
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
      if (roll < 0.25) return placeQuestion(randInt(10, 99));
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
        const known = randInt(1, 19);
        return { skill: "decomp", template: "bond", total: 20, known, answer: [20 - known], visual: null };
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
      const known = pick([10, 20, 30, 40, 50, 60, 70, 80, 90]);
      return { skill: "decomp", template: "bond", total: 100, known, answer: [100 - known], visual: null };
    }
    return choiceQuestion(randInt(21, 98));
  }

  function choiceQuestion(n) {
    const tens = Math.floor(n / 10) * 10;
    const ones = n % 10;
    const pairs = [
      [tens, ones],
      [tens, ones + 1],
      [Math.max(0, tens - 10), ones],
      [tens + 10, ones],
      [Math.max(0, tens - 20), ones + 2],
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
      promptKey: "which",
      n,
      choices,
      answer: [choices.find((item) => item.sum === n).id],
      visual: null,
    };
  }

  function columnSteps(a, b, op) {
    const places = Math.max(String(a).length, String(b).length);
    const top = [];
    const bottom = [];
    let value = a;
    let other = b;
    for (let i = 0; i < places; i++) {
      top.push(value % 10);
      bottom.push(other % 10);
      value = Math.floor(value / 10);
      other = Math.floor(other / 10);
    }
    const steps = [];
    if (op === "+") {
      let carry = 0;
      for (let i = 0; i < places; i++) {
        const sum = top[i] + bottom[i] + carry;
        steps.push({
          id: "add-col",
          place: PLACES[i],
          x: top[i],
          y: bottom[i],
          carryIn: carry,
          sum,
          write: sum % 10,
          carryOut: Math.floor(sum / 10),
        });
        carry = Math.floor(sum / 10);
      }
      if (carry) steps.push({ id: "add-carry-end", carry, place: PLACES[places] });
      return steps;
    }
    for (let i = 0; i < places; i++) {
      let used = top[i];
      let borrowed = false;
      if (used < bottom[i]) {
        borrowed = true;
        used += 10;
        top[i + 1] -= 1;
      }
      steps.push({
        id: "sub-col",
        place: PLACES[i],
        x: borrowed ? used - 10 : used,
        y: bottom[i],
        borrowed,
        used,
        diff: used - bottom[i],
      });
    }
    return steps;
  }

  function lesson(question) {
    if (question.method === "double") {
      return [{ id: "double", n: question.base, total: question.base * 2 }];
    }
    if (question.method === "near-double") {
      return [{ id: "near-double", n: question.base, total: question.base * 2 + 1 }];
    }
    if (question.method === "split-factor" || (question.template === "expr" && question.op === "×" && (question.a >= 11 || question.b >= 11))) {
      const big = question.a >= 11 ? question.a : question.b;
      const other = big === question.a ? question.b : question.a;
      const tens = Math.floor(big / 10) * 10;
      const ones = big - tens;
      return [{ id: "split-factor", big, tens, ones, other, tensProduct: tens * other, onesProduct: ones * other, total: big * other }];
    }
    if (question.template === "vertical" || (question.template === "expr" && (question.op === "+" || question.op === "−") && (question.a >= 20 || question.b >= 10))) {
      return columnSteps(question.a, question.b, question.op);
    }
    if (question.template === "expr" && question.op === "+") return [additionLesson(question.a, question.b)];
    if (question.template === "expr" && question.op === "−") return [countBack(question.a, question.b)];
    if (question.template === "expr" && question.op === "×") return [timesLesson(question.a, question.b)];
    if (question.template === "expr" && question.op === "÷") return [{ id: "divide", divisor: question.b, quotient: question.answer[0], dividend: question.a }];
    if (question.template === "missing" && question.op === "+") return [countOn(question.a, question.c)];
    if (question.template === "missing" && question.op === "−") return [{ id: "missing-sub", a: question.a, c: question.c, answer: question.answer[0] }];
    if (question.template === "missing" && question.op === "×") return [{ id: "missing-times", factor: question.a, product: question.c, answer: question.answer[0] }];
    if (question.template === "place") return [{ id: "place", tens: question.answer[0], ones: question.answer[1], n: question.n }];
    if (question.template === "read-blocks") return [{ id: "read-blocks", tens: question.tens, ones: question.ones, n: question.answer[0] }];
    if (question.template === "expand") return [{ id: "expand", n: question.n, tensPart: question.tensPart, ones: question.answer[0] }];
    if (question.template === "bond") return [{ id: "bond", known: question.known, total: question.total, missing: question.answer[0] }];
    if (question.template === "split") return [{ id: "split", n: question.n, part: question.part, rest: question.answer[0] }];
    if (question.template === "shift") return [{ id: "shift", n: question.n, delta: question.delta, result: question.answer[0] }];
    if (question.template === "family") return [{ id: "family", factOp: question.factOp, a: question.a, b: question.b, c: question.c, askOp: question.askOp, answer: question.answer[0] }];
    if (question.template === "skip") return [{ id: "skip", step: question.step, prev: question.sequence[question.blankAt - 1], next: question.answer[0] }];
    if (question.promptKey === "compare") {
      return [{ id: "compare", left: question.leftValue, right: question.rightValue, leftText: question.leftText, rightText: question.rightText, relation: question.answer[0] }];
    }
    if (question.promptKey === "parity") return [{ id: "parity", n: question.n, even: question.n % 2 === 0 }];
    if (question.promptKey === "which") {
      const chosen = question.choices.find((choice) => choice.id === question.answer[0]);
      return [{ id: "which", n: question.n, text: chosen.text }];
    }
    return [{ id: "result", value: question.answer.join(", ") }];
  }

  function additionLesson(a, b) {
    if (a === 0 || b === 0) return { id: "plus-zero", n: a + b };
    const big = Math.max(a, b);
    const small = Math.min(a, b);
    if (big >= 6 && big < 10 && small >= 10 - big) {
      const need = 10 - big;
      return { id: "make10", big, small, need, rest: small - need, total: a + b };
    }
    return countOn(big, a + b);
  }

  function countOn(from, total) {
    const jumps = [];
    for (let n = from + 1; n <= total; n++) jumps.push(n);
    return { id: "count-on", from, jumps, total };
  }

  function countBack(from, steps) {
    const jumps = [];
    for (let n = 1; n <= steps; n++) jumps.push(from - n);
    return { id: "count-back", from, jumps, total: from - steps };
  }

  function timesLesson(a, b) {
    const times = Math.min(a, b);
    const factor = Math.max(a, b);
    if (times >= 2 && times <= 4) {
      return { id: "repeated", factor, times, parts: Array.from({ length: times }, () => factor), total: a * b };
    }
    if (a === 9 || b === 9) {
      const other = a === 9 ? b : a;
      return { id: "times-nine", other, total: 9 * other };
    }
    return { id: "groups", groups: a, each: b, total: a * b };
  }

  function generate(skill, level) {
    const pools = {
      easy: ["add", "sub", "mul", "div", "decomp", "doubles", "compare", "skip", "parity"],
      medium: ["add", "sub", "mul", "div", "decomp", "doubles", "family", "compare", "skip", "vadd", "vsub"],
      hard: ["add", "sub", "mul", "div", "decomp", "family", "vadd", "vsub", "compare"],
    };
    const chosen = skill === "mixed" ? pick(pools[level]) : skill;
    if (chosen === "add") return addition(level);
    if (chosen === "sub") return subtraction(level);
    if (chosen === "mul") return multiplication(level);
    if (chosen === "div") return division(level);
    if (chosen === "tables") return tables(level);
    if (chosen === "vadd") return verticalAdd(level);
    if (chosen === "vsub") return verticalSub(level);
    if (chosen === "doubles") return doubles(level);
    if (chosen === "family") return family(level);
    if (chosen === "compare") return compare(level);
    if (chosen === "skip") return skip(level);
    if (chosen === "parity") return parity(level);
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

  return { generate, isCorrect, lesson, randInt, pick };
}
