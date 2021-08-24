import {Component, OnInit} from '@angular/core';
import {ScoreboardService} from './scoreboard.service';
import {ScoreboardDTO} from './scoreboard-dto';
import {ConfirmationService, ConfirmEventType, MessageService} from 'primeng/api';

@Component({
  selector: 'app-scoreboard',
  templateUrl: './scoreboard.component.html',
  styleUrls: ['./scoreboard.component.scss'],
  providers: [ConfirmationService, MessageService]
})
export class ScoreboardComponent implements OnInit {

  scoreboard = new ScoreboardDTO();
  public eventText: string;
  public position: string;
  private confirmation: ConfirmationService;
  public fullscreen = false;

  constructor(private service: ScoreboardService,
              private confirmationService: ConfirmationService,
              private messageService: MessageService) {
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

  resetOnClick(): void {
    this.confirmPosition('top');
  }

  back(): void {
    this.service.back();
    this.scoreboard = this.service.getScoreboard();
  }


  onSwipe(evt): void {
    const x = Math.abs(evt.deltaX) > 40 ? (evt.deltaX < 0 ? 'right' : 'left') : '';
    const y = Math.abs(evt.deltaY) > 40 ? (evt.deltaY < 0 ? 'down' : 'up') : '';
    if (y === 'up') {
      this.sum('A');
    }

    if (y === 'down') {
      this.sum('B');
    }

    if (x === 'left') {
      this.back();
    }

    if (x === 'right') {
      this.resetOnClick();
    }

    this.eventText = `${x} ${y}/ ${evt.deltaX} - ${evt.deltaY}`;
  }


  confirmPosition(position: string): void {
    this.position = position;

    this.confirmation = this.confirmationService.confirm({
      message: 'Deseja iniciar um novo jogo, os pontos serão zerados!',
      header: 'Novo Jovo',
      icon: 'pi pi-info-circle',
      accept: () => {
        this.reset();
      },
      key: 'positionDialog'
    });
  }

  onSwipeConfirmation(evt: any): void {
    const x = Math.abs(evt.deltaX) > 40 ? (evt.deltaX < 0 ? 'right' : 'left') : '';

    if (x === 'left') {
      this.confirmation.close();
    }

    if (x === 'right') {
      this.confirmation.close();
      this.reset();
    }
  }

  private reset(): void {
    this.service.reset();
    this.scoreboard = this.service.getScoreboard();
  }


  /* View in fullscreen */
  openFullscreen(): void {
    const elem: any = document.documentElement;
    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    } else if (elem.webkitRequestFullscreen) { /* Safari */
      elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) { /* IE11 */
      elem.msRequestFullscreen();
    }

    this.fullscreen = true;
  }

  /* Close fullscreen */


  closeFullscreen(): void {
    const doc: any = document;
    if (doc.exitFullscreen) {
      doc.exitFullscreen();
    } else if (doc.webkitExitFullscreen) { /* Safari */
      doc.webkitExitFullscreen();
    } else if (doc.msExitFullscreen) { /* IE11 */
      doc.msExitFullscreen();
    }

    this.fullscreen = false;
  }

}
