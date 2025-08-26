import {Component} from '@angular/core';
import {ButtonComponent} from "../../../shared/button/button.component";
import {ControlComponent} from "../../../shared/control/control.component";
import {FormsModule} from "@angular/forms";
import {TicketsService} from "../tickets.service";
import {TicketModel} from "../ticket/ticket.model";

@Component({
  selector: 'app-new-ticket',
  standalone: true,
  imports: [
    ButtonComponent,
    ControlComponent,
    FormsModule
  ],
  templateUrl: './new-ticket.component.html',
  styleUrl: './new-ticket.component.css'
})
export class NewTicketComponent {
  constructor(private ticketService: TicketsService) {}

  enteredTitle: string = '';
  enteredRequest: string = '';

  onSubmit(form: HTMLFormElement) {
    const ticket: TicketModel = {
      id: Math.floor(Math.random() * 1000).toString(),
      title: this.enteredTitle,
      request: this.enteredRequest,
      status: "open"
    }
    this.ticketService.addTicket(ticket);
    form.reset();
  }
}
