# Servable Packages
This is some documentation on the use of the servable-packages.json file in the word-lists project.

This file is a json document containing one field: the `"packages"` field.  This field must be set to an array of package names, and each package name should match the folder name of a package located in the `node_modules` folder.  These packages are the packages which the server will serve to a client if the client requests it with a url path along the lines of `node_modules/package_name/path/to/specific/file`.
