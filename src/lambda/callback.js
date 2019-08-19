exports.handler = function(event, context, callback) {
    const body = {
        event: JSON.stringify(event),
        context: JSON.stringify(context)
    }

    // TODO: Exchange AuthCode for AccessToken

    // your server-side functionality
    callback(null, {
        statusCode: 200,
        body: JSON.stringify(body)
    });
}