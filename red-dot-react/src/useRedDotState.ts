import { useEffect, useState } from 'react';
import { useRedDotNode } from './useRedDotNode';

export const useRedDotState = (path: string) => {
  const node = useRedDotNode(path);
  if (node === null) {
    throw new Error('empty node');
  }

  const [count, setCount] = useState(0);
  const [silence, setSilence] = useState(false);

  useEffect(() => {
    const cancelWatchCount = node.watch(() => {
      setCount(node.count);
    });
    const cancelWatchSilence = node.watch(() => {
      setSilence(node.isSilence);
    });

    return () => {
      cancelWatchCount();
      cancelWatchSilence();
    };
  }, [setCount, setSilence]);

  return [count, silence] as const;
};
