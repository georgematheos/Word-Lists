# Config
This is some documentation on the use of the config object in the word-lists project.

The project contains a file, `\config.json`, which contains various fields for use through the project.  When the primary entry point for the word-lists project begins, as soon as possible, the file is loaded in and the json data is extracted into an object.  This object is used throughout this file, and passed into other files to provide information needed for the project, such as the default port number and the directory of different resources.

It is also essential that immediately upon extracting the `config.json` file into a javascript/typescript object, the field `root_dir` is added to it with the directory (and route) of the project.  This is NOT specifically the location where server.js (root running file) is located; it is the location where package.json is located.

Here is a list of fields which must be included in the config.json file:
- `default_port`: the default port for the server to run on (as an integer value)
- `website_name`: the name of the website
- `routes_directory`: the directory that the routes are stored in (currently, `/lib/routes/`)
- `db_url`: the url to connect to the database used for the project
- `users_collection_name`: the name of the collection used to store the user data,
- `word_lists_collection_name`: the name of the collection used to store word lists
- `token_secret`: the secret to use to generate web tokens
- `salt_rounds`: the number of rounds to apply the salt when generating password hashes
