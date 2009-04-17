function insertNpages(n, start, commit) {
    if (!start) {
	start = 0;
    }

    var max = (n+start);
    for (var i = start; i < max; i++) {
	var page = new Page();
	page.title = "Page " + i;
	page.content = "Some content";
	root.add(page);

	if (commit && (i % 100) == 0) {
	    res.commit();
	}
    }
}

function writeResults(start, end, iters) {
    var response = [];
    response.push('Start');
    response.push(start);
    response.push('End');
    response.push(end);

    response.push("Took ");
    response.push((end-start));
    response.push(" seconds. That's ");
    response.push(((end-start)/iters));
    response.push(" seconds per save.");
    response.push(" And, ");
    response.push((iters/(end-start)));
    response.push(" saves per second.");

    res.writeln(response.join(" "));
}