import { Component, Input, OnInit } from '@angular/core'
import { ActivatedRoute, Params, Router } from '@angular/router'
import { WindRefService } from 'src/app/wind-ref.service'
import { Document } from '../document.model'
import { DocumentsService } from '../documents.service'

@Component({
  selector: 'cms-document-detail',
  templateUrl: './document-detail.component.html',
  styleUrls: ['./document-detail.component.css'],
})
export class DocumentDetailComponent implements OnInit {
  documentDetail: Document
  id: string
  nativeWindow: any

  constructor(private router:Router,
    private docService: DocumentsService,
    private route: ActivatedRoute,
    private windRef: WindRefService) {
      this.nativeWindow= windRef.getNativeWindow();
    }

  ngOnInit(){
    this.route.params
    .subscribe(
      (params:Params)=>{
        this.id = params['id'];
        console.log(this.id)
        this.documentDetail = this.docService.getDocument(this.id)
        console.log(this.documentDetail);
      }

    );
  }

  onView(){
    if(this.documentDetail.url)
    {
      this.nativeWindow.open(this.documentDetail.url)
    }
  }

  onDelete() {
   this.docService.deleteDocument(this.documentDetail);
   this.router.navigate(['/documents'], {relativeTo:this.route})
}
}
