import type { User } from "./user";

export interface Notice {
    id: number;
    context: string;
    user: User
}