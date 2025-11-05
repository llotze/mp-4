export type ApiInfo = {
  totalrecordsperquery: number;
  totalrecords: number;
  pages: number;
  page: number;
  next: string;
  prev: string;
  responsetime: string;
}

export type ApiResponse = {
    info: ApiInfo;
    records: unknown[];
    aggregations: Record<string, unknown>;
}