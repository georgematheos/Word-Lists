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
var core_1 = require('@angular/core');
var router_1 = require('@angular/router');
var forms_1 = require('@angular/forms');
var authentication_service_1 = require('../authentication.service');
var list_service_1 = require('../list.service');
var Capsule_1 = require('../types/Capsule');
var ListComponent = (function () {
    function ListComponent(authenticationService, listService, route, router) {
        this.authenticationService = authenticationService;
        this.listService = listService;
        this.route = route;
        this.router = router;
        // show the loading message right away
        this.showLoadingMessage = true;
        // do not show error message until error occurs
        this.showErrorMessage = true; // TODO: REMOVE TESTING STUFF
        this.errorMessage = 'Could not save because the list title “Sweets List” is already taken.  Please rename list and try again.';
        // by default, have one word capsule with no text in the string
        this.wordCapsules = [new Capsule_1.Capsule('')];
        this.loadingMessage = 'Loading Words...';
        this.titlePlaceholder = 'Enter a List Title Here (required)';
        this.wordPlaceholder = 'Enter a Word Here';
    }
    ListComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.params.subscribe(function (params) {
            _this.username = params['username']; // TODO: MAKE SURE THIS USERNAME IS THE SAME AS THE ONE FROM AUTHENTICATIONSERVICE
            _this.listTitle = params['title'];
            // if no list title is provided, this list must be new
            if (!_this.listTitle) {
                _this.newList = true;
            }
            // if this is not a new list, get the words currently in the list and the title
            if (!_this.newList) {
                _this.listService.getWordListData(_this.username, _this.listTitle)
                    .subscribe(function (data) {
                    // set the original properties
                    _this.originalListTitle = data.title;
                    _this.originalWords = data.words;
                    // set the list title capsule
                    _this.listTitle = data.title;
                    // convert the word to a word capsule and add it to the array
                    _this.wordCapsules = [];
                    data.words.forEach(function (word) {
                        _this.wordCapsules.push(new Capsule_1.Capsule(word));
                    });
                    // now that we have the words, we can show them instead of the loading message
                    _this.showLoadingMessage = false;
                });
            }
        });
    };
    // for the following functions, I cast to any since the typescript compiler does not realize that there will be a placeholder property on the event.target
    ListComponent.prototype.titleBlur = function ($event) {
        event.target.placeholder = this.titlePlaceholder;
    };
    ListComponent.prototype.titleFocus = function ($event) {
        event.target.placeholder = '';
    };
    ListComponent.prototype.wordBlur = function (event) {
        event.target.placeholder = this.wordPlaceholder;
    };
    ListComponent.prototype.wordFocus = function (event) {
        event.target.placeholder = '';
    };
    ListComponent.prototype.newWord = function () {
        this.wordCapsules.push(new Capsule_1.Capsule(''));
    };
    ListComponent.prototype.deleteWord = function (event, index) {
        this.wordCapsules.splice(index, 1);
    };
    ListComponent.prototype.save = function () {
        // get the words from the word capsules
        var extractedWords = [];
        this.wordCapsules.forEach(function (wordCapsule) {
            extractedWords.push(wordCapsule.item);
        });
        var newListBody = {
            username: this.username,
            title: this.listTitle,
            words: extractedWords
        };
        // TODO: ONLY DO THIS IF IT IS NOT A NEW LIST
        this.listService.updateList(this.username, this.originalListTitle, newListBody).subscribe(function (responseBody) {
            // TODO: somehow note that the list has been saved
        }, function (err) {
            switch (err.status) {
                case 409:
                    console.log('CONFLICT!!');
            }
            // TODO: DEAL WITH ERRORS
        });
    };
    ListComponent.prototype.cancel = function () {
        console.log('cancel function triggered');
    };
    ListComponent.prototype.delete = function () {
        console.log('delete function triggered');
    };
    ListComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'wl-list',
            templateUrl: 'list.component.html',
            styleUrls: ['list.component.css'],
            directives: [
                router_1.ROUTER_DIRECTIVES,
                forms_1.FORM_DIRECTIVES
            ],
            // use newer forms version for this component:
            providers: [
                forms_1.disableDeprecatedForms(),
                forms_1.provideForms()
            ]
        }), 
        __metadata('design:paramtypes', [authentication_service_1.AuthenticationService, list_service_1.ListService, router_1.ActivatedRoute, router_1.Router])
    ], ListComponent);
    return ListComponent;
}());
exports.ListComponent = ListComponent;
//# sourceMappingURL=list.component.js.map