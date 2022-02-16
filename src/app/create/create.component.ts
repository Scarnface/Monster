import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  revealMonster(seed:string) {
    // The first character of a barcode is a checking digit. We remove this.
    seed = seed.slice(1);
    // Ensure the remaining code does not exceed the value accepted by the API.
    if(seed.length > 9) {
      // If it does create a new seed of last nine characters.
      seed = seed.slice(seed.length - 9);
    }
    // Navigate to next page with seed.
    return this.router.navigate(['/reveal', {seed: seed}]);
  }
}
