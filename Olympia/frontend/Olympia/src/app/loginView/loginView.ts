import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import { user } from '../datatype';
import { RSHttpClient } from '../HttpClient';

@Component({
    selector: 'login-view',
    templateUrl: './loginView.html',
    styleUrls: ['./loginView.scss']
})
export class LoginView {    
    public username = '';
    public password = '';    

    @ViewChild('username')
    public usernameInput!: ElementRef<HTMLInputElement>;

    @ViewChild('password')
    public passwordInput!: ElementRef<HTMLInputElement>;

    @Output()
    public loggedIn: EventEmitter<boolean> = new EventEmitter<boolean>();

    constructor(private rsHttpClient: RSHttpClient)
    {
    }

    /**
     * Wird ausgeführt wenn der Login Knopf gedrückt wird.
     * Validiert den Benutzernamen und das Passwort und sendet danach die login Abfrage
     * und wertet diese aus und setzt loggedIn
     * @returns 
     */
    public async onLoginButtonClicked()
    {
        this.username = this.usernameInput?.nativeElement.value as string;
        this.password = this.passwordInput?.nativeElement.value as string;

        if (this.username.length == 0)
        {
            alert('Der Benutzername darf nicht leer sein.');
            return;
        }

        if (this.password.length == 0)
        {
            alert('Das Passwort darf nicht leer sein.');
            return;
        }

        let res = await this.rsHttpClient.login(new user(this.username, this.password));

        if (res == false)
        {
            alert("Benutzername und Passwort stimmen nicht überein!");
            return;
        }


        this.loggedIn.emit(true);
    }

    public async onRegisterButtonClicked()
    {
        this.username = this.usernameInput?.nativeElement.value as string;
        this.password = this.passwordInput?.nativeElement.value as string;


        let pwtext = prompt('Geben sie das Passwort erneut ein: ');

        if (this.password != pwtext)
        {
            alert("Die Passwörter stimmen nicht überein!")
            return;
        }

        let res = await this.rsHttpClient.register(new user(this.username, this.password))

        if (res == false)
        {
            alert("Benutzer ist schon registriert!")
        }
        else
        {
            alert("Benutzer erfolgreich registriert!")
        }
    }
}
