import { EventEmitter, Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Document } from './document.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})


export class DocumentsService {
documentSelected = new EventEmitter<Document>();
documentChangedEvent = new Subject<Document[]>();
documents: Document[]=[];
maxId:number;

constructor(private http: HttpClient) { 
    // this.documents=MOCKDOCUMENTS;
    this.maxId = this.getMaxId();
  }

  /*******************************************************************
  * GET ALL THE Documents IN THE DB WILL RETURN A COPY OF THE COLLECTION
  * ******************** ***********************************************/
  getDocuments(){
    // return this.documents.slice();
    this.http.get("http://localhost:3000/documents")
    .subscribe((documents:Document[])=>{
      console.log(documents)
      this.documents = documents;
      this.maxId = this.getMaxId()
      this.documentChangedEvent.next(this.documents.slice());
    }, (error) =>{
      console.log(error)
    })
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

    const pos = this.documents.findIndex(d => d.id === document.id);

    if (pos < 0) {
      return;
    }

    // delete from database
    this.http.delete('http://localhost:3000/documents/' + document.id)
      .subscribe(
        (response: Response) => {
          this.documents.splice(pos, 1);
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

  addDocument(document: Document) {
    if (!document) {
      return;
    }

    // make sure id of the new Document is empty
    document.id = '';

    const headers = new HttpHeaders({'Content-Type': 'application/json'});

    // add to database
    this.http.post<{ message: string, document: Document }>('http://localhost:3000/documents/',
      document,
      { headers: headers })
      .subscribe(
        (responseData) => {
          // add new document to documents
          this.documents.push(responseData.document);
          this.sortAndSend();
          // storeDocument()

        }
      );
  }

  /********************************************
  * WILL UPDATE A ENTRY IN THE COLLECTION
  * ****************************************** */
  updateDocument(originalDocument: Document, newDocument: Document) {
    if (!originalDocument || !newDocument) {
      return;
    }

    const pos = this.documents.findIndex(d => d.id === originalDocument.id);

    if (pos < 0) {
      return;
    }

    // set the id of the new Document to the id of the old Document
    newDocument.id = originalDocument.id;
    newDocument._id = originalDocument._id;

    const headers = new HttpHeaders({'Content-Type': 'application/json'});

    // update database
    this.http.put('http://localhost:3000/documents/' + originalDocument.id,
      newDocument, { headers: headers })
      .subscribe(
        (response: Response) => {
          this.documents[pos] = newDocument;
          this.sortAndSend();
        }
      );
  }



  sortAndSend()
  {
    const documents = JSON.stringify(this.documents);

    const headers = new HttpHeaders()
   .set('content-type', 'application/json')
   .set('Access-Control-Allow-Origin', '*');

   this.http.put('http://localhost:3000/documents/', documents, {headers:headers} )
        .subscribe(data => this.documentChangedEvent.next(this.documents.slice()) );
  }

}
