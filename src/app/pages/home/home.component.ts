import { Component, OnInit } from '@angular/core';
import { ArticlesService } from '../../shared/services/articles.service';
import { ArticlePreviewComponent } from '../../shared/ui/article-preview/article-preview.component';
import { PaginationComponent } from '../../shared/ui/pagination/pagination.component';
import { tap } from 'rxjs';
import { ArticleListComponent } from '../../shared/ui/article-list/article-list.component';
import { PopularTagsComponent } from './popular-tags/popular-tags.component';
import { TagsService } from '../../shared/services/tags.service';
import { TabNavBarItem } from '../../shared/interfaces/tab-nav-bar.interface';
import { TabNavBarComponent } from '../../shared/ui/tab-nav-bar/tab-nav-bar.component';
import { TabNavBarType } from '../../shared/enums/tab-nav-bar-type.enum';
import { ArticlesBaseComponent } from '../../shared/components/articles-base/articles-base.component';

@Component({
  selector: 'conduit-home',
  standalone: true,
  imports: [
    ArticlePreviewComponent,
    PaginationComponent,
    ArticleListComponent,
    PopularTagsComponent,
    TabNavBarComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent extends ArticlesBaseComponent implements OnInit {
  loadingTags = false;

  tagsResponse: string[] = [];

  tabNavbarItems: TabNavBarItem[] = [
    {
      type: TabNavBarType.GLOBALFEED,
      label: 'Global Feed',
      active: true,
    },
  ];

  constructor(
    protected override articlesService: ArticlesService,
    private readonly tagsService: TagsService
  ) {
    super(articlesService);
  }

  ngOnInit() {
    this.loadArticles(this.filters);
    this.loadTags();
  }

  loadArticlesByTag(tag: string) {
    this.updateTabNavBar({ type: TabNavBarType.TAG, label: tag, active: true });
    this.loadArticles({ offset: 0, tag });
  }

  tabNavbarItemSelected(tabNavBarItem: TabNavBarItem) {
    const tabNavBarItemIndex = this.tabNavbarItems.findIndex(
      (item) => item.label == tabNavBarItem.label
    );

    if (tabNavBarItemIndex > -1)
      this.tabNavbarItems[tabNavBarItemIndex].active = true;
    if (tabNavBarItem.type !== TabNavBarType.TAG) {
      this.loadArticles({
        offset: 0,
      });
      this.removeTagFromTabNavBar();
    }
  }

  private loadTags() {
    this.tagsService
      .getTags()
      .pipe(
        tap({
          subscribe: () => (this.loadingTags = true),
          finalize: () => (this.loadingTags = false),
        })
      )
      .subscribe({
        next: (response) => {
          this.tagsResponse = response;
        },
        error: (error) => console.log(error),
      });
  }

  private removeTagFromTabNavBar() {
    const tagIndex = this.getTabNavBarTagIndex();
    if (tagIndex > -1) this.tabNavbarItems.splice(tagIndex, 1);
  }

  private updateTabNavBar(item: TabNavBarItem) {
    const tagIndex = this.getTabNavBarTagIndex();
    this.tabNavbarItems.map((item) => (item.active = false));
    if (tagIndex === -1) {
      this.tabNavbarItems.push({
        label: this.getTabNavBarTagLabel(item.label),
        type: TabNavBarType.TAG,
        active: true,
      });
    } else {
      this.tabNavbarItems[tagIndex] = {
        ...this.tabNavbarItems[tagIndex],
        label: this.getTabNavBarTagLabel(item.label),
        active: true,
      };
    }
  }

  private getTabNavBarTagIndex(): number {
    return this.tabNavbarItems.findIndex(
      (item) => item.type === TabNavBarType.TAG
    );
  }

  private getTabNavBarTagLabel(label: string): string {
    return '#' + label;
  }
}
