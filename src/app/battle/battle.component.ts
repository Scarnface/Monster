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

  // Game/Screen variables.
  playerHasInitiative = false;
  round = 1;
  battleBtnText = 'FIGHT!';
  battleBtnClass = '';
  attackClass = '';
  attackShow = false;

  // Player variables.
  p1Data = '';
  p1Color = '';
  p1Class = '';
  p1SpriteClass = '';
  cpuData = '';
  cpuColor = '';
  cpuClass = '';
  cpuSpriteClass = '';

  // Object containing enemies.
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
    if(this.data.round !== undefined) {
      this.round = this.data.round;
    }

    if(this.round === 1) {
      this.cpu = this.enemies.first;
    } else if (this.round === 2) {
      this.cpu = this.enemies.second;
    } else if (this.round === 3) {
      this.cpu = this.enemies.third;
    }

    // Check who goes first.
    if(this.checkInit()) {
      this.p1Color = '#26a100';
      this.p1Class = 'blink';
      this.playerHasInitiative = true;
    } else {
      this.cpuColor = '#26a100';
      this.cpuClass = 'blink';
    }

    // Load correct text for battle screen.
    this.p1Data = 'Initiative: ' +  this.monster.initiative;
    this.cpuData = 'Initiative: ' + this.cpu.initiative;
  }

  async battleStep() {
    // Reset styling.
    this.p1Class = '';
    this.cpuClass = '';
    this.p1Color = '#9d9d9d';
    this.cpuColor = '#9d9d9d';

    // Check initiative, assign attack/defender.
    if(this.playerHasInitiative) {
      // Fight a round of combat.
      await this.combat('PvsC');
    } else {
      await this.combat('CvsP');
    }

    // Check for win or recurse.
    if(!this.checkVictory()) {
      await this.battleStep();
    }
  }

  // Find who has the highest initiative value.
  checkInit() {
    return this.monster.initiative > this.cpu.initiative;
  }

  // Subtract attacker attack from defenders defense.
  async combat(direction:any) {
    if(direction === 'PvsC') {
      // Display relevant stats and apply styling to highlight combat direction.
      this.p1Data = 'Attack: ' +  this.monster.attack;
      this.cpuData = 'Defense: ' + this.cpu.defense;
      this.battleBtnText = '>>>';
      this.battleBtnClass = 'blink';
      // Delay allowing user to read stats.
      await this.timer(2000);
      // Run fireball animation.
      this.attackShow = true;
      this.attackClass = 'slide-right';
      // Apply Styling to show damage dealt.
      this.cpu.defense -= this.monster.attack;
      this.cpuColor = '#ee0000';
      this.cpuData = 'Defense: ' + this.cpu.defense;
      // Delay allowing user to read stats.
      await this.timer(2000);
      // Switch active player.
      this.playerHasInitiative = false;
    } else {
      this.p1Data = 'Defense: ' +  this.monster.defense;
      this.cpuData = 'Attack: ' + this.cpu.attack;
      this.battleBtnText = '<<<';
      this.battleBtnClass = 'blink';
      await this.timer(2000);
      this.attackShow = true;
      this.attackClass = 'slide-left';
      this.monster.defense -= this.cpu.attack;
      this.p1Color = '#ee0000';
      this.p1Data = 'Defense: ' +  this.monster.defense;
      await this.timer(2000);
      this.playerHasInitiative = true;
    }
    this.attackShow = false;
  }

  // See if a player's monster has dropped below 0HP.
  checkStatus(monster:any) {
    return monster.defense <= 0;
  }

  // Save the data and route according to battle outcome.
  checkVictory() {
    if(this.checkStatus(this.cpu)) {
      this.data.victory = true;
      this.sharingService.setData(this.data);
      return this.router.navigate(['/outcome']);
    }

    if(this.checkStatus(this.monster)) {
      this.data.victory = false;
      this.sharingService.setData(this.data);
      return this.router.navigate(['/outcome']);
    }

    return false
  }

  // Returns a Promise that resolves after "ms" Milliseconds. Used to add a delay for UI purposes.
  timer:any = (ms:any) => new Promise(res => setTimeout(res, ms))
}
