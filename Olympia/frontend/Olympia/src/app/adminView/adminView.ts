import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { athlet, medal } from '../datatype';
import { RSHttpClient } from '../HttpClient';



// Sportart, Athlet, Punktzahl Medaille
@Component({
    selector: 'admin-view',
    templateUrl: './adminView.html',
    styleUrls: ['./adminView.scss']
})
export class AdminView {

    
    @ViewChild('sporttype')
    public sportTypeInput!: ElementRef<HTMLInputElement>;

    @ViewChild('athlet')
    public athletInput!: ElementRef<HTMLInputElement>;

    @ViewChild('score')
    public scoreInput!: ElementRef<HTMLInputElement>;

    @ViewChild('medal')
    public medalInput!: ElementRef<HTMLInputElement>;

    constructor(private rsHttpClient: RSHttpClient)
    {

    }

    /**
     * Wenn der Benutzer den "Submit" Knopf drückt
     * Führt die Serverfunktion aus zum hinzufügen eines Athleten zu der Datenbank
     */
    public async onSubmit()
    {
        const athlet = this.athletInput.nativeElement.value;
        const medal = this.medalInput.nativeElement.value;
        const sporttype = this.sportTypeInput.nativeElement.value;
        const score = this.scoreInput.nativeElement.value;
        console.log('addAthlet:', athlet, medal, score, sporttype)

        await this.rsHttpClient.addAthlet(athlet, sporttype, score, medal as any as medal);

    }
}