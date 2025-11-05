export type ApiInfo = {
  totalrecordsperquery: number;
  totalrecords: number;
  pages: number;
  page: number;
  next: string;
  prev: string;
  responsetime: string;
}

export type Artwork = {
  id?: number;
  title?: string;
  dated?: string;
  classification?: string;
  primaryimageurl?: string;
  medium?: string;
  culture?: string;
  period?: string;
  technique?: string;
  dimensions?: string;
  creditline?: string;
  accessionyear?: number;
  century?: string;
  people?: Array<{
    displayname: string;
    role: string;
  }>;
}

export type ApiResponse = {
  info: ApiInfo;
  records: Artwork[];
  aggregations: Record<string, unknown>;
}