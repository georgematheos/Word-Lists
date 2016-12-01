import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { AuthenticationService } from '../authentication/authentication.service';
import { ListService } from '../list.service';

import { Capsule } from '../types/Capsule';
import { WordListData } from '../types/WordListData';
import { ConfirmationItem } from '../types/ConfirmationItem';

// constants for use in the methods

// messages for when the changes are saved or unsaved
const changesUnsavedMessage = "Changes Unsaved";
const changesSavedMessage = "Changes Saved";

// messages for confirmation box
const confirmCancelMessage = "Are you sure you want to undo all unsaved changes?";
const confirmDeleteMessage = "Are you sure you want to permenantly delete this word list?";

@Component({
    moduleId: module.id,
    selector: 'wl-list',
    templateUrl: 'list.component.html',
    styleUrls: ['list.component.css']
})
export class ListComponent implements OnInit {
    username: string;

    // the following two properties are in capsules so the ngModel binding works better
    listTitle: string;
    wordCapsules: Capsule<string>[];

    private lastSavedListTitle: string;
    private lastSavedWords: string[];

    newList: boolean;
    showLoadingMessage: boolean;
    showErrorMessage: boolean;
    changesSaved: boolean;

    showConfirmationPopup: boolean;

    // messages, input field placeholders, etc.
    loadingMessage: string;
    errorMessage: string;
    saveStatusMessage: string;
    confirmationMessage: string;
    titlePlaceholder: string;
    wordPlaceholder: string;

    // yes or no from confirmation box
    private confirmation;
    confirmationReason: ConfirmationItem;

    // these allow the enum items to be accessed in the template
    CANCEL_ITEM = ConfirmationItem.Cancel;
    DELETE_ITEM = ConfirmationItem.Delete;

    constructor(
        private authenticationService: AuthenticationService,
        private listService: ListService,
        private route: ActivatedRoute,
        private router: Router) {
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
        this.wordCapsules = [new Capsule('')];

        this.loadingMessage = 'Loading Words...';
        this.titlePlaceholder = 'Enter a List Title Here (required)';
        this.wordPlaceholder = 'Enter a Word Here';
    }

    ngOnInit() {
        this.route.params.subscribe(params => {
            this.username = params['username']; // TODO: MAKE SURE THIS USERNAME IS THE SAME AS THE ONE FROM AUTHENTICATIONSERVICE
            this.listTitle = params['title'];

            // if no list title is provided, this list must be new
            if (!this.listTitle) {
                this.newList = true;
            }

            // if this is not a new list, get the words currently in the list and the title
            if (!this.newList) {
                this.listService.getWordListData(this.username, this.listTitle)
                    .subscribe(data => {
                        // set the original properties
                        this.lastSavedListTitle = data.title;
                        this.lastSavedWords = data.words;

                        // set the list title capsule
                        this.listTitle = data.title;

                        // convert the word to a word capsule and add it to the array
                        this.wordCapsules = [];
                        data.words.forEach(word => {
                            this.wordCapsules.push(new Capsule(word));
                        })

                        // now that we have the words, we can show them instead of the loading message
                        this.showLoadingMessage = false;

                        // changes are saved
                        this.changesSaved = true;
                        this.saveStatusMessage = changesSavedMessage;
                    });
            }
        })
    }

    // for the following functions, I cast to any since the typescript compiler does not realize that there will be a placeholder property on the event.target
    titleBlur($event: FocusEvent) {
        (event.target as any).placeholder = this.titlePlaceholder;
    }

    titleFocus($event: FocusEvent) {
        (event.target as any).placeholder = '';
    }

    wordBlur(event: FocusEvent) {
        (event.target as any).placeholder = this.wordPlaceholder;
    }

    wordFocus(event: FocusEvent) {
        (event.target as any).placeholder = '';
    }

    // when anything changes in the form, assume the changes are unsaved
    onChange() {
        this.changesSaved = false;
        this.saveStatusMessage = changesUnsavedMessage;
    }

