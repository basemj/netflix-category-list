import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';

import { AppSettings } from 'app/app-settings';
import { Category } from 'app/providers/Category';

@Injectable()
export class CategoriesDataService {
    private apiEndpoint: string;

    constructor(private http: Http, private _appSettings: AppSettings) {
        this.apiEndpoint = _appSettings.API_ENDPOINT;
    }

    getCategories() {
        if (window.localStorage['netflixCategoriesList']) {
            return Observable.create(observer => {
                observer.next(<Category[]>JSON.parse(window.localStorage['netflixCategoriesList']));
                observer.complete();
            });
        }
        return this.http
            .get(this.apiEndpoint)
            .map(this.extractData)
            .catch(this.handleError);

    }

    private createCategory(content: string) {
        const catArray = content.split(' = ');

        return {
            url: 'http://www.netflix.com/browse/genre/' + catArray[0],
            name: catArray[1]
        };
    }

    private extractData = (response: Response) => {
        const body = response.json();
        const categories = body.query.results.p;
        const results = [];

        for (const cat of categories) {
            if (typeof (cat) === 'string') {
                results.push(this.createCategory(cat));
            } else if (typeof (cat) === 'object' && cat.content !== undefined) {
                results.push(this.createCategory(cat.content));
            }
        }

        window.localStorage['netflixCategoriesList'] = JSON.stringify(results);
        return <Category[]>results;
    }

    private handleError(error: Response) {
        console.error(error);
        return Observable.throw(error);
    }
}
