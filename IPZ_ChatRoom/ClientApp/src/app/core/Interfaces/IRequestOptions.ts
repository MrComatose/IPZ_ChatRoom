import { HttpHeaders, HttpParams } from "@angular/common/http";

export interface IRequestOptions {
  headers?: HttpHeaders;
  observe?: "body";
  params?:
    | HttpParams
    | {
        [param: string]: string | string[];
      };
  reportProgress?: boolean;
  responseType?: "json";
  withCredentials?: boolean;
}
