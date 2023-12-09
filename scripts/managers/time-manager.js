import { performance } from "perf_hooks";

export class Timer{
    constructor(){
        this.startTime = performance.now();
    }

    setTime(){
        this.startTime = performance.now();
        return this.startTime;
    }

    getTime(){
        const now = performance.now();
        return now - this.startTime;
    }
}