import {msToTime} from './millisToFormatedTime';
import * as path from 'path';
const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path
const ffmpeg = require('fluent-ffmpeg')
ffmpeg.setFfmpegPath(ffmpegPath)

export async function splitAndSaveParts(parts:{start:string, end: string}[], destinationPath: string) {
    console.log(`Splitting ${destinationPath} in ${parts.length} parts`);
    const {name, ext, dir} = path.parse(destinationPath);
    const timerName = 'Splitting Process';
    console.time(timerName);
    return Promise.all(parts.map((part, index) => {
        return new Promise<void>((resolve, reject) => {
            const outputPath = `${dir}/${name}-${index}${ext}`;
            ffmpeg(destinationPath)
                .setStartTime(msToTime(part.start))
                .setDuration(getDuration(part.start, part.end))
                .output(outputPath)
                .on('end', err => {
                    if (!err) {
                        console.log(`Lista la parte: ${outputPath}`)
                        resolve();
                    }
                })
                .on('error', err => {
                    console.log(`Error! - ${err}`)
                    reject(err);
                })
                .run();
        });
    })).then((value) => {
        console.timeEnd(timerName);
        return value;
    });
}

function getDuration(start: string, end: string): number {
    const numStart = parseInt(start, 10);
    const numEnd = parseInt(end, 10);
    return (numEnd - numStart) / 1000
}