export default class TaskQueue {
    concurrency: number;
    queue: Array<() => Promise<void>>;
    running: number;
    waitTimeoutSec: number;

  
    constructor(concurrency: number, waitTimeoutSec: number = 30) {
        this.concurrency = concurrency;
        this.queue = [];
        this.running = 0;
        this.waitTimeoutSec = waitTimeoutSec;
    }
  
    pushTask(task: () => Promise<void>): void {
        this.queue.push(task);
        this.next();
    }
  
    next(): void {
        if (this.running === this.concurrency || this.queue.length === 0) {
            return;
        }
        this.running++;
        let task = this.queue.shift();
        if (task) {
            task().finally(() => {
                this.running--;
                this.next();
            });
        }
    }

    isRunning(): boolean {
        return this.running > 0;
    }

    async wait(): Promise<void> {
        let retry = 0;
        const freq = 100;
        while (this.isRunning()) {
            if (retry < this.waitTimeoutSec * 1000 / freq) {
                await new Promise(resolve => setTimeout(resolve, freq));
                retry++;
            } else {
                throw new Error("TaskQueue timeout");
            }
        }
    }
}