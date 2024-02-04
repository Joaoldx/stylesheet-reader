const authorize = require('./config/authorize');
const { google } = require('googleapis');

/**
 * Prints the names and majors of students in a sample spreadsheet:
 * @see https://docs.google.com/spreadsheets/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms/edit
 * @param {google.auth.OAuth2} auth The authenticated Google OAuth client.
 */
async function listMajors(auth) {
  const sheets = google.sheets({ version: 'v4', auth });
  const res = await sheets.spreadsheets.values.get({
    spreadsheetId: '1suhl0E42dFiu0pF-J9btLCK3hTwIU8o_degvq-KRwQM',
    range: 'engenharia_de_software!A4:F',
  });
  const rows = res.data.values;
  if (!rows || rows.length === 0) {
    console.log('No data found.');
    return;
  }
  console.log('Matricula, Aluno:');
  rows.forEach(row => {
    // Print columns A and E, which correspond to indices 0 and 4.
    console.log(`${row[0]}, ${row[1]}`);
  });
}
const initialize = authorize().then(listMajors).catch(console.error);

module.exports = initialize;
