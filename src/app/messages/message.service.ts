import { Injectable } from '@angular/core';
import { Message } from './message.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  private messages: Message[] = [];
  maxMessageId: number;
  messageListChangedEvent = new Subject<Message[]>();

  constructor(private http: HttpClient) {}

  getMaxId(): number {
    let maxId = 0;
    this.messages.forEach((message: Message) => {
      let currentMessageId = parseInt(message.id);

      if (currentMessageId > maxId) {
        maxId = currentMessageId;
      }
    });

    return maxId;
  }

  addMessage(newMessage: Message) {
    if (!newMessage) {
      return;
    }

    // make sure id of the new Document is empty
    newMessage.id = '';

    const headers = new HttpHeaders({'Content-Type': 'application/json'});

    // add to database
    this.http.post<{ message: Message }>('http://localhost:3000/messages',
      document,
      { headers: headers })
      .subscribe(
        (responseData) => {
          // add new document to documents
          this.messages.push(responseData.message);
          this.messageListChangedEvent.next(this.messages.slice());
        }
      );
  }

  getMessage(id: string): Message {
    return this.messages.find((message) => message.id === id);
  }

  getMessages(){
    this.http
      .get<{ message: string, messages: Message[]}>('http://localhost:3000/messages')
      .subscribe(
        // success function
        (messagesData) => {
          this.messages = messagesData.messages;

          this.maxMessageId = this.getMaxId();

          /*this.messages.sort((a, b) => (
              a.id > b.id ? 1 : b.id > a.id ? -1 : 0)
          );*/

          this.messageListChangedEvent.next(this.messages.slice());
        },

        //error function
        (error: any) => {
          console.log(error);
        }
      );
  }

  //This method is only for week 09 - firebase, and it is not the best approach to use storeContacts method.
  //storeMessages() {
  // let messages = JSON.stringify(this.messages);

  //  const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

  //  this.http
  //    .put(
  //      'https://cms-project-8f25d-default-rtdb.firebaseio.com/messages.json',
  //      messages,
  //      { headers: headers }
  //    )
  //    .subscribe(() => {
  //      this.messageListChangedEvent.next(this.messages.slice());
  //    });
  //}
}