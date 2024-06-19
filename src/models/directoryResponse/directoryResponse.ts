
export type DirContent = string | Directory;

export interface Directory{
    content: DirContent;
}

export interface DirReponse{
    [ipAddres: string] : Directory[];
}