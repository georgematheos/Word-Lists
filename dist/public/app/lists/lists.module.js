"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var forms_1 = require("@angular/forms"); // TODO: REACTIVE FORMS?
var http_1 = require("@angular/http");
var router_1 = require("@angular/router");
var home_component_1 = require("./home/home.component");
var list_component_1 = require("./list/list.component");
var logout_component_1 = require("./logout/logout.component");
var list_service_1 = require("./list.service");
var ListsModule = (function () {
    function ListsModule() {
    }
    return ListsModule;
}());
ListsModule = __decorate([
    core_1.NgModule({
        imports: [common_1.CommonModule, forms_1.FormsModule, forms_1.ReactiveFormsModule, router_1.RouterModule, http_1.HttpModule],
        exports: [home_component_1.HomeComponent, list_component_1.ListComponent],
        declarations: [home_component_1.HomeComponent, list_component_1.ListComponent, logout_component_1.LogoutComponent],
        providers: [list_service_1.ListService]
    }),
    __metadata("design:paramtypes", [])
], ListsModule);
exports.ListsModule = ListsModule;
//# sourceMappingURL=lists.module.js.map