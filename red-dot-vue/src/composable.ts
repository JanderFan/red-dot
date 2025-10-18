import { inject, onUnmounted, ref } from 'vue';
import { RedDotTrieInjectionKey } from './plugin';

export function useRedDotState(path: string) {
  const node = useRedDotNode(path);
  if (node === null) {
    throw new Error('empty node');
  }
  const count = ref(0);
  const silence = ref(false);

  const watchCount = node.watch(() => {
    count.value = node.count;
  });
  const watchSilence = node.watch(() => {
    // console.log('node.isSilence', node.isSilence);
    silence.value = node.isSilence;
  });

  onUnmounted(() => {
    watchCount();
    watchSilence();
  });

  return [count, silence] as const;
}

export const useRedDotTrie = () => {
  const redDotTrieInstance = inject(RedDotTrieInjectionKey);
  if (redDotTrieInstance === undefined) {
    throw new Error('unwrap');
  }
  return redDotTrieInstance;
};

export const useRedDotNode = (path: string) => {
  const redDotTrieInstance = useRedDotTrie();
  return redDotTrieInstance.insert(path);
};
