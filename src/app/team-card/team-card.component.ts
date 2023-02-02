import { Component, Input, Output, EventEmitter } from '@angular/core';
import { NbaService } from '../nba.service';
import { Team, Game } from '../types';

@Component({
  selector: 'app-team-card',
  templateUrl: './team-card.component.html',
  styleUrls: ['./team-card.component.css']
})
export class TeamCardComponent {

  @Input() inputTeam: Team | null = null;

  @Output() deleteTeam: EventEmitter<null> = new EventEmitter<null>();

  public games!: Game[]

  constructor(
    private nbaService: NbaService
  ) {}

  get lastGamesResults(): boolean[] {
    if(!this.inputTeam) {
      return []
    }
    return this.games.map((game) => {
      const isTeamPlayingHome = game.home_team.id === this.inputTeam?.id
      const homeTeamWon = game.home_team_score > game.visitor_team_score
      return (isTeamPlayingHome && homeTeamWon) || (!isTeamPlayingHome && !homeTeamWon)
    })
  }

  ngOnInit(): void {
    this.getTeamDetails()
  }

  public delete(): void {
    this.deleteTeam.emit();
  }

  public getAvgPts(scored: boolean): number | null {
    if(!this.inputTeam) {
      return null
    }
    return Math.round(this.games.reduce((container, game) => {
      const isTeamPlayingHome = game.home_team.id === this.inputTeam?.id
      const scoreToAdd = ((isTeamPlayingHome && scored) || (!isTeamPlayingHome && !scored)) ? game.home_team_score : game.visitor_team_score
      return container += scoreToAdd
    }, 0) / this.games.length)
  }

  private getTeamDetails(): void {
    if(!this.inputTeam) {
      return
    }
    this.nbaService.getTeamResults(this.inputTeam.id).subscribe(gamesArray => this.games = gamesArray.data)
  }
}