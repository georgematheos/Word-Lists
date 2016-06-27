"use strict";
var router_1 = require('@angular/router');
var home_component_1 = require('./home/home.component');
var login_component_1 = require('./login/login.component');
var signup_component_1 = require("./signup/signup.component");
var unrecognized_path_component_1 = require('./unrecognized-path/unrecognized-path.component');
exports.routes = [
    { path: '', redirectTo: '/login', terminal: true },
    { path: 'home/:username', component: home_component_1.HomeComponent },
    { path: 'login', component: login_component_1.LoginComponent },
    { path: 'signup', component: signup_component_1.SignupComponent },
    { path: '*path', component: unrecognized_path_component_1.UnrecognizedPathComponent } // unrecognized url TODO: Make sure this works
];
exports.APP_ROUTER_PROVIDERS = [
    router_1.provideRouter(exports.routes)
];
//# sourceMappingURL=app.routes.js.map