import {
  Component,
  ElementRef,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core'
import { Message } from '../message.model'
import { MessageService } from '../message.service'

@Component({
  selector: 'cms-message-edit',
  templateUrl: './message-edit.component.html',
  styleUrls: ['./message-edit.component.css'],
})
export class MessageEditComponent implements OnInit {
  @ViewChild('subjectInput') subjectInput: ElementRef
  @ViewChild('messageInput') messageInput: ElementRef

  // send this ingredient to the the list component
  @Output() messageAdded = new EventEmitter<Message>()

  currentSender: string = 'Lakeram'

  constructor(private messageService: MessageService) {}

  ngOnInit(): void {}
  onSendMessage() {
    const subJectInput = this.subjectInput.nativeElement.value
    const messageInput = this.messageInput.nativeElement.value
    const newMessage = new Message(
      '567',
      subJectInput,
      messageInput,
      this.currentSender,
    )
    // this.messageAdded.emit(newMessage)
    this.messageService.addMessage(newMessage);
  }
  onClear() {
    this.subjectInput.nativeElement.value = ''
    this.messageInput.nativeElement.value = ''
  }
}
