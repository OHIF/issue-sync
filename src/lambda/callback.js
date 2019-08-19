// load any variables in our .env file into process.env,
// unless those variables are already set.
require('dotenv').config();

const axios = require('axios');

exports.handler = async function(event, context) {
    try {
        if (!event || event.httpMethod !== "GET") {
            return {
                statusCode: 200,
                // headers,
                body: "This was not a GET request!"
            };
        }

        if (!event.queryStringParameters) {
            return {
                statusCode: 200,
                // headers,
                body: JSON.stringify({
                status: "failed",
                message: "Required information is missing!"
                })
            };
        }

        const { ATL_ISSUE_SYNC_CLIENT_ID, ATL_ISSUE_SYNC_SECRET, ATL_CALLBACK_URL } = process.env;
        const { code, state } = event.queryStringParameters;
        const { body, isBase64Encoded } = event;
        const isInitialAuthCodeRequest = state === 'initial';

        if (isInitialAuthCodeRequest) { 
            const response = await axios.post(
                "https://auth.atlassian.com/oauth/token",
                { 
                    headers: { Accept: "application/json" },
                    data: JSON.stringify({
                        grant_type: "authorization_code",
                        client_id: ATL_ISSUE_SYNC_CLIENT_ID,
                        client_secret: ATL_ISSUE_SYNC_SECRET,
                        code,
                        redirect_uri: ATL_CALLBACK_URL
                    })
                });

            return {
                statusCode: 200,
                body: JSON.stringify(response)
            };
        }

        // your server-side functionality
        return {
            statusCode: 200,
            body: JSON.stringify(body)
        };
    } catch(err) {
        console.log(err) // output to netlify function log
        return {
            statusCode: 500,
            body: JSON.stringify({ msg: err.message + ` ${ATL_ISSUE_SYNC_CLIENT_ID}` }) // Could be a custom message or object i.e. JSON.stringify(err)
        }
    }
}

// {
// 	"event": {
// 		"path": "/.netlify/functions/callback",
// 		"httpMethod": "GET",
// 		"headers": {
// 			"accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
// 			"accept-encoding": "br, gzip",
// 			"accept-language": "en-US,en;q=0.5",
// 			"client-ip": "74.133.6.234",
// 			"connection": "keep-alive",
// 			"referer": "https://api.atlassian.com/oauth2/authorize/consent?state=g6Fo2SA1bG1va0tnM2NBbnZncXNxd2FIa2U4RkdRdDZ3VVFYNKN0aWTZIFhYc296S3pIcUR6UkcwcElMZGV6aWpmbk4wYkVKcGd5o2NpZNkgdmVhS1dyZ2hsOE8ycmVkaDdaQUNpVlZTbVRram9IUEQ",
// 			"upgrade-insecure-requests": "1",
// 			"user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:68.0) Gecko/20100101 Firefox/68.0",
// 			"via": "https/2 Netlify[f882db70-9fb7-4954-bdf6-e8d63a73fd7c] (ApacheTrafficServer/7.1.7)",
// 			"x-bb-ab": "0.225519",
// 			"x-bb-client-request-uuid": "f882db70-9fb7-4954-bdf6-e8d63a73fd7c-1003050",
// 			"x-bb-ip": "74.133.6.234",
// 			"x-bb-loop": "1",
// 			"x-cdn-domain": "www.bitballoon.com",
// 			"x-country": "US",
// 			"x-datadog-parent-id": "3938041446203669434",
// 			"x-datadog-sampling-priority": "0",
// 			"x-datadog-trace-id": "7470795989180511437",
// 			"x-forwarded-for": "74.133.6.234",
// 			"x-forwarded-proto": "https",
// 			"x-language": "en-US"
// 		},
// 		"queryStringParameters": {
// 			"code": "_IIht_6H0mOluOw6",
// 			"state": "test"
// 		},
// 		"body": "",
// 		"isBase64Encoded": true
// 	},
// 	"context": {
// 		"callbackWaitsForEmptyEventLoop": true,
// 		"logGroupName": "/aws/lambda/205c65116373f1466d5cd20d022094908cafc0e1060aceccd71c2ae7cae052d9",
// 		"logStreamName": "2019/08/19/[$LATEST]e4296bddc0b844f4a6eeeb1fbd658d05",
// 		"functionName": "205c65116373f1466d5cd20d022094908cafc0e1060aceccd71c2ae7cae052d9",
// 		"memoryLimitInMB": "1024",
// 		"functionVersion": "$LATEST",
// 		"clientContext": {
// 			"custom": {
// 				"netlify": "eyJzaXRlX3VybCI6Imh0dHBzOi8vaW5mYWxsaWJsZS1ib3NlLWZlOTBjNS5uZXRsaWZ5LmNvbSJ9"
// 			}
// 		},
// 		"invokeid": "0f3f4723-eac3-4297-9255-c9f0765142bd",
// 		"awsRequestId": "0f3f4723-eac3-4297-9255-c9f0765142bd",
// 		"invokedFunctionArn": "arn:aws:lambda:us-east-1:673769985865:function:205c65116373f1466d5cd20d022094908cafc0e1060aceccd71c2ae7cae052d9"
// 	}
// }