import Interface from "./interface-manager.js";

const TREE =[
        [0],
      [1,1,2],
    [1,4,1,2,5],
  [1,4,1,3,2,3,2],
[5,1,6,1,2,3,2,4,2],
        [7],
      [8,7,9]
];
const TREE_CHARS = [
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
const TREE_COLORS = [
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
const LINE_STARTER = "Advent-of-Code>";

export class Terminal{
    constructor(){
        this.#enter();
        this.#update();
    }

    #enter(){
        function generateTree(){
            return TREE.reduce((res, val, index) => {
                let padding = "".padStart(4 - ((val.length - 1) / 2));
                let row = val.reduce((res, val) => {
                    return res += TREE_COLORS[val] + TREE_CHARS[val];
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
            // To-do : Add commands.
        }
    }
}