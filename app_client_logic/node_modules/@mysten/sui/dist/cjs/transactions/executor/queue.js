"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __typeError = (msg) => {
  throw TypeError(msg);
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var __accessCheck = (obj, member, msg) => member.has(obj) || __typeError("Cannot " + msg);
var __privateGet = (obj, member, getter) => (__accessCheck(obj, member, "read from private field"), getter ? getter.call(obj) : member.get(obj));
var __privateAdd = (obj, member, value) => member.has(obj) ? __typeError("Cannot add the same private member more than once") : member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
var queue_exports = {};
__export(queue_exports, {
  ParallelQueue: () => ParallelQueue,
  SerialQueue: () => SerialQueue
});
module.exports = __toCommonJS(queue_exports);
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
//# sourceMappingURL=queue.js.map
