export class Entreprise {
    public name: string;
    public domain: string;
    public adress: string;
    public id?: string;

    constructor(name: string, domain: string, adress: string){
        this.name = name;
        this.domain = domain;
        this.adress = adress;
    }
}