import type { Bet } from "./bet";
import type { UserCard } from "./user-card";

export type UserRole = 'all' | 'admin' | 'moderator'; 
export interface JwtPayload {
    sub: number;  // ID пользователя
    iat: number;  // Timestamp выдачи
    exp: number;  // Timestamp истечения
  }
  
 export interface User {
    id: number;
    balance: number;
    role: UserRole;
    username: string;
    first_name: string;
    last_name: string;
    icon_path: string;
    notifications: boolean;
    bets: Bet[]
    referrals : User[]
    referrer : User
    last_bonus_received_at: Date;
    bonuses_received_count: number;
    registered_at: Date;
    last_login_at: Date;
    is_blocked: boolean;
    user_cards: UserCard[]
  }