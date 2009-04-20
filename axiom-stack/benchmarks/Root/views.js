function helloworld() {
    return "Here's the text of the Web page.";
}

function insert1000pages() {
    var n = 1000;
    var start = new Date().getTime()/1000; //in seconds
    insertNpages(n);
    var end = new Date().getTime()/1000; //in seconds
    writeResults(start, end, n);
}

function insert30000pages() {
    var n = 30000;
    var start = new Date().getTime()/1000; //in seconds
    insertNpages(n);
    var end = new Date().getTime()/1000; //in seconds
    writeResults(start, end, n);
}

function insert30000pageswithcommit() {
    var n = 30000;
    var start = new Date().getTime()/1000; //in seconds
    insertNpages(n, 0, true);
    var end = new Date().getTime()/1000; //in seconds
    writeResults(start, end, n);
}

function countPageObjects() {
    var start = new Date().getTime()/1000;
    var count = app.getHitCount('Page');
    var end = new Date().getTime()/1000;
    res.writeln("Number of Page objects found: " + count + ". Took " + (end-start) + " seconds.");
}

function load50000hits() {
    var n = 50000;
    loadNfunction(n, loadNhits);
}

function load50000hitsmax() {
    var n = 50000;
    loadNfunction(n, loadNhitsmax);
}

function load50000objects() {
    var n = 50000;
    loadNfunction(n, loadNobjects);
}

//Relational
function load50000objectsr() {
    var n = 50000;
    loadNfunction(n, loadNobjectsr);
}


function load50000objectsmax() {
    var n = 50000;
    loadNfunction(n, loadNobjectsmax);
}

function test_loops() {
    var R = (parseInt(req.get("R"), 10) || 1000000);

    var loops = {
	/*Following loop functions from http://4umi.com/web/javascript/optimize.php*/
	_for: function() {
	    for( var i=0; i<R; i++ ) {
		;
	    }
	},
	_forback: function() {
	    for( var i=R; i>0; i-- ) {
		;
	    }
	},
	_forback2: function() {
	    for( var i=R; i--; ) {
		;
	    }
	},
	_while: function() {
	    var i = R;
	    while( i-- ) {
		;
	    }
	},
	_do: function() {
	    var i = 0;
	    do {
		i++;
	    } while( i<R );
	},
	_doback: function() {
	    var i = R;
	    do {
		i--;
	    } while( i>0 );
	},
	_doback2: function() {
	    var i = R - 1;
	    do {
		;
	    } while( i-- );
	},
	_doback3: function() {
	    var i = R;
	    if( i>0 ) {
		do {
		    ;
		} while( --i );
	    }
	},
	_duff4: function() {
	    var i = R % 4;
	    if( i>0 ) {
		do {
		    ;
		} while(--i);
	    }
	    i = parseInt( R / 4 );
	    if( i>0 ) {
		do {
		    ;
		    ;
		    ;
		    ;
		} while(--i);
	    }
	},
	_duff8: function() {
	    var i = R % 8;
	    if( i>0 ) {
		do {
		    ;
		} while( --i );
	    }
	    i = parseInt( R / 8 );
	    if( i>0 ) {
		do {
		    ;
		    ;
		    ;
		    ;
		    ;
		    ;
		    ;
		    ;
		} while( --i );
	    }
	}
    };

    var loop_results = {};

    for (var loop_id in loops) {
	var loop = loops[loop_id];
	var start = new Date().getTime();
	loop();
	var end = new Date().getTime();

	loop_results[loop_id] = {
	    start: start,
	    end: end,
	    delta: end-start,
	    iters: R,
	    time_per: (end-start)/(R||1)
	};
    }

    writeLoopResults(loop_results);
}

function test_loops_array() {
    var R = (parseInt(req.get("R"), 10) || 1000000);
    var r_array = range(R);
    var o;

    var loops = {
	_foreach: function() {
	    for each(o in r_array) {
		;
	    }
	},

	/*Following loop functions from http://4umi.com/web/javascript/optimize.php*/
	_for: function() {
	    for( var i=0; i<R; i++ ) {
		o = r_array[i];
	    }
	},
	_forback: function() {
	    for( var i=R; i>0; i-- ) {
		o = r_array[i];
	    }
	},
	_forback2: function() {
	    for( var i=R; i--; ) {
		o = r_array[i];
	    }
	},
	_while: function() {
	    var i = R;
	    while( i-- ) {
		o = r_array[i];
	    }
	},
	_do: function() {
	    var i = 0;
	    do {
		o = r_array[i];
		i++;
	    } while( i<R );
	},
	_doback: function() {
	    var i = R;
	    do {
		o = r_array[i];
		i--;
	    } while( i>0 );
	},
	_doback2: function() {
	    var i = R - 1;
	    do {
		o = r_array[i];
	    } while( i-- );
	},
	_doback3: function() {
	    var i = R;
	    if( i>0 ) {
		do {
		    o = r_array[i];
		} while( --i );
	    }
	},
	_duff4: function() {
	    var i = R % 4;
	    if( i>0 ) {
		do {
		    o = r_array[i];
		} while(--i);
	    }
	    i = parseInt( R / 4 );
	    if( i>0 ) {
		do {
		    o = r_array[i];
		    o = r_array[i];
		    o = r_array[i];
		    o = r_array[i];
		} while(--i);
	    }
	},
	_duff8: function() {
	    var i = R % 8;
	    if( i>0 ) {
		do {
		    o = r_array[i];
		} while( --i );
	    }
	    i = parseInt( R / 8 );
	    if( i>0 ) {
		do {
		    o = r_array[i];
		    o = r_array[i];
		    o = r_array[i];
		    o = r_array[i];
		    o = r_array[i];
		    o = r_array[i];
		    o = r_array[i];
		    o = r_array[i];
		} while( --i );
	    }
	}
    };

    var loop_results = {};

    for (var loop_id in loops) {
	var loop = loops[loop_id];
	var start = new Date().getTime();
	loop();
	var end = new Date().getTime();

	loop_results[loop_id] = {
	    start: start,
	    end: end,
	    delta: end-start,
	    iters: R,
	    time_per: (end-start)/(R||1)
	};
    }

    writeLoopResults(loop_results);
}