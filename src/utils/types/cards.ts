export interface Card {
    id: number;
    name: string;
    valuable: string;
    image_path: string;
    collection: CardCollection;
  }
  
  export interface CardCollection {
    id: number;
    name: string;
    price: number;
    icon_path: string;
    cards: Card[];
    closed_at: string | null;
  }