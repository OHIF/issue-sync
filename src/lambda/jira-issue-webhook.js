// load any variables in our .env file into process.env,
// unless those variables are already set.
require('dotenv').config();
const JiraRestClient = require('./JiraRestClient/index.js');
const GitHubRestClient = require('./GitHubRestClient/index.js');
const NEW_LINE = '\r\n';

exports.handler = async function(event, context) {
    try {
        return {
            statusCode: 200,
            body: 'Hello World' //JSON.stringify('')
        };

        return {
            statusCode: 200,
            body: "Issue not open"
        };
    } catch(err) {
        return {
            statusCode: 500,
            body: 'ERR: ' + JSON.stringify({ msg: (err.message || err) })
        };
    }
}
