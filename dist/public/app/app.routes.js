"use strict";
var home_component_1 = require("./home/home.component");
var list_component_1 = require("./list/list.component");
var login_component_1 = require("./login/login.component");
var signup_component_1 = require("./signup/signup.component");
var unrecognized_path_component_1 = require("./unrecognized-path/unrecognized-path.component");
exports.routes = [
    { path: '', redirectTo: '/login', terminal: true },
    { path: 'home/:username', component: home_component_1.HomeComponent },
    { path: 'list/:username', component: list_component_1.ListComponent },
    { path: 'list/:username/:title', component: list_component_1.ListComponent },
    { path: 'login', component: login_component_1.LoginComponent },
    { path: 'signup', component: signup_component_1.SignupComponent },
    { path: '**', component: unrecognized_path_component_1.UnrecognizedPathComponent }
];
exports.APP_ROUTER_PROVIDERS = [
    provideRouter(exports.routes)
];
//# sourceMappingURL=app.routes.js.map