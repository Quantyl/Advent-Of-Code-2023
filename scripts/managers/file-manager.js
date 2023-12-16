import fs from "fs/promises";
import path from "path";

export const FileManager = {

    getAbsPath : function(pathOrg, pathDes){
        return path.resolve(pathDes, pathOrg);
    },

    createFile : async function(path, content){
        await fs.writeFile(path, content);
        return path;
    },

    createDir : async function(path){
        await fs.mkdir(path);
    },

    readFile : async function(filePath){
        return await fs.readFile(filePath, "utf-8");
    }

}