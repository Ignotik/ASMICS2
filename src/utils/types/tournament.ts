export interface Team {
    id: number;
    name: string;
    icon_path: string;
}

export interface Match {
    id: number;
    team_1: Team | null;
    team_2: Team | null;
    team_1_coefficient: number;
    team_2_coefficient: number;
    started_at: string;
    results_announced_at: string | null;
    winner_team: number | null;
    tournament: Tournament | null;
  }
  
  export interface MatchFormData {
    team_1: number | null;
    team_2: number | null;
    team_1_coefficient: number;
    team_2_coefficient: number;
    started_at: string;
    tournament: number | null;
  }
  

  
 export interface Tournament {
    id: number;
    name: string;
    icon_path: string;
    closed_at: string | null;
    matches: Match[];
  }