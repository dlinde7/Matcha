class routeChat
{
    constructor(app) {
        this.app = app;
    };

    setRoutes()
    {
        this.app.get('/chat', (req, res) =>
        {
            res.render("chat");
        });
    }

}

module.exports = routeChat;
