var fs = require('fs'),
    xml2js = require('xml2js');

var cloc2sloc = function () {
    this.inputFile;
    this.outputFile;
};

cloc2sloc.prototype.setInputFile = function (inputFile) {
    if (!fs.existsSync(inputFile)) {
        throw new Error('File does not exist');
    }
    this.inputFile = inputFile;
};

cloc2sloc.prototype.setOutputFile = function (outputFile) {
    this.outputFile = outputFile;
};

cloc2sloc.prototype.getHeader = function () {
    return ['Creating filelist for source\n',
        'Categorizing files.\n',
        'Computing results.\n',
        '\n',
        '\n'
    ];
};

cloc2sloc.prototype.writeHeader = function (header) {
    for (var i = 0; i < header.length; i++) {
        fs.appendFileSync(this.outputFile, header[i]);
    }
};

cloc2sloc.prototype.writeData = function () {
    var parser = new xml2js.Parser();

    fs.readFile(this.inputFile, function(err, data) {

        var dataString = data.toString();

        parser.parseString(dataString, function (err, result) {
            var fileData = result.results.files[0].file;
            this.writeContent(fileData);
        });
    });
};

cloc2sloc.prototype.writeContent = function (data) {
    for (var j = 0; j < data.length; j++) {
        fs.appendFileSync(this.outputFile, this.constructLine(data[j]['$']));
    }
};

cloc2sloc.prototype.constructLine = function(data) {
    var line = '';
    line += data.code + '\t';
    line += ((data.language === 'Javascript') ? 'JS' : data.language) + '\t';
    line += 'source' + '\t';
    line += data.name + '\n';
    return line;
};

module.exports = cloc2sloc;