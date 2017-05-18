module.exports = function (context, req) {
    if (req.method === "GET") {
        // handle new subscription request
        let mode = req.query["hub.mode"];
        let challenge = req.query["hub.challenge"];
        let verify = req.query["hub.verify_token"];

        if (verify === process.env.IG_VERIFY_TOKEN) {
            // if verification matches, return challenge
            context.res.raw(challenge);
        } else {
            context.res.sendStatus(400);
        }
    } else {
        //DEBUG
        context.log(JSON.stringify(req.body, null, 4));
        // map all updates to array of user_id & media_id messages, sent to queue
        var data = req.body.map(item => JSON.stringify(
            {
                platform: 'instagram',
                userid: item.object_id,
                mediaid: item.data.media_id
            }));

        context.bindings.out = data;
        context.res.sendStatus(200);
    }
};