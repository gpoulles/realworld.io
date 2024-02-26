import { Component, OnInit } from '@angular/core';
import { ArticlesService } from '../../shared/services/articles.service';
import { Article } from '../../shared/interfaces/article.interface';
import { ArticlePreviewComponent } from '../../shared/ui/article-preview/article-preview.component';

@Component({
  selector: 'conduit-home',
  standalone: true,
  imports: [ArticlePreviewComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  constructor(private readonly articlesService: ArticlesService) {}

  articles: Article[] = [];
  articlesCount: number = 0;
  ngOnInit() {
    this.articlesService.getArticles().subscribe({
      next: (response) => {
        this.articlesCount = response.articlesCount;
        this.articles = response.articles;
      },
      error: (error) => console.log(error),
    });
  }
}
