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
        context.res.sendStatus(200);
    }
};