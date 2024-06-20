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

    1. string list, that resembles files in the given directory

    2. recursive list of `Directory` instances which resembles the idea behind subdirectories


