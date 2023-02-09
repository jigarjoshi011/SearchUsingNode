var express = require("express");
var server = express();

var backlogItems = [
    {
        itemId: "DEV-3345",
        title: "Develop a proof of concept (PoC)"
    },
    {
        itemId: "DEV-3346",
        title: "Ponder the project's major milestones"
    }
];

// the short program does not include GET and POST implementation for simplicity.

// DELETE implementation

server.delete("/project/backlog/:itemId", 
                       function(req, res) 
{
    backlogItems = skierTerms.filter(function(definition) 
                   {
        return definition.itemId.toLowerCase() !== req.params.itemId.toLowerCase();
                   }); 

    res.json(backlogItems); //sending the updated response back to client app.
});

server.listen(3500);