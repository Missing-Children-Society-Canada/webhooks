module.exports = function (context, req) {
    if (req.method === "GET") {
        // handle new subscription request
        let mode = req.query["hub.mode"];
        let challenge = req.query["hub.challenge"];
        let verify = req.query["hub.verify_token"];

        if (verify === process.env.FB_VERIFY_TOKEN) {
            // if verification matches, return challenge
            context.res.raw(challenge);
        } else {
            context.res.sendStatus(400);
        }
    } 
    else if (req.method === "POST") {
      let entries = req.body.entry;
      let hfmRx = new RegExp(/(#hfm)($|[\s\n.,]+)/, "igm");

      if (entries) {
        entries.forEach(function(entry) {
          entry.changes.forEach(function(change) {
            if (change.field === "status") {
              if (change.value.match(hfmRx)) {
                var data = {
                  platform: 'facebook',
                  userid: entry.id,
                  mediaid: change.id,
                  facebook: {
                    post: change.value
                  }
                };
                context.log("!!!#HFM FOUND!!!");
                context.log(JSON.stringify(data, null, 4));
                context.bindings.out = data;
              }
            }
          });
        });
      } 
      context.res.sendStatus(200);      
    };
};