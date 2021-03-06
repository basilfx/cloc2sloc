var Cloc2sloc = require('../lib/cloc2sloc.js'),
    fs = require('fs');

/*
  ======== A Handy Little Nodeunit Reference ========
  https://github.com/caolan/nodeunit

  Test methods:
    test.expect(numAssertions)
    test.done()
  Test assertions:
    test.ok(value, [message])
    test.equal(actual, expected, [message])
    test.notEqual(actual, expected, [message])
    test.deepEqual(actual, expected, [message])
    test.notDeepEqual(actual, expected, [message])
    test.strictEqual(actual, expected, [message])
    test.notStrictEqual(actual, expected, [message])
    test.throws(block, [error], [message])
    test.doesNotThrow(block, [error], [message])
    test.ifError(value)
*/

exports['setup'] = {
    'set input File': function(test) {
        var cloc2sloc = new Cloc2sloc();
        cloc2sloc.setInputFile(__dirname + '/../data/input.xml');
        test.equal(cloc2sloc.inputFile, __dirname + '/../data/input.xml');
        test.done();
    },
    'set output File': function(test) {
        var cloc2sloc = new Cloc2sloc();
        cloc2sloc.setOutputFile(__dirname + '/../data/output.sc');
        test.equal(cloc2sloc.outputFile, __dirname + '/../data/output.sc');
        test.done();
    },
    'fire exception, if input file is of wrong format': function(test) {
        var outputFile = __dirname + '/../data/output.sc',
            cloc2sloc = new Cloc2sloc();

        // Monkey patch the onParserData to manually catch the error without
        // using promises, callbacks or similar. We only have to make sure the
        // test.done() is called.
        var onParserData = cloc2sloc.onParserData;
        cloc2sloc.onParserData = function(err, result) {
            try {
                onParserData(err, result);
            } catch (e) {
                test.done();
            }
        };

        cloc2sloc.setInputFile(__dirname + '/../data/invalid.xml');
        cloc2sloc.setOutputFile(outputFile);
        cloc2sloc.writeHeader(cloc2sloc.getHeader());
        cloc2sloc.writeData();
    },
    'fire exception, if input file does not exist': function(test) {
        var cloc2sloc = new Cloc2sloc();
        test.throws(function() {
            cloc2sloc.setInputFile(__dirname + '/../data/nonexistent.xml');
        });
        test.done();
    },
    'check output header': function(test) {
        var outputFile = __dirname + '/../data/output.sc',
            cloc2sloc = new Cloc2sloc();
        if (fs.existsSync(outputFile)) {
            fs.unlinkSync(outputFile);
        }
        cloc2sloc.setOutputFile(outputFile);
        cloc2sloc.writeHeader(cloc2sloc.getHeader());
        var expected = 'Creating filelist for source\nCategorizing files.\nComputing results.\n\n\n';
        var actual = fs.readFileSync(outputFile);
        test.equal(actual, expected);
        test.done();
    },
    'check format output line': function(test) {
        var input = {
            "code": "14",
            "language": "Javascript",
            "name": "/tmp/testfile.js"
            },
            expected = "14\tJS\tsource\t/tmp/testfile.js\n",
            cloc2sloc = new Cloc2sloc(),
            actual = cloc2sloc.constructLine(input);

        test.equal(actual, expected);
        test.done();
    }
};
