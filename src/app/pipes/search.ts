import { Pipe, PipeTransform } from '@angular/core';

import { Category } from 'app/providers/Category';

@Pipe({
    name: 'search',
    pure: false
})

export class Search implements PipeTransform {

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
