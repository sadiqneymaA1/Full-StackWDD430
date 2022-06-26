import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core'
import { Subscription } from 'rxjs'
import { Document } from '../document.model'
import { DocumentsService } from '../documents.service'
@Component({
  selector: 'cms-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.css'],
})
export class DocumentListComponent implements OnInit , OnDestroy{
  documents: Document[] = []
  private subscription: Subscription

  constructor(private docService:DocumentsService) {}

  ngOnInit(){
     this.docService.getDocuments();
    
     this.subscription = this.docService.documentChangedEvent.subscribe(
      (document:Document[])=>{
        this.documents=document;
      })
  }

  ngOnDestroy(): void {
     this.subscription.unsubscribe(); 
  }

}
