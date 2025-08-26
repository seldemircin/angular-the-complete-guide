import {Injectable} from "@angular/core";
import {TicketModel} from "./ticket/ticket.model";

@Injectable({
  providedIn: 'root'
})

export class TicketsService {
  tickets : TicketModel[] = []

  addTicket(ticket: TicketModel){
    this.tickets.push(ticket);
  }

  closeTicketById(id : string){
    const ticket = this.tickets.find((ticket: TicketModel) => ticket.id === id);
    if(ticket){
      ticket.status = 'closed';
    }
  }
}
