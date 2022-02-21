import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-battle',
  templateUrl: './battle.component.html',
  styleUrls: ['./battle.component.scss']
})
export class BattleComponent implements OnInit {

  turn = false
  round = 1
  knockedOut = false

  name: string = 'placeholder';
  url: string = 'https://app.pixelencounter.com/api/basic/svgmonsters/55515591?fillType=5';
  attack = 0
  defense = 0
  initiative = 0
  cpu: any = {};

  enemies = {
    first: {
      name: "Bokrug",
      attack: 10,
      defense: 20,
      initiative: 20,
      url: 'https://app.pixelencounter.com/api/basic/svgmonsters/4356729?fillType=2',
    },
    second: {
      name: "Thog",
      attack: 20,
      defense: 40,
      initiative: 40,
      url: 'https://app.pixelencounter.com/api/basic/svgmonsters/2223129?fillType=4',
    },
    third: {
      name: "Cthulhu",
      attack: 40,
      defense: 80,
      initiative: 80,
      url: 'https://app.pixelencounter.com/api/basic/svgmonsters/55515591?fillType=5',
    }
  }

  constructor() { }

  ngOnInit() {
    if(this.round === 1) {
      this.cpu = this.enemies.first;
      console.log(this.cpu);
    }
  }

}
