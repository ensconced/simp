# simp

A very basic and opinionated utility for building C source files with all
dependencies derived from their included header files.

Basic usage:

```
simp build ./path/to/some/source/file.c
```

This will output an executable at ./path/to/some/source/file

TODO

- tidy up!
- improve usage of yargs to generate help pages and shell completion scripts!
- better logging
- consume config file to set up aliases for different build targets
- allow different "modes" - for using different compiler flags etc
- c-compiler should be settable as in make
- make-style change detection
- incremental builds - i.e. make object files and link in separate stage
- see what else I should steal from make
- rewrite in C...
