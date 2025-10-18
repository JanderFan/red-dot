import { RedDotTrie } from 'red-dot';
import { inject, type InjectionKey, type Plugin } from 'vue';

const redDotTrie = new RedDotTrie();
const RedDotTrieInjectionKey: InjectionKey<RedDotTrie> = Symbol();

export const RedDotTriePlugin: Plugin = {
  install(app) {
    app.provide(RedDotTrieInjectionKey, redDotTrie);
  }
};

export const useRedDotTrie = () => {
  const redDotTrieInstance = inject(RedDotTrieInjectionKey);
  if (redDotTrieInstance === undefined) {
    throw new Error('unwrap');
  }
  return redDotTrieInstance;
};

export const useRedDotNode = (path: string) => {
  const redDotTrieInstance = useRedDotTrie();
  return redDotTrieInstance.search(path);
};
