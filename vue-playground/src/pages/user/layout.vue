<template>
  <ul>
    <li>
      <el-badge
        :show-zero="false"
        :value="userPackCount"
      >
        <el-button>钱包</el-button>
      </el-badge>
    </li>
    <li>
      <el-badge
        :show-zero="false"
        :value="userVersionCount"
        :color="color"
      >
        <el-button>新版本</el-button>
      </el-badge>
      <el-switch
        active-text="接收通知"
        inactive-text="屏蔽通知"
        :active-value="false"
        :inactive-value="true"
        :model-value="userVersionSlient"
        @change="handleChange"
        inline-prompt
      />
    </li>
  </ul>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRedDotState } from '../../composable/useRedDotState';
import { useRedDotNode } from '../../plugin/red-dot';
const [userPackCount] = useRedDotState('user.pack');
const [userVersionCount, userVersionSlient] = useRedDotState('user.version');

const userVersionNode = useRedDotNode('user.version');
const color = computed(() => {
  return userVersionSlient.value ? '#cccccc' : '#ff0000';
});

const handleChange = (val: boolean) => {
  console.log('val', val);
  userVersionNode?.setSlient(val);
};
</script>

<style scoped></style>
