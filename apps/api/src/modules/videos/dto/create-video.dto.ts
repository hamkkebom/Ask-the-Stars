export interface CreateVideoDto {
  title: string;
  versionLabel: string;
  versionTitle?: string;
  description?: string;
  categoryName?: string;
  counselorName?: string;
  creatorId?: string;
}
