import { Injectable } from '@angular/core';

@Injectable()

export class AppSettings {
    public API_ENDPOINT = `https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20html%20where%20url%3D'http%3A%2F%2Fwhatsonnetflix.com%2Fnetflix-hacks%2Fthe-netflix-id-bible-every-category-on-netflix%2F%3Ffeed%3Drss'%20and%20xpath%3D'%2F%2F*%5Bcontains(p%2C%22%20%3D%20%22)%5D%2Fp'&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys`;
}

