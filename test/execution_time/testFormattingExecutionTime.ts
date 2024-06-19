import { Stopwatch } from "./stopWatch";
import { ExternalFilesApiService } from './../../src/services/externalFilesApiService';
import { IDir, addToDir } from './../../src/models/fileSystemResponse/response';
import { Directory } from './../../src/models/fileSystemResponse/fileSystemResponse';

const externalDataService = new ExternalFilesApiService();

externalDataService.getFiles().then((data) => {
    if (!data) {
        throw new Error('Failed to fetch data from API');
    }

    const stopwatch = new Stopwatch();

    function interfaceMethod() {
        const root = {} as IDir;
        root[''] = [];

        for (let i = 0; i < data!.files.length; i++) {
            const fileUrl = data!.files[i].fileUrl;
            const url = new URL(fileUrl);
            const ipAddress = url.hostname;

            const isDir = url.pathname.endsWith('/');
            addToDir(root, '', `${ipAddress}/${url.pathname}`, isDir);
        }
    }

    function classMethod() {
        const root = new Directory('');

        for (let i = 0; i < data!.files.length; i++) {
            const fileUrl = data!.files[i].fileUrl;
            const url = new URL(fileUrl);
            const ipAddress = url.hostname;

            const isDir = url.pathname.endsWith('/');

            root.addContent(`${ipAddress}/${url.pathname}`, isDir);
        }

        root.formatToJson();
    }

    let elapsedTime = 0;
    let nofRuns = 100;

    for (let i = 0; i < nofRuns; i++) {
        stopwatch.reset();
        stopwatch.start();
        interfaceMethod();
        elapsedTime += stopwatch.getElapsedTime();
    }

    console.log(`Average elapsed time interface method: ${elapsedTime / nofRuns}`);

    elapsedTime = 0;

    for (let i = 0; i < nofRuns; i++) {
        stopwatch.reset();
        stopwatch.start();
        classMethod();
        elapsedTime += stopwatch.getElapsedTime();
    }

    console.log(`Elapsed time clas method: ${elapsedTime / nofRuns}`);

})


