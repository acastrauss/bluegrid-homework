# How to run:

Desired api route will be available at `localhost:3000/api/files`

## Local dev env:

If needed: `npm install`

then `npm start`


## Local prod:

If needed: `npm install`

then `npm run tsc` to compile app to ./dist

then `npm run start:prod`


## Docker:

Docker should be installed and running on machine.

All needed commands are located in `RunOnDocker.sh`

Thus only thing required is to run `./RunOnDocker.sh`

# Configuration

All required configuration ([test API url](https://rest-test-eight.vercel.app/api/test)) is in `config/default.json` and is loaded with [config](https://www.npmjs.com/package/config) package. 
For given requirements no env vars were required, thus .env file does not exists currently.
Of course if there were required env vars (e.g. api keys, client secrets, etc.) they would located in .env file and loaded into chosen runtime accordingly.

# Idea behind solution

Because the response from the given API returns file routes from file system at a given server, the solution should be able to create a 'map' of all given file routes and format that to JSON (formatted as specified in requirements).
Thus the idea is to create tree-like structure that resembles [Linux file system organization](https://medium.com/@jasurbek.go.dev/the-linux-filesystem-95673f4e3bd5).

NOTE: Since idea is centered around Linux file system, the root of tree is node with empty string ('') just like in Linux it is '/' (not the hostname or IP Address). This way the mapping of the file system is not restricted to only one server (only one IP address) but rather it is scalable and can map multiple servers depending on the input.

## First solution:

Code located at `/src/models/directory.ts`

The idea is to create n-ary tree with a class named `Directory` that will act as a tree's node or a directory in given file system:

Each node contains:

    1. string list, that resembles files in the given directory, named: `files`

    2. recursive list of `Directory` instances which resembles the idea behind subdirectories, named: `subdirs`

For each given url string algorithm decomposes it in parts and traverses the tree recursively (starting from root) until it finds the place to insert new url (new dir/file). Note to keep in mind is that algorithm will add new subdirectories along the way if the url is constructed for that, e.g.:
If url is: `dir/subdir/app.exe` and in tree there already is a child of root named `dir`, the algorithm will create `subdir` (will be child of `dir`) and then add new child file to `subdir` named `app.exe`.
Depending if it is a directory or file (if url ends with '/' or not) the new url path (actually concrete ending part of that path) will either be inserted in `subidrs` or `files`.

After all urls have been inserted, the class needs to be formatted so it resembles given JSON format. Method for that is `formatToJson` and it work recursively.

Disadvantages:
    
    1. Requires recursive formatting at the end
    2. Uses list instead of more optimal structure such as Map
    3. Does have unrefactored code bloat 

## Second solution:

Code located at `src/models/IDir.ts`

This idea mimics the first one, but tries to remove formatting and code bloat. The improvement is centered around [index signature](https://www.typescriptlang.org/docs/handbook/interfaces.html) in Typescript. Which allows the tree structure to be created as it is in required JSON format with 'variable' property names.

The change is in using interface named `IDir` which contains index signatures as keys and value is array of `DirContent = string | IDir`.
Since the class is not more in use, separate method is called and it was required to pass instance to each recursive call.

Disadvantages:
    
    1. Code bloat was still present
    2. Unoptimal usage of recursion (more parameters in each call than previous method)
    3. Uses list instead of more optimal structure such as Map

## Third (final) solution:

Code located at `src/models/radix.ts`

The idea expands from the first two as it introduces [Radix tree](https://en.wikipedia.org/wiki/Radix_tree) which is often used in IP routing (for IP Addresses) and is made for storing large amount of string values (storage optimized, but indirectly that does optimize execution time which was significant requirement) thus making it good candidate for this specific purpose. 

Each operation has `O(k)` where `k` is max-depth of tree. Thus if any operation (insert, search, update, delete) is done on Radix tree only `k` steps are required to do so. For this concrete example `k = largest number of parts in one url out of all urls`, which is not a big number.

The `RadixNode` class again resembles recursive tree structure, except that it utilizes Map (instead of list) which is far more optimal for this purpose as it enables faster querying of the children nodes based on the string that represents them. Each key is the part of url, value is concrete node that has recursive children nodes themselves. 

Each path (from root to leaf) represents unique file system path to either file or directory. This mimics how Linux organization works since everything is viewed as a file (even directories, external devices, etc.) but depending on the purpose they are used in different ways. For that reason `NodeType` enum is available to flag concrete type of 'file'.

Algorithm, similarly (but with far less code bloat, better structure), traverses from root to find a suitable parent to for the given url. This is done in `k` recursive steps. Along the way url parts are stripped (the part that is stripped is ecountered node's name) and from the remaining parts new nodes are created, creating new subtree structure. Significant optimization that was available here is to automatically have suitable parent for all nodes that should be added except the first one. For the first one we need to traverse the tree.

# Testing possible solutions:

All three possible solutions were tested with the same dataset (the one acquired from API) over 100 iterations each. Radix tree approach showed significantly better performances and thus was chosen as final solution.

To test times of execution for each method simply run: `npm run test-exec-time`

Test code is located at `test/execution_time/testFormattingExecutionTime.ts`


# Possible improvements:

    1. Unit tests - standard practice for any API, currently not in requirements could easily be introduced. Possibly with Jest
    2. More complex tree structure like Merkle-Patricia Trie
    3. Transfering the data to client while it is still formatting with utilization of pipelines. Resembling stream of data.



