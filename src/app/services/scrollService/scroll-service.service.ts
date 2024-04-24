import { Injectable, Inject, PLATFORM_ID, Renderer2, RendererFactory2 } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class ScrollService {
  private renderer!: Renderer2;

  constructor(
    private rendererFactory: RendererFactory2,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    if (isPlatformBrowser(this.platformId)) {
      this.renderer = this.rendererFactory.createRenderer(null, null);
    }
  }

  scrollToElement(selector: string): void {
    if (isPlatformBrowser(this.platformId)) {
      const element = document.querySelector(selector) as HTMLElement;

      if (element && this.renderer) {
        this.renderer.setProperty(element, 'scrollTop', element.offsetTop);
      }
    }
  }

    //TODO REVISAR POR QUE NO FUNCIONA
}
