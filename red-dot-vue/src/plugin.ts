import { RedDotTrie } from 'red-dot';
import { type InjectionKey, type Plugin } from 'vue';

const redDotTrie = new RedDotTrie();
export const RedDotTrieInjectionKey: InjectionKey<RedDotTrie> = Symbol();

export const RedDotTriePlugin: Plugin = {
  install(app) {
    app.provide(RedDotTrieInjectionKey, redDotTrie);
  }
};
