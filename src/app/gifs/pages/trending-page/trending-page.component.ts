import { AfterViewInit, Component, ElementRef, inject, viewChild } from '@angular/core';
import { ScrollStateService } from 'src/app/shared/services/scroll-state.service';
import { GifService } from '../../services/gifs.service';

@Component({
  selector: 'app-trending-page',
//  imports: [GifListComponent],
  templateUrl: './trending-page.component.html',
})
export default class TrendingPageComponent implements AfterViewInit{
  
  gifService = inject(GifService);
  scrollStateService = inject(ScrollStateService)

  scrollDivRef = viewChild<ElementRef<HTMLDivElement>>('groupDiv');

  ngAfterViewInit(): void {
    const scrollDiv = this.scrollDivRef()?.nativeElement;
    if( !scrollDiv) return;

    scrollDiv.scrollTop = this.scrollStateService.trendingScrollState();

  }

  onScroll(event: Event){
    const scrollDiv = this.scrollDivRef()?.nativeElement;
    if( !scrollDiv) return;
    
    // La posición actual del scroll (cuánto se ha desplazado verticalmente)
    const scrollTop = scrollDiv.scrollTop;

    // El alto visible del contenedor (lo que se puede ver sin hacer scroll)
    const clientHeight = scrollDiv.clientHeight;

    // El alto total del contenido con scroll (incluyendo lo que está fuera de la vista)
    const scrollHeight = scrollDiv.scrollHeight;
    
    // 300 pixeles antes de llegar al final del scroll
    const isAtBottom = scrollTop + clientHeight + 300 >= scrollHeight;
    this.scrollStateService.trendingScrollState.set(scrollTop)

    if( isAtBottom){
      //cargamos la siguiente pagina
      this.gifService.loadTrendingGifs()
    }
  }

 }
