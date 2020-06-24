class routeProfile
{
    constructor(app) {
        this.app = app;
    }
    setRoutes()
    {
        this.app.get('/profile/:id', (req, res) => {
            var data = { age: 29, job: 'ninja', hobbies: ['eating', 'gaming', 'shading'] };
            res.render('profile', { person: req.params.id, data: data });


        });

    }


}

module.exports = routeProfile;
