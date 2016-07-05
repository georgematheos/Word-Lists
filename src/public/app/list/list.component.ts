import { Component, OnInit } from '@angular/core';
import { Router, ROUTER_DIRECTIVES, ActivatedRoute } from '@angular/router';
import { disableDeprecatedForms, provideForms, FORM_DIRECTIVES } from '@angular/forms';

import { AuthenticationService } from '../authentication.service';
import { ListService } from '../list.service';

import { Capsule } from '../types/Capsule';
import { WordListData } from '../types/WordListData';

@Component({
    moduleId: module.id,
    selector: 'wl-list',
    templateUrl: 'list.component.html',
    styleUrls: ['list.component.css'],
    directives: [
        ROUTER_DIRECTIVES,
        FORM_DIRECTIVES
    ],

    // use newer forms version for this component:
    providers: [
        disableDeprecatedForms(),
        provideForms()
    ]
})
export class ListComponent implements OnInit {
    username: string;

    // the following two properties are in capsules so the ngModel binding works better
    listTitle: string;
    wordCapsules: Capsule<string>[];

    originalListTitle: string;
    originalWords: string[];

    newList: boolean;
    showLoadingMessage: boolean;
    showErrorMessage: boolean;

    // messages, input field placeholders, etc.
    loadingMessage: string;
    errorMessage: string;
    titlePlaceholder: string;
    wordPlaceholder: string;

    constructor(
        private authenticationService: AuthenticationService,
        private listService: ListService,
        private route: ActivatedRoute,
        private router: Router) {
        // show the loading message right away
        this.showLoadingMessage = true;

        // do not show error message until error occurs
        this.showErrorMessage = false;

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
                        this.originalListTitle = data.title;
                        this.originalWords = data.words;

                        // set the list title capsule
                        this.listTitle = data.title;

                        // convert the word to a word capsule and add it to the array
                        this.wordCapsules = [];
                        data.words.forEach(word => {
                            this.wordCapsules.push(new Capsule(word));
                        })

                        // now that we have the words, we can show them instead of the loading message
                        this.showLoadingMessage = false;
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

    newWord() {
        this.wordCapsules.push(new Capsule(''));
    }

    deleteWord(event: Event, index: number) {
        this.wordCapsules.splice(index, 1);
    }

    save() {
        // get the words from the word capsules
        let extractedWords: string[] = [];
        this.wordCapsules.forEach(wordCapsule => {
            extractedWords.push(wordCapsule.item);
        });

        let newListBody: WordListData = {
            username: this.username,
            title: this.listTitle,
            words: extractedWords
        }

        // the function for when the http request is successful
        let handleSuccess = body => {
            // TODO: somehow show user that the list has been saved
            console.log('List saved');
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
            this.listService.updateList(this.username, this.originalListTitle, newListBody).subscribe(handleSuccess, handleError);
        }
    }

    cancel() {
        console.log('cancel function triggered');
    }

    delete() {
        console.log('delete function triggered');
    }
}
