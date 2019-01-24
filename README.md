# find-up-all [![Build Status](https://travis-ci.com/dflupu/find-up-all.svg?branch=master)](https://travis-ci.com/dflupu/find-up-all)

## Install

```
$ npm install find-up-all
```

## API

### findUpAll(filename, [options])
Returns a Promise for an array of absolute paths of matching files or folders

### findUpAll.sync(filename, [options])
Returns an array of absolute paths of matching files or folders

#### options
Type: `Object`

##### options.cwd
Optional. The directory where the search should start.

##### options.end
Optional. Last parent directory that should be searched. If not set, findUpAll will search all the way up to the filesystem root.
