export interface CreateTaskboardDto {
  name: string;
}

export interface UpdateTaskboardDto extends CreateTaskboardDto {
  id: number;
}
