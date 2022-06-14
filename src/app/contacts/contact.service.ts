import { Injectable } from '@angular/core';
import { Contact } from './contact.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  private contacts: Contact[] = [];
  maxContactId: number;
  contactListChangedEvent = new Subject<Contact[]>();

  constructor(private http: HttpClient) {} // This is the dependency injection.

  getContacts() {
    this.http
      .get<{ message: string, contacts: Contact[]}>(
        'http://localhost:3000/contacts/'
      )
      .subscribe(
        // success function
        (contactData) => {
          this.contacts = contactData.contacts;

          this.maxContactId = this.getMaxId();

          this.contacts.sort((a, b) =>
            a.name > b.name ? 1 : b.name > a.name ? -1 : 0
          );

          this.contactListChangedEvent.next(this.contacts.slice());
        },

        //error function
        (error: any) => {
          console.log(error);
        }
      );
  }

  getContact(id: string) {
    return this.http.get<{ message: string, contact: Contact}>('http://localhost:3000/contacts/'+id);
  }

  // getContact(id: string): Contact {
  //  for(const contact of this.contacts){
  //    if(cotact.id === id){
  //      return contact;
  //    }
  //  }
  //  return null;
  //}

  getMaxId(): number {
    let maxId = 0;
    this.contacts.forEach((contact: Contact) => {
      let currentContactId = parseInt(contact.id);

      if (currentContactId > maxId) {
        maxId = currentContactId;
      }
    });

    return maxId;
  }

  //This method is only for week 09 - firebase, and it is not the best approach to use storeContacts method.
  //storeContacts() {
  //  let contacts = JSON.stringify(this.contacts);

  //  const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

  //  his.http
  //    .put(
  //      'https://cms-project-8f25d-default-rtdb.firebaseio.com/contacts.json',
  //      contacts,
  //      { headers: headers }
  //    )
  //    .subscribe(() => {
  //      this.contactListChangedEvent.next(this.contacts.slice());
  //    });
  //}

  addContact(newContact: Contact) {
    if (!newContact) {
      return;
    }

     // make sure id of the new Document is empty
     newContact.id = '';

     const headers = new HttpHeaders({'Content-Type': 'application/json'});
 
     // add to database
     this.http.post<{ message: string, contact: Contact }>('http://localhost:3000/contacts',
       document,
       { headers: headers })
       .subscribe(
         (responseData) => {
           // add new document to documents
           this.contacts.push(responseData.contact);
           this.contactListChangedEvent.next(this.contacts.slice());
         }
       );
  }

  updateContact(originalContact: Contact, newContact: Contact) {
    if (!originalContact || !newContact) {
      return;
    }

    const pos = this.contacts.findIndex(d => d.id === originalContact.id);

    if (pos < 0) {
      return;
    }

    // set the id of the new Document to the id of the old Document
    newContact.id = originalContact.id;
    newContact['_id'] = originalContact['_id'];

    const headers = new HttpHeaders({'Content-Type': 'application/json'});

    // update database
    this.http.put('http://localhost:3000/contacts/' + originalContact.id,
      newContact, { headers: headers })
      .subscribe(
        (response: Response) => {
          this.contacts[pos] = newContact;
          this.contactListChangedEvent.next(this.contacts.slice());
        }
      );
  }

  deleteContact(contact: Contact) {
    
    if (!contact) {
      return;
    }

    const pos = this.contacts.findIndex(d => d.id === contact.id);

    if (pos < 0) {
      return;
    }

    // delete from database
    this.http.delete('http://localhost:3000/contacts/' + contact.id)
      .subscribe(
        (response: Response) => {
          this.contacts.splice(pos, 1);
          this.contactListChangedEvent.next(this.contacts.slice());
        }
      );
  }
  
}