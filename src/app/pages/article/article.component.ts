import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'conduit-article',
  standalone: true,
  imports: [],
  templateUrl: './article.component.html',
  styleUrl: './article.component.scss'
})
export class ArticleComponent implements OnInit{
  constructor(private readonly route: ActivatedRoute) {
  }

  ngOnInit(){
    console.log(this.route.snapshot.params['slug']);
  }
}
