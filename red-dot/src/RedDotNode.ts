import { action, autorun, makeObservable, observable } from 'mobx';

export type RedDotNodeJSON = {
  key: string;
  count: number;
  isSlient: boolean;
  children: RedDotNodeJSON[];
};

// 红点节点类（内部使用）
export class RedDotNode {
  /**
   * 存储子节点
   */
  public children: Map<string, RedDotNode> = new Map();

  /**
   * 沉默节点，不计如父节点数量
   */
  isSlient = false;
  /**
   * 红点数量
   */
  count = 0;

  constructor(
    public key: string,
    private parent: RedDotNode | null = null
  ) {
    makeObservable(this, {
      count: observable,
      isSlient: observable,
      setCount: action
    });
  }

  setSlient(slient: boolean) {
    this.isSlient = slient;
    if (this.parent !== null) {
      this.parent.collect();
    }
  }

  has(segment: string) {
    return this.children.has(segment);
  }

  setCount(count: number) {
    if (count === this.count) {
      return;
    }
    this.count = count;
    if (this.parent !== null) {
      this.parent.collect();
    }
  }

  watch(fn: () => void) {
    return autorun(fn);
  }

  collect() {
    const count = Array.from(this.children).reduce((result, item) => {
      if (item[1].isSlient) {
        return result;
      }
      return result + item[1].count;
    }, 0);
    this.setCount(count);
  }

  toJSON(): RedDotNodeJSON {
    return {
      key: this.key,
      count: this.count,
      isSlient: this.isSlient,
      children: Array.from(this.children).map((item) => {
        return item[1].toJSON();
      })
    };
  }
}
