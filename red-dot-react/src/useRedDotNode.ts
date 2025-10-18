import { useRedDotContext } from './context';

export const useRedDotNode = (path: string) => {
  const redDotTrie = useRedDotContext();
  return redDotTrie.search(path);
};
