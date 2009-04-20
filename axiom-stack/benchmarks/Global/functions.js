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

function loadNhits(n) {
    //hits allows paging for memory purposes
    return app.getHits('Page', {});
}

function loadNhitsmax(n, max) {
    //uses topdocs (scoring) and loads objects
    return app.getHits('Page', {}, {maxlength: n});
}

function loadNobjects(n) {
    //uses hits and loads objects
    return app.getObjects('Page', {}).slice(0, n);
}

function loadNobjectsr(n) {
    return app.getObjects('RPage', {}).slice(0, n);
}

function loadNobjectsmax(n, max) {
    //uses topdocs (scoring) and loads objects
    return app.getObjects('Page', {}, {maxlength: n}).slice(0, n);
}

function loadNfunction(n, func) {
    //get the actual objects, not just
    var start = new Date().getTime();
    var objects = func(n);
    var end = new Date().getTime();
    start /= 1000;
    end /= 1000;

    writeResults(start, end, n);
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
    response.push(" seconds per iteration.");
    response.push(" And, ");
    response.push((iters/(end-start)));
    response.push(" iterations per second.");

    res.writeln(response.join(" "));
}

function writeLoopResults(loop_results) {
    var results = <html>
	<head>
	</head>
	<body>
	    <h1>Loop Results</h1>
	    <table>
		<tr style="text-align:center">
		    <th width="15%">Loop</th>
		    <th width="20%">Start</th>
		    <th width="20%">End</th>
		    <th width="15%">Delta (Seconds)</th>
		    <th width="15%">Iters</th>
		    <th>Time Per Iter</th>
		</tr>
	    </table>
	</body>
	</html>;

    var table = results.body.table[0];
    for (var loop_id in loop_results) {
	var result = loop_results[loop_id];
	var tr = <tr>
	    <td>{loop_id}</td>
	    <td>{result.start/1000}</td>
	    <td>{result.end/1000}</td>
	    <td>{result.delta/1000}</td>
	    <td>{result.iters}</td>
	    <td>{result.time_per/1000}</td>
	    </tr>;
	table.appendChild(tr);
    }

    res.write(results);
}