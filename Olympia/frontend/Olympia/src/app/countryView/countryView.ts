import { Component, OnInit } from '@angular/core';
import { athlet, country_score_entry, medal } from '../datatype';
import { RSHttpClient } from '../HttpClient';

@Component({
    selector: 'country-view',
    templateUrl: './countryView.html',
    styleUrls: ['./countryView.scss']
})
export class CountryView implements OnInit {

    public selectedCountry: string = '';
    public scores: Array<any> = new Array<any>();
    public selectedScores: Array<country_score_entry> = new Array<country_score_entry>();
    public searchCountry: string = '';

    public get countrySelected()
    {
        return this.selectedCountry != '';
    }

    constructor(private rsHttpClient: RSHttpClient)
    {
    }

    /**
     * Wird beim initialisieren der Komponente aufgerufen
     * Lädt die Score Werte
     */
    public async ngOnInit()
    {
        this.scores = await this.rsHttpClient.getScores();
    }

    /**
     * Wird ausgeführt wenn ein Land angeklickt wurde
     * Ändert die View zum Anzeigen der Score Werte für das ausgewählte Land
     * @param e HTMLClickEvent
     */
    public async onCountryClicked(e: any)
    {
        const countryName: string = e.target.innerText;
        this.selectedCountry = countryName;

        this.selectedScores = await this.rsHttpClient.getScoreByCountry(this.selectedCountry);
    }

    /**
     * Wenn der "Zurück" Knopf gedrückt wird. 
     * Ändert die View zu der Länderübersicht ohne ausgewähltem Land
     */
    public onBackClicked()
    {
        this.selectedCountry = '';
    }

    /**
     * Führt die Suche aus und markiert das gesuchte Element
     * @param value 
     * @returns 
     */
    public search(value: Array<string>)
    {
        if (value.length < 1)
        {
            return;
        }

        this.searchCountry = value[0];
    }
}
