export class Store {
    title: string;
    adress: string;
    idEntreprise: string;
    idStore?: string;

    constructor(
        title: string,
        adress: string,
        idEntreprise: string,
        idStore?: string
      ) {
        this.title = title;
        this.adress = adress;
        this.idEntreprise = idEntreprise;
        this.idStore = idStore
      }
  }