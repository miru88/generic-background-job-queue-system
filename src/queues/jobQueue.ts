import { Queue, Worker, Job} from 'bullmq';


export class JobQueue<T, N extends string> {
    private queue: Queue<T, N>;
    private worker: Worker<T,N>;

    constructor(queueName: string, processor: (job: Job<T, N>) => Promise<any>) {
        this.queue = new Queue<T, N>(queueName);
        this.worker = new Worker<T,N>(queueName, processor);
    }

    async addJob(name: N, data: T, opts?: object) {
        return this.queue.add(name as unknown as any, data as unknown as any, opts);//expects ExtractNameType<T, N>, ExtractNameType<T, N>: no idea what its talking about
    }
}
