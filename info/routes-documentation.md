# Routes
This is some documentation on the implementation of different route handlers in the word-lists project.

Route handlers are stored in the `/typescript/lib/routes` directory.  This contains the routers for different routes, and other directories that contain routers for subroutes of those.  For example, the `/typescript/lib/routes/api-router.ts` file, which handles the `/api` route depends on files such as `typescript/lib/routes/api-routes/users-router.ts`, which handles `/api/users`.

To use a router in the express app, the following typescript code can be used:
```
import getRouter = require(path-to-file/file-name-with-no-filename-extension);
var router = getRouter(config);
```
Notice that importing the router file returns a function.  When this function is called, you must pass in the config information.  It returns the router itself.

Here is a brief overview of the files in the route directory:
- `/typescript/lib/routes/api-router.ts` - the router for the `/api` path.
- `/typescript/lib/routes/api-routes/users-router.ts` - the router for the `/api/users` path
- `/typescript/lib/routes/api-routes/authenticate-local-router.ts` - the router for the `/api/authenticate/local` path
- `/typescript/lib/routes/api-routes/word_lists-router.ts` - the router for the `/api/word_lists` path
