<template>
  <ul>
    <li>
      <el-badge
        :show-zero="false"
        :value="friendNewCount"
      >
        <el-button @click="handleFriend">新朋友</el-button>
      </el-badge>
    </li>
    <li>
      <el-badge
        :show-zero="false"
        :value="friendFindCount"
      >
        <el-button @click="handleFindClick">发现朋友</el-button>
      </el-badge>
    </li>
  </ul>
</template>

<script setup lang="ts">
import { useRedDotState } from '../../composable/useRedDotState';
import { useRedDotNode } from '../../plugin/red-dot';
const [friendNewCount] = useRedDotState('friend.new');
const [friendFindCount] = useRedDotState('friend.find');

const friendNewNode = useRedDotNode('friend.new');
const friendFindNode = useRedDotNode('friend.find');

const handleFriend = () => {
  friendNewNode?.setCount(0);
};

const handleFindClick = () => {
  friendFindNode?.setCount(0);
};
</script>

<style scoped></style>
