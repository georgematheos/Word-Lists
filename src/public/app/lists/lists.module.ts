import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; // TODO: REACTIVE FORMS?
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { ListComponent } from './list/list.component';
import { LogoutComponent } from './logout/logout.component';

import { ListService } from './list.service';

@NgModule({
    imports: [ CommonModule, FormsModule, ReactiveFormsModule, RouterModule, HttpModule ],
    exports: [ HomeComponent, ListComponent ],
    declarations: [ HomeComponent, ListComponent, LogoutComponent ], // TODO: DO I EXPORT OR DECLARE THESE COMPONENTS and SERVICES
    providers: [ ListService ]
})
export class ListsModule { }
