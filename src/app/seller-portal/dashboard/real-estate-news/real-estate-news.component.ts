import { Component } from '@angular/core';
import { NewsService } from 'src/app/service/news.service';

@Component({
  selector: 'app-real-estate-news',
  templateUrl: './real-estate-news.component.html',
  styleUrls: ['./real-estate-news.component.scss']
})
export class RealEstateNewsComponent {
  newsItems: any[];
  constructor(private newsService: NewsService) { }
  ngOnInit() {
    this.newsService.getNews().subscribe((data: any) => {
      this.newsItems = data.articles; 
    });
  }

}



  


