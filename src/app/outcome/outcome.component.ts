import { Component, OnInit } from '@angular/core';
import {SharingService} from "../services/sharing.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-outcome',
  templateUrl: './outcome.component.html',
  styleUrls: ['./outcome.component.scss']
})
export class OutcomeComponent implements OnInit {

  data:any = {};
  outcomeResult = '';
  outcomeMessage = '';

  constructor(private router: Router, private sharingService:SharingService) { }

  ngOnInit() {
    this.data = this.sharingService.getData();
    if(this.data.victory === true) {
      this.outcomeResult = 'VICTORY';
      this.outcomeMessage = 'Welcome to the hall of legends!';
      return setTimeout(() => this.reset(),5000)
    } else {
      this.outcomeResult = 'DEFEAT';
      this.outcomeMessage = 'Better luck next time!';
      return setTimeout(() => this.reset(),5000)
    }
  }

  reset() {
    return this.router.navigate(['/']);
  }

}
