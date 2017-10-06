# js-gettext

Text extraction from JS sources (js, ts, jsx)

## Features

* Super fast!
* Outputs gettext compatible `pot` files or `json`

## Usage

    npm i --global js-gettext

```
  Usage: js-gettext [options] <input> <output>


  Options:

    -V, --version                                     output the version number
    -f, --format <value>                              Output format (pot|json)
    -s, --singular <string>                           Singular translate function
    -p, --plural <string>                             Plural translate function
    -i, --ignore <glob>                               Ignore pattern
    -o, --formatterOptions <key1=value1;key2=value2>  Formatter options
    -v, --verbose                                     Verbose mode
    -h, --help                                        output usage information
```

