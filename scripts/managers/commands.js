import { FileManager } from "./file-manager.js";

const TOP_DIR_PATH = "/Programming/JavaScript/Advent-of-Code-2023";

export async function initDay(args){
    const DAY_INDEX = args[1];
    if(DAY_INDEX == undefined || !/^\d+$/.test(DAY_INDEX)){
        return [0, "Day Index is not a number."];
    }

    try{
        const TOP_PATH = `${TOP_DIR_PATH}/scripts/days/day-${DAY_INDEX}`;
        await FileManager.createDir(TOP_PATH);
        await FileManager.createFile(`${TOP_PATH}/part-1.js`, `const CONTENT = await FileManager.readFile("/Programming/JavaScript/Advent-of-Code-2023/scripts/days/day-${DAY_INDEX}/input.txt");`);
        await FileManager.createFile(`${TOP_PATH}/part-2.js`, `const CONTENT = await FileManager.readFile("/Programming/JavaScript/Advent-of-Code-2023/scripts/days/day-${DAY_INDEX}/input.txt");`);
        await FileManager.createFile(`${TOP_PATH}/input.txt`, `Input file of ${TOP_PATH}`);

        return [1, `Successfully created folder ${TOP_PATH}`];
        
    }
    catch(err){
        return [0, err, "Failure when creating day folder."];
    }
}

export async function runDay(args){
    const DAY_INDEX = args[1];
    if(DAY_INDEX == undefined || !/^\d+$/.test(DAY_INDEX)){
        return [0, "Day Index is not a number."];
    }

    const PART_INDEX = args[2];
    if(PART_INDEX != "1" && PART_INDEX != "2"){
        return [0, "Part Index is not valid."];
    }

    try{
        const FILE_CONTENT = await FileManager.readFile(`${TOP_DIR_PATH}/scripts/days/day-${DAY_INDEX}/part-${PART_INDEX}.js`, "utf-8");
        await eval(`(async function() { ${FILE_CONTENT} })();`);

        return [1, `Successfully ran day ${DAY_INDEX}, part ${PART_INDEX}`];
    }
    catch(err){
        return [0, err];
    }
}