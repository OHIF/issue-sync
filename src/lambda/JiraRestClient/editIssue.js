const axios = require('axios');

// To see all the fields you _can_ specify, check out this endpoint:
// GET: https://radicalimaging.atlassian.net/rest/api/3/issue/createmeta
// Headers: Accept/Content-Type: application/json
// Auth: Basic
// https://radicalimaging.atlassian.net/rest/api/3/issue/createmeta?issuetypeIds=10109&expand=projects.issuetypes.fields
//
// Attachments:
// https://developer.atlassian.com/cloud/jira/platform/rest/v3/#api-rest-api-3-issue-issueIdOrKey-attachments-post

 /**
  * Docs:
  * https://developer.atlassian.com/cloud/jira/platform/rest/v3/#api-rest-api-3-issue-issueIdOrKey-put
  *
* @param {object} apiConfig
* @param {string} apiConfig.token
* @param {string} apiConfig.user
* @param {string} apiConfig.baseUrl
  * @param {*} issueIdOrKey 
  * @param {*} requestData 
  */
async function editIssue(apiConfig, issueIdOrKey, requestData = {}) {
    const config = Object.assign({
        token: undefined,
        user: 'danny.brown@radicalimaging.com',
        baseUrl: 'https://radicalimaging.atlassian.net',
    }, apiConfig);
    const requestPayload = _createRequestPayload(requestData.customFields);
    const response = await _createRequestPromise(config.baseUrl, config.user, config.token, requestPayload, issueIdOrKey);

    return response.data;
}

/**
 * https://developer.atlassian.com/server/jira/platform/jira-rest-api-examples/
 * 
 * @param {Object[]} customFields - { name:string, value:* }
 */
function _createRequestPayload(customFields) {
    let fields = {}

    if (customFields && customFields.length) {
        for (var i = 0; i < customFields.length; i++) {
            const customField = customFields[i];

            fields[customField.name] = customField.value;
        }
    }

    return {
        fields
    };

    // customfield_10210 -> Community Issue #
    // customfield_10209 -> RepositoryName
    // customfield_10211 -> Linked Issue #
}

/**
 * 
 * @param {*} baseUrl 
 * @param {*} user 
 * @param {*} token 
 * @param {*} payload
 * @param {string} issueIdOrKey
 * @returns {Promise}
 */
function _createRequestPromise(baseUrl, user, token, payload, issueIdOrKey) {
    return axios.post(
        `${baseUrl}/rest/api/3/issue/${issueIdOrKey}`,
        payload,
        { 
            auth: {
                username: user,
                password: token
            },
            headers: { 
                // Authorization: `Bearer ${accessToken}`,
                Accept: "application/json",
                "Content-Type": "application/json"
            },
        }
    )
}

module.exports = editIssue;
