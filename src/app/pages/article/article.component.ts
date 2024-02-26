import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ArticlesService } from '../../shared/services/articles.service';

@Component({
  selector: 'conduit-article',
  standalone: true,
  imports: [],
  templateUrl: './article.component.html',
  styleUrl: './article.component.scss',
})
export class ArticleComponent implements OnInit {
  constructor(
    private readonly route: ActivatedRoute,
    private readonly articlesService: ArticlesService
  ) {}

  ngOnInit() {
    this.articlesService
      .getArticle(this.route.snapshot.params['slug'])
      .subscribe({
        next: (response) => console.log(response),
        error: (error) => console.log(error),
      });
  }
}
