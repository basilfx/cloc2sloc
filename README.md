# cloc2sloc
Convert cloc.xml files into sloc files.

[![Build Status](https://travis-ci.org/basilfx/cloc2sloc.svg?branch=master)](https://travis-ci.org/basilfx/cloc2sloc)

## Getting Started
Install the module with: `npm install [-g] cloc2sloc`. The run this tool as follows:

```
cloc --xml --by-line --report-file=cloc.xml /path/to/folder
cloc2sloc --input=cloc.xml --output=sloccount.sc
```

## Links
* [Cloc](http://cloc.sourceforge.net/)
* [SLOCCount](http://www.dwheeler.com/sloccount/)
* [Jenkins SLOCCount Plugin](https://github.com/jenkinsci/sloccount-plugin)

## Contributing
In lieu of a formal style guide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [grunt](https://github.com/cowboy/grunt).

## License
Copyright (c) 2012 Sebastian Springer

Copyright (c) 2015 Bas Stottelaar

Licensed under the MIT license.
