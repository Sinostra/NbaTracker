export interface TeamsData {
    data: Team[]
}

export interface GamesData {
    data: Game[]
}

export interface Team {
    id: number;
    name: string;
    full_name: string;
    abbreviation: string;
    city: string;
    division: string;
    conference: string;
}

export interface Game {
    date: string;
    home_team: Team;
    home_team_score: number;
    id: number;
    period: number;
    postseason: boolean;
    season: number;
    status: string;
    time: string;
    visitor_team: Team;
    visitor_team_score: number;
}