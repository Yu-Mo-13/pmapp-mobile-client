export type UUID = string;
export type Password = {
  no: number;
  pwd: string;
  app: string;
  other_info: string;
  registered_date: string;
};

export type Autoregist = {
  uuid: UUID;
  pwd: string;
  app: string;
  other_info: string;
  registered_date: string;
}