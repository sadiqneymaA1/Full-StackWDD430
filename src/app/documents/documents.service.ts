import { EventEmitter, Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Document } from './document.model';
import { MOCKDOCUMENTS } from './MOCKDOCUMENTS';
@Injectable({
  providedIn: 'root'
})


export class DocumentsService {
documentSelected = new EventEmitter<Document>();
documentChangedEvent = new Subject<Document[]>();
private documents: Document[]=[];
maxId:number;

constructor() { 
    this.documents=MOCKDOCUMENTS;
    this.maxId = this.getMaxId();
  }

  /*******************************************************************
  * GET ALL THE Documents IN THE DB WILL RETURN A COPY OF THE COLLECTION
  * ******************** ***********************************************/
  getDocuments(){
    return this.documents.slice();
  }

  /*****************************************
  * GET A DOCUMENT IN THE DB BASED ON AN ID
  * ***************************************/
  getDocument(id:string)
  {
    for(let doc of this.documents){
       if(doc.id == id)
       {
         return doc
       }
     }
     return null;
   }
  
  /********************************************
  * DELETE A DOC IN THE DB BASED ON AN ID
  * ******************************************/ 
  deleteDocument(document: Document) {
   if (!document) {
      return;
   }
   const pos = this.documents.indexOf(document);
   if (pos < 0) {
      return;
   }
   this.documents.splice(pos, 1);
   this.documentChangedEvent.next(this.documents.slice());
}


 /******************************************************
  * WILL GET THE MAXID FOR THE  ITEM IN THE COLLECTION SO 
  * AS TO PRODUCE A UNIQUE ID 
  * ******************** *********************************/
getMaxId(){

    let maxid = 0;

    this.documents.forEach(document => {
      let currId = parseInt(document.id);
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
  addDocument(newDoc:Document){
    if(!newDoc)
    {
      return
    }

    this.maxId++;
    newDoc.id = this.maxId.toString()
    this.documents.push(newDoc);
    this.documentChangedEvent.next(this.documents.slice());
    
  }

  /********************************************
  * WILL UPDATE A ENTRY IN THE COLLECTION
  * ****************************************** */
  upDateDocument(originalDoc: Document, newDoc:Document){
    if(!originalDoc || !newDoc)
    {
      return
    }

    const pos = this.documents.indexOf(originalDoc);
    if (pos < 0) {
        return;
    }
    newDoc.id = originalDoc.id;

    this.documents[pos] = newDoc;

    this.documentChangedEvent.next(this.documents.slice());
  }

}
