function calpop() {
    pop = (likec/cuser) * 100 + ((mthc/likec) * 100)/2 +(pvt/100);
}

function prematch() {
    var count = 0;
    var premth = 0;
    var len1 = pref.length;
    var len2 = fets.length;
    var len3 = ppref.length;
    var len4 = pers.length;
    var u = 0;
    var i = 0;
    if (sor == 1) {
        if (gen1 != gen2) {
            premth++;
        }
    }
    else if (sor == -1) {
        if (gen1 == gen2) {
            premth++;
        }
    }
    else if (sor == 0) {
        premth++;
    }
    while (u < len1) {
        if (pref[u] === fets[i]) {
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
        if (pref[u] === fets[i]) {
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
        console.log("Good");
    }
}

function search() {
}