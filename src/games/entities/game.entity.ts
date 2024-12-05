
export class Game {
    id: number;
    name: string;
    material: 'wood' | 'metal' | 'plastic' | 'other';
    weight: number;
    childId?: number;
  }