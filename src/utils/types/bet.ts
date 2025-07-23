export interface Bet {
    user: string;
    team1: string;
    team2: string;
    odd: number;
    bet: string;
    price: number;
    price_win?: number;
    logo1: string;
    logo2: string;
    lose?: boolean;
    active?: boolean;
    type: string;
}

export interface BetCreate {
    userId: number
    team: number
    amount: number;
}