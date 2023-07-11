import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-properties-list',
  templateUrl: './properties-list.component.html',
  styleUrls: ['./properties-list.component.scss']
})
export class PropertiesListComponent {
  @Input() properties: any[];
  @Input() pageSize: number;
  @Output() nextPage: EventEmitter<void> = new EventEmitter<void>();
  
  get showNextPageButton(): boolean {
    return this.properties.length > this.pageSize;
  }
  
  loadNextPage(): void {
    this.nextPage.emit();
  }

}
