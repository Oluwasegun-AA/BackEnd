import childProcess from 'child_process';
import dotenv from 'dotenv';

dotenv.config();
const runScript: any = childProcess.execSync;

const { ELASTIC_SEARCH_PATH, KIBANA_PATH } = process.env;

runScript(`concurrently '${ELASTIC_SEARCH_PATH}' '${KIBANA_PATH}'`, { stdio: 'inherit' });
