import axios from "axios"

exports.handler = function(event, context, callback) {
    if (!event || !event.queryStringParameters) {

    }

    const { code, state } = event.queryStringParameters;
    const { body, isBase64Encoded } = event;

    // TODO: Exchange AuthCode for AccessToken

    // your server-side functionality
    callback(null, {
        statusCode: 200,
        body: JSON.stringify(body)
    });
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