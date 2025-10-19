# red-dot

管理红点状态

- 基于前缀树
- 子级数量变更，通知父级

## Install

```shell
pnpm add red-dot
```

## Usage

### Vue

#### Install

```shell
pnpm add red-dot-vue
```

目录结构

src
├── App.vue
├── main.ts
├── pages
│   ├── friend.vue
│   ├── game.vue
│   ├── moment.vue
│   └── red-dot.vue

安装插件

```typescript
/**
 * @file src/main.ts
 */
import { RedDotTriePlugin } from 'red-dot-vue';
import App from './App.vue';
const app = createApp(App).use(RedDotTriePlugin);
```

可以和后端要一些数据（可选的）

```typescript
/**
 * @file src/App.vue
 * */
<script setup lang="ts">
import { useRedDotTrie } from 'red-dot-vue';

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
import { useRedNodeCount, useRedDotTrie } from 'red-dot-vue';
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
import { useRedNodeCount, useRedDotNode } from 'red-dot-vue';
import Friend from './friend.vue';
import Game from './game.vue';

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

### React

#### Install

```shell
pnpm add red-dot-react
```

#### 目录结构

├── App.tsx
├── main.tsx
├── pages
│   ├── Friend.tsx
│   ├── Moment.tsx
│   └── RootLayout.tsx

```typescript
/**
 * @file main.tsx
 */
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RedDotProvider } from 'red-dot-react';
import App from './App.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RedDotProvider>
      <App />
    </RedDotProvider>
  </StrictMode>
);
```

```typescript
/**
 * @file App.tsx
 */
import { useEffect } from 'react';
import { useRedDotContext } from 'red-dot-react';
import RootLayout from './pages/RootLayout';

const App = () => {
  const redDotContext = useRedDotContext();

  useEffect(() => {
    const timeout = setTimeout(() => {
      redDotContext.fromJSON({
        key: 'root',
        count: 11,
        isSilence: false,
        children: [
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
    }, 3000);
    return () => {
      clearTimeout(timeout);
    };
  }, [redDotContext]);

  return <RootLayout />;
};

export default App;

```

```typescript
/**
 * @file pages/RootLayout.tsx
 */
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
// import { useRedDotState } from 'red-dot-react';
import { useRedDotState } from 'red-dot-react';
import Friend from './Friend';
import Moment from './Moment';

const RootLayout = () => {
  const [friendCount] = useRedDotState('friend');
  const [userCount] = useRedDotState('user');
  console.log('RootLayout');
  return (
    <Tabs
      defaultValue="friend"
      className="w-[400px] m-auto mt-3.5"
    >
      <TabsList>
        <TabsTrigger
          value="friend"
          className="relative"
        >
          <Badge
            className="absolute top-0 right-0 translate-x-1/2 -translate-y-1/2 h-5 min-w-5 rounded-full px-1 font-mono tabular-nums"
            variant="destructive"
          >
            {friendCount}
          </Badge>
          <span>朋友</span>
        </TabsTrigger>
        <TabsTrigger
          className="relative"
          value="moment"
        >
          <Badge
            className="absolute top-0 right-0 translate-x-1/2 -translate-y-1/2 h-5 min-w-5 rounded-full px-1 font-mono tabular-nums"
            variant="destructive"
          >
            {userCount}
          </Badge>
          <span>moment</span>
        </TabsTrigger>
      </TabsList>
      <TabsContent value="friend">
        <Friend />
      </TabsContent>
      <TabsContent value="moment">
        <Moment />
      </TabsContent>
    </Tabs>
  );
};

export default RootLayout;
```

```typescript
/**
 * @file pages/Friend.tsx
 */
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useRedDotState } from 'red-dot-react';

const Friend = () => {
  const [newFriendCount] = useRedDotState('friend.new');
  const [findFriendCount] = useRedDotState('friend.find');

  return (
    <div className="space-y-3">
      <div>
        <Button>
          new friend
          <Badge variant={'destructive'}>{newFriendCount}</Badge>
        </Button>
      </div>
      <div>
        <Button>
          find friend
          <Badge variant={'destructive'}>{findFriendCount}</Badge>
        </Button>
      </div>
    </div>
  );
};

export default Friend;

```

```typescript
/**
 * @file pages/Moment.tsx
 */
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { useRedDotNode, useRedDotState } from 'red-dot-react';

const Moment = () => {
  const [userPackCount] = useRedDotState('user.pack');
  const packNode = useRedDotNode('user.pack');
  const [userVersionCount, userSilence] = useRedDotState('user.version');
  const versionNode = useRedDotNode('user.version');

  const handleCheckChange = (checked: boolean) => {
    versionNode?.setSilence(checked);
  };

  const handlePackClick = () => {
    packNode?.setCount(0);
  };

  console.log('moment');
  return (
    <div className="space-y-3">
      <div>
        <Button onClick={handlePackClick}>
          钱包
          <Badge variant={'destructive'}>{userPackCount}</Badge>
        </Button>
      </div>
      <div>
        <Button>
          版本
          <Badge variant={userSilence ? 'default' : 'destructive'}>{userVersionCount}</Badge>
        </Button>
        <Switch
          checked={userSilence}
          onCheckedChange={handleCheckChange}
        />
      </div>
    </div>
  );
};

export default Moment;


```
