import {Component, OnInit} from '@angular/core';
import {ArticlesService} from "../../shared/services/articles.service";

@Component({
  selector: 'conduit-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit{

  constructor(private readonly articlesService:ArticlesService) {
  }

  ngOnInit(){
    this.articlesService.getArticles().subscribe({next: response => console.log(response), error: error => console.log(error)});
  }
}
