import { Token } from "../store/supportedTokens/slice";

export class UniqueObjectSet<T> {
  ids: Set<string> = new Set();
  objects: Array<T> = [];

  constructor(original?: UniqueObjectSet<T>) {
    if (original) {
      this.ids = new Set(original.ids);
      this.objects = Array.from(original.objects);
    }
  }

  addObject = (
    id: string, object: T
  ) => {
    if (!this.ids.has(id)) {
      this.ids.add(id);
      this.objects.push(object);
    }

    return this;
  };
}

export type TokenId = string

export const getTokenId = (token: Token) : TokenId => token.chainId + '-' + token.address