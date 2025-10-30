export interface ExportJsonToExcelOptions {
  multiHeader?: string[][] | any[];
  header?: string[] | any[];
  data?: any[][];
  filename?: string;
  merges?: string[] | any[];
  autoWidth?: boolean;
  bookType?: 'xlsx' | 'xls' | 'csv';
  [key: string]: any;
}

export function export_json_to_excel(options?: ExportJsonToExcelOptions | any): void;

export function export_table_to_excel(id: string): void;
