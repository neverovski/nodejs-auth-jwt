import type { Job, Queue } from 'bull';

import { JobHandler } from '@common/types';
import { QueueUtil } from '@common/utils';

export class ConsumerCoreJob {
  private concurrency: number;
  private jobHandlers: Map<string, JobHandler>;
  private queue: Queue;

  constructor(name: string, concurrency = 1) {
    this.concurrency = concurrency;
    this.jobHandlers = new Map();

    this.queue = QueueUtil.connect(name);
  }

  startProcessJob() {
    void this.queue.process(this.concurrency, this.processJob.bind(this));
  }

  protected registerJobHandler<T>(name: string, handler: JobHandler<T>) {
    this.jobHandlers.set(name, handler);
  }

  private async processJob(job: Job) {
    const jobName = job.name;
    const jobHandler = this.jobHandlers.get(jobName);

    if (jobHandler) {
      await jobHandler.call(this, job);
    } else {
      console.error(`No handler found for job type: ${jobName}`);
      await job.discard();
    }
  }
}
