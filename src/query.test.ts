import {
  Query,
  Transformer,
  Mutator,
} from "./query";

interface QueryTestCase {
  query: Query;
  src: string;
  dst: string;
}

type TestCases = Record<string, QueryTestCase>;

describe("Transformer", () => {
  const tests: TestCases = {
    "transforms letter i": {
      query: new Transformer("i", "i1!i!1"),
      src: "Idiiiiiih kitinyi kili sikit dikisih cuit",
      dst: "Idi1!i!1h kit1ny! kil! s1kit d1k!sih cu!t",
    },
    "transforms 2 letters ng": {
      query: new Transformer("ng", "nk"),
      src: "wala dalah km kok nggak ngapa ngapain?",
      dst: "wala dalah km kok kak napa kapain?",
    }
  }
  for (const name in tests) {
    const t = tests[name];

    it(name, async () => {
      const got = t.query.encrypt(t.src);
      expect(got).toEqual(t.dst);
    });
  }
});

describe("Mutator", () => {
  const tests: TestCases = {
    "transform everything once every 2 char": {
      query: new Mutator(null, 1, 2),
      src: "Idiiiiiih kitinyi kili sikit dikisih cuit",
      dst: "IDiIiIiIh kItInYi kIlI SiKiT DiKiSiH CuIt",
    },
    "transform every vocal twice every 3 char": {
      query: new Mutator("aiueo", 2, 3),
      src: "Aduuuuhh katanya kalo sakit dikasih cuti",
      dst: "AdUuUUhh kAtanya kalO sAkIt dIkAsih cUti",
    },
  }
  for (const name in tests) {
    const t = tests[name];

    it(name, async () => {
      const got = t.query.encrypt(t.src);
      expect(got).toEqual(t.dst);
    });
  }
});
