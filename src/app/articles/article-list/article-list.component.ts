import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Entreprise } from 'src/app/entreprise/entreprise.model';
import { Article } from '../article.model';
import { EntrepriseService } from 'src/app/entreprise/entreprise.service';
import { ArticleService } from '../article.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.css']
})
export class ArticleListComponent implements OnInit, OnDestroy {

  private entrepriseWrapperSub: Subscription = null!;
  private articlesSub: Subscription = null!;
  entreprise: Entreprise = null!;
  articles: Article[] = null!;
  editArticle = false;

  constructor(private entrepriseService: EntrepriseService, private articleService: ArticleService, private router: Router) { }

  ngOnInit(): void {
    this.entrepriseWrapperSub = this.entrepriseService.currentEntrepriseId.subscribe((entrepriseId: string) => {
      this.articleService.getListArticleById(entrepriseId).subscribe((articles: Article[]) => {
        this.articlesSub = this.articleService.currentArticles.subscribe((articles: Article[]) => {
          this.articles = articles.slice();
        })
      });
    });
  }

  addSotre() {
    this.router.navigateByUrl ('/main/edit-article');
  }

  ngOnDestroy() {
    this.entrepriseWrapperSub.unsubscribe();
    this.articlesSub.unsubscribe();
  }

}

