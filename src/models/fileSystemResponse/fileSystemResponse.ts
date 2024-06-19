
// Tree like structure
export class Directory {
    // root dir name (IP Address)
    name: string;
    subdirs: Directory[];
    files: string[];

    constructor(name: string) {
        this.name = name;
        this.subdirs = [];
        this.files = []
    }

    public addContent(path: string, isDir: boolean): boolean {
        const parts = path.split('/').filter((part) => part.length !== 0);

        if(parts.length === 1){
            // should be direct children of this dir
            if (isDir) {
                this.subdirs.push(new Directory(parts[0]));
            } else {
                this.files.push(parts[0]);
            }
            return true;
        }
        else if (parts.length === 2) {
            if (parts[0] !== this.name) {
                // should be in some of direct (1st children) subdirs
                const existingSubDir = this.subdirs.find((sd) => sd.name === parts[0]);
                if (existingSubDir) {
                    return existingSubDir.addContent(path, isDir);
                } else {
                    const newSubdir = new Directory(parts[0]);
                    this.subdirs.push(newSubdir);
                    return newSubdir.addContent(parts.slice(1).join('/'), isDir);
                }
            } else {
                // should be subdir/file in this instace
                if (isDir) {
                    this.subdirs.push(new Directory(parts[1]));
                } else {
                    this.files.push(parts[1]);
                }
                return true;
            }

        } else {
            // is furhter down the line of subdirs
            // grandchildren or more of root
            let added = false;
            for (let i = 0; i < this.subdirs.length; i++) {
                if(this.subdirs[i].name === parts[0]){
                    added = this.subdirs[i].addContent(parts.slice(1).join('/'), isDir);
                    if (added) {
                        break;
                    }
                }
            }
            // if not added in subdirs check if you should add more subdirs
            if (!added) {
                throw new Error("Did not find subdir");
            }

            return added;
        }
    }

    public formatToJson(){
        const thisDir = {
            [this.name] : [] as any[]
        };
        for (let i = 0; i < this.subdirs.length; i++) {
            thisDir[this.name].push(this.subdirs[i].formatToJson())            
        }

        for (let i = 0; i < this.files.length; i++) {
            thisDir[this.name].push(this.files[i]);            
        }

        return thisDir;
    }
}
