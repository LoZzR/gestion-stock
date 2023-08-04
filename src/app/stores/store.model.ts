export class Store {
    idStore: string;
    title: string;
    adress: string;
    idEntreprise: string;

    constructor(
        idStore: string,
        title: string,
        adress: string,
        idEntreprise: string
      ) {
        this.idStore = idStore;
        this.title = title;
        this.adress = adress;
        this.idEntreprise = idEntreprise;
      }
  }