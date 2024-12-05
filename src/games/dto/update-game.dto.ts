
export class UpdateGameDto {
    name?: string;
    material?: 'wood' | 'metal' | 'plastic' | 'other';
    weight?: number;
    childId?: number;
  }