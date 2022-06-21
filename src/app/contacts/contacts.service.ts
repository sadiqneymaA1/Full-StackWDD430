import { EventEmitter, Injectable } from '@angular/core';
import { concat, Subject } from 'rxjs';
import { Contact } from './contact.model';
import {MOCKCONTACTS} from './MOCKCONTACTS';
@Injectable({
  providedIn: 'root'
})
export class ContactsService {

  contactSelectedEvent = new EventEmitter<Contact>();
  contactChangedEvent=new Subject<Contact[]>();
  private contacts: Contact[]=[];
  maxId:number;

  constructor() {
    this.contacts = MOCKCONTACTS;
    this.maxId = this.getMaxId();
   }
   
   /*********************************
    * GET ALL THE CONTACTS IN THE DB
    * WILL RETURN A COPY OF THE COLLECTION
    * ******************** */
    getContacts(){
     return this.contacts.slice();
    }

    /*****************************************
    * GET A CONTACT IN THE DB BASED ON AN ID
    * ***************************************/
    getContact(id:string)
    {
      for(let contact of this.contacts){
        if(contact.id == id)
        {
          return contact
        }
      }
      return null;
    }

    /*********************************************
    * DELETE A CONTACTS IN THE DB BASED ON AN ID
    * ********************************************/
    deleteContact(contact: Contact) {
      if (!contact) {
          return;
      }
      const pos = this.contacts.indexOf(contact);
      if (pos < 0) {
          return;
      }
      this.contacts.splice(pos, 1);
      this.contactChangedEvent.next(this.contacts.slice());
    }

    /******************************************************
    * WILL GET THE MAXID FOR THE  ITEM IN THE COLLECTION SO 
    * AS TO PRODUCE A UNIQUE ID 
    * ******************** *********************************/
    getMaxId(){

    let maxid = 0;

    this.contacts.forEach(contact => {
      let currId = parseInt(contact.id);
      if(currId > maxid)
      {
        maxid = currId;
      }
       
    });
    return maxid;
  }

  /********************************************
  * WILL CREATE A NEW ENTRY FOR THE COLLECTION
  * ****************************************** */
  addContact(newContact:Contact){
    if(!newContact)
    {
      return
    }

    this.maxId++;
    newContact.id = this.maxId.toString()
    this.contacts.push(newContact);
    this.contactChangedEvent.next(this.contacts.slice());
    
  }

  /********************************************
  * WILL UPDATE A ENTRY IN THE COLLECTION
  * ****************************************** */
  upDateContact(originalContact: Contact, newContact:Contact){
    if(!originalContact || !newContact)
    {
      return
    }

    const pos = this.contacts.indexOf(originalContact);
    if (pos < 0) {
        return;
    }
    newContact.id = originalContact.id;

    this.contacts[pos] = newContact;

    this.contactChangedEvent.next(this.contacts.slice());
  }
   
}
