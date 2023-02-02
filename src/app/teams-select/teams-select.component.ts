import { Component } from '@angular/core';
import { NbaService } from '../nba.service';
import { StorageService } from '../storage.service';
import { Team } from '../types';

@Component({
  selector: 'app-teams-select',
  templateUrl: './teams-select.component.html',
  styleUrls: ['./teams-select.component.css']
})
export class TeamsSelectComponent {

  public teams: Team[] = []
  public displayedTeams: Team[] = []

  constructor(
    private nbaService: NbaService,
    private storageService: StorageService
  ) {}

  ngOnInit(): void {
    this.getTeamsList();
    const stored: string | null = this.storageService.getData("displayedTeams")
    if(stored) {
      this.displayedTeams = JSON.parse(stored)
    }
  }

  public displayTeam(id: number): void {
    const teamToDisplay: Team | undefined = this.teams.find(team => team.id === id)
    if(!teamToDisplay) {
      return
    }
    this.displayedTeams.push(teamToDisplay)
    this.storeTeams(this.displayedTeams)
  }

  public onDeleteTeam(index: number): void {
    this.displayedTeams.splice(index, 1)
    this.storeTeams(this.displayedTeams)
  }

  private getTeamsList(): void {
    this.nbaService.getTeamsList().subscribe(teams => this.teams = teams.data)
  }

  private storeTeams(teams: Team[]): void {
    this.storageService.saveData("displayedTeams", JSON.stringify(teams))
  }
}