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
        const { timestamp, webhookEvent, issue_event_type_name, user, issue: jiraIssue, changelog, comment } = payload;
        
        let request = new Promise();

        switch(issue_event_type_name) {
            case "issue_created":
                    request = _createGitHubIssue(gitHubClient, jiraIssue);
                break;
            default:
                throw new Error(`Unsupported JIRA Event Type: ${issue_event_type_name || 'no-event-type'}`);
        }

        const response = await request;
    
        return {
            statusCode: 200,
            body: JSON.stringify(response.data)
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

/**
 * 
 * @param {*} gitHubClient 
 * @param {*} jiraIssue
 * @returns {Promise}
 */
function _createGitHubIssue(gitHubClient, jiraIssue) {
    // https://jira.atlassian.com/rest/api/2/issue/JRA-2000?_ga=2.28373563.661224939.1566999997-1174806867.1565374905
    const { summary, description, labels: jiraLabels, issueType, status, assignee } = jiraIssue.fields;
    // const issueTypeName = issueType.name; // Story, Bug, Task
    // Status --> Column ("To Do")

    const labels = [
        // story, bug, task: t_type
        'Up For Grabs :raising_hand_woman:'
    ];

    if (jiraLabels && jiraLabels.length) {
        // Add?
    }

    // TODO: Add linked issue to description, need custom field.
    return gitHubClient.createIssue(summary, description, undefined, undefined, labels);
}


const fields = {
    "COMMUNITY_ISSUE_NUMBER": "customfield_10210"
}