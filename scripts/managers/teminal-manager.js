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
    
    #commandHistory = [];
    #COMMANDS = {
        "help" : function (args) {
            return [1, Object.keys(this.#COMMANDS).reduce((res, val) => {
                return res += ` - ${val}\n`;
    
            }, "Functions: \n")];
        }.bind(this),

        "exit" : function(args){
            this.app.forceExit();
        }.bind(this),

        "jump" : function(args){
            const JUMP_LEN = 20;

            let output = "";
            for(let i = 0; i < JUMP_LEN; i++){
                output += "\n";
            }

            return [1, output];
        }.bind(this),

        "s" : function(args){
            const INDEX = (this.#commandHistory.length - 1) - (args.length > 0 ? (Number(args[0]) || 0) : 0);
            const COMMAND = this.#commandHistory[INDEX];
            return COMMAND[0](COMMAND[1]);
            
        }.bind(this),

        "init-day" : initDay,
        "exec-day" : runDay,
    }


    constructor(app){
        this.app = app;
        this.#enter();
        this.#update();
    }

    #enter(){
        Interface.output(this.getTree());
    }

    getTree(){
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

    async #update(){
        let run = true;

        while(run){
            const INPUT = Interface.input("Advent-of-Code>").split(" ");
            const COMMAND = this.#COMMANDS[INPUT[0]];

            if(COMMAND === undefined){
                Interface.output(`${Interface.COLOR_RED}ERROR: No such command`);
                continue;
            }

            const RESULT = await COMMAND(INPUT)
            const PREFIX = RESULT[0] ? "" : `${Interface.COLOR_RED}ERROR: `;

            this.#commandHistory.push([COMMAND, INPUT]);

            Interface.output(`${PREFIX}${RESULT[1]}`);
        }
    }
}