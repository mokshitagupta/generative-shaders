console.log("hi");

// let rA = [(op(-1, 1, "rnd"), 1 / 3), (x, 1 / 3), (y, 1 / 3)];
// let rC = [
//   (rA, 0.25),
//   (oper(rC, rC, "add"), 3 / 8),
//   (oper(rC, rC, "mul"), 3 / 8),
// ];
// let rE = [((rC, rC, rC), 1)];
// let gram = [rE];
//
//

function choice(arr, p) {
  let r = Math.random();
  for (let i = 0; i < p.length; i++) {
    if (r < p[i]) {
      return arr[i];
    }
    r -= p[i];
  }
}

function vals(ri) {
  return ri.map((e) => e[0]);
}

function probs(ri) {
  return ri.map((e) => e[1]);
}

let g = {
  c: [
    [
      {
        isTerminal: false,
        m: 1,
        rules: ["a"],
        f: (ec) => (ec[0].val ? ec[0].val.toString() : ec[0].toString()),
      },
      1 / 4,
    ],
    [
      {
        isTerminal: false,
        m: 2,
        rules: ["c", "c"],
        f: (ec) => `add(${ec[0]}, ${ec[1]})`,
      },
      1 / 8,
    ],
    [
      {
        isTerminal: false,
        m: 2,
        rules: ["c", "c"],
        f: (ec) => `sub(${ec[0]}, ${ec[1]})`,
      },
      2 / 8,
    ],
    [
      {
        isTerminal: false,
        m: 2,
        rules: ["c", "c"],
        f: (ec) => `mult(${ec[0]}, ${ec[1]})`,
      },
      1 / 8,
    ],
    [
      {
        isTerminal: false,
        m: 1,
        rules: ["c"],
        f: (ec) => `cos(${ec[0]})`,
      },
      1 / 8,
    ],
    [
      {
        isTerminal: false,
        m: 1,
        rules: ["c"],
        f: (ec) => `sin(${ec[0]})`,
      },
      1 / 8,
    ],
  ],

  a: [
    [
      { val: () => (Math.random() * 2 - 1).toPrecision(2), isTerminal: true },
      1 / 3,
    ],
    [{ val: () => "x", isTerminal: true }, 1 / 3],
    [{ val: () => "y", isTerminal: true }, 1 / 3],
  ],
};
function randomArt(G, i, d) {
  let ri = G[i];

  let a;
  if (d <= 0) {
    a = ri[0][0];
  } else {
    a = choice(vals(ri), probs(ri));
  }
  let E;
  if (a.isTerminal) {
    E = a.val ? a.val() : a;
  } else {
    let m = a.m;
    while (d >= 0 && Math.random() <= 0.3) {
      d -= 1;
    }

    let ec = new Array(m);

    for (let i = 0; i < m; i++) {
      ec[i] = randomArt(G, a.rules[i], d - 1);
    }
    E = a.f(ec);
  }

  return E;
}

export function getTriple() {
  let ret = [];
  let dRange = 20;
  for (let i = 0; i < 3; i++) {
    ret.push(randomArt(g, "c", dRange));
  }
  let strRet = `(${ret[0]}, ${ret[1]}, ${ret[2]}, 1.0)`;

  // console.log(strRet);
  return strRet;
}

// getTriple();

// console.log(randomArt(g, "c", 3));
