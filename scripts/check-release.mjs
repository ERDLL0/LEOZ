import { readFile } from 'node:fs/promises';
import { releaseBlockers } from '../lib/release.mjs';

const names = ['release', 'locations', 'services', 'barbers', 'reviews', 'site', 'membership', 'journal', 'media'];
const records = Object.fromEntries(await Promise.all(names.map(async name => [name, JSON.parse(await readFile(new URL(`../data/${name}.json`, import.meta.url), 'utf8'))])));
const blockers = releaseBlockers(records);
if (blockers.length) {
  console.error('Production release blocked:\n' + blockers.map(blocker => `- ${blocker}`).join('\n'));
  process.exitCode = 1;
} else console.log('Production validation passed.');
