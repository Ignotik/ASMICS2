import type { Card } from "./cards";
import type { User } from "./user";

export interface UserCard {
    id: number;
    card: Card
    user: User
}