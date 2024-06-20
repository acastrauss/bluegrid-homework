import { Stopwatch } from "./stopWatch";
import { ExternalFilesApiService } from './../../src/services/externalFilesApiService';
import { testMethod } from "./testMethod";
import { interfaceMethod } from './interfaceMethod';
import { classMethod } from './classMethod';
import { radix } from './radixMethod';

const externalDataService = new ExternalFilesApiService();

externalDataService.getFiles().then((data) => {
    if (!data) {
        throw new Error('Failed to fetch data from API');
    }

    const stopwatch = new Stopwatch();

    const avgTimeInterface = testMethod(interfaceMethod, data, stopwatch);
    console.log(`Average elapsed time interface method: ${avgTimeInterface}`);

    const avgTimeClass = testMethod(classMethod, data, stopwatch);
    console.log(`Average elapsed time class method: ${avgTimeClass}`);

    const avgTimeRadix = testMethod(radix, data, stopwatch);
    console.log(`Average elapsed time radix method: ${avgTimeRadix}`);
});


