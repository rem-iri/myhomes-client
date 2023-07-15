import { Component } from '@angular/core';
import { NewsService } from 'src/app/service/news.service';

@Component({
  selector: 'app-real-estate-news',
  templateUrl: './real-estate-news.component.html',
  styleUrls: ['./real-estate-news.component.scss']
})
export class RealEstateNewsComponent {
  newsItems: any[];
  displayedNewsItems: any[];
  currentPage: number;
  maxPage: number;

  constructor(private newsService: NewsService) {
    this.newsItems = [];
    this.displayedNewsItems = [];
    this.currentPage = 0;
    this.maxPage = 0;
  }

  ngOnInit() {
    this.newsService.getNews().subscribe((data: any) => {
      this.newsItems = data.articles;
      this.maxPage = Math.ceil(this.newsItems.length / 5) - 1;
      this.displayedNewsItems = this.getNewsItemsForPage(this.currentPage);
    });
  }

  nextPage() {
    if (this.currentPage < this.maxPage) {
      this.currentPage++;
      this.displayedNewsItems = this.getNewsItemsForPage(this.currentPage);
    }
  }

  prevPage() {
    if (this.currentPage > 0) {
      this.currentPage--;
      this.displayedNewsItems = this.getNewsItemsForPage(this.currentPage);
    }
  }

  getNewsItemsForPage(page: number) {
    const startIndex = page * 5;
    const endIndex = startIndex + 5;
    return this.newsItems.slice(startIndex, endIndex);
  }
}
