import { action, autorun, makeObservable, observable } from 'mobx';
import { RootKey } from './constant';

export type RedDotNodeJSON = {
  key: string;
  count: number;
  isSilence: boolean;
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
  isSilence = false;
  /**
   * 红点数量
   */
  count = 0;

  get path(): string {
    let parent = this.parent;
    const result = [this.key];
    while (parent !== null) {
      if (parent.key === RootKey) {
        break;
      }
      result.unshift(parent.key);
      parent = parent.parent;
    }
    return result.join('.');
  }

  constructor(
    public key: string,
    private parent: RedDotNode | null = null
  ) {
    makeObservable(this, {
      count: observable,
      isSilence: observable,
      setCount: action,
      setSilence: action
    });
  }

  setSilence(silence: boolean) {
    this.isSilence = silence;
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
      if (item[1].isSilence) {
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
      isSilence: this.isSilence,
      children: Array.from(this.children).map((item) => {
        return item[1].toJSON();
      })
    };
  }
}
