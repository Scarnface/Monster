import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {

  monsterUrl = '';

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  revealMonster(seed:string) {
    if(seed.length > 10) {
      seed = seed.substring(0, 10);
    }
    this.router.navigate(['/reveal', {seed: seed}]);
  }
}
