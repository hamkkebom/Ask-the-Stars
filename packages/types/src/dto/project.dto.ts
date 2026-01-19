export interface CreateProjectDto {
  title: string;
  description?: string;
  client_notes?: string;
  client_id: string;
  budget?: number;
  deadline?: Date;
  priority?: number;
}

export interface UpdateProjectDto {
  title?: string;
  description?: string;
  client_notes?: string;
  freelancer_id?: string;
  budget?: number;
  final_amount?: number;
  deadline?: Date;
  priority?: number;
}

export interface ProjectQueryDto {
  status?: string;
  freelancer_id?: string;
  client_id?: string;
  page?: number;
  limit?: number;
  sort_by?: 'created_at' | 'deadline' | 'updated_at';
  sort_order?: 'asc' | 'desc';
}
