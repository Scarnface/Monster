import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SharingService } from '../services/sharing.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {

  data:any = {};
  seed:any;
  error = '';

  constructor(private router: Router, private sharingService:SharingService) { }

  ngOnInit() {
  }

  revealMonster(seed:string) {
    // Validate user input to ensure it's a number.
    if(this.validate(seed)) {
      // The first character of a barcode is a checking digit. We remove this.
      this.seed = seed.slice(1);
      // Ensure the remaining code does not exceed the value accepted by the API.
      if(seed.length > 9) {
        // If it does create a new seed of the last nine characters.
        this.seed = seed.slice(seed.length - 9);
      }
      // Set the seed data to be shared.
      this.data.seed = this.seed;
      this.sharingService.setData(this.data);
      // Navigate to next page.
      return this.router.navigate(['/reveal']);
    } else {
      // Display the error message.
      this.error = "Invalid Input!"
      // Reset the message and input field after two seconds.
      return setTimeout(() => this.reset(),2000)
    }
  }

  validate(seed:string) {
    // Whole, positive, integers only
    return /^\d+$/.test(seed);
  }

  reset() {
    this.error = '';
    this.seed = '';
  }
}
