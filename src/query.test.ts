import {
  Query,
  Transformer,
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
