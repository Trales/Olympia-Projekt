import { Component, Input } from '@angular/core';
import { sport_score_entry } from '../datatype';
import { RSHttpClient } from '../HttpClient';

export class ImageObject {
    public name = '';
    public src = '';

    constructor(_name: string, _src: string)
    {
        this.name = _name;
        this.src = _src;
    }
}

@Component({
    selector: 'content-view',
    templateUrl: './contentView.html',
    styleUrls: ['./contentView.scss']
})
export class ContentView  {
    
    private _searchValues: Array<string> = new Array<string>();
    public selectedSportType: string = '';
    public selectedScores = new Array<sport_score_entry>();

    public get sportTypeSelected(): boolean
    {
        return this.selectedSportType != '';
    }

    @Input()
    public data: Array<{name: string, src: string}> = new Array();
    
    @Input()
    public set searchValues(value: Array<string>)
    {
        this._searchValues = value;
    }

    public get searchValues()
    {
        return this._searchValues;
    }

    constructor(private rsHttpClient: RSHttpClient)
    {     
    }

    /**
     * Wird ausgeführt wenn eine Sportart angeklickt wurde
     * Ändert die View zum Anzeigen der Score Werte für die ausgewählte Sportart
     * @param sportType Sportart
     */
    public async onSportTypeClicked(sportType: string)
    {
        this.selectedSportType = sportType;
        this.selectedScores = await this.rsHttpClient.getScoreBySportType(sportType);
    }
    
    /**
     * Wenn der "Zurück" Knopf gedrückt wird. 
     * Ändert die View zu der Länderübersicht ohne ausgewähltem Land
     */
    public onBackClicked()
    {
        this.selectedSportType = '';
    }
}
