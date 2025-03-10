import { HttpClient } from '@angular/common/http';
import { computed, effect, inject, Injectable, signal } from '@angular/core';

import { environment } from '@environments/environment';
import { map, Observable, tap } from 'rxjs';
import { Gif } from '../interfaces/gif.interface';
import type { GiphyResponse } from '../interfaces/giphy.interfaces';
import { GifMapper } from './mapper/gif.mapper';

const GIF_KEY = 'gifsv1'

const loadFromLocalStorage = () => {
    const  gifsFromLocalStorage = localStorage.getItem(GIF_KEY) ?? '{}';
    const gifs = JSON.parse(gifsFromLocalStorage);

    return gifs;
}


@Injectable({providedIn: 'root'})
export class GifService {

    private http = inject(HttpClient);

    trendingGifs = signal<Gif[]>([]);
    trendingGifsLoading = signal(false);
    private trendingPage = signal(0);

    trendingGifGroup = computed<Gif[][]>( () => {
        //creamos la estructura de 3 elementos para el diseño masonry
        const groups = [];
        for ( let i = 0; i< this.trendingGifs().length; i +=3){
             groups.push(this.trendingGifs().slice(i, i +3));
        }

        return groups;
    })

    searchHistory = signal<Record<string, Gif[]>>(loadFromLocalStorage());
    searchHistoryKeys = computed( () => Object.keys(this.searchHistory()));
    

    constructor(){
        this.loadTrendingGifs();
    }

    saveGifsToLocalStorage = effect( () => {
        const historyString = JSON.stringify(this.searchHistory());
        localStorage.setItem(GIF_KEY, historyString);
    })

    loadTrendingGifs(){

        if(this.trendingGifsLoading()) return;

        this.trendingGifsLoading.set(true);


        this.http.get<GiphyResponse>(`${environment.giphyUrl}/gifs/trending`, {
            params:{
                api_key: environment.giphyApiKey,
                limit: 20,
                offset: this.trendingPage() * 20,
            }
        })
        .subscribe( (response) => {
            const gifs = GifMapper.mapGiphyItemsToGifArray(response.data);
            this.trendingGifs.update( currentGifs => [
                //mantenemos los gifs anteriores
                ...currentGifs,
                //y agregamos los nuevos gifs
                ...gifs

            ]);
            this.trendingPage.update( (current) => current +1 )
            this.trendingGifsLoading.set(false);
        } )
    }

    searchGifs(query:string): Observable<Gif[]>{
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

    getHistoryGifs( query: string):Gif[]{
        return this.searchHistory()[query] ?? [];
    }

}