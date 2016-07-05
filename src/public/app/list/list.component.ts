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

    // messages, input field placeholders, etc.
    loadingMessage: string;
    titlePlaceholder: string;
    wordPlaceholder: string;

    constructor(
        private authenticationService: AuthenticationService,
        private listService: ListService,
        private route: ActivatedRoute,
        private router: Router) {
        // show the loading message right away
        this.showLoadingMessage = true;

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

        this.listService.updateList(this.username, this.originalListTitle, newListBody).subscribe(responseBody => {
            // TODO: somehow note that the list has been saved
        }, err => {
            switch (err.status) {
                case 409:
                    console.log('CONFLICT!!');
            }
            // TODO: DEAL WITH ERRORS
        });
    }

    cancel() {
        console.log('cancel function triggered');
    }

    delete() {
        console.log('delete function triggered');
    }
}
