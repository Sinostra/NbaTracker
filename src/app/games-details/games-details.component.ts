import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NbaService } from '../nba.service';
import { Game, Team } from '../types';

@Component({
  selector: 'app-games-details',
  templateUrl: './games-details.component.html',
  styleUrls: ['./games-details.component.css']
})
export class GamesDetailsComponent {

  public team!: Team
  public games: Game[] = []

  constructor(
    private route: ActivatedRoute,
    private nbaService: NbaService,
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('teamCode'));
    this.getTeam(id);
    this.getTeamDetails(id);
  }

  private getTeam(id: number): void {
    this.nbaService.getTeam(id).subscribe(team => this.team = team)
  }

  private getTeamDetails(id: number): void {
    this.nbaService.getTeamResults(id).subscribe(gamesArray => this.games = gamesArray.data)
  }
}
