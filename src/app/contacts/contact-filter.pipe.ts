import { Pipe, PipeTransform } from '@angular/core';
import { Contact } from './contact.model';


@Pipe({
  name: 'contactsFilter',
  pure: false //default is true
})

export class ContactsFilterPipe implements PipeTransform {
 
  transform(contacts: Contact[], term: string): any {

    let  filteredContacts: Contact[]= [];
    
    if(term && term.length > 0){

      //Method 1st:ok way
      //for (var i = 0; i < contacts.length; i++){
      //  if(contacts[i].name.include(term)){
      //    filteredContacts.push(contact);
      //  }
      //}


      //Method 1st:Better way
      //contacts.forEach(
      //  (contact: Contact) => {
      //    if(contact.name.toLowerCase().include(term.toLowerCase())){
      //    filteredContacts.push(contact);
      //  }
      //}


      //Method 3rd:Best way
      filteredContacts = contacts.filter((contact: Contact) =>{
        return contact.name.toLowerCase().includes(term.toLowerCase());
      });
    }

    return filteredContacts.length > 0 ? filteredContacts: contacts;
  }

}