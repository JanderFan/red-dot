import { RedDotNode, RedDotNodeJSON } from './RedDotNode';

export class RedDotTrie {
  public root: RedDotNode = new RedDotNode('root');

  insert(path: string) {
    const segments = path.split('.');
    let currentNode = this.root;

    for (const segment of segments) {
      // 如果当前节点存在该分支
      if (!currentNode.has(segment)) {
        const newNode = new RedDotNode(segment, currentNode);
        this.insertNode(newNode, currentNode);
      }
      currentNode = currentNode.children.get(segment)!;
    }
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

    const insert = (data: RedDotNodeJSON[], parent: RedDotNode) => {
      data.forEach((item) => {
        const node = new RedDotNode(item.key, parent);
        node.count = item.count;
        node.isSlient = item.isSlient;
        parent.children.set(item.key, node);
        if (item.children.length > 0) {
          insert(item.children, node);
        }
      });
    };
    insert(json.children, this.root);
  }
}
7;
