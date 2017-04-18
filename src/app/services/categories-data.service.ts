import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { Category } from 'app/models/Category';

@Injectable()
export class CategoriesDataService {
    constructor(private http: Http) {
    }

    getCategories(apiEndpoint) {
        return this.http
            .get(apiEndpoint)
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

        return <Category[]>results;
    }

    private handleError(error: Response) {
        return Observable.throw(error);
    }
}
