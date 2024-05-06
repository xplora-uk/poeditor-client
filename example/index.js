require('dotenv').config();
const { PoEditorApi } = require('../lib/index');

main();

async function main() {
  const { POEDITOR_API_TOKEN = '', POEDITOR_PROJECT_ID = '' } = process.env;

  const poEditorApi = new PoEditorApi(POEDITOR_API_TOKEN, POEDITOR_PROJECT_ID);

  console.log('getting terms...');
  const terms = await poEditorApi.listTerms();
  console.log(JSON.stringify(terms, null, 2));
  console.log('done!');
  console.log('');
}
