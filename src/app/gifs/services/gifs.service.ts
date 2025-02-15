import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal, computed } from '@angular/core';

import { environment } from '@environments/environment';
import { map, tap } from 'rxjs';
import { Gif } from '../interfaces/gif.interface';
import type { GiphyResponse } from '../interfaces/giphy.interfaces';
import { GifMapper } from './mapper/gif.mapper';


@Injectable({providedIn: 'root'})
export class GifService {

    private http = inject(HttpClient);

    trendingGifs = signal<Gif[]>([]);
    trendingGifsLoading = signal(true);

    searchHistory = signal<Record<string, Gif[]>>({});
    searchHistoryKeys = computed( () => Object.keys(this.searchHistory()));
    

    constructor(){
        this.loadTrendingGifs();
    }

    loadTrendingGifs(){
        this.http.get<GiphyResponse>(`${environment.giphyUrl}/gifs/trending`, {
            params:{
                api_key: environment.giphyApiKey,
                limit: 20
            }
        })
        .subscribe( (response) => {
            const gifs = GifMapper.mapGiphyItemsToGifArray(response.data);
            this.trendingGifs.set(gifs);
            this.trendingGifsLoading.set(false);
            console.log(response.data)
        } )
    }

    searchGifs(query:string){
        return this.http.get<GiphyResponse>(`${environment.giphyUrl}/gifs/search`, {
            params:{
                api_key: environment.giphyApiKey,
                limit: 20,
                q: query
            },
        }).pipe(
            map( ({data}) =>  data ),
            map( (items) => GifMapper.mapGiphyItemsToGifArray(items)),

            //for history
            tap( items => {
                this.searchHistory.update( history => ({
                    ...history, [query.toLowerCase()]: items,
                }))
            } )
        );


      /*  .subscribe( (response) => {
            const gifs = GifMapper.mapGiphyItemsToGifArray(response.data);
          
            console.log({search: gifs });
            
        } )*/
    }

}