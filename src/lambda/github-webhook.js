// load any variables in our .env file into process.env,
// unless those variables are already set.
require('dotenv').config();
const JiraRestClient = require('./JiraRestClient/index.js');
const GitHubRestClient = require('./GitHubRestClient/index.js');
const NEW_LINE = '\r\n';

exports.handler = async function(event, context) {
    try {
        // Create REST Clients
        const { ATL_API_TOKEN, GITHUB_API_TOKEN } = process.env;
        const jiraClient = new JiraRestClient({ apiToken: ATL_API_TOKEN });
        const gitHubClient = new GitHubRestClient({ apiToken: GITHUB_API_TOKEN });
        // Parse Payload
        const payload = JSON.parse(event.body);
        const { action, issue, repository, organization, sender } = payload;

        // TODO: Switch for different handlers here
        const isOpenedIssue = action === "opened" && issue !== undefined;

        if (isOpenedIssue) {
            // TODO: Differentiate OHIF vs Cornerstonejs?
            const { html_url: url, title, body, number: issueNumber } = issue;
            const { full_name: repoName } = repository;
            const { login: reporter } = sender;

            const jiraIssueBody = `URL: [${url}](${url})${NEW_LINE}${NEW_LINE} ${body}`;          
            const response = await jiraClient.createIssue(title, jiraIssueBody, [
                'triage',
                `gh-repo:${repoName}`,
                `gh-reporter:${reporter}`
            ], {
                repoName,
                issueNumber,
            });

            return {
                statusCode: 200,
                body: JSON.stringify(response)
            };
        }

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

