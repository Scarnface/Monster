import {Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { SharingService } from '../services/sharing.service';
import { NameService } from '../services/name.service';

@Component({
  selector: 'app-reveal',
  templateUrl: './reveal.component.html',
  styleUrls: ['./reveal.component.scss']
})
export class RevealComponent implements OnInit {

  data:any = {};
  monster:any = {
    name: '',
    attack: 0,
    defense: 0,
    initiative: 0,
    monsterUrl: 'https://app.pixelencounter.com/api/basic/svgmonsters/',
  };
  fill = 0;


  constructor(private router: Router, private sharingService:SharingService, private nameService: NameService) {
    this.nameService.getName()
      .subscribe((resp:any) => {
        this.monster.name = resp.fullName;
      });
  }

  ngOnInit() {
    this.data = this.sharingService.getData();
    this.genMonsterStats(this.data.seed);
  }

  genMonsterStats(seed:any) {
    // Generate the monsters fill type from the first character.
    if(seed.slice(0, 1) == 0) {
      this.fill = 5;
    } else {
      this.fill = Math.floor(seed.slice(0, 1) / 2);
    }

    // Generate the API url based on the barcode.
    this.monster.monsterUrl += (seed + "?fillType=" + this.fill);

    // Generate the stats based on the last six characters.
    let l = seed.length;
    this.monster.attack = seed.slice(l-6, l-5) + seed.slice(l-5, l-4);
    this.monster.defense = seed.slice(l-4, l-3) + seed.slice(l-3, l-2);
    this.monster.initiative = seed.slice(l-2, l-1) + seed.slice(l-1, l);
  }

  fight() {
    // Set the seed data to be shared.
    this.data = this.monster;
    this.sharingService.setData(this.data);
    // Navigate to next page.
    return this.router.navigate(['/battle']);
  }
}
