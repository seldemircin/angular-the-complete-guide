import {Component, EventEmitter, Output} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {InvestmentService} from "../investment.service";

@Component({
  selector: 'app-user-input',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './user-input.component.html',
  styleUrl: './user-input.component.css'
})
export class UserInputComponent {

  constructor(private investmentService : InvestmentService) {}

  enteredInitialInvestment  = '0';
  enteredAnnualInvestment  = '0';
  enteredExpectedReturn  = '0';
  enteredDuration = '0';

  onSubmit(){
     this.investmentService.calculate({
       initialInvestment : Number(this.enteredInitialInvestment),
       annualInvestment : Number(this.enteredAnnualInvestment),
       duration : Number(this.enteredDuration),
       expectedReturn : Number(this.enteredExpectedReturn)
     });
  }
}
