import { FilesApiResponse } from "../../src/models/externalFilesApi/filesApiResponse";
import { Stopwatch } from "./stopWatch";

type TestMethod = (data: FilesApiResponse) => void;

const NOF_RUNS = 100;

export function testMethod(methodToExecute: TestMethod, data: FilesApiResponse, stopwatch: Stopwatch) {
    let elapsedTime = 0;

    for (let i = 0; i < NOF_RUNS; i++) {
        stopwatch.reset();
        stopwatch.start();
        methodToExecute(data);
        elapsedTime += stopwatch.getElapsedTime();
    }

    return elapsedTime / NOF_RUNS;
}