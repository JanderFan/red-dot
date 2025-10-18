import { createContext, useContext } from 'react';
import { RedDotTrie } from 'red-dot';

export const RedDotContext = createContext<RedDotTrie | null>(null);

export const useRedDotContext = () => {
  const instance = useContext(RedDotContext);
  if (instance === null) {
    throw new Error('no instance');
  }
  return instance;
};
