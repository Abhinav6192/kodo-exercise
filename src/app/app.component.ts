import { Component, OnInit } from '@angular/core';
import { DataService } from './data.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  allData: any;
  searchText: string = '';
  sortBy: string = '';
  searchedData: any[] = [];
  showGridView: boolean = true;
  totalPages: number = 0;
  page: number = 0;
  startIndex: number = 0;
  endIndex: number = 0;

  constructor(private dataService: DataService, private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.dataService.getData().subscribe(result => {
      this.route.queryParams.subscribe(param => {
        this.sortBy = param['sortBy'] || '';
        this.searchText = param['searchText'] || '';
      });
      this.allData = result;
      this.searchedData = this.allData;
      this.page = 1;
      this.startIndex = 0;
      this.endIndex = this.page * 10;
      this.totalPages = Math.round(this.searchedData.length/10);
      if (this.sortBy) {
        this.sortData();
      }
      if (this.searchText) {
        this.searchData();
      }
    });
  }

  searchData() {
    const length = this.searchText.length;
    this.searchedData = this.allData;
    if (this.searchText[0] === '"' && this.searchText[length-1] === '"') {
      this.searchedData = this.searchedData.filter((item: any) => item.name.includes(this.searchText) || item.description.includes(this.searchText));
    } else {
      const searchedValues = this.searchText.split(' ');
      let searchResults = this.searchedData;
      for (let item = 0; item < searchedValues.length; item++) {
        searchResults = searchResults.filter((val: any) => val.name.includes(searchedValues[item]) || val.description.includes(searchedValues[item]));
      }
      this.searchedData = searchResults;
    }
    if (this.searchedData.length > 0) {
      this.page = 1;
      this.totalPages = Math.round(this.searchedData.length/10);
    }
    this.router.navigate(['/home'], {
      relativeTo: this.route,
      queryParams: {
        searchText: this.searchText
      },
      queryParamsHandling: 'merge',
    });
  }

  sortData() {
    if (this.sortBy === 'name') {
      this.searchedData.sort((item1: any, item2: any) => {
        return item1.name > item2.name ? 1 : -1;
      });
    } else {
      this.searchedData.sort((item1: any, item2: any) => {
        const date1 = new Date(item1.dateLastEdited);
        const date2 = new Date(item2.dateLastEdited);
        return date1 > date2 ? 1 : -1;
      });
    }
    this.router.navigate(['/home'], {
      relativeTo: this.route,
      queryParams: {
        sortBy: this.sortBy
      },
      queryParamsHandling: 'merge',
    });
  }

  left () {
    if (this.page === 1) {
      return;
    } else {
      this.page--;
      this.startIndex = (this.page - 1)*10;
      this.endIndex = this.page * 10;
    }
  }

  right () {
    if (this.page === this.totalPages) {
      return;
    } else {
      this.page++;
      this.startIndex = (this.page - 1)*10;
      this.endIndex = this.page * 10;
    }
  }
}
