export class Store {
    title: string;
    adress: string;
    idEntreprise: string;

    constructor(
        title: string,
        adress: string,
        idEntreprise: string
      ) {
        this.title = title;
        this.adress = adress;
        this.idEntreprise = idEntreprise;
      }
  }