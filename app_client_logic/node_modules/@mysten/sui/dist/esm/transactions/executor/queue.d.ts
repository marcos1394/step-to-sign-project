export declare class SerialQueue {
    #private;
    runTask<T>(task: () => Promise<T>): Promise<T>;
}
export declare class ParallelQueue {
    #private;
    activeTasks: number;
    maxTasks: number;
    constructor(maxTasks: number);
    runTask<T>(task: () => Promise<T>): Promise<T>;
}
