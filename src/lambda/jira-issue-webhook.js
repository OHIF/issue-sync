// load any variables in our .env file into process.env,
// unless those variables are already set.
require('dotenv').config();
const GitHubRestClient = require('./GitHubRestClient/index.js');
const NEW_LINE = '\r\n';

exports.handler = async function(event, context) {
    try {

        // TODO: Is Create Event...
        // TODO: Issue does not already exist on GitHub?
        // TODO: Update JIRA to use new linked GitHub issue Id

        // Create REST Clients
        const { GITHUB_API_TOKEN } = process.env;
        const gitHubClient = new GitHubRestClient({ apiToken: GITHUB_API_TOKEN });

        const payload = JSON.parse(event.body);
        // https://developer.atlassian.com/cloud/jira/platform/webhooks/
        const { timestamp, event, user, issue, changelog, comment } = payload;
        // https://jira.atlassian.com/rest/api/2/issue/JRA-2000?_ga=2.28373563.661224939.1566999997-1174806867.1565374905
        const { summary, description, labels, status, assignee } = issue.fields;
        const labels = [
            // story, bug, task: t_type
            'Up For Grabs :raising_hand_woman:'
        ];

        // TODO: Add linked issue to description, need custom field.
        const result = await gitHubClient.createIssue(summary, description, labels);


        return {
            statusCode: 200,
            body: JSON.stringify(result.data)
        };

        // return {
        //     statusCode: 200,
        //     body: "Issue not open"
        // };
    } catch(err) {
        return {
            statusCode: 500,
            body: 'ERR: ' + JSON.stringify({ msg: (err.message || err) })
        };
    }
}
