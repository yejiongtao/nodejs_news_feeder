var queryClient = require('../db/client');
var categoriesMask = require('../config/constants').CATEGORY_MASK;

function sendWithPreference(req, res, args, jadeFunc) {
    if(req.isAuthenticated()) {
        queryClient.selectViaUsername(req.user, function (rows) {
            if(rows && rows.length != 0) {
                var interest = rows[0].Interest;
                var argPreference = {};
                if(interest & categoriesMask.SPORTS)
                    argPreference.SPORTS = true;
                if(interest & categoriesMask.ENTERTAINMENT)
                    argPreference.ENTERTAINMENT = true;
                if(interest & categoriesMask.FINANCE)
                    argPreference.FINANCE = true;
                if(interest & categoriesMask.LOCAL)
                    argPreference.LOCAL = true;
                if(interest & categoriesMask.MILITARY)
                    argPreference.MILITARY = true;
                if(interest & categoriesMask.TECHNOLOGY)
                    argPreference.TECHNOLOGY = true;
                if(interest & categoriesMask.WORLD)
                    argPreference.WORLD = true;
                args.argPreference = argPreference;
            }
            res.send(jadeFunc(args));
        });
    } else
        res.send(jadeFunc(args));
}

module.exports = {
    sendWithPreference: sendWithPreference
};