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
        const { ATL_API_TOKEN, GITHUB_API_TOKEN } = process.env;
        const jiraClient = new JiraRestClient({ apiToken: ATL_API_TOKEN });
        const gitHubClient = new GitHubRestClient({ apiToken: GITHUB_API_TOKEN });

        const payload = JSON.parse(event.body);
        // https://developer.atlassian.com/cloud/jira/platform/webhooks/
        const { timestamp, webhookEvent, issue_event_type_name, user, issue: jiraIssue, changelog, comment } = payload;
        const jiraIssueId = jiraIssue.id;

        switch(issue_event_type_name) {
            case "issue_created":
                    const createGitHubIssueResponse = await _createGitHubIssue(gitHubClient, jiraIssue);
                    const createdIssueNumber = createGitHubIssueResponse.data.number;
                    
                    // Update Jira w/ created issue's number
                    await jiraClient.editIssue(jiraIssueId, {
                        // TODO: ENUM THIS
                        customfield_10211: parseInt(createdIssueNumber)
                    });
                break;
            case "issue_updated":
                    // request = _updateGitHubIssue(gitHubClient, jiraIssue, changelog);
            default:
                throw new Error(`Unsupported JIRA Event Type: ${issue_event_type_name || 'no-event-type'}`);
        }
    
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
    const { summary, description, labels: jiraLabels, issuetype, status, assignee } = jiraIssue.fields;
    // Status --> Column ("To Do")

    const labels = [];

    const isUpForGrabs = assignee === null;
    const hasIssueTypeName = issuetype && issuetype.name;
    const hasLabels = jiraLabels && jiraLabels.length;
    
    if (isUpForGrabs) {
        labels.push('Up For Grabs :raising_hand_woman:');
    }

    if (hasIssueTypeName) {
        const ghIssueTypeLabel = IssueNameToLabelMap[issuetype.name] || IssueNameToLabelMap["Story"];
        labels.push(ghIssueTypeLabel);
    }

    if (hasLabels) {
        for (var i = 0; i < jiraLabels.length; i++) {
            const jiraLabel = jiraLabels[i];
            const gitHubLabel = JiraIssueLabelToGitHubLabelMap[jiraLabel];

            if (gitHubLabel) {
                labels.push(gitHubLabel);
            }
        }
    }

    // TODO: Add linked issue to description, need custom field.
    return gitHubClient.createIssue(summary, description, undefined, undefined, labels);
}


const IssueNameToLabelMap = {
    "Bug": "Bug: Verified :bug:",
    "Story": "Story :raised_hands:",
    "Task": "Task: Refactor :hammer_and_wrench:",
}

const JiraIssueLabelToGitHubLabelMap = {
    "Extension:Cornerstone": "Extension: Cornerstone"
}

const fields = {
    "COMMUNITY_ISSUE_NUMBER": "customfield_10210"
}