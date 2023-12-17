import { Timer } from "./scripts/managers/time-manager.js";
import { Terminal } from "./scripts/managers/teminal-manager.js";

class Application{
    constructor(entryFile){
        process.on("exit", (code) => this.#exit(code));
        this.#enter(entryFile);
    }

    #entryFile = undefined;
    #timer = undefined;

    get entryFile() { return this.#entryFile };
    get runTime() { return this.#timer.getTime() };

    forceExit(){
        process.exit(0);
    }

    #exit(code){
        const EXIT_CODES = {
            0 : "with no errors",
            1 : "with fatal error(s)",
            6 : "with warnings"
        };

        let exitStatus = EXIT_CODES[code] || ("with exit-code", code);
        console.log(`Exited application ${exitStatus} after ${this.runTime / 1000}sec`);
    }

    #enter(entryFile){
        this.#timer = new Timer();
        this.#entryFile = entryFile;

        console.log("Started application from", entryFile);

        new Terminal(this);
    }
}

export const application = new Application(import.meta.url);
export default application;