<template>
  <RootLayout />
</template>

<script setup lang="ts">
import RootLayout from './pages/layout.vue';
import { useRedDotTrie } from './plugin/red-dot';

const redDotTrie = useRedDotTrie();

redDotTrie.fromJSON({
  key: 'root',
  count: 11,
  isSlient: false,
  children: [
    {
      key: 'message',
      count: 0,
      isSlient: false,
      children: []
    },
    {
      key: 'friend',
      count: 4,
      isSlient: false,
      children: [
        {
          key: 'new',
          isSlient: false,
          count: 2,
          children: []
        },
        {
          key: 'find',
          isSlient: false,
          count: 2,
          children: []
        }
      ]
    },

    {
      key: 'moment',
      count: 5,
      isSlient: false,
      children: [
        {
          key: 'game',
          isSlient: false,
          count: 1,
          children: []
        },
        {
          key: 'share',
          isSlient: false,
          count: 4,
          children: []
        }
      ]
    },
    {
      key: 'user',
      count: 2,
      isSlient: false,
      children: [
        {
          key: 'pack',
          isSlient: false,
          count: 2,
          children: []
        },
        {
          key: 'version',
          isSlient: true,
          count: 1,
          children: []
        }
      ]
    }
  ]
});
</script>
