# App Engine to cut videos from Cloud Storage
This is a test app to see if I could download a file from a cloud storage and split it in many parts.
It accepts a raw body with json format like this:
```
{
    "videoName": "/full/path/of/the/file/on/cloud/storage.mp4",
    "parts": [
        {
            "start": "1605530", // milliseconds
            "end": "1606588" // milliseconds
        },
        {
            "start": "2449997", // milliseconds
            "end": "2451136" // milliseconds
        }
    ]
}
```
It saves the output in the /tmp folder.

## .env
Before running this app this environment variables must be set:

* PROJECT_ID (Firebase Project ID) Can be found in the firebase config.
* STORAGE_BUCKET (Firebase Storage Bucket) Can be found in the firebase config.

@ToDo:

* [Accept a different destination path](https://github.com/ezequieltejada/video-chopper/issues/1)
* [Configure GCloud CLI in Dockerfile](https://github.com/ezequieltejada/video-chopper/issues/2)
* [Improve error handling](https://github.com/ezequieltejada/video-chopper/issues/3)
* [Add tests](https://github.com/ezequieltejada/video-chopper/issues/4)
* [Allow to receive a firebase config file to function on any project](https://github.com/ezequieltejada/video-chopper/issues/5)
* [Allow to receive a WebHook URL to notify finished jobs](https://github.com/ezequieltejada/video-chopper/issues/6)
* ~~(index.ts) parameterize projectId and storageBucket - it's related with receiving firebase config file.~~
* [(src/splitAndSaveParts.ts) Explore options with the ffmpeg library](https://github.com/ezequieltejada/video-chopper/issues/7)