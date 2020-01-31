const http = require('http');
const fs = require('fs');
const readline = require('readline');
const {google} = require('googleapis');
const vanillajs = require('vanilla.js');
const express = require('express');
const bodyParser = require('body-parser');
const app1 = express();
app1.use(bodyParser.json());
const path = require('path');
const PORT = process.env.PORT || 5000;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('http server working\n');
});
server.listen(PORT, () => {
  console.log(`Server running on ${PORT}/`);
});


let data = [];

let directories = path.dirname('app1.js');
console.log(directories);

let MyLibrary
if (typeof document !== 'undefined') {
  MyLibrary = require('my-library').default
}


app1.use(express.static('src', { root: 'crm' }));
app1.use(bodyParser.urlencoded({extend:true}));
app1.engine('html', require('ejs').renderFile);
app1.set('view engine', 'html');
app1.set('views', __dirname);

process.env.PWD = process.cwd();
app.use(express.static(path.join(process.env.PWD, 'public')));
if (process.env.NODE_ENV === 'production') {
	app1.use(express.static('client/build'));
}

app1.get('/', (req, res)=>{
  res.sendFile(path.join(__dirname + 'index.html'));
})

app1.get("/data", (req, res)=>{
  res.json(data);
})
// If modifying these scopes, delete token.json.
const SCOPES = ['https://www.googleapis.com/auth/spreadsheets.readonly'];
// The file token.json stores the user's access and refresh tokens, and is
// created automatically when the authorization flow completes for the first time.
const TOKEN_PATH = 'token.json';

// Load client secrets from a local file.
fs.readFile('credentials.json', (err, content) => {
  if (err) return console.log('Error loading client secret file:', err);
  // Authorize a client with credentials, then call the Google Sheets API.
  authorize(JSON.parse(content), listProspects);
});

/**
 * Create an OAuth2 client with the given credentials, and then execute the
 * given callback function.
 * @param {Object} credentials The authorization client credentials.
 * @param {function} callback The callback to call with the authorized client.
 */
function authorize(credentials, callback) {
  const {client_secret, client_id, redirect_uris} = credentials.installed;
  const oAuth2Client = new google.auth.OAuth2(
      client_id, client_secret, redirect_uris[0]);

  // Check if we have previously stored a token.
  fs.readFile(TOKEN_PATH, (err, token) => {
    if (err) return getNewToken(oAuth2Client, callback);
    oAuth2Client.setCredentials(JSON.parse(token));
    callback(oAuth2Client);
  });
}

/**
 * Get and store new token after prompting for user authorization, and then
 * execute the given callback with the authorized OAuth2 client.
 * @param {google.auth.OAuth2} oAuth2Client The OAuth2 client to get token for.
 * @param {getEventsCallback} callback The callback for the authorized client.
 */
function getNewToken(oAuth2Client, callback) {
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES,
  });
  console.log('Authorize this app by visiting this url:', authUrl);
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  rl.question('Enter the code from that page here: ', (code) => {
    rl.close();
    oAuth2Client.getToken(code, (err, token) => {
      if (err) return console.error('Error while trying to retrieve access token', err);
      oAuth2Client.setCredentials(token);
      // Store the token to disk for later program executions
      fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
        if (err) return console.error(err);
        console.log('Token stored to', TOKEN_PATH);
      });
      callback(oAuth2Client);
    });
  });
}

/**
 * Prints the details of prospects in a sample spreadsheet:
 * @see https://docs.google.com/spreadsheets/d/1VRe62J_2BLTuYOV6DRZuE7_tnADTndmzbaKk0nuyxtU/edit#gid=1850515242
 * @param {google.auth.OAuth2} auth The authenticated Google OAuth client.
 */
function listProspects(auth) {
  const sheets = google.sheets({version: 'v4', auth});
  sheets.spreadsheets.values.get({
    spreadsheetId: '1VRe62J_2BLTuYOV6DRZuE7_tnADTndmzbaKk0nuyxtU',
    range: 'Form Responses 1!A1:K1000',
  }, (err, res) => {
    if (err) return console.log('The API returned an error: ' + err);
    const rows = res.data.values;
    data = rows;
    if (rows.length) {
      console.log('Liste de Prospects');

      rows.map((row) => {
        console.log(`${row[0]}, ${row[1]}, ${row[2]}, ${row[3]}, ${row[4]}, ${row[5]}, ${row[6]}, ${row[7]}, ${row[8]}, ${row[9]}, ${row[10]}`);
      });

    } else {
      console.log('No data found.');
    }
  });
}

app1.post('/prospects', (req,res)=>{
  listProspects.push(req.body.prospects);
  res.json(listProspects);
})

app1.listen(3000, ()=>{
  console.log("Everything is, well, no idea")
})

module.exports = app1;
