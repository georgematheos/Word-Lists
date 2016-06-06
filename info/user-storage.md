# User Storage
This file describes the form of the information about users stored in the database.  Each user is represented by a file in a mongodb database, with the following fields:
- `_id`: the ObjectId assigned by mongodb to each user
- `username`: the username of the user
- `pass_hash`: the hash for the user's password
- `dateTimeCreated`: the date and time when the user was created
- `dateTimeLastModified`: the date and time when the user's information was last modified
