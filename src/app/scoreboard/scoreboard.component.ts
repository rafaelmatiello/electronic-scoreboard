import {Component, OnInit} from '@angular/core';
import {ScoreboardService} from './scoreboard.service';
import {ScoreboardDTO} from './scoreboard-dto';

@Component({
  selector: 'app-scoreboard',
  templateUrl: './scoreboard.component.html',
  styleUrls: ['./scoreboard.component.scss']
})
export class ScoreboardComponent implements OnInit {

  scoreboard = new ScoreboardDTO();

  constructor(private service: ScoreboardService) {
  }

  ngOnInit(): void {
    this.scoreboard = this.service.getScoreboard();
  }

  sum(team: string): void {
    this.service.sum(team);
    this.scoreboard = this.service.getScoreboard();
  }

  sub(team: string): void {
    this.service.subs(team);
    this.scoreboard = this.service.getScoreboard();
  }

  reset(a: string):void {
    this.service.reset();
    this.scoreboard = this.service.getScoreboard();
  }
}
