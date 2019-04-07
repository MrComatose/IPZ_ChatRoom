import { HttpClient, HttpHandler, HttpEvent, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IRequestOptions } from '../interfaces/IRequestOptions';
import { AppHttpClient } from '../AppHttpClient/app-http-client';

@Injectable()
export class AuthHttpClient {

    // Extending the AppHttpClient through the Angular DI.
    public constructor(public http: AppHttpClient) {
        // If you don't want to use the extended versions in some cases you can access the public property and use the original one.
        // for ex. this.httpClient.http.get(...)
    }

    /**
     * GET request
     * @param {string} endPoint it doesn't need / in front of the end point
     * @param {IRequestOptions} options options of the request like headers, body, etc.
     * @return an `Observable` of all `HttpEvent`s for the request, with a body type of `Object`.
     */
    public get<T>(endPoint: string, options?: IRequestOptions): Observable<T> {
        return this.http.get<T>(endPoint, this.CheckOptions(options));
    }

    /**
     * POST request
     * @param {string} endPoint end point of the api
     * @param {Object} params body of the request.
     * @param {IRequestOptions} options options of the request like headers, body, etc.
     * @return an `Observable` of all `HttpEvent`s for the request, with a body type of `Object`.
     */
    public post<T>(endPoint: string, params: Object, options?: IRequestOptions): Observable<T> {
        return this.http.post<T>(endPoint, params, this.CheckOptions(options));
    }

    /**
     * PUT request
     * @param {string} endPoint end point of the api
     * @param {Object} params body of the request.
     * @param {IRequestOptions} options options of the request like headers, body, etc.
     * @return an `Observable` of all `HttpEvent`s for the request, with a body type of `Object`.
     */
    public put<T>(endPoint: string, params: Object, options?: IRequestOptions): Observable<T> {
        this.CheckOptions(options);
        return this.http.put<T>(endPoint, params, this.CheckOptions(options));
    }

    /**
     * DELETE request
     * @param {string} endPoint end point of the api
     * @param {IRequestOptions} options options of the request like headers, body, etc.
     * @return an `Observable` of all `HttpEvent`s for the request, with a body type of `Object`.
     */
    public delete<T>(endPoint: string, options?: IRequestOptions): Observable<T> {
        this.CheckOptions(options);
        return this.http.delete<T>(endPoint, this.CheckOptions(options));
    }

    private CheckOptions(options: IRequestOptions) {
        if (options === undefined) {
            options = {};
        }

        if (options.headers === undefined) {
            options.headers = new HttpHeaders();
        }

        options.headers = options.headers.append('Authorization', 'Bearer ' + localStorage.getItem('token'));

        // options.headers = new HttpHeaders({ 'Authorization': 'Bearer ' + localStorage.getItem('token') });

        return options;
    }
}