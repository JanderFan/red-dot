<template>
  <ul>
    <li>
      <el-badge
        :show-zero="false"
        :value="momentGameCount"
      >
        <el-button @click="game">游戏</el-button>
      </el-badge>
    </li>
    <li>
      <el-badge
        :show-zero="false"
        :value="momentShareCount"
      >
        <el-button @click="share">朋友圈</el-button>
      </el-badge>
    </li>
  </ul>
</template>

<script setup lang="ts">
import { useRedDotNode, useRedDotState } from 'red-dot-vue';
const [momentGameCount] = useRedDotState('moment.game');
const gameNode = useRedDotNode('moment.game');
const [momentShareCount] = useRedDotState('moment.share');
const shareNode = useRedDotNode('moment.share');

const game = () => {
  gameNode?.setCount(0);
};

const share = () => {
  shareNode?.setCount(0);
};
</script>

<style scoped></style>
