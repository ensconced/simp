# simp

A very basic and opinionated utility for building C source files with all
dependencies derived from their included header files.

Usage:

```
simp ./path/to/some/source/file.c
```

This will output an executable to ./path/to/some/source/file

TODO

- consume config file to set up aliases for different build targets
- allow different "modes" - for using different compiler flags etc
- make-style change detection
- incremental builds - i.e. make object files and link in separate stage
- see what else I should steal from make
