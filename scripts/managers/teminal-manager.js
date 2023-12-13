import Interface from "./interface-manager.js";

export class Command{
    static FAILURE_CODE = 0;
    static SUCCESS_CODE = 1;

    constructor(execMessage, cmndPrefix){
        this.execMessage = execMessage;
        this.cmndPrefix = cmndPrefix;
    }

    execute() { return [Command.FAILURE_CODE, "Execution method not implemented"]; }
}

export class Terminal{
    #TREE =[
        [0],
        [1,1,2],
        [1,4,1,2,5],
        [1,4,1,3,2,3,2],
        [5,1,6,1,2,3,2,4,2],
        [7],
        [8,7,9]
    ];
    #TREE_CHARS = [
        "+",
        "<",
        ">",
        "$",
        ",",
        "@",
        "&",
        "|",
        "/",
        "\\"
    ];
    #TREE_COLORS = [
        Interface.STYLE_BOLD + Interface.COLOR_YELLOW,
        Interface.STYLE_RESET + Interface.COLOR_GREEN,
        Interface.STYLE_RESET + Interface.COLOR_GREEN,
        Interface.STYLE_RESET + Interface.COLOR_BLUE,
        Interface.STYLE_RESET + Interface.COLOR_GREEN,
        Interface.STYLE_RESET + Interface.COLOR_MAGENTA,
        Interface.STYLE_RESET + Interface.COLOR_RED,
        Interface.STYLE_RESET + Interface.COLOR_BLACK,
        Interface.STYLE_RESET + Interface.COLOR_BLACK,
        Interface.STYLE_RESET + Interface.COLOR_BLACK,
    ];

    #LINE_STARTER = "Advent-of-Code>";


    constructor(){
        this.#enter();
        this.#update();
    }

    #enter(){
        function generateTree(){
            return this.#TREE.reduce((res, val, index) => {
                let padding = "".padStart(4 - ((val.length - 1) / 2));
                let row = val.reduce((res, val) => {
                    return res += this.#TREE_COLORS[val] + this.#TREE_CHARS[val];
                }, padding);

                switch(index){
                    case 2:
                        row += `          ${Interface.STYLE_BOLD}${Interface.COLOR_YELLOW}-Advent of Code-`;
                        break;
                    case 3:
                        row += `           ${Interface.STYLE_BOLD}${Interface.COLOR_BLUE}-Year 2023-`;
                        break;
                }

                return res += (row + padding + "\n");
            }, "");
        }

        let tree = generateTree();
        Interface.output(tree);
    }

    #update(){
        let run = true;

        while(run){
            Interface.input(LINE_STARTER);
            /* To-do : Add commands: 
                -init-day __index__
                -read-day __index__ (returns time to run, completed-status, etc. from day__index__.json)
                -run-day __index__ (runs day, and if no errors, return time taken, etc.)
                -set-day __index__ (set the info for day__index__.json)
            */
        }
    }

    logError(error, message){

    }
}