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
var logout_component_1 = require('../logout/logout.component');
var authentication_service_1 = require('../authentication.service');
var list_service_1 = require('../list.service');
var Capsule_1 = require('../types/Capsule');
var ConfirmationItem_1 = require('../types/ConfirmationItem');
// constants for use in the methods
// messages for when the changes are saved or unsaved
var changesUnsavedMessage = "Changes Unsaved";
var changesSavedMessage = "Changes Saved";
// messages for confirmation box
var confirmCancelMessage = "Are you sure you want to undo all unsaved changes?";
var confirmDeleteMessage = "Are you sure you want to permenantly delete this word list?";
var ListComponent = (function () {
    function ListComponent(authenticationService, listService, route, router) {
        this.authenticationService = authenticationService;
        this.listService = listService;
        this.route = route;
        this.router = router;
        // these allow the enum items to be accessed in the template
        this.CANCEL_ITEM = ConfirmationItem_1.ConfirmationItem.Cancel;
        this.DELETE_ITEM = ConfirmationItem_1.ConfirmationItem.Delete;
        // show the loading message right away
        this.showLoadingMessage = true;
        // do not show error message until error occurs
        this.showErrorMessage = false;
        // do not show popup until confirmation is needed
        this.showConfirmationPopup = false;
        // start with the saved changes as false (change it once data is loaded from server)
        this.changesSaved = false;
        this.saveStatusMessage = changesUnsavedMessage;
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
                    _this.lastSavedListTitle = data.title;
                    _this.lastSavedWords = data.words;
                    // set the list title capsule
                    _this.listTitle = data.title;
                    // convert the word to a word capsule and add it to the array
                    _this.wordCapsules = [];
                    data.words.forEach(function (word) {
                        _this.wordCapsules.push(new Capsule_1.Capsule(word));
                    });
                    // now that we have the words, we can show them instead of the loading message
                    _this.showLoadingMessage = false;
                    // changes are saved
                    _this.changesSaved = true;
                    _this.saveStatusMessage = changesSavedMessage;
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
    // when anything changes in the form, assume the changes are unsaved
    ListComponent.prototype.onChange = function () {
        this.changesSaved = false;
        this.saveStatusMessage = changesUnsavedMessage;
    };
    ListComponent.prototype.newWord = function () {
        this.wordCapsules.push(new Capsule_1.Capsule(''));
    };
    ListComponent.prototype.deleteWord = function (event, index) {
        this.wordCapsules.splice(index, 1);
    };
    ListComponent.prototype.save = function () {
        var _this = this;
        // filter away all the empty word capsules
        var filteredCapsules = this.wordCapsules.filter(function (capsule) { return capsule.item !== ''; });
        // get the words from the word capsules
        var extractedWords = [];
        filteredCapsules.forEach(function (wordCapsule) {
            extractedWords.push(wordCapsule.item);
        });
        var newListBody = {
            username: this.username,
            title: this.listTitle,
            words: extractedWords
        };
        // the function for when the http request is successful
        var handleSuccess = function (body) {
            // changes are saved
            _this.changesSaved = true;
            _this.saveStatusMessage = changesSavedMessage;
            // now the words array is has had the empty elements filtered away
            _this.wordCapsules = filteredCapsules;
            // now the last saved title is the current title
            _this.lastSavedListTitle = _this.listTitle;
            // redo the last saved words with the new words
            _this.lastSavedWords = [];
            for (var _i = 0, filteredCapsules_1 = filteredCapsules; _i < filteredCapsules_1.length; _i++) {
                var capsule = filteredCapsules_1[_i];
                _this.lastSavedWords.push(capsule.item);
            }
            // update the url with the new title
            _this.router.navigate(['/list', _this.username, _this.listTitle]);
            // stop showing error message if any is being shown
            _this.showErrorMessage = false;
        };
        // the function for when the http request returns an error
        var handleError = function (err) {
            switch (err.status) {
                case 409:
                    _this.errorMessage = "Could not save because the list title \u201C" + _this.listTitle + "\u201D is already taken.  Please rename list and try again.";
                    _this.showErrorMessage = true;
                default:
                    // TODO: handle other errors better
                    console.log('Error!  More info: ');
                    console.log(err);
            }
        };
        // TODO: ONLY DO THIS IF IT IS NOT A NEW LIST
        if (this.newList) {
            this.listService.createList(this.username, newListBody).subscribe(handleSuccess, handleError);
        }
        else {
            this.listService.updateList(this.username, this.lastSavedListTitle, newListBody).subscribe(handleSuccess, handleError);
        }
    };
    // show the confirmation for the cancel
    ListComponent.prototype.cancel = function () {
        // the reason to show the confirmation box is to cancel
        this.confirmationReason = ConfirmationItem_1.ConfirmationItem.Cancel;
        this.confirmationMessage = confirmCancelMessage;
        this.showConfirmationPopup = true;
        console.log('cancel function triggered');
    };
    ListComponent.prototype.completeCancel = function () {
        var capsules = [];
        for (var _i = 0, _a = this.lastSavedWords; _i < _a.length; _i++) {
            var word = _a[_i];
            capsules.push(new Capsule_1.Capsule(word));
        }
        this.wordCapsules = capsules;
        this.listTitle = this.lastSavedListTitle;
        // we are back to the same state as the last save
        this.saveStatusMessage = changesSavedMessage;
        this.changesSaved = true;
    };
    ListComponent.prototype.delete = function () {
        // the reason to show the confirmation box is to cancel
        this.confirmationReason = ConfirmationItem_1.ConfirmationItem.Delete;
        this.confirmationMessage = confirmDeleteMessage;
        this.showConfirmationPopup = true;
        console.log('delete function triggered');
    };
    ListComponent.prototype.completeDelete = function () {
        var _this = this;
        this.listService.deleteList(this.username, this.lastSavedListTitle).subscribe(function (res) {
            // go to the home page
            _this.router.navigate(['/home', _this.username]);
        }, function (err) {
            // TODO: handle failure case
        });
    };
    ListComponent.prototype.yesConfirmClick = function () {
        // confirmation is true
        this.confirmation = true;
        // complete the item depending on what the confirmation reason is
        switch (this.confirmationReason) {
            case ConfirmationItem_1.ConfirmationItem.Cancel:
                this.completeCancel();
            case ConfirmationItem_1.ConfirmationItem.Delete:
                this.completeDelete();
        }
        // hide the confirmation popup
        this.showConfirmationPopup = false;
    };
    ListComponent.prototype.noConfirmClick = function () {
        // confirmation is false
        this.confirmation = true;
        // hide the confirmation popup
        this.showConfirmationPopup = false;
    };
    ListComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'wl-list',
            templateUrl: 'list.component.html',
            styleUrls: ['list.component.css'],
            directives: [
                router_1.ROUTER_DIRECTIVES,
                forms_1.FORM_DIRECTIVES,
                logout_component_1.LogoutComponent
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