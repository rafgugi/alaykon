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
