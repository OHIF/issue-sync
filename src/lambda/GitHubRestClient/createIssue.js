// https://developer.github.com/v3/issues/#edit-an-issue
const axios = require('axios');

/**
 * 
 * @param {*} apiConfig 
 * @param {string} title
 * @param {string} body
 * @param {string} [assignee] 
 * @param {number} [milestone]
 * @param {string[]} [labels]
 * @param {string[]} [assignees]
 * @returns {Promise}
 */
function createIssue(apiConfig, title, body, assignee, milestone, labels, assignees) {
    const config = Object.assign({
        token: undefined,
        user: 'ohif-bot',
        baseUrl: 'https://api.github.com',
    }, apiConfig);
    const requestPayload = _createRequestPayload(title, body, assignee, milestone, labels, assignees);
    return _createRequestPromise(config.baseUrl, config.user, config.token, requestPayload);
}

/**
 * 
 * @param {string} title
 * @param {string} body
 * @param {string} [assignee] 
 * @param {number} [milestone]
 * @param {string[]} [labels]
 * @param {string[]} [assignees] 
 */
function _createRequestPayload(title, body, assignee, milestone, labels, assignees) {
    let payload = {
        title,
        body,
        assignee,
        milestone,
        labels,
        assignees,
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
function _createRequestPromise(baseUrl, user, token, payload) {
    return axios.post(
        `${baseUrl}/repos/OHIF/Viewers/issues`,
        payload,
        { 
            auth: {
                username: user,
                password: token
            },
            headers: { 
                // Authorization: `token ${token}`,
                Accept: "application/json",
                "Content-Type": "application/json"
            },
        }
    )
}

const _removeEmpty = obj => {
    Object.keys(obj).forEach(key => obj[key] == null && delete obj[key]);
};

module.exports = createIssue;
