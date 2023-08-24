export class Article {
    title: string;
    description: string;
    idStore: string;
    idEntreprise: string;
    idArticle?: string;

    constructor(
        title: string,
        description: string,
        idStore: string,
        idEntreprise: string,
        idArticle?: string
      ) {
        this.title = title;
        this.description = description;
        this.idStore = idStore;
        this.idEntreprise = idEntreprise;
        this.idArticle = idArticle;
      }
}
