<template>
  <ul>
    <li>
      <el-badge
        :show-zero="false"
        :value="momentGameCount"
      >
        <el-button>游戏</el-button>
      </el-badge>
    </li>
    <li>
      <el-badge
        :show-zero="false"
        :value="momentShareCount"
      >
        <el-button>朋友圈</el-button>
      </el-badge>
    </li>
  </ul>
</template>

<script setup lang="ts">
import { useRedDotState } from '../../composable/useRedDotState';
const [momentGameCount] = useRedDotState('moment.game');
const [momentShareCount] = useRedDotState('moment.share');
</script>

<style scoped></style>
