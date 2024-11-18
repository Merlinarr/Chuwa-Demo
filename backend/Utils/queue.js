// queue.js

class Queue {
    constructor() {
      this.queue = [];
      this.isProcessing = false;
    }
  
    enqueue(fn) {
      this.queue.push(fn);
      if (!this.isProcessing) {
        this.processQueue();
      }
    }
  
    async processQueue() {
      if (this.queue.length === 0) {
        this.isProcessing = false;
        return;
      }
  
      this.isProcessing = true;
      const fn = this.queue.shift();
      await fn();
      this.processQueue();
    }
  }
  
  module.exports =  Queue;
  