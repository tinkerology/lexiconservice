var appRouter = function(app, jsonFile) {
    var fs = require("fs");
    var mustache = require("mustache");

    var content = fs.readFileSync(jsonFile);
    var jsonKeywords = JSON.parse(content);

    var foundTemplate = fs.readFileSync("FoundTemplate.html", 'utf8');
    var notFoundTemplate = fs.readFileSync("NotFoundTemplate.html", 'utf8' );

    app.get("/search", function(req, res) {
        var meaning = "Keyword not found";
        var link = "";
        if ( jsonKeywords.keywords.hasOwnProperty(req.query.q) ) {
            meaning = jsonKeywords.keywords[req.query.q].meaning;
            link = jsonKeywords.keywords[req.query.q].link;

            var locals = { "keyword" : req.query.q, "meaning" : meaning, "link" : link };
            var result = mustache.render(foundTemplate, locals);

            return res.send(result);
        } else {
            var locals = { "keyword" : req.query.q, "meaning" : "", "link" : "" };
            var result = mustache.render(notFoundTemplate, locals);

            return res.send(result);
        }

        return res.send("Error");
    });
}

module.exports = appRouter;

