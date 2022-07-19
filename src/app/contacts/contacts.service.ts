
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { concat, Subject } from 'rxjs';
import { Contact } from './contact.model';
// import {MOCKCONTACTS} from './MOCKCONTACTS';
@Injectable({
  providedIn: 'root'
})
export class ContactsService {

  contactSelectedEvent = new EventEmitter<Contact>();
  contactChangedEvent=new Subject<Contact[]>();
  contacts: Contact[]=[];
  maxId:number;

  constructor(private http: HttpClient) {
    //this.contacts = MOCKCONTACTS;
    this.maxId = this.getMaxId();
   }
   
   /*********************************
    * GET ALL THE CONTACTS IN THE DB
    * WILL RETURN A COPY OF THE COLLECTION
    * ******************** */
    getContacts(){
    //  return this.contacts.slice();
     this.http.get("http://localhost:3000/contacts")
    .subscribe((contacts:Contact[])=>{
      console.log(contacts)
      this.contacts = contacts;
      this.maxId = this.getMaxId()
      this.contactChangedEvent.next(this.contacts.slice());
    }, (error) =>{
      console.log(error)
    })
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

    const pos = this.contacts.findIndex(d => d.id === contact.id);

    if (pos < 0) {
      return;
    }

    // delete from database
    this.http.delete('http://localhost:3000/contacts/' + contact.id)
      .subscribe(
        (response: Response) => {
          this.contacts.splice(pos, 1);
          this.sortAndSend();
        }
      );
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
  addContact(contact:Contact){
     if (!contact) {
      return;
    }

    // make sure id of the new Document is empty
    contact.id = '';

    const headers = new HttpHeaders({'Content-Type': 'application/json'});

    // add to database
    this.http.post<{ message: string, contact: Contact }>('http://localhost:3000/contacts/',
      contact,
      { headers: headers })
      .subscribe(
        (responseData) => {
          // add new document to documents
          this.contacts.push(responseData.contact);
          this.sortAndSend();
          // storeDocument()

        }
      );
    
  }

  /********************************************
  * WILL UPDATE A ENTRY IN THE COLLECTION
  * ****************************************** */
  upDateContact(originalContact: Contact, newContact:Contact){
   if (!originalContact || !newContact) {
      return;
    }

    const pos = this.contacts.findIndex(d => d.id === originalContact.id);

    if (pos < 0) {
      return;
    }

    // set the id of the new Document to the id of the old Document
    newContact.id = originalContact.id;
    newContact._id = originalContact._id;

    const headers = new HttpHeaders({'Content-Type': 'application/json'});

    // update database
    this.http.put('http://localhost:3000/contacts/' + originalContact.id,
      newContact, { headers: headers })
      .subscribe(
        (response: Response) => {
          this.contacts[pos] = newContact;
          this.sortAndSend();
        }
      );
  }
   
   sortAndSend()
  {
    const contacts = JSON.stringify(this.contacts);

    const headers = new HttpHeaders()
   .set('content-type', 'application/json')
   .set('Access-Control-Allow-Origin', '*');

   this.http.put('http://localhost:3000/contacts/', contacts, {headers:headers} )
        .subscribe(data => this.contactChangedEvent.next(this.contacts.slice()) );
  }
}
