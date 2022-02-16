import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {

  seed: string = '';
  error = ''

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  revealMonster(seed:string) {
    console.log(seed);
    // Validate user input to ensure it's a number.
    if(this.validate(seed)) {
      // The first character of a barcode is a checking digit. We remove this.
      seed = seed.slice(1);
      // Ensure the remaining code does not exceed the value accepted by the API.
      if(seed.length > 9) {
        // If it does create a new seed of last nine characters.
        seed = seed.slice(seed.length - 9);
      }
      // Navigate to next page with seed.
      return this.router.navigate(['/reveal', {seed: seed}]);
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
