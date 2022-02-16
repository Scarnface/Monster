import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import { NameService } from '../services/name.service';

@Component({
  selector: 'app-reveal',
  templateUrl: './reveal.component.html',
  styleUrls: ['./reveal.component.scss']
})
export class RevealComponent implements OnInit {

  name: string = '';
  attack = 0
  defense = 0
  initiative = 0
  fill = 0
  seed = this.route.snapshot.params['seed']
  monsterUrl = "https://app.pixelencounter.com/api/basic/svgmonsters/";

  constructor(private route : ActivatedRoute, private nameService: NameService) {
    this.nameService.getName()
      .subscribe((resp:any) => {
        this.name = resp.fullName;
      });
  }

  ngOnInit() {
    this.genMonsterStats();
    this.monsterUrl += (this.seed + "?fillType=" + this.fill);
  }

  genMonsterStats() {
    // Generate the monsters fill type from the first character.
    if(this.seed.slice(0, 1) == 0) {
      this.fill = 5;
    } else {
      this.fill = Math.floor(this.seed.slice(0, 1) / 2);
    }

    // Generate the stats based on the last six characters.
    let l = this.seed.length;
    this.attack = this.seed.slice(l-6, l-5) + this.seed.slice(l-5, l-4);
    this.defense = this.seed.slice(l-4, l-3) + this.seed.slice(l-3, l-2);
    this.initiative = this.seed.slice(l-2, l-1) + this.seed.slice(l-1, l);
  }
}
