import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Team, GamesData, TeamsData } from './types';
import { DatesService } from './dates.service';

@Injectable({
  providedIn: 'root'
})
export class NbaService {

  private readonly apiUrl: string = 'https://free-nba.p.rapidapi.com/';
  private readonly pastNumberOfDays: number = 12;
  private readonly httpOptions: Record<string, HttpHeaders> = {
    headers: new HttpHeaders({
      'X-RapidAPI-Key':'2QMXSehDLSmshDmRQcKUIAiQjIZAp1UvKUrjsnewgqSP6F5oBX',  
    })
  };

  constructor(
    private http: HttpClient,
    private datesService: DatesService
  ) {}

  public getTeam(id: number): Observable<Team> {
    return this.http.get<Team>(`${this.apiUrl}teams/${id}`, this.httpOptions)
  }

  public getTeamsList(): Observable<TeamsData> {
    return this.http.get<TeamsData>(`${this.apiUrl}teams`, this.httpOptions)
  }

  public getTeamResults(id: number): Observable<GamesData> {
    const datesString = this.datesService.getDatesBetween(new Date(), this.datesService.getEndDate(new Date(), this.pastNumberOfDays))
    const apiParams = `games?page=0&${datesString}per_page=12&team_ids[]=${id}`
    return this.http.get<GamesData>(`${this.apiUrl}${apiParams}`, this.httpOptions)
  }
}