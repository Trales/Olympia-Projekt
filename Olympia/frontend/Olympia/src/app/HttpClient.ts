import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { user, medal, score_entry, country_score_entry, sport_score_entry } from './datatype';

type countryname = string;

@Injectable({ providedIn: 'root' })
export class RSHttpClient
{
    private _url: string = "http://localhost:443/index.php/";

    constructor(private httpClient: HttpClient)
    {
    }
    
    private isValid(entry: {result: any, error?: string})
    {
        if (entry['error'] != null)
        {
            alert('Error: ' + entry.error);
        }

        return entry.result;
    }

    private async post(parameters: {}): Promise<{result: any, error?: string}>
    {
        return new Promise((resolve: any, reject: any) =>
        {
            let header = new HttpHeaders();

            header = header.append('Content-Type', 'application/json').append('Accept', 'application/json');
            header = header.append('Access-Control-Allow-Origin', '*')
            header = header.append('Origin', '*')

            this.httpClient.post(this._url, parameters, { 'headers': header } ).subscribe((e: any) =>
            {
                console.log('post', e);
                resolve(e);
            })
        });
    }

    public async login(credentials: user): Promise<boolean>
    {
        const parameter = {
            method: 'login',
            args: { username: credentials.name, password: credentials.password }
        }

        return this.isValid(await this.post(parameter));
    }

    public async register(credentials: user): Promise<boolean>
    {
        const parameter = {
            method: 'register',
            args: { username: credentials.name, password: credentials.password }
        }

        return this.isValid(await this.post(parameter));
    }
    
    public async addAthlet(athletName: string, sportType: string, score: string, medal: medal): Promise<boolean>
    {
        const parameter = {
            method: 'setResult',
            args: { athletName, sportType, score, medal }
        }

        return this.isValid(await this.post(parameter));
    }

    public async getScoreBySportType(type: string): Promise<sport_score_entry[]>
    {
        const parameter = {
            method: 'getScoreBySportType',
            args: { sportType: type }
        }

        return this.isValid(await this.post(parameter));
    }

    public async getScoreByCountry(name: countryname): Promise<country_score_entry[]>
    {
        const parameter = {
            method: 'getScoreByCountry',
            args: { country: name }
        }

        return this.isValid(await this.post(parameter));
    }

    public async getScores(): Promise<score_entry[]>
    {
        const parameter = {
            method: 'getScore',
            args: {}
        }

        return this.isValid(await this.post(parameter));
    }
}
