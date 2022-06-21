import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core'
import { concat, Subscription } from 'rxjs'
import { Contact } from '../contact.model'
import { ContactsService } from '../contacts.service'

@Component({
  selector: 'cms-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css'],
})
export class ContactListComponent implements OnInit, OnDestroy {
  contacts: Contact[] = []
  private subscription: Subscription
  constructor(private contactService: ContactsService) {}

  ngOnInit(){
    this.contacts = this.contactService.getContacts()

    this.subscription= this.contactService.contactChangedEvent.subscribe(
      (contact:Contact[])=>{
        this.contacts=contact;
      })
  }

  ngOnDestroy(): void {
     this.subscription.unsubscribe(); 
  }
  
}
