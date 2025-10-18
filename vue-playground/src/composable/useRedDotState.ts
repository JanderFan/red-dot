import { onUnmounted, ref } from 'vue';
import { useRedDotNode } from './../plugin/red-dot';

export function useRedDotState(path: string) {
  const node = useRedDotNode(path);
  if (node === null) {
    throw new Error('empty node');
  }
  const count = ref(0);
  const slient = ref(false);

  const watchCount = node.watch(() => {
    count.value = node.count;
  });
  const watchSlient = node.watch(() => {
    slient.value = node.isSlient;
  });

  onUnmounted(() => {
    watchCount();
    watchSlient();
  });

  return [count, slient] as const;
}
