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

function loadNpages() {

}