<template>
  <RootLayout />
</template>

<script setup lang="ts">
import { useRedDotTrie } from 'red-dot-vue';
import RootLayout from './pages/layout.vue';

const redDotTrie = useRedDotTrie();

setTimeout(() => {
  redDotTrie.fromJSON({
    key: 'root',
    count: 11,
    isSilence: false,
    children: [
      {
        key: 'message',
        count: 0,
        isSilence: false,
        children: []
      },
      {
        key: 'friend',
        count: 4,
        isSilence: false,
        children: [
          {
            key: 'new',
            isSilence: false,
            count: 2,
            children: []
          },
          {
            key: 'find',
            isSilence: false,
            count: 2,
            children: []
          }
        ]
      },

      {
        key: 'moment',
        count: 5,
        isSilence: false,
        children: [
          {
            key: 'game',
            isSilence: false,
            count: 1,
            children: []
          },
          {
            key: 'share',
            isSilence: false,
            count: 4,
            children: []
          }
        ]
      },
      {
        key: 'user',
        count: 2,
        isSilence: false,
        children: [
          {
            key: 'pack',
            isSilence: false,
            count: 2,
            children: []
          },
          {
            key: 'version',
            isSilence: true,
            count: 1,
            children: []
          }
        ]
      }
    ]
  });
}, 2000);
</script>
