export type ReleaseStatus = 'PLANNED' | 'ONGOING' | 'DONE';

export interface ReleaseStep {
  id: string;
  name: string;
  description: string;
  order: number;
}

export interface Release {
  id: string;
  name: string;
  releaseDate: string;
  additionalInfo?: string;
  completedStepIds: string[];
  status: ReleaseStatus;
  createdAt: string;
  updatedAt: string;
}

export interface CreateReleaseInput {
  name: string;
  date: string;
  additionalInfo?: string;
}

export interface UpdateReleaseStepsInput {
  id: string;
  completedStepIds: string[];
}