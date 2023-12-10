import promptSync from "prompt-sync";
const prompt = promptSync();

export const Interface = {
    STYLE_RESET : "\x1b[0m",
    STYLE_BOLD : "\x1b[01m",
    STYLE_ITALIC : "\x1b[02m",

    COLOR_BLACK : "\x1b[30m",
    COLOR_RED : "\x1b[31m",
    COLOR_GREEN : "\x1b[32m",
    COLOR_YELLOW : "\x1b[33m",
    COLOR_BLUE : "\x1b[34m",
    COLOR_MAGENTA : "\x1b[35m",

    input : function(message, verify = () => true){
        message += this.STYLE_RESET;

        let input = prompt(message);
        while(!verify(message)){
            input = prompt(message);
        }
        return input;
    },

    output : function(message){
        console.log(message + this.STYLE_RESET);
    }
};

export default Interface;