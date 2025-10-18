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
        <el-button @click="versionClick">新版本</el-button>
      </el-badge>
      <el-switch
        active-text="接收通知"
        inactive-text="屏蔽通知"
        :active-value="false"
        :inactive-value="true"
        :model-value="userVersionSilence"
        @input="handleChange"
        inline-prompt
      />
    </li>
  </ul>
</template>

<script setup lang="ts">
import { useRedDotNode, useRedDotState } from 'red-dot-vue';
import { computed } from 'vue';

const [userPackCount] = useRedDotState('user.pack');
const [userVersionCount, userVersionSilence] = useRedDotState('user.version');

const userVersionNode = useRedDotNode('user.version');
const color = computed(() => {
  return userVersionSilence.value ? '#cccccc' : '#ff0000';
});

const handleChange = (val: string | number | boolean) => {
  if (typeof val === 'boolean') {
    userVersionNode?.setSilence(val);
  }
};

const versionClick = () => {
  userVersionNode?.setCount(0);
};
</script>

<style scoped></style>
