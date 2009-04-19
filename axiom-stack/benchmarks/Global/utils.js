function range(a, b, step) {
    if (!b) {
	b = a;
	a = 0;
    }

    if (!step) {
	step = 1;
    }

    var r = [];

    for (a; a < b; a+= step){
	r.push(a);
    }

    return r;
}