// Copyright 2018 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the 'License');
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an 'AS IS' BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import express = require('express');
import bodyParser = require('body-parser');
import {initializeApp, applicationDefault} from 'firebase-admin/app';
import { storage } from 'firebase-admin';
import * as dotenv from 'dotenv';

dotenv.config();

const firebase = initializeApp({
  credential: applicationDefault(),
  projectId: process.env.PROJECT_ID,
  storageBucket: process.env.STORAGE_BUCKET
});

const bucket = storage();

import {fetchVideo} from './src/fetchVideo';
import {splitAndSaveParts} from './src/splitAndSaveParts';

const PORT = Number(parseInt(process.env.PORT)) || 8080;
const app = express();

app.use(bodyParser.json())

app.get('/', async (req, res) => {
  const { videoName, parts } = req.body;
  console.log('Fetching video');
  const destinationPath = await fetchVideo(videoName, bucket);
  if (destinationPath) {
    await splitAndSaveParts(parts, destinationPath)
  }
  res.send('🎉 Done! 🎉');
});

const server = app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});

module.exports = server;
