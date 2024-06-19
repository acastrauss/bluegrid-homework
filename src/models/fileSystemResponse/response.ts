
export type DirContent = string | IDir;
export interface IDir {
    [name:string] : DirContent[];
}

export type Dir = IDir & {
    name: string;
}

function createNewDir(name: string) {
    return {
        [name]: [],
        name
    } as Dir;
}

export function addToDir(dir: Dir, path: string, isDir: boolean) : boolean{
    const parts = path.split('/').filter((part) => part.length !== 0);

        if(parts.length === 1){
            // should be direct children of this dir
            if (isDir) {
                dir[dir.name].push(createNewDir(parts[0]));
            } else {
                dir[dir.name].push(parts[0]);
            }
            return true;
        }
        else if (parts.length === 2) {
            if (parts[0] !== dir.name) {
                // should be in some of direct (1st children) subdirs
                const existingSubDir = dir[dir.name].find((sd) => {
                    if((typeof(sd) !== 'string')){
                        return parts[0] in sd;
                    }
                    return false;
                } );
                if (existingSubDir) {
                    return addToDir(existingSubDir as Dir, path, isDir);
                } else {
                    const newDir = createNewDir(parts[0]);
                    dir[dir.name].push(newDir);
                    return addToDir(newDir, parts.slice(1).join('/'), isDir);
                }
            } else {
                // should be subdir/file in this instace
                if (isDir) {
                    dir[dir.name].push(createNewDir(parts[1]));
                } else {
                    dir[dir.name].push(parts[1]);
                }
                return true;
            }

        } else {
            // is furhter down the line of subdirs
            // grandchildren or more of root
            let added = false;
            
            for (let i = 0; i < dir[dir.name].length; i++) {
                const subDir = dir[dir.name][i];
                if(typeof(subDir) !== 'string'){
                    const subDirName = (subDir as Dir).name;
                    const nextPathPart = parts[1];

                    // if current dir contains a subdirectory which is next part of path
                    const inThisSubdir = subDir[subDirName].find((sdc) => {
                        return typeof(sdc) !== 'string' && nextPathPart in (sdc as IDir);
                    });
                    if(inThisSubdir){
                        added = addToDir(subDir as Dir, parts.slice(1).join('/'), isDir);
                        if (added) {
                            break;
                        }
                    }
                }
                
            }
            // if not added in subdirs check if you should add new subdir
            if (!added) {
                throw new Error("Did not find subdir");
            }

            return added;
        }
}