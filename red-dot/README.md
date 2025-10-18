# red-dot

管理红点状态

- 基于前缀树
- 子级数量变更，通知父级

## Usage

### Vue

目录结构

> src
> ├── App.vue
> ├── composable
> │   └── useRedNodeCount.ts
> ├── main.ts
> ├── pages
> │   ├── friend.vue
> │   ├── game.vue
> │   ├── moment.vue
> │   └── red-dot.vue
> ├── plugins
> │   └── red-dot.ts

声明插件

```typescript
/**
 * @file src/plugin/red-dot.ts
 */
import { RedDotTrie } from 'red-dot';
import { inject, type InjectionKey, type Plugin } from 'vue';

const redDotTrie = new RedDotTrie();
const RedDotTrieInjectionKey: InjectionKey<RedDotTrie> = Symbol();

export const RedDotTriePlugin: Plugin = {
  install(app) {
    app.provide(RedDotTrieInjectionKey, redDotTrie);
  }
};

export const useRedDotTrie = () => {
  const redDotTrieInstance = inject(RedDotTrieInjectionKey);
  if (redDotTrieInstance === undefined) {
    throw new Error('unwrap');
  }
  return redDotTrieInstance;
};

export const useRedDotNode = (path: string) => {
  const redDotTrieInstance = useRedDotTrie();
  return redDotTrieInstance.search(path);
};
```

安装插件

```typescript
/**
 * @file src/main.ts
 */
import { RedDotTriePlugin } from './plugin/red-dot';
import App from './App.vue';
const app = createApp(App).use(RedDotTriePlugin);
```

可以和后端要一些数据（可选的）

```typescript
/**
 * @file src/App.vue
 * */
<script setup lang="ts">
import { useRedDotTrie } from './plugins/red-dot';

const redDotTrie = useRedDotTrie();
redDotTrie.fromJSON({
  // 必须为root
  key: 'root',
  count: 5,
  children: [
    {
      // 分享
      key: 'moment',
      count: 5,
      children: [
        {
          // 好友
          key: 'friend',
          count: 1,
          children: []
        },
        {
          // 游戏
          key: 'game',
          count: 4,
          children: []
        }
      ]
    }
  ]
});
</script>
```

red-dot.vue

```vue
<template>
  <el-tabs>
    <el-tab-pane label="home"></el-tab-pane>
    <el-tab-pane>
      <template #label>
        <el-badge
          :value="momentCount"
          :show-zero="false"
        >
          分享
        </el-badge>
      </template>
      <moment />
    </el-tab-pane>
  </el-tabs>

  <el-button @click="addFriend">朋友+1</el-button>
  <el-button @click="addGame">游戏+1</el-button>
</template>

<script setup lang="ts">
import { useRedNodeCount } from '../composable/useRedNodeCount';
import { useRedDotTrie } from '../plugins/red-dot';
import moment from './moment.vue';

const redNodeTrie = useRedDotTrie();

const momentCount = useRedNodeCount('moment');

const addFriend = () => {
  const path = 'moment.friend';
  redNodeTrie.setCountFromPath(path, 10);
};
const addGame = () => {
  const path = 'moment.game';
  redNodeTrie.setCountFromPath(path, 10);
};
</script>

<style scoped></style>
```

moment.vue

```vue
<template>
  <el-tabs
    tab-position="left"
    @tab-change="handleChange"
  >
    <el-tab-pane name="friend">
      <template #label>
        <el-badge
          :show-zero="false"
          :value="friendCount"
        >
          <span>朋友</span>
        </el-badge>
      </template>
      <Friend />
    </el-tab-pane>
    <el-tab-pane name="game">
      <template #label>
        <el-badge
          :show-zero="false"
          :value="gameCount"
        >
          <span>游戏</span>
        </el-badge>
      </template>
      <Game />
    </el-tab-pane>
  </el-tabs>
</template>

<script setup lang="ts">
import type { TabPaneName } from 'element-plus';
import { useRedNodeCount } from '../composable/useRedNodeCount';
import Friend from './friend.vue';
import Game from './game.vue';
import { useRedDotNode } from '../plugins/red-dot';

const gameCount = useRedNodeCount('moment.game');
const gameNode = useRedDotNode('moment.game');

const friendCount = useRedNodeCount('moment.friend');
const friendNode = useRedDotNode('moment.friend');

const handleChange = (key: TabPaneName) => {
  console.log(key);
  if (key === 'friend') {
    friendNode?.setCount(0);
  } else if (key === 'game') {
    gameNode?.setCount(0);
  }
};
</script>

<style scoped></style>
```

game.vue

```vue
<template>
  <div>game</div>
</template>

<script setup lang="ts"></script>

<style scoped></style>
```

friend.vue

```vue
<template>
  <div>friend</div>
</template>

<script setup lang="ts"></script>

<style scoped></style>
```
