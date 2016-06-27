# API for Interacting with Word List Server

This is the http based API which can be used to communicate with the word list server.

## Interact with User Data

#### Create User:
    POST /api/users/
 This creates a user.  Request must include a JSON document with the following fields:
 - `"username"`: the username for the user
 - `"password"`: the user's password

#### Modify User Data:
    PUT /api/users/:username/
  This modifies the user with the username given by the `username` parameter.  A JSON document must be included with the following fields:

  The first field must be included:
  - `"password"`: the user's current password

The rest of the fields are optional and result in different modifications to the user data.

  - `"new_password"`: if this is included, the user's password hash will be changed to this

## Authenticate User
    POST /api/authenticate/local/
  This request must include a JSON file with the following fields:
  - `"username"`: the username of the user to be authenticated
  - `"password"`: the user's password

  If the authentication is successful, the JSON document returned is guaranteed to include the following field:
  - `"token"`: a valid token for the user who logged on
  - `"exp"`: the date and time when the token expires (in the form of an ISO date)

  If authentication is not successful, the status code of the response will be `401`.

## Check if Token is Valid
    GET /api/authenticate/local/check_validity/:token/

  Returns with a status code of `200` if the token is valid and with a status code of `401` if it is invalid.

## Refresh Token
    GET /api/authenticate/local/refresh_token/:token/

  If the token given is valid, returns with a 200 status code and a JSON body with the following fields:
  - `"token"`: a new valid token to replace the old one
  - `"exp"`: the date and time when the new token expires (in the form of an ISO date)

## Interact with Word Lists

#### Create Word List:
    POST /api/word_lists/:username/
  This creates a word list for the user with the username specified by the `username` parameter.  It must include a valid `x-auth-token` in the header.  It must also include a JSON document with the following fields:
  - `"title"`: the title for the word list
  - `"words"`: an array of the words in the list

#### Retrieve Word List
    GET /api/word_lists/:username/:title/
  This request must include a valid `x-auth-token` in the header.  It returns a JSON document that represents the word list of the user whose username is `username` with the title of `title`.  It has the following fields:
  - `"username"`: the username of the user whom the word list belongs to
  - `"title"`: the title of the word list
  - `"words"`: an array of the words in the list
  - `"dateTimeCreated"`: the date and time the list was created (in the form of an ISO date)
  - `"dateTimeLastModified"`: the date and time the list was last modified (in the form of an ISO date):us
#### Retrieve List of a User's Word lists
    GET /api/word_lists/:username/
  This request must include a valid `x-auth-token` in the header.  It returns a JSON document that contains an array of all the word lists belonging to the user whose username is `username`.  It has the following fields:
  - `"word-lists"`: an array with the title of each word list belonging to the user

#### Delete A Word List
    DELETE /api/word_lists/:username/:title/
  This request must include a valid `x-auth-token` in the header.  It permanently deletes the word list belonging to the user whose username is `username` with the title specified by `title`.

#### Modify A Word List
    PUT /api/word_lists/:username/:title/
  This request must include a valid `x-auth-token` in the header.  It must contain a JSON object which may contain the following fields:
  - `"words"`: an array of the words in the modified version of the word list
  - `"title"`: the title of the modified list

  If any of these fields are not included, the portion of the list specified by it will not be changed.
