import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Contact } from '../contact.model';
import { ContactsService } from '../contacts.service';



@Component({
  selector: 'cms-contact-edit',
  templateUrl: './contact-edit.component.html',
  styleUrls: ['./contact-edit.component.css']
})
export class ContactEditComponent implements OnInit , OnDestroy{
  @ViewChild('f') slForm: NgForm;
  orignalContact:Contact
  groupContacts: Contact[] =[]
  contact:Contact
  editMode: Boolean = false;
  id:string
  subsription: Subscription;

   constructor(
        private contactService: ContactsService,
        private router: Router,
        private route: ActivatedRoute) {
        }

  ngOnInit(): void {
    this.subsription = this.route.params.
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
      
      // if(this.contact.group)
      // {
      //   this.groupContacts =  JSON.parse(JSON.stringify(this.orignalContact.group));
      // }
      console.log(this.slForm)
      this.slForm.setValue({
        id: this.orignalContact.id,
        name: this.orignalContact.name,
        email: this.orignalContact.email,
        phone: this.orignalContact.phone,
        imageUrl: this.orignalContact.imageUrl,
        group: this.orignalContact.group
      })
      
      })

  }

  onCancel()
  {
     this.router.navigate(['/contacts'], {relativeTo:this.route})
  }

  onSubmit(form:NgForm)
  {
    const value = form.value;
    const newContact = new Contact(null,value.id, value.name, value.email, value.phone, value.imageUrl, value.group);
    console.log(value)
    console.log(newContact)
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

 ngOnDestroy(): void {
      this.subsription.unsubscribe();
  }
}
