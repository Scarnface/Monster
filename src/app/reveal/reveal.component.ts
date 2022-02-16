import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-reveal',
  templateUrl: './reveal.component.html',
  styleUrls: ['./reveal.component.scss']
})
export class RevealComponent implements OnInit {

  monsterUrl = "https://app.pixelencounter.com/api/basic/svgmonsters/";

  constructor(private route : ActivatedRoute) { }

  ngOnInit() {
    this.monsterUrl += this.route.snapshot.params['seed'];
  }
}
