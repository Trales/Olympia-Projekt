import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
    selector: 'filter-view',
    templateUrl: './filterView.html',
    styleUrls: ['./filterView.scss']
})
export class FilterView {

    @Input()
    public filterInputs: Array<string> = new Array<string>();

    @Output()
    public searchClicked = new EventEmitter<Array<string>>();

    public inputValues: Array<string> = new Array<string>();
    
    constructor()
    {

    }

    /**
     * Wird ausgeführt wenn der Suchen/Filter Knopf gedrückt wird
     * Initialisiert die Eingabefelder der FilterView
     */
    public onSearchClicked()
    {
        let result = new Array<string>();
        const inputElements = document.getElementsByClassName('filterInput') as any;

        for (let i = 0; i < inputElements.length; i++)
        {
            const element = inputElements[i] as any;
            result.push(element.value)
        }

        this.searchClicked.emit(result)
    }
}
