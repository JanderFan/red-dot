import { RootKey } from './constant';
import { RedDotNode, RedDotNodeJSON } from './RedDotNode';
import { RedDotRootNode } from './RedDotRootNode';

export class RedDotTrie {
  public readonly root: RedDotNode = new RedDotRootNode(RootKey);

  insert(path: string) {
    const segments = path.split('.');
    let currentNode = this.root;
    let newNode: RedDotNode | null = null;

    for (const segment of segments) {
      // 如果当前节点不存在该分支
      if (!currentNode.has(segment)) {
        newNode = new RedDotNode(segment, currentNode);
        this.insertNode(newNode, currentNode);
      }
      currentNode = currentNode.children.get(segment)!;
    }
    return newNode ?? currentNode;
  }

  private insertNode(node: RedDotNode, parentNode: RedDotNode) {
    parentNode.children.set(node.key, node);
  }

  search(path: string): RedDotNode | null {
    const segments = path.split('.');
    let currentNode = this.root;
    for (const segment of segments) {
      if (!currentNode.has(segment)) {
        return null;
      }
      currentNode = currentNode.children.get(segment)!;
    }
    return currentNode;
  }

  setCountFromPath(path: string, count: number) {
    const node = this.search(path);
    node?.setCount(count);
  }

  toJSON() {
    return this.root.toJSON();
  }

  fromJSON(json: RedDotNodeJSON) {
    this.root.setCount(json.count);
    const filterRoot = (item: string) => item !== '';

    const insert = (data: RedDotNodeJSON[], parent: RedDotNode) => {
      console.log('parent', parent.key);
      data.forEach((item) => {
        console.log('item.key', item.key);

        const searchPath = [parent.path, item.key].filter(filterRoot).join('.');
        const nodeInTree = this.search(searchPath);
        // 如果存在node
        if (nodeInTree) {
          // 赋值
          // nodeInTree.count = item.count;
          // nodeInTree.isSilence = item.isSilence;
          nodeInTree.setCount(item.count);
          nodeInTree.setSilence(item.isSilence);
          if (item.children.length > 0) {
            insert(item.children, nodeInTree);
          }
        } else {
          const newNode = new RedDotNode(item.key, parent);
          // newNode.count = item.count;
          // newNode.isSilence = item.isSilence;
          newNode.setCount(item.count);
          newNode.setSilence(item.isSilence);

          parent.children.set(item.key, newNode);
          if (item.children.length > 0) {
            insert(item.children, newNode);
          }
        }
      });
    };
    insert(json.children, this.root);
  }
}
7;
