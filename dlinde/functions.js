function calpop() {
    pop = (likec/cuser) * 100 + ((mthc/likec) * 100)/2 + (pvt/100);
}

function prematch() {

    var query = {id: ""}
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("mydb");
        dbo.collection("users").findOne({query}, function(err, result) {
            if (err) throw err;
            db.close();
          });
    });

    var pref = result.pref;
    var ppref = result.ppref;

    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("mydb");
        db.collection("users").count({}, function(error, numOfDocs){
            if(error) throw err;
            db.close();
        });
    });

    var cuser = numOfDocs;

    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("mydb");
        dbo.collection("users").find().toArray(function(err, result) {
          if (err) throw err;
          db.close();
        });
    });

    var num = 0;
    var list = page;
    while (list < page + 5 && num < cuser) {

        var count = 0;
        var premth = 0;
        var len1 = pref.length;
        var len2 = result[num].fets.length;
        var len3 = ppref.length;
        var len4 = result[num].pers.length;
        var u = 0;
        var i = 0;
        if (result[num].sor == 1) {
            if (gen1 != result[num].gen) {
                premth++;
            }
        }
        else if (result[num].sor == -1) {
            if (gen1 == result[num].gen) {
                premth++;
            }
        }
        else if (result[num].sor == 0) {
            premth++;
        }
        while (u < len1) {
            if (pref[u] === result[num].fets[i]) {
                count++;
                i = 0;
                u++;
            }
            else if (i >= len2) {
                i = 0;
                u++;
            }
            else {
                i++;
            }
        }
        if (count >= 2)
            premth++;
        u = 0;
        i = 0;
        count = 0;
        while (u < len3) {
            if (ppref[u] === result[num].pers[i]) {
                count++;
                i = 0;
                u++;
            }
            else if (i >= len4) {
                i = 0;
                u++;
            }
            else {
                i++;
            }
        }
        if (count >= 2)
            premth++;
        if (premth >= 3) {
            console.log("Good"); //Change to show the users on the find match page
            num++;
            list++;
        }
        else {
            num++;
        }
    }
}

function search() {
}