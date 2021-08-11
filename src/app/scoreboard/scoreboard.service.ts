import {Injectable} from '@angular/core';
import {ScoreboardDTO, TeamScoreboardDTO} from './scoreboard-dto';

@Injectable({
  providedIn: 'root'
})
export class ScoreboardService {

  scores = [];
  scoreboard: ScoreboardDTO;

  constructor() {
    const scoreboardStorage = localStorage.getItem('scoreboard');
    if (scoreboardStorage) {
      this.scoreboard = JSON.parse(scoreboardStorage);
    } else {
      this.scoreboard = new ScoreboardDTO();
    }

    this.scores = [0, 15, 30, 40, 45];
  }

  getScoreboard(): ScoreboardDTO {
    return JSON.parse(JSON.stringify(this.scoreboard));
  }

  save(): void {
    localStorage.setItem('scoreboard', JSON.stringify(this.scoreboard));
  }

  sum(team: string): void {
    const teamSelect = team === 'A' ? this.scoreboard.teamA : this.scoreboard.teamB;


    if (this.scoreboard.winSet) {
      this.scoreboard.teamA.score = 0;
      this.scoreboard.teamA.scoreFormatted = this.scores[0];
      this.scoreboard.teamB.score = 0;
      this.scoreboard.teamB.scoreFormatted = this.scores[0];
      this.scoreboard.winSet = null;
      this.save();
      return;
    }


    if (teamSelect.score === 3) {
      teamSelect.score = 4;
      this.formatScore(teamSelect);
      teamSelect.set += 1;
      this.scoreboard.winSet = team;
    } else {
      teamSelect.score += 1;
      teamSelect.scoreFormatted = this.scores[teamSelect.score];
    }
    this.save();
  }

  private formatScore(teamSelect: TeamScoreboardDTO): void {
    teamSelect.scoreFormatted = this.scores[teamSelect.score];
  }

  subs(team: string): void {
    const teamSelect = team === 'A' ? this.scoreboard.teamA : this.scoreboard.teamB;

    if (teamSelect.score === 4) {
      teamSelect.score = 3;
      teamSelect.scoreFormatted = this.scores[teamSelect.score];
      if (teamSelect.set > 0) {
        teamSelect.set -= 1;
      }
      this.scoreboard.winSet = null;
    } else {
      if (teamSelect.score > 0) {
        teamSelect.score -= 1;
        teamSelect.scoreFormatted = this.scores[teamSelect.score];
      }
    }

    this.save();
  }

  reset(): void {
    if (localStorage.getItem('scoreboard')) {
      localStorage.removeItem('scoreboard');
    }
    this.scoreboard = new ScoreboardDTO();
  }
}
