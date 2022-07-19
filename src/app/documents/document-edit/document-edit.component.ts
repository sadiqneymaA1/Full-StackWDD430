import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { DocumentsService } from '../documents.service';
import { Document } from '../document.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'cms-document-edit',
  templateUrl: './document-edit.component.html',
  styleUrls: ['./document-edit.component.css']
})
export class DocumentEditComponent implements OnInit, OnDestroy {

  @ViewChild('f') slForm: NgForm;
  originalDocument: Document;
  document: Document;
  editMode: Boolean = false;
  id:string;
  subsription: Subscription;

  constructor(private documentService: DocumentsService,
    private router:Router,
    private route: ActivatedRoute) {
     }

  ngOnInit() {
     this.subsription= this.route.params.
     subscribe((params: Params)=>{
         this.id = params['id']
        if(this.id == null)
        {
          this.editMode = false;
        }
      
        this.originalDocument= this.documentService.getDocument(this.id);
        console.log(this.originalDocument)
       if(this.originalDocument == null)
       {
          return
       }

      this.editMode = true;
      console.log(this.slForm)
      this.slForm.setValue({
        name: this.originalDocument.name,
        description: this.originalDocument.description,
        url: this.originalDocument.url
      })
        this.document = JSON.parse(JSON.stringify(this.originalDocument));
      })

  
  }

  onCancel()
  {
      this.router.navigate(['/documents'], {relativeTo:this.route})
  }

  onSubmit(form:NgForm){
    const value = form.value;
    const newDocument = new Document(null,value.id,value.name, value.description,value.url, null);
    if(this.editMode)
    {
      this.documentService.updateDocument(this.originalDocument, newDocument);
    }
    else
    {
      this.documentService.addDocument(newDocument)
    }
     this.router.navigate(['/documents'], {relativeTo:this.route})
  }

  ngOnDestroy(): void {
      this.subsription.unsubscribe();
  }

}
