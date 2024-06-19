interface LastNodeRetVal {
    lastNode: RadixNode;
    urlPartsThatLeft: string[];
}

export enum NodeType {
    ROOT = 0,
    FILE = 1,
    DIRECTORY = 2,
    NON_TERMINAL = 3
}

// The idea is to use Radix tree since it has good applications in IP routing
// Each node will represent a part of path of one file
// e.g. : myurl/some/path
// my/url/some/other
//  myurl
//    |
//  some 
//  /  \
//path other
export class RadixNode {
    root: string;
    type: NodeType;
    children: Map<string, RadixNode>;

    constructor(root: string, type: NodeType) {
        this.root = root;
        this.type = type;
        this.children = new Map<string, RadixNode>();
    }

    public insert(urlParts: string[], type: NodeType){
        const lastNode = this.findLastNodeThatHasPartOfPath(urlParts);
        if(lastNode.urlPartsThatLeft.length > 1){
            const newNode = new RadixNode(lastNode.urlPartsThatLeft[0], NodeType.NON_TERMINAL);
            lastNode.lastNode.children.set(lastNode.urlPartsThatLeft[0], newNode);
            newNode.insert(lastNode.urlPartsThatLeft.splice(1), type);
        } else {
            const newNode = new RadixNode(lastNode.urlPartsThatLeft[0], type);
            lastNode.lastNode.children.set(lastNode.urlPartsThatLeft[0], newNode);
        }
    }

    private findLastNodeThatHasPartOfPath(urlParts: string[]): LastNodeRetVal {
        if (urlParts.length === 1) {
            return {lastNode: this, urlPartsThatLeft: urlParts};
        } else {
            if (this.type === NodeType.ROOT) { // root of tree should have empty string that should match any url
                return this.findSimilarChild(urlParts[0], urlParts);
            } else if (urlParts[0] === this.root) { // new node will be a child of current (or some further children)
                return this.findSimilarChild(urlParts[1], urlParts.splice(1));
            } else {
                return {lastNode: this, urlPartsThatLeft: urlParts};;
            }
        }
    }

    private findSimilarChild(urlPart: string, urlPartsToUseForChild: string[]): LastNodeRetVal {
        const similarChild = this.children.get(urlPart);
        if (similarChild) {
            return similarChild.findLastNodeThatHasPartOfPath(urlPartsToUseForChild);
        } else {
            return {lastNode: this, urlPartsThatLeft: urlPartsToUseForChild}; // no further children have the same path
        }
    }

    public toJSON(){
        if(this.type === NodeType.FILE){
            return this.root;
        } else // if (this.type === NodeType.DIRECTORY || this.type === NodeType.ROOT){ // root is also dir
        {   
            const childrenJson: any[] = [];
            for(const [key, val] of this.children){
                childrenJson.push(val.toJSON());
            }
            return {
                [this.root]: childrenJson
            }
        }
        
    }
}