    newWord() {
        this.wordCapsules.push(new Capsule(''));

        // this setTimeout is done so the ngFor updates and adds the new input before focusing this
        setTimeout(() => {
            $('.wl-words-wrapper div:last-child input')[0].focus(); // focus the new word slot
        }, 0);
    }

    deleteWord(event: Event, index: number) {
        this.wordCapsules.splice(index, 1);
    }

    tabInWordSlot(index: number) {
        if (index == this.wordCapsules.length - 1) {
            this.newWord();
        }
    }

    save() {
        // filter away all the empty word capsules
        let filteredCapsules = this.wordCapsules.filter(capsule => capsule.item !== '');

        // get the words from the word capsules
        let extractedWords: string[] = [];
        filteredCapsules.forEach(wordCapsule => {
            extractedWords.push(wordCapsule.item);
        });

        let newListBody: WordListData = {
            username: this.username,
            title: this.listTitle,
            words: extractedWords
        }

        // the function for when the http request is successful
        let handleSuccess = body => {
            // changes are saved
            this.changesSaved = true;
            this.saveStatusMessage = changesSavedMessage;

            // now the words array is has had the empty elements filtered away
            this.wordCapsules = filteredCapsules;

            // now the last saved title is the current title
            this.lastSavedListTitle = this.listTitle;

            // redo the last saved words with the new words
            this.lastSavedWords = [];
            for (let capsule of filteredCapsules) {
                this.lastSavedWords.push(capsule.item);
            }

            // update the url with the new title
            this.router.navigate(['/list', this.username, this.listTitle]);

            // stop showing error message if any is being shown
            this.showErrorMessage = false;
        }

        // the function for when the http request returns an error
        let handleError = err => {
            switch (err.status) {
                case 409:
                    this.errorMessage = `Could not save because the list title “${this.listTitle}” is already taken.  Please rename list and try again.`
                    this.showErrorMessage = true;
                default:
                    // TODO: handle other errors better
                    console.log('Error!  More info: ');
                    console.log(err);
            }
        }

        // TODO: ONLY DO THIS IF IT IS NOT A NEW LIST
        if (this.newList) {
            this.listService.createList(this.username, newListBody).subscribe(handleSuccess, handleError);
        }
        else {
            this.listService.updateList(this.username, this.lastSavedListTitle, newListBody).subscribe(handleSuccess, handleError);
        }
    }

    // show the confirmation for the cancel
    cancel() {
        // the reason to show the confirmation box is to cancel
        this.confirmationReason = ConfirmationItem.Cancel;

        this.confirmationMessage = confirmCancelMessage;
        this.showConfirmationPopup = true;
        console.log('cancel function triggered');
    }

    private completeCancel() {
        let capsules: Capsule<string>[] = [];
        for (let word of this.lastSavedWords) {
            capsules.push(new Capsule(word));
        }

        this.wordCapsules = capsules;
        this.listTitle = this.lastSavedListTitle;

        // we are back to the same state as the last save
        this.saveStatusMessage = changesSavedMessage;
        this.changesSaved = true;
    }

    delete() {
        // the reason to show the confirmation box is to cancel
        this.confirmationReason = ConfirmationItem.Delete;

        this.confirmationMessage = confirmDeleteMessage;
        this.showConfirmationPopup = true;

        console.log('delete function triggered');
    }

    private completeDelete() {
        this.listService.deleteList(this.username, this.lastSavedListTitle).subscribe(res => {
            // go to the home page
            this.router.navigate(['/home', this.username]);
        },
        err => {
            // TODO: handle failure case
        });
    }

    yesConfirmClick() {
        // confirmation is true
        this.confirmation = true;

        // complete the item depending on what the confirmation reason is
        switch(this.confirmationReason) {
            case ConfirmationItem.Cancel:
                this.completeCancel();
                console.log('completed the cancel');
                break;
            case ConfirmationItem.Delete:
                this.completeDelete();
                console.log('completed the delete');
                break;
        }

        // hide the confirmation popup
        this.showConfirmationPopup = false;
    }

    noConfirmClick() {
        // confirmation is false
        this.confirmation = true;

        // hide the confirmation popup
        this.showConfirmationPopup = false;
    }
}
