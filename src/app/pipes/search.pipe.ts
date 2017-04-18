import { Pipe, PipeTransform } from '@angular/core';

import { Category } from 'app/models/Category';

@Pipe({
    name: 'searchpipe',
    pure: false
})

export class SearchPipe implements PipeTransform {

    tmp = [];
    transform(data: Category[], queryString: string) {
        if (data) {
            this.tmp.length = 0;
            const arr = data.filter((category) => new RegExp(queryString.toLowerCase()).test(category.name.toLowerCase()));
            this.tmp.push(...arr);
            return this.tmp;
        }
        return data;
    }
}
