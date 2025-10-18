import { autorun } from 'mobx';
import { RedDotNode, RedDotTrie } from '../src';

describe('RedDotManager', () => {
  test('simple insert', () => {
    const redDotManager = new RedDotTrie();
    const messageUserPath = 'messages.user';
    redDotManager.insert(messageUserPath);
    const node = redDotManager.search(messageUserPath);
    expect(redDotManager.root.children.size).toBeGreaterThan(0);
  });

  test('search', () => {
    const messageUserPath = 'messages.user';

    const redDotManager = new RedDotTrie();
    redDotManager.insert(messageUserPath);

    const node = redDotManager.search(messageUserPath);
    console.log(node);
    expect(node).toBeInstanceOf(RedDotNode);
    expect(node!.key).toBe('user');
  });

  test('complex search', () => {
    const redDotManager = new RedDotTrie();

    redDotManager.insert('messages.moment.fiend');
    redDotManager.insert('messages.moment.game');
    const momentNode = redDotManager.search('messages.moment');
    expect(momentNode?.key).toBe('moment');
    expect(momentNode?.children.size).toBe(2);
    const gameNode = redDotManager.search('messages.moment.game');
    expect(gameNode?.key).toBe('game');
  });

  test('add count', () => {
    const redDotManager = new RedDotTrie();
    redDotManager.insert('messages.moment.friend');
    redDotManager.insert('messages.moment.game');
    const momentNode = redDotManager.search('messages.moment');
    const friendNode = redDotManager.search('messages.moment.friend');
    friendNode?.setCount(1);
    const gameNode = redDotManager.search('messages.moment.game');
    gameNode?.setCount(2);
    expect(friendNode?.count).toBe(1);
    expect(gameNode?.count).toBe(2);
    expect(momentNode?.count).toBe(3);
    expect(redDotManager.root.count).toBe(3);
  });

  test('remove count', () => {
    const redDotManager = new RedDotTrie();
    redDotManager.insert('messages.moment.friend');
    redDotManager.insert('messages.moment.game');
    const momentNode = redDotManager.search('messages.moment');
    const friendNode = redDotManager.search('messages.moment.friend');
    friendNode?.setCount(1);
    const gameNode = redDotManager.search('messages.moment.game');
    gameNode?.setCount(2);
    expect(friendNode?.count).toBe(1);
    expect(gameNode?.count).toBe(2);
    expect(momentNode?.count).toBe(3);
    expect(redDotManager.root.count).toBe(3);
    gameNode?.setCount(0);
    expect(friendNode?.count).toBe(1);
    expect(gameNode?.count).toBe(0);
    expect(momentNode?.count).toBe(1);
    expect(redDotManager.root.count).toBe(1);
  });

  test('count effect', () => {
    const redDotManager = new RedDotTrie();
    redDotManager.insert('messages.moment.friend');
    const friendNode = redDotManager.search('messages.moment.friend');

    let count = 0;
    autorun(() => {
      count++;
      console.log(friendNode?.count);
    });
    autorun(() => {
      count++;
      console.log(friendNode?.count);
    });
    friendNode?.setCount(2);
    friendNode?.setCount(3);
    friendNode?.setCount(4);
    expect(count).toBe(8);
    expect(friendNode?.count).toBe(4);
  });

  test('watch count', () => {
    const redDotManager = new RedDotTrie();

    redDotManager.insert('messages.moment.friend');
    const friendNode = redDotManager.search('messages.moment.friend')!;
    const momentNode = redDotManager.search('messages.moment')!;

    let friendDotCount = 0;
    let momentDotCount = 0;

    momentNode.watch(() => {
      console.log('momentNode');
      momentDotCount = momentNode.count;
    });

    friendNode.watch(() => {
      friendDotCount = friendNode.count;
    });
    friendNode.setCount(2);
    friendNode.setCount(3);
    expect(friendDotCount).toBe(3);
    expect(momentDotCount).toBe(3);
  });

  test('cancel watch count', () => {
    const redDotManager = new RedDotTrie();
    redDotManager.insert('messages.moment.friend');
    const friendNode = redDotManager.search('messages.moment.friend')!;

    let dotCount = 0;

    const stop = friendNode.watch(() => {
      dotCount = friendNode.count;
    });
    friendNode.setCount(2);
    stop();
    friendNode.setCount(3);
    expect(dotCount).toBe(2);
  });

  test('serialize', () => {
    const redDotManager = new RedDotTrie();
    redDotManager.fromJSON({
      key: 'root',
      count: 1,
      isSilence: false,
      children: [
        {
          key: 'moment',
          count: 1,
          isSilence: false,
          children: [
            {
              key: 'friend',
              isSilence: false,
              count: 0,
              children: []
            },
            {
              key: 'game',
              count: 1,
              children: [],
              isSilence: false
            }
          ]
        }
      ]
    });
    const gameNode = redDotManager.search('moment.game');
    expect(gameNode).toBeDefined();
    expect(gameNode?.key).toBe('game');
    expect(gameNode?.count).toBe(1);

    const momentNode = redDotManager.search('moment');
    expect(momentNode?.count).toBe(1);
  });
});
