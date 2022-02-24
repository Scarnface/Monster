import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SharingService } from '../services/sharing.service';

@Component({
  selector: 'app-battle',
  templateUrl: './battle.component.html',
  styleUrls: ['./battle.component.scss']
})
export class BattleComponent implements OnInit {

  data:any = {};
  monster:any = {};
  cpu: any = {};

  playerHasInitiative = false;
  round = 1;

  p1Data = 'test';
  cpuData = 'test';
  battleBtnText = 'FIGHT!';

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
      url: 'https://app.pixelencounter.com/api/basic/svgmonsters/45643564?fillType=5',
    }
  }

  constructor(private router: Router, private sharingService:SharingService) { }

  ngOnInit() {
    // Load player monster
    this.monster = this.sharingService.getData();

    // Check iteration and load appropriate enemy.
    if(this.round === 1) {
      this.cpu = this.enemies.first;
    } else if (this.round === 2) {
      this.cpu = this.enemies.second;
    } else if (this.round === 3) {
      this.cpu = this.enemies.third;
    }

    // Check who goes first.
    if(this.checkInit()) {
      this.playerHasInitiative = true;
    }

    // Load correct text for battle screen.
    this.p1Data = 'Your Initiative: ' +  this.monster.initiative;
    this.cpuData = 'Enemy Initiative: ' + this.cpu.initiative;
  }

  async battleStep() {
    // Check initiative, assign attack/defender, display relevant stats and fight a round.
    if(this.playerHasInitiative) {
      this.p1Data = 'Your Attack: ' +  this.monster.attack;
      this.cpuData = 'Enemy Defense: ' + this.cpu.defense;
      await this.timer(2000);
      this.combat(this.monster, this.cpu)
      this.cpuData = 'Enemy Defense: ' + this.cpu.defense;
      await this.timer(2000);
      this.playerHasInitiative = false;
    } else {
      this.p1Data = 'Your Defense: ' +  this.monster.defense;
      this.cpuData = 'Enemy Attack: ' + this.cpu.attack;
      await this.timer(2000);
      this.combat(this.cpu, this.monster)
      this.p1Data = 'Your Defense: ' +  this.monster.defense;
      await this.timer(2000);
      this.playerHasInitiative = true;
    }

    // Check for win or recurse.
    if(!this.checkVictory()) {
      await this.battleStep();
    }
  }

  checkInit() {
    return this.monster.initiative > this.cpu.initiative;
  }

  combat(attacker:any, defender:any) {
    defender.defense -= attacker.attack;
  }

  checkStatus(monster:any) {
    return monster.defense <= 0;
  }

  checkVictory() {
    if(this.checkStatus(this.cpu)) {
      this.data.victory = true;
      this.sharingService.setData(this.data);
      return this.router.navigate(['/outcome']);
    } else if(this.checkStatus(this.monster)) {
      this.data.victory = false;
      this.sharingService.setData(this.data);
      return this.router.navigate(['/outcome']);
    } else {
      return false
    }
  }

  // Returns a Promise that resolves after "ms" Milliseconds
  timer:any = (ms:any) => new Promise(res => setTimeout(res, ms))
}
