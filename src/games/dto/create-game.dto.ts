
export class CreateGameDto {
    name: string;
    material: 'wood' | 'metal' | 'plastic' | 'other';
    weight: number;
    childId?: number;
  }