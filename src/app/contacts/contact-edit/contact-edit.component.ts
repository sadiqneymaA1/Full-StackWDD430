import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Contact } from '../contact.model';
import { ContactsService } from '../contacts.service';



@Component({
  selector: 'cms-contact-edit',
  templateUrl: './contact-edit.component.html',
  styleUrls: ['./contact-edit.component.css']
})
export class ContactEditComponent implements OnInit {
  orignalContact:Contact
  groupContacts: Contact[] =[]
  contact:Contact
  editMode: Boolean = false;
  id:string

   constructor(
        private contactService: ContactsService,
        private router: Router,
        private route: ActivatedRoute) {
        }

  ngOnInit(): void {
    this.route.params.
     subscribe((params: Params)=>{
        this.id = params['id']
        if(this.id == null)
        {
          this.editMode = false;
        }
      
        this.orignalContact= this.contactService.getContact(this.id);
        console.log(this.orignalContact)
       if(this.orignalContact == null)
       {
          return
       }

      this.editMode = true;
      this.contact = JSON.parse(JSON.stringify(this.orignalContact));
      
      if(this.contact.group)
      {
        this.groupContacts =  JSON.parse(JSON.stringify(this.orignalContact.group));
      }
      
      })

  }

  onCancel()
  {
     this.router.navigate(['/contacts'], {relativeTo:this.route})
  }

  onSubmit(form:NgForm)
  {
    const value = form.value;
    const newContact = new Contact(value.id, value.name, value.email, value.phone, value.imageUrl, value.group);
    if(this.editMode)
    {
      this.contactService.upDateContact(this.orignalContact, newContact);
    }
    else
    {
      this.contactService.addContact(newContact)
    }
     this.router.navigate(['/contacts'], {relativeTo:this.route})

  }

  isInvalidContact(newContact: Contact)
  {
    if(!newContact)
    {
      return true;
    }
    if(this.contact && newContact.id === this.contact.id)
    {
      return true;
    }
    for(let i =0 ; i < this.groupContacts.length; i ++)
    {
      if(newContact.id === this.groupContacts[i].id)
      {
        return true;
      }
    }
    return false;
  }

  addToGroup($event: any)
  {
   const selectedContact: Contact = $event.dragData;
   const invalidGroupContact = this.isInvalidContact(selectedContact);
   if (invalidGroupContact){
      return;
   }
   this.groupContacts.push(selectedContact);
  }

  
  onRemoveItem(index: number) {
   if (index < 0 || index >= this.groupContacts.length) {
      return;
   }
   this.groupContacts.splice(index, 1);
}
}
