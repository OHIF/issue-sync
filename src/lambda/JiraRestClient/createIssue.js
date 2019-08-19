const axios = require('axios');

/**
 * 
 * Docs:
 * https://developer.atlassian.com/cloud/jira/platform/rest/v3/?utm_source=%2Fcloud%2Fjira%2Fplatform%2Frest%2F&utm_medium=302#api-rest-api-3-issue-post
 * 
 * @param {object} apiConfig
 * @param {string} apiConfig.token
 * @param {string} apiConfig.user
 * @param {string} apiConfig.baseUrl
 * @param {string} title 
 * @param {string} description 
 * @param {string[]} labels 
 */
async function createIssue(apiConfig, title, description, labels = []) {
    const config = Object.assign({
        token: undefined,
        user: 'danny.brown@radicalimaging.com',
        baseUrl: 'https://radicalimaging.atlassian.net',
    }, apiConfig);
    const requestPayload = _createRequestPayload(title, description, labels);
    const response = await _createRequestPromise(config.baseUrl, config.user, config.token, requestPayload);

    return response.data;
}

/**
 * 
 * @param {*} title 
 * @param {*} description 
 * @param {*} labels 
 */
function _createRequestPayload(title, description, labels = []) {
    return {
        update: {},
        fields: {
            summary: title,
            issuetype: {
                id: "10109" // TASK
            },
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
}

/**
 * 
 * @param {*} baseUrl 
 * @param {*} user 
 * @param {*} token 
 * @param {*} payload 
 */
function _createRequestPromise(baseUrl, user, token, payload) {
    return axios.post(
        `${baseUrl}/rest/api/3/issue`,
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

module.exports = createIssue;
