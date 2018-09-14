import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { AppConfig } from '../../app/app-config';
import { UserProvider } from '../../providers/user/user';
import { HandleErrorProvider } from '..//handle-error/handle-error';
import * as _ from 'lodash';
import { Hijack } from '../../models/hijack/hijack'



@Injectable()
export class HijacksProvider {

	private url = AppConfig.ServiceBase + '/hijacks/';  // URL to web api
    constructor(private http: HttpClient,
                private UserProvider: UserProvider,
                private HandleErrorProvider: HandleErrorProvider) {
    }

    find(): Promise<Hijack[]> {
        return this.http.get(this.url, { headers: this.UserProvider.getHeaders() })
            .toPromise()
            .then(response => response['data'] as Hijack[])
            .catch(err => this.HandleErrorProvider.handle(err));
    }

    get(by: String, sort, pageSize, pageNumber): Promise<Hijack[]> {
        return this.http.get(`${this.url}by/${by}/${sort}/${pageSize}/${pageNumber}`, { headers: this.UserProvider.getHeaders() })
            .toPromise()
            .then(response => response['data'] as Hijack[])
            .catch(err => this.HandleErrorProvider.handle(err));
    }

    findOne(id: string): Promise<Hijack> {
        const url = `${this.url}${id}`;
        return this.http.get(url, { headers: this.UserProvider.getHeaders() })
            .toPromise()
            .then(response => response['data'] as Hijack)
            .catch(err => this.HandleErrorProvider.handle(err));
    }

    findByStatus(status: string): Promise<Hijack[]> {
        return this.http.get(`${this.url}by/status:${status}`, { headers: this.UserProvider.getHeaders() })
            .toPromise()
            .then(response => response['data'] as Hijack[])
            .catch(err => this.HandleErrorProvider.handle(err));
    }

    findByAction(action: string): Promise<Hijack[]> {
        return this.http.get(`${this.url}by/action:${action}`, { headers: this.UserProvider.getHeaders() })
            .toPromise()
            .then(response => response['data'] as Hijack[])
            .catch(err => this.HandleErrorProvider.handle(err));
    }

    findByActionAndStatus(action: string, status: string): Promise<Hijack[]> {
        return this.http.get(`${this.url}by/action:${action}|status${status}`, { headers: this.UserProvider.getHeaders() })
            .toPromise()
            .then(response => response['data'] as Hijack[])
            .catch(err => this.HandleErrorProvider.handle(err));
    }

    update(hijack: Hijack): Promise<Hijack> {
        const url = `${this.url}${hijack._id}`;
        return this.http
            .put(url, JSON.stringify(hijack), {headers: this.UserProvider.getHeaders()})
            .toPromise()
            .then(res => res['data'] as Hijack)
            .catch(err => this.HandleErrorProvider.handle(err));
    }

    delete(id: string): Promise<void> {
        const url = `${this.url}${id}`;
        return this.http.delete(url, {headers: this.UserProvider.getHeaders()})
            .toPromise()
            .then(() => null)
            .catch(err => this.HandleErrorProvider.handle(err));
    }
}
