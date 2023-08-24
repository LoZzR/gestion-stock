import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Article } from '../article.model';
import { ArticleService } from '../article.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit {

  @Input()
  article: Article = null!;

  @ViewChild('mycloseButton')
  mycloseButton!: ElementRef<HTMLElement>;

  constructor(private articleService: ArticleService, private router: Router) { }

  ngOnInit(): void {
  }

  editArticle() {
    this.router.navigate(['/main/edit-article', this.article.idArticle]);
  }

  deleteArticle() {
    if(this.article.idArticle) this.articleService.deleteArticle(this.article.idArticle).subscribe();
    let el: HTMLElement = this.mycloseButton.nativeElement;
    el.click();
  }
}
