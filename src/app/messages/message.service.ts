import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Message } from './message.model';
import { MOCKMESSAGES } from './MOCKMESSAGES';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
 messageChanged = new EventEmitter<Message[]>();
 private messages:Message[]=[];
 maxMessageId: number;
  constructor(private http: HttpClient) { 
    this.messages = MOCKMESSAGES;
  }

  getMessages(){
    // return this.messages.slice();
     this.http.get("https://cmsproject-35804-default-rtdb.firebaseio.com/messages.json")
    .subscribe((messages:Message[])=>{
      console.log(messages)
      this.messages = messages;
      this.maxMessageId = this.getMaxId()
      this.messageChanged.emit(this.messages.slice())

    }, (error) =>{
      console.log(error)
    })
  }

  getMessage(id:string){
    this.messages.forEach(message => {
      if(id == message.id)
      {
        return message;
      }
      else{
        return null;
      }
      
    });
  }

   addMessage(message:Message)
   {
     this.messages.push(message);
     this.storeMessage()

   }

    /******************************************************
    * WILL GET THE MAXID FOR THE  ITEM IN THE COLLECTION SO 
    * AS TO PRODUCE A UNIQUE ID 
    * ******************** *********************************/
    getMaxId(){

    let maxid = 0;

    this.messages.forEach(contact => {
      let currId = parseInt(contact.id);
      if(currId > maxid)
      {
        maxid = currId;
      }
       
    });
    return maxid;
  }


   storeMessage()
  {
    const messages = JSON.stringify(this.messages);

    const headers = new HttpHeaders()
   .set('content-type', 'application/json')
   .set('Access-Control-Allow-Origin', '*');

   this.http.put('https://cmsproject-35804-default-rtdb.firebaseio.com/messages.json', messages, {headers:headers} )
        .subscribe(data => this.messageChanged.emit(this.messages.slice()) );
  }

}
