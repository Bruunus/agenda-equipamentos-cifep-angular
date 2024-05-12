import { Component, ElementRef, Renderer2 } from '@angular/core';

export class CriarModule {


    
    constructor(private renderer: Renderer2, private elementRef: ElementRef) { }

    listeningMulipleReservationButton() {
        const container = this.elementRef.nativeElement.querySelector('#container');
        const template = '<span>Teste nova linha</span>';

        // Adiciona o conteúdo HTML dentro do elemento container
        container.innerHTML = template;
    }


    


}