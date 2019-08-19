const axios = require('axios');

/**
 * Initiates a web request to Atlassian to exchange our "Authorization Code" for an "Access Token"
 * that we can use with JWT Bearer auth for subsequent API requests.
 * 
 * Example URL that would return to our callback endpoint the `code` parameter in a query string:
 * 
 * https://auth.atlassian.com/authorize?
 *  audience=api.atlassian.com&
 *  client_id=veaKWrghl8O2redh7ZACiVVSmTkjoHPD&
 *  scope=read:jira-user%20read:jira-work%20write:jira-work&
 *  redirect_uri=https://infallible-bose-fe90c5.netlify.com/.netlify/functions/callback&
 *  state=initial&
 *  response_type=code&
 *  prompt=consent
 * 
 * @param {string} client_id - The JIRA app's client_id (ATL_ISSUE_SYNC_CLIENT_ID)
 * @param {string} client_secret - The JIRA app's client_secret (ATL_ISSUE_SYNC_SECRET)
 * @param {string} code - The authorization code returned by a user initated OAuth grant request
 * @param {string} redirect_uri - The expected / already configured `redirect_uri` for the JIRA app (/.netlify/functions/callback)
 */
async function getAccessToken(client_id, client_secret, code, redirect_uri) {
    const params = {
        grant_type: "authorization_code",
        client_id,
        client_secret,
        code,
        redirect_uri
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

    return response.data;
}

module.exports = getAccessToken;
