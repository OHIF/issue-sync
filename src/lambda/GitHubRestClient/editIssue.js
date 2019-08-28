// https://developer.github.com/v3/issues/#edit-an-issue
const axios = require('axios');

async function editIssue(apiConfig, title, body, assignees, milestone, state, labels) {
    const config = Object.assign({
        token: undefined,
        user: 'ohif-bot',
        baseUrl: 'https://api.github.com',
    }, apiConfig);
    const requestPayload = _createRequestPayload(title, body, assignees, milestone, state, labels);
    const response = await _createRequestPromise(config.baseUrl, config.user, config.token, requestPayload);

    return response.data;
}

/**
 * 
 * @param {string} [title]
 * @param {string} [body] 
 * @param {string[]} [assignees] 
 * @param {number} [milestone]
 * @param {string} [state]
 * @param {string[]} [labels]
 */
function _createRequestPayload(title, body, assignees, milestone, state, labels) {
    let payload = {
        title,
        body,
        assignees,
        milestone,
        state,
        labels
    };

    _removeEmpty(payload);

    return payload;
}

/**
 * 
 * @param {*} baseUrl 
 * @param {*} user 
 * @param {*} token 
 * @param {*} payload 
 */
function _createRequestPromise(baseUrl, user, token, issueNumber, payload) {
    return axios.patch(
        `${baseUrl}/repos/OHIF/Viewers/issues/${issueNumber}`,
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

const _removeEmpty = obj => {
    Object.keys(obj).forEach(key => obj[key] == null && delete obj[key]);
};

module.exports = editIssue;
