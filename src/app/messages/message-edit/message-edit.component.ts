import { Component, ElementRef, OnInit, Output, ViewChild, EventEmitter } from '@angular/core';
import { response } from 'express';
import { Contact } from 'src/app/contacts/contact.model';
import { ContactService } from 'src/app/contacts/contact.service';
import { Message } from '../message.model';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-message-edit',
  templateUrl: './message-edit.component.html',
  styleUrls: ['./message-edit.component.css'],
})
export class MessageEditComponent implements OnInit {
  @ViewChild('subject') subject: ElementRef;
  @ViewChild('msgText') msgText: ElementRef;
  @Output() addMessageEvent = new EventEmitter<Message>();
  currentSender: Contact;

  constructor(private messageService: MessageService, private contactService: ContactService) { }

  ngOnInit() { 
    this.contactService.getContact('101').subscribe(
      response =>{
        this.currentSender = response.contact;
      });
  }

  onSendMessage() {
    const message = new Message(
      '1',
      this.subject.nativeElement.value,
      this.msgText.nativeElement.value,
      this.currentSender
    );

    this.messageService.addMessage(message);

    this.onClear();
  }

  onClear() {
    this.subject.nativeElement.value = '';
    this.msgText.nativeElement.value = '';
  }
}