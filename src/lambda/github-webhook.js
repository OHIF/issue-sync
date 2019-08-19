// load any variables in our .env file into process.env,
// unless those variables are already set.
require('dotenv').config();
const axios = require('axios');

exports.handler = async function(event, context) {
    try {
        const payload = JSON.parse(event.body);
        const { action, issue, repository, organization, sender } = payload;

        // TODO: Switch for different handlers here
        const isOpenedIssue = action === "opened" && issue !== undefined;

        if (isOpenedIssue) {
            // TODO: Differentiate OHIF vs Cornerstonejs?
            const { html_url: url, title, body } = issue;
            const { full_name: repoName } = repository;
            const { login: reporter } = sender;

            // const atResponse = await _tryGetJiraAccessTokenResponse();

            // if (!atResponse.success || atResponse.error) {
            //     throw new Error(atResponse.error);
            // }

            // const jwt = atResponse.data.access_token;
            const jiraIssueBody = `URL: ${url}` + body;          
            const ciResponse = await _tryCreateJiraIssue(undefined, title, jiraIssueBody, [
                `gh-repo:${repoName}`,
                `gh-reporter:${reporter}`
            ]);

            if (!ciResponse.success || ciResponse.error) {
                throw new Error(ciResponse.error);
            }

            return {
                statusCode: 200,
                body: JSON.stringify(ciResponse.response.data)
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

// summary, description, reporter
// https://developer.atlassian.com/cloud/jira/platform/rest/v3/?utm_source=%2Fcloud%2Fjira%2Fplatform%2Frest%2F&utm_medium=302#api-rest-api-3-issue-post

/**
 * 
 * @param {*} accessToken 
 * @param {*} summary 
 * @param {*} description 
 * @param {*} labels 
 */
async function _tryCreateJiraIssue(accessToken, summary, description, labels = []) {
    try {
        const { ATL_API_TOKEN } = process.env;
        const params = {
            update: {},
            fields: {
                summary,
                issuetype: {
                    id: "10109" // TASK
                },
                // components: [{ id: "" }], // Epic or other issue container
                project: {
                    id: "10004" // OHIF
                },
                description: {
                    type: "doc",
                    version: 1,
                    content: [
                        {
                            type: "paragraph",
                            content: [
                                {
                                    text: description,
                                    type: "text",
                                }
                            ],
                        }
                    ]
                },
                reporter: {
                    id: "5cfa837ab87c300f36eb9549" // danny.brown
                },
                labels
            }
        };
        const response = await axios.post(
            'https://radicalimaging.atlassian.net/rest/api/3/issue',
            params,
            { 
                auth: {
                    username: 'danny.brown@radicalimaging.com',
                    password: ATL_API_TOKEN
                },
                headers: { 
                    // Authorization: `Bearer ${accessToken}`,
                    Accept: "application/json",
                    "Content-Type": "application/json"
                },
            }
        )

        return {
            success: true,
            response,
            error: undefined
        }
    } catch (err) {
        return {
            success: false,
            response: undefined,
            error: err.message
        };
    }
}

/**
 * 
 */
async function _tryGetJiraAccessTokenResponse() {
    try {
        const { ATL_AUTH_CODE, ATL_ISSUE_SYNC_CLIENT_ID, ATL_ISSUE_SYNC_SECRET, ATL_CALLBACK_URL } = process.env;
        const params = {
            grant_type: "authorization_code",
            client_id: ATL_ISSUE_SYNC_CLIENT_ID,
            client_secret: ATL_ISSUE_SYNC_SECRET,
            code: ATL_AUTH_CODE,
            redirect_uri: ATL_CALLBACK_URL
        };
        const response = await axios.post(
            "https://auth.atlassian.com/oauth/token",
            params,
            { 
                headers: { 
                    Accept: "application/json",
                    "Content-Type": "application/json"
                },
            });

        return {
            success: true,
            response,
            error: undefined
        }
    } catch(err) {
        return {
            success: false,
            response: undefined,
            error: err.message
        };
    }
}