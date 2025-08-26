import {Component, Input} from '@angular/core';
import {TicketModel} from "./ticket.model";
import {tick} from "@angular/core/testing";
import {TicketsService} from "../tickets.service";

@Component({
  selector: 'app-ticket',
  standalone: true,
  imports: [],
  templateUrl: './ticket.component.html',
  styleUrl: './ticket.component.css'
})
export class TicketComponent {
  @Input({required:true}) ticket! : TicketModel;
  detailsVisible = false;

  constructor(private ticketService: TicketsService) {}

  onToggleDetails(){
    this.detailsVisible = !this.detailsVisible;
  }

  onCloseTicket(){
    this.ticketService.closeTicketById(this.ticket.id);
  }
}
