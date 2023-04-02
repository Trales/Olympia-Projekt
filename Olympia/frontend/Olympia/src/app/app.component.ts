import { Component, ViewChild } from '@angular/core';
import { ContentView, ImageObject } from './contentView/contentView';
import { CountryView } from './countryView/countryView';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    public title = 'Olympia';

    public activeTab: number = 0;
    public loggedIn: boolean = false;
    public showLoginView: boolean = false;
    public searchValues = new Array<string>();
    public filterInputs: Array<string> = new Array<string>();

    public drowDownVisible = false;

    @ViewChild(CountryView)
    public countryView!: CountryView;

    @ViewChild(ContentView)
    public contentView!: ContentView;

    public contentViewData: Array<ImageObject> = [new ImageObject('100m - Sprint', '../assets/Leichtathletik.png'),
                                                  new ImageObject('Fechten', '../assets/fechten.webp'),
                                                  new ImageObject('Schwimmen', '../assets/schwimmen.jpg'),
                                                  new ImageObject('Sprungreiten', '../assets/sprungreiten.jpg'),
                                                  new ImageObject('Weitsprung', '../assets/weitsprung.jpg')];

    constructor() 
    {
    }

    /* When the user clicks on the button,
    toggle between hiding and showing the dropdown content */
    public onDrowdownClicked(e: any)
    {
        this.drowDownVisible = !this.drowDownVisible;  
    }

    /**
     * Wird ausgeführt wenn der Benutzer auf den Admin Reiter klickt
     */
    public onShowLoginViewClicked()
    {
        this.showLoginView = true;
    }

    /**
     * Wird ausgeführt wenn ein neuer Navigationsreiter angeklickt wird.
     * Ändert die Filter Werte
     * @param tab tabindex
     */
    public onNavbarChanged(tab: number = 0)
    {
        if (tab == 0 || tab == 2)
        {
            this.filterInputs = [];
        }
        else if (tab == 1)
        {
            this.filterInputs = ['Land']
        }
        this.activeTab = tab;
    }

    /**
     * Wird ausgeführt wenn der Benutzer eingeloggt ist
     * @param e login Value
     */
    public onLoggedIn(e: boolean)
    {
        this.loggedIn = e;
        this.showLoginView = false;
    }

    /**
     * onSearch - wenn der "Suchen" Knopf gedrückt wird
     * @param searchValues 
     */
    public onSearch(searchValues: Array<string>)
    {
        this.searchValues = searchValues;
        this.countryView?.search(searchValues);
    }
}
