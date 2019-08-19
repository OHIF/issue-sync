/*
 * On deployment, each serverless function can be called from an
 * address relative to the deployed site root: 
 * 
 * `/.netlify/functions/{function_name}`
 */ 


/* ~ EXAMPLE EVENT
 *
 * {
 *  "path": "Path parameter",
 *  "httpMethod": "Incoming request's method name"
 *  "headers": {Incoming request headers}
 *  "queryStringParameters": {query string parameters }
 *  "body": "A JSON string of the request payload."
 *  "isBase64Encoded": "A boolean flag to indicate if the applicable request payload is Base64-encode"
 * }
 *
 * ~ EXAMPLE CONTEXT
 * 
 * Applicable if we have an identity service active for the site. Object would have access to an identity
 * and a user object in the client context.
 * 
 * ~ EXAMPLE CALLBACK
 * 
 * Should return either an error, or a response object. Similar to AWS Lambda function:
 * 
 * https://docs.aws.amazon.com/lambda/latest/dg/nodejs-prog-model-handler.html#nodejs-prog-model-handler-callback
 * 
 * callback(null, {
 *   statusCode: 200,
 *   body: "Hello, World"
 * });
 * 
 */ 
exports.handler = function(event, context, callback) {
    // your server-side functionality
    callback(null, {
        statusCode: 200,
        body: "It works!"
    });
}