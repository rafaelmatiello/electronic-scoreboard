export class ScoreboardDTO {
  teamA = new TeamScoreboardDTO();
  teamB = new TeamScoreboardDTO();
  winSet: string;
}


export class TeamScoreboardDTO {
  set = 0;
  scoreFormatted = 0;
  score = 0;
}