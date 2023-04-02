export enum medal {
    'None',
    'Gold',
    'Silver',
    'Bronze'
}

export class user
{
    constructor(_name: string, _password: string)
    {
        this.name = _name;
        this.password = _password;
    }

    public name: string;
    public password: string;
}

export class athlet
{
    constructor(_country: string, _name: string)
    {
        this.country = _country;
        this.name = _name;
    }

    public country: string;
    public name: string;
}

export interface score_entry {
    name: string;
    gold: number;
    silver: number;
    bronze: number;
}

export interface country_score_entry {
    name: string;
    sportType: string;
    score: string;
    medal: string;
}

export interface sport_score_entry {
    name: string;
    country: string;
    medal: medal;
    score: string;
}