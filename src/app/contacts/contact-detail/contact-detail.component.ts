import { Component, Input, OnInit } from '@angular/core'
import { ActivatedRoute, Params, Router } from '@angular/router'
import { Contact } from '../contact.model'
import { ContactsService } from '../contacts.service'

@Component({
  selector: 'cms-contact-detail',
  templateUrl: './contact-detail.component.html',
  styleUrls: ['./contact-detail.component.css'],
})
export class ContactDetailComponent implements OnInit {
  @Input() contactDetail: Contact
  id: string
  // contactDetail: Contact = new Contact('1', 'R. Kent Jonhsson', 'jackson@byui.edu', '208-496-3771', '../../assets/images/jacksonk.jpg', null)
  //   ;
  constructor(private contactService: ContactsService,
    private router: Router,
    private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.params
    .subscribe(
      (params:Params)=>{
        this.id = params['id'];
        console.log(this.id)
        this.contactDetail = this.contactService.getContact(this.id)
        console.log(this.contactDetail);
      }

    );
  }

  onDelete() {
   this.contactService.deleteContact(this.contactDetail);
   this.router.navigate(['/contacts'], {relativeTo:this.route})
}
}
