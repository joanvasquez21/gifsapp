import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { GifListComponent } from "../../components/gif-list/gif-list.component";
import { Gif } from '../../interfaces/gif.interface';
import { GifService } from '../../services/gifs.service';

@Component({
  selector: 'app-search-page',
  imports: [GifListComponent],
  templateUrl: './search-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class SearchPageComponent { 

  GifService = inject( GifService)
  gifs = signal<Gif[]>([]);
  onSearch(query: string){
    this.GifService.searchGifs(query).subscribe( response => {
       this.gifs.set(response)
    })
  }

}
