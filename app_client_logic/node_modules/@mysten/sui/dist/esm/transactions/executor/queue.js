var __typeError = (msg) => {
  throw TypeError(msg);
};
var __accessCheck = (obj, member, msg) => member.has(obj) || __typeError("Cannot " + msg);
var __privateGet = (obj, member, getter) => (__accessCheck(obj, member, "read from private field"), getter ? getter.call(obj) : member.get(obj));
var __privateAdd = (obj, member, value) => member.has(obj) ? __typeError("Cannot add the same private member more than once") : member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
var _queue, _queue2;
class SerialQueue {
  constructor() {
    __privateAdd(this, _queue, []);
  }
  async runTask(task) {
    return new Promise((resolve, reject) => {
      __privateGet(this, _queue).push(() => {
        task().finally(() => {
          __privateGet(this, _queue).shift();
          if (__privateGet(this, _queue).length > 0) {
            __privateGet(this, _queue)[0]();
          }
        }).then(resolve, reject);
      });
      if (__privateGet(this, _queue).length === 1) {
        __privateGet(this, _queue)[0]();
      }
    });
  }
}
_queue = new WeakMap();
class ParallelQueue {
  constructor(maxTasks) {
    __privateAdd(this, _queue2, []);
    this.activeTasks = 0;
    this.maxTasks = maxTasks;
  }
  runTask(task) {
    return new Promise((resolve, reject) => {
      if (this.activeTasks < this.maxTasks) {
        this.activeTasks++;
        task().finally(() => {
          if (__privateGet(this, _queue2).length > 0) {
            __privateGet(this, _queue2).shift()();
          } else {
            this.activeTasks--;
          }
        }).then(resolve, reject);
      } else {
        __privateGet(this, _queue2).push(() => {
          task().finally(() => {
            if (__privateGet(this, _queue2).length > 0) {
              __privateGet(this, _queue2).shift()();
            } else {
              this.activeTasks--;
            }
          }).then(resolve, reject);
        });
      }
    });
  }
}
_queue2 = new WeakMap();
export {
  ParallelQueue,
  SerialQueue
};
//# sourceMappingURL=queue.js.map
