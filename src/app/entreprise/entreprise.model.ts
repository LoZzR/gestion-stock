export class Entreprise {
    public name: string;
    public domain: string;
    public adress: string;
    public userId?: string;

    constructor(name: string, domain: string, adress: string, userId?: string){
        this.name = name;
        this.domain = domain;
        this.adress = adress;
        if(userId) this.userId = userId;
    }
}