import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Article } from '../article.model';
import { ArticleService } from '../article.service';
import { EntrepriseService } from 'src/app/entreprise/entreprise.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { StoreService } from 'src/app/stores/store.service';
import { Store } from 'src/app/stores/store.model';

@Component({
  selector: 'app-edit-article',
  templateUrl: './edit-article.component.html',
  styleUrls: ['./edit-article.component.css']
})
export class EditArticleComponent implements OnInit, OnDestroy {

  private entrepriseWrapperSub: Subscription = null!;
  isLoading = false;
  isSucessSave = false;
  private idCurrentEntreprise: string = null!;
  private idCurrentArticle: string = null!;
  article: Article = new Article('', '', '', '', '');
  stores: Store[] = [];

  constructor(private articleService: ArticleService,
              private entrepriseService: EntrepriseService,
              private storeService: StoreService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.entrepriseWrapperSub = this.entrepriseService.currentEntrepriseId.subscribe((entrepriseId: string) => {
      this.idCurrentEntreprise = entrepriseId;
      this.storeService.getListStoreById(entrepriseId).subscribe((stores: Store[]) => {
        this.stores = stores;
      }

      );
    });
    const isArticleParams = this.route.snapshot.paramMap.get('articleId');
    if(isArticleParams !== null) {
      this.idCurrentArticle = String(isArticleParams);
      this.articleService.getArticleById(this.idCurrentArticle).subscribe((article: Article) => {
        this.article = article;
      });
    }
  }

  addArticle(form: NgForm) {
    if (!form.valid) {
      return;
    }
    
    this.isLoading = true;

    if(this.idCurrentArticle === null) {
      this.articleService.addArticle(form.value.title, form.value.adress, this.idCurrentEntreprise).subscribe(
        resData => {
          this.isLoading = false;
          this.isSucessSave = true;
        },
        errorMessage => {
          console.log(errorMessage);
          this.isLoading = false;
          this.isSucessSave = false;
        }
      );
    }
    else {
      this.editArticle();
    }

    form.reset();
  }

  private editArticle() {
    this.articleService.editArticle(this.idCurrentArticle, this.article).subscribe(resData => {
      this.isLoading = false;
      this.isSucessSave = true;
    },
    errorMessage => {
      console.log(errorMessage);
      this.isLoading = false;
      this.isSucessSave = false;
    });
  }

  previousPage() {
    this.router.navigate(['/main/articles']);
  }

  ngOnDestroy() {
    this.entrepriseWrapperSub.unsubscribe();
  }

}
