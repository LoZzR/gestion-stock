import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { Article } from './article.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  currentArticles = new BehaviorSubject<Article[]>(null!);

  constructor(private http: HttpClient) {}

  getListArticleById(idEntreprise: string): Observable<Article[]> {
    return this.http
      .get<Article[]>(
        '/articles.json?orderBy="idEntreprise"&equalTo="'+ idEntreprise + '"'
      ).pipe(
        map(articlesWrapper => {
          const articles = Object.values(articlesWrapper);
          articles.forEach((value, index) => {
            value.idArticle = Object.keys(articlesWrapper)[index];
          });
          this.currentArticles.next(articles);
          return articles;
      }))
  }

  getArticleById(idArticle: string) {
    return this.http
      .get<Article>('/articles/' + idArticle + '.json');
  }
  
  addArticle(title: string, adress: string, idEntreprise: string) {
    const article = new Article(title, adress, '', idEntreprise);
    return this.http
      .post(
        '/articles.json', article
      );
  }

  editArticle(idArticle: string, article: Article) {
    return this.http
      .put(
        '/articles/' + idArticle + '.json', article
      );
  }
  
  deleteArticle(idArticle: string) {
    this.removeArticle(idArticle, this.currentArticles.getValue());
    return this.http
    .delete(
      '/articles/' + idArticle + '.json'
    );
  }

  

  private removeArticle(idArticle: string, listArticle: Article[]) {
    let indexArticle = 0;
    for(let i = 0; i < listArticle.length ; i++){
      if(idArticle === listArticle[i].idArticle){
        indexArticle = i;
        break;
      }
    }
    
    listArticle.splice(indexArticle, 1);
    this.currentArticles.next(listArticle.slice());
  }
}
