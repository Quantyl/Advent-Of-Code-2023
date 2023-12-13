import { Interface } from "./interface-manager.js";
import { initDay, runDay } from "./commands.js";

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
        
    #COMMANDS = {
        "help" : this.#help,
        "init-day" : initDay,
        "exec-day" : runDay,
    }

    #help(){
        let output = "";
        output += "Helper functions: \n";

        const COMMANDS = Object.values(this.#COMMANDS);
        for(let i = 1; i < COMMANDS.length; i++){
            output += ` - ${COMMANDS[i]}\n`;
        }

        return [1, output];
    }


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

    async #update(){
        let run = true;

        while(run){
            const INPUT = Interface.input("Advent-of-Code>").split(" ");
            const COMMAND = this.#COMMANDS[INPUT[0]];

            if(COMMAND === undefined){
                Interface.output("ERROR: No such command, ", COMMAND[0]);
                continue;
            }

            const RESULT = await COMMAND(INPUT.splice(0, 1))
            const PREFIX = RESULT[0] ? "ERROR" : "";

            Interface.output(`${PREFIX}: ${RESULT[1]}`);
        }
    }
}