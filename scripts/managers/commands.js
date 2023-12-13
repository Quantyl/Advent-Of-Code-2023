import fs from "fs/promises";

export async function initDay(args){
    const DAY_INDEX = args[0];
    if(DAY_INDEX == undefined || !DAY_INDEX.test(/\^d+$/)){
        return [0, "Day Index is not a number."];
    }

    try{
        const DAY_FOLDER = await fs.mkdir(`../days/day-${DAY_INDEX}`);
        await fs.writeFile(`${DAY_FOLDER}/part-1.js`, `//Part 1 file of ${DAY_FOLDER}`);
        await fs.writeFile(`${DAY_FOLDER}/part-2.js`, `//Part 2 file of ${DAY_FOLDER}`);
        await fs.writeFile(`${DAY_FOLDER}/day.js`, `//File for general methods of ${DAY_FOLDER}`);
        await fs.writeFile(`${DAY_FOLDER}/input.js`, `Input file of ${DAY_FOLDER}`);

        return [1, `Successfully created folder ${DAY_FOLDER}`];
        
    }
    catch{
        return [0, "Failure when creating day folder."];
    }
}