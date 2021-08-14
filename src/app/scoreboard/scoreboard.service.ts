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
      //    this.save(true);
    }

    this.scores = [0, 15, 30, 40];
  }

  getScoreboard(): ScoreboardDTO {
    return JSON.parse(JSON.stringify(this.scoreboard));
  }

  save(history = false): void {
    const toSave = JSON.stringify(this.scoreboard);
    localStorage.setItem('scoreboard', toSave);
  }

  private saveNewHistory(scoreboard: ScoreboardDTO): void {
    const history = this.getHistory();
    history.push(JSON.stringify(scoreboard));
    this.saveHistoryStorage(history);
  }

  private saveHistoryStorage(history: string[]): void {
    localStorage.setItem('scoreboardHistory', JSON.stringify(history));
  }

  sum(team: string): void {
    const teamSelect = team === 'A' ? this.scoreboard.teamA : this.scoreboard.teamB;
    this.saveNewHistory(this.scoreboard);


    if (this.scoreboard.winSet) {
      this.resetScore();
      this.scoreboard.winSet = null;
    }

    //0, 15, 30, 40
    if (teamSelect.score === 3) {
      this.resetScore();
      teamSelect.set += 1;
      this.scoreboard.winSet = team;
      this.scoreboard.serviceSet = this.scoreboard.serviceSet === 'A' ? 'B' : 'A';
    } else {
      teamSelect.score += 1;
      teamSelect.scoreFormatted = this.scores[teamSelect.score];
    }
    this.save();
  }

  private resetScore(): void {
    this.scoreboard.teamA.score = 0;
    this.scoreboard.teamA.scoreFormatted = this.scores[0];
    this.scoreboard.teamB.score = 0;
    this.scoreboard.teamB.scoreFormatted = this.scores[0];
  }

  private formatScore(teamSelect: TeamScoreboardDTO): void {
    teamSelect.scoreFormatted = this.scores[teamSelect.score];
  }

  subs(team: string): void {
    const teamSelect = team === 'A' ? this.scoreboard.teamA : this.scoreboard.teamB;
    //0, 15, 30, 40
    /*if (teamSelect.score === 0 && this.scoreboard.winSet != null) {
      teamSelect.score = 3;
      teamSelect.scoreFormatted = this.scores[teamSelect.score];
      if (teamSelect.set > 0) {
        teamSelect.set -= 1;
      }
      this.scoreboard.winSet = null;
    } else {*/
    if (teamSelect.score > 0) {
      this.saveNewHistory(this.scoreboard);
      teamSelect.score -= 1;
      teamSelect.scoreFormatted = this.scores[teamSelect.score];
      this.save();
    }
    //}


  }

  reset(): void {
    if (localStorage.getItem('scoreboard')) {
      localStorage.removeItem('scoreboard');
    }
    if (localStorage.getItem('scoreboardHistory')) {
      localStorage.removeItem('scoreboardHistory');
    }

    this.scoreboard = new ScoreboardDTO();
    this.save();
  }

  back(): void {
    const history = this.getHistory();

    if (history && history.length > 0) {
      const newCurrent = history.pop();
      if (newCurrent) {
        this.scoreboard = JSON.parse(newCurrent);
        this.save();
      }
      this.saveHistoryStorage(history);
    }
  }

  private getHistory(): string[] {
    let history = [];
    const historyStorage = localStorage.getItem('scoreboardHistory');
    if (historyStorage) {
      history = JSON.parse(historyStorage);
    }
    return history;
  }
}
