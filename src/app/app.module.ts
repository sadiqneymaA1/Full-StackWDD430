import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header.component';
import { ContactsComponent } from './contacts/contacts.component';
import { ContactListComponent } from './contacts/contact-list/contact-list.component';
import { ContactDetailComponent } from './contacts/contact-detail/contact-detail.component';
import { ContactItemComponent } from './contacts/contact-item/contact-item.component';
import { DropdownDirective } from 'shared/dropdown.directive';
import { MessageEditComponent } from './messages/message-edit/message-edit.component';
// import { MessageEdit } from './message-edit.component/message-edit.component.component';
import { MessageItemComponent } from './messages/message-item/message-item.component.component';
 import { MessageListComponent } from './messages/message-list/message-list.component';
// import { ContactEdit } from './contacts/contact-edit.component/contact-edit.component.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ContactsComponent,
    ContactListComponent,
    ContactDetailComponent,
    ContactItemComponent,
    DropdownDirective,
    MessageEditComponent,
    // MessageEdit.ComponentComponent,
    // MessageItem.ComponentComponent,
    // MessageListComponent
    MessageListComponent,
    MessageItemComponent,

    
    
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
