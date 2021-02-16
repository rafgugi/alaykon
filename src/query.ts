export interface Query {
  encrypt(msg: string): string;
}

// Transformer is actually a replacer. `find` is a character to be replaced
// with each character of string `replace` sequentially.
export class Transformer implements Query {
  find: string; // char
  replace: string;

  constructor(find: string, replace: string) {
    this.find = find;
    this.replace = replace;
  }

  encrypt(msg: string): string {
    let replaceIterator = 0;
    const findLength = this.find.length;

    for (let i = 0; i < msg.length; i++) {
      const el = msg.substr(i, findLength);
      if (el == this.find) {
        const replace = this.replace[replaceIterator++ % this.replace.length];
        if (replace != el) {
          msg = msg.substr(0, i) + replace + msg.substr(i + findLength);
          i--;
        }
      }
    }

    return msg
  }
}

// Mutator switches character case (lower to upper vice versa) that contained
// in `charSet` for `times` times every `every` characters. If charset empty,
// switch every character case.
export class Mutator implements Query {
  charSet: { [key: string]: boolean };
  times: number = 1;
  every: number = 2;

  constructor(charSet: string | null, times: number, every: number) {
    this.charSet = this.buildCharSet(charSet);
    this.times = times;
    this.every = every;
  }

  encrypt(msg: string): string {
    let result = "";
    for (let i = 0; i < msg.length; i++) {
      const el = msg[i];
      if (Object.keys(this.charSet).length == 0 || this.charSet.hasOwnProperty(el)) {
        if (this.every - (i % this.every) - 1 < this.times) {
          result += this.swapCase(el);
          continue;
        }
      }
      result += el
    }

    return result
  }

  private swapCase(letter: string): string {
    if (letter.length <= 1) {
      return letter === letter.toUpperCase()
        ? letter.toLowerCase()
        : letter.toUpperCase()
    }

    return letter.split('').map(function(c) {
      return this.swapCase(c)
    }).join('');
  }

  private buildCharSet(charSet: string | null): { [key: string]: boolean } {
    let result: { [key: string]: boolean } = {}
    if (charSet == null) {
      return result
    }

    for (let i = 0; i < charSet.length; i++) {
      result[charSet[i]] = true;
    }

    return result
  }
}
