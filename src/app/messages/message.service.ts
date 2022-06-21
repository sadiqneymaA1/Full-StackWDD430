import { EventEmitter, Injectable } from '@angular/core';
import { Message } from './message.model';
import { MOCKMESSAGES } from './MOCKMESSAGES';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  messageChanged = new EventEmitter<Message[]>();
 private messages:Message[]=[];
  constructor() { 
    this.messages = MOCKMESSAGES;
  }

  getMessages(){
    return this.messages.slice();
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
     this.messageChanged.emit(this.messages.slice())

   }

}
