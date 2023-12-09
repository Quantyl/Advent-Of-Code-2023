import prompt from "prompt-sync";

export const Interface = {
    RESET : "\x1b[0m",

    STYLE_BOLD : "\x1b[01m",
    STYLE_ITALIC : "\x1b[02m",

    COLOR_BLACK : "\x1b[30m",
    COLOR_RED : "\x1b[31m",
    COLOR_GREEN : "\x1b[32m",
    COLOR_YELLOW : "\x1b[33m",
    COLOR_BLUE : "\x1b[34m",

    input : function(message, verify = () => true){
        message += this.RESET;

        let input = prompt(message);
        while(!verify(message)){
            input = prompt(message);
        }
        return input;
    },

    output : function(){
        console.log(...arguments + this.RESET);
    }
};

export default Interface;