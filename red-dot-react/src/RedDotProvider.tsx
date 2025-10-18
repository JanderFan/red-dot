import type { FC, PropsWithChildren } from 'react';
import { RedDotTrie } from 'red-dot';
import { RedDotContext } from './context';

export const RedDotProvider: FC<PropsWithChildren> = ({ children }) => {
  const redDotTrie = new RedDotTrie();
  return <RedDotContext.Provider value={redDotTrie}>{children}</RedDotContext.Provider>;
};
