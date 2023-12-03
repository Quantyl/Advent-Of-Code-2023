import { performance } from "perf_hooks";

class Application{
    constructor(entryFile){
        process.on("exit", (code) => this.#exit(code));
        this.#enter(entryFile);
    }

    #entryFile = "__undefined__";
    #entryTime = "__undefined__";

    get entryFile() { return this.#entryFile };
    get runTime(){
        const elapsed = performance.now() - this.#entryTime;
        return elapsed;
    }

    #exit(code){
        const EXIT_CODES = {
            0 : "with no errors",
            1 : "with fatal error(s)",
            6 : "with warnings"
        };
        let exitStatus = EXIT_CODES[code] || ("with exit-code", code);

        const statusMessage = `Exited application ${exitStatus}.`;
        const timeMessage = `Elapsed time since start (milliseconds): ${this.runTime}`;
        
        console.log(`${statusMessage}\n${timeMessage}`);
    }

    #enter(entryFile){
        this.#entryFile = entryFile;
        this.#entryTime = performance.now();

        console.log("Started application from:", entryFile);
    }
}

export const application = new Application(import.meta.url);
export default application;