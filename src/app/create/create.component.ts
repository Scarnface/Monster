import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  revealMonster(seed:string) {
    if(seed.length > 10) {
      seed = seed.substring(0, 10);
    }
    return "https://app.pixelencounter.com/api/basic/svgmonsters/" + seed;
  }

}
