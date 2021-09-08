export interface Stock {
  meta: Meta;
  values: ValuesEntity[];
  status: string;
}
export interface Meta {
  symbol: string;
  interval: string;
  currency: string;
  exchange_timezone: string;
  exchange: string;
  type: string;
}
export interface ValuesEntity {
  datetime: Date;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}
