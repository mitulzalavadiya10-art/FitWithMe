// Local Exercise Database Types

export interface Exercise {
  id: string;
  name: string;
  type: string;
  muscle: string;
  equipment: string;
  difficulty: string;
  instructions: string;
  bodyPart: string;
  target: string;
  secondaryMuscles: string[];
  images: string[];
  gifUrl?: string;
  force?: string;
  mechanic?: string;
}

export interface ExerciseListResponse {
  exercises: Exercise[];
  total: number;
}

export interface BodyPart {
  id: string;
  name: string;
}

export interface Equipment {
  id: string;
  name: string;
}

export interface TargetMuscle {
  id: string;
  name: string;
}

// Pagination params
export interface PaginationParams {
  offset?: number;
  limit?: number;
}

// Search params
export interface SearchParams extends PaginationParams {
  query?: string;
}
