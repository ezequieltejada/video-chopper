import { Storage } from "firebase-admin/lib/storage/storage";
import { parse } from 'path';

export async function fetchVideo(name: string, storage: Storage) {
    console.log(`Fetching ${name}`);
    const timerName = `Video download`;
    console.time(timerName)
    const pathParts = parse(name)
    const destinationPath = `/tmp/${pathParts.name}${pathParts.ext}`;
    return storage.bucket().file(name).download({
        destination: destinationPath,
    }).then((downloadResponse) => {
        console.log('Finished!');
        console.timeEnd(timerName);
        return destinationPath;
    }).catch((err) => {
        console.log('Finished with errors!');
        console.timeEnd(timerName);
        throw new Error(err);
    });
}