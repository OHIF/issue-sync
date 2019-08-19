
const _createIssue = require('./createIssue.js');

export default class JiraRestClient {
    constructor(config){
        this.API_CONFIG = {
            token: config.apiToken,
            // user,
            // baseUrl
        };

        // Wire up methods
        this.createIssue = _createIssue.bind(this, this.API_CONFIG);
    }
}