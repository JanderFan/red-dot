<template>
  <div class="container">
    <el-tabs tab-position="bottom">
      <el-tab-pane>
        <template #label>
          <el-badge :show-zero="false">
            <span>消息</span>
          </el-badge>
        </template>
        <message />
      </el-tab-pane>
      <el-tab-pane>
        <template #label>
          <el-badge
            :show-zero="false"
            :value="friendCount"
          >
            <span>朋友</span>
          </el-badge>
        </template>
        <friend />
      </el-tab-pane>
      <el-tab-pane>
        <template #label>
          <el-badge
            :show-zero="false"
            :value="momentCount"
          >
            <span>分享</span>
          </el-badge>
        </template>
        <moment />
      </el-tab-pane>
      <el-tab-pane>
        <template #label>
          <el-badge
            :show-zero="false"
            :value="userCount"
          >
            <span>用户</span>
          </el-badge>
        </template>
        <user />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script setup lang="ts">
import { useRedDotState } from '../composable/useRedDotState';
import friend from './friend/layout.vue';
import message from './message/layout.vue';
import moment from './moment/layout.vue';
import user from './user/layout.vue';

const [friendCount] = useRedDotState('friend');
const [momentCount] = useRedDotState('moment');
const [userCount] = useRedDotState('user');
</script>

<style scoped>
.container {
  width: 500px;
}
</style>
