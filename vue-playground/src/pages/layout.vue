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

    <div>
      <el-button @click="friendAdd"> 收到新朋友添加 </el-button>
      <el-button @click="friendFind"> 发现新朋友 </el-button>
      <el-button @click="newVersion"> 发现新版本 </el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { random } from 'lodash-es';
import { useRedDotState, useRedDotTrie } from 'red-dot-vue';
import friend from './friend/layout.vue';
import message from './message/layout.vue';
import moment from './moment/layout.vue';
import user from './user/layout.vue';

const redDotTrie = useRedDotTrie();
const [friendCount] = useRedDotState('friend');
const [momentCount] = useRedDotState('moment');
const [userCount] = useRedDotState('user');

const friendAdd = () => {
  redDotTrie.setCountFromPath('friend.new', random(10, false));
};

const friendFind = () => {
  redDotTrie.setCountFromPath('friend.find', random(10, false));
};
const newVersion = () => {
  redDotTrie.setCountFromPath('user.version', 1);
};
</script>

<style scoped>
.container {
  width: 500px;
}
</style>
