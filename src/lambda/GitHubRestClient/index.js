
const _editIssue = require('./editIssue.js');

class GitHubRestClient {
    constructor(config){
        this.API_CONFIG = {
            token: config.apiToken,
            user: 'ohif-bot',
            baseUrl: 'https://api.github.com',
        };

        // Wire up methods
        this.editIssue = _editIssue.bind(this, this.API_CONFIG);
    }
}

module.exports = GitHubRestClient;