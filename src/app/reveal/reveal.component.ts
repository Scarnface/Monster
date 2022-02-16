import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-reveal',
  templateUrl: './reveal.component.html',
  styleUrls: ['./reveal.component.scss']
})
export class RevealComponent implements OnInit {

  fill = 0
  seed = this.route.snapshot.params['seed']
  monsterUrl = "https://app.pixelencounter.com/api/basic/svgmonsters/";

  constructor(private route : ActivatedRoute) { }

  ngOnInit() {
    this.genMonsterStats();
    this.monsterUrl += (this.seed + "?fillType=" + this.fill);
  }

  genMonsterStats() {
    // Generate the monsters fill type from the first character
    if(this.seed.slice(0, 1) == 0) {
      this.fill = 5;
    } else {
      this.fill = Math.floor(this.seed.slice(0, 1) / 2);
    }
  }
}
