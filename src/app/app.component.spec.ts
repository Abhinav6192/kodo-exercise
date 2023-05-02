import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DataService } from './data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { of } from 'rxjs';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent
  let activatedRoute: ActivatedRoute;
  let dataServiceSpy: DataService
  let router: Router;
  beforeEach(async () => {
    dataServiceSpy = jasmine.createSpyObj(DataService, ['getData'])
    await TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
      imports: [HttpClientTestingModule, FormsModule],
      providers: [
      DataService, 
      { provide: ActivatedRoute, useValue: activatedRoute }
    ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    activatedRoute = new ActivatedRoute();
    dataServiceSpy = TestBed.inject(DataService);
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });
  
  it('should sort the data by name', () => {
    component.searchedData = [
      {
        "name": "Customer Assurance Liaison",
        "image": "http://lorempixel.com/640/480",
        "description": "Vel voluptatem id repudiandae aut omnis. Deleniti tempore aliquam quia magnam eos. Sunt saepe nisi delectus.",
        "dateLastEdited": "2018-05-19T12:33:25.545Z"
      },
      {
        "name": "Dynamic Infrastructure Designer",
        "image": "http://lorempixel.com/640/480",
        "description": "Quaerat in rerum. Possimus reprehenderit provident ea voluptatem qui et enim. Ducimus ea soluta esse modi quia.",
        "dateLastEdited": "2017-11-28T04:59:13.759Z"
      },
      {
        "name": "Regional Configuration Designer",
        "image": "http://lorempixel.com/640/480",
        "description": "Rerum voluptatibus deleniti. Et quo ea magnam quisquam aliquam sequi sed praesentium. Similique est maiores. Tempora sed ad dolores error deserunt possimus sed perferendis molestiae. Doloribus fuga velit ipsum voluptatem ut ducimus.",
        "dateLastEdited": "2018-07-27T21:33:53.485Z"
      },
      {
        "name": "District Metrics Executive",
        "image": "http://lorempixel.com/640/480",
        "description": "Odit repudiandae et nemo voluptas quae. Voluptatibus inventore iure deserunt aliquid qui esse. Impedit molestias ea sed. Neque perspiciatis excepturi odit. Quibusdam facere dolor. Adipisci recusandae recusandae.",
        "dateLastEdited": "2018-07-14T21:01:42.717Z"
      }];
    component.sortBy = "name";
    component.sortData();
    expect(component.searchedData[3]?.name).toEqual('Regional Configuration Designer');
  });

  it('should sort the data by last edited date', () => {
    component.searchedData = [
      {
        "name": "Customer Assurance Liaison",
        "image": "http://lorempixel.com/640/480",
        "description": "Vel voluptatem id repudiandae aut omnis. Deleniti tempore aliquam quia magnam eos. Sunt saepe nisi delectus.",
        "dateLastEdited": "2018-05-19T12:33:25.545Z"
      },
      {
        "name": "Dynamic Infrastructure Designer",
        "image": "http://lorempixel.com/640/480",
        "description": "Quaerat in rerum. Possimus reprehenderit provident ea voluptatem qui et enim. Ducimus ea soluta esse modi quia.",
        "dateLastEdited": "2017-11-28T04:59:13.759Z"
      },
      {
        "name": "Regional Configuration Designer",
        "image": "http://lorempixel.com/640/480",
        "description": "Rerum voluptatibus deleniti. Et quo ea magnam quisquam aliquam sequi sed praesentium. Similique est maiores. Tempora sed ad dolores error deserunt possimus sed perferendis molestiae. Doloribus fuga velit ipsum voluptatem ut ducimus.",
        "dateLastEdited": "2018-07-27T21:33:53.485Z"
      },
      {
        "name": "District Metrics Executive",
        "image": "http://lorempixel.com/640/480",
        "description": "Odit repudiandae et nemo voluptas quae. Voluptatibus inventore iure deserunt aliquid qui esse. Impedit molestias ea sed. Neque perspiciatis excepturi odit. Quibusdam facere dolor. Adipisci recusandae recusandae.",
        "dateLastEdited": "2018-07-14T21:01:42.717Z"
      }];
    component.sortBy = "date last edited";
    component.sortData();
    expect(component.searchedData[3]?.name).toEqual('Regional Configuration Designer');
  });

  it('should search the data', () => {
    component.allData = [
      {
        "name": "Customer Assurance Liaison",
        "image": "http://lorempixel.com/640/480",
        "description": "Vel voluptatem id repudiandae aut omnis. Deleniti tempore aliquam quia magnam eos. Sunt saepe nisi delectus.",
        "dateLastEdited": "2018-05-19T12:33:25.545Z"
      },
      {
        "name": "Dynamic Infrastructure Designer",
        "image": "http://lorempixel.com/640/480",
        "description": "Quaerat in rerum. Possimus reprehenderit provident ea voluptatem qui et enim. Ducimus ea soluta esse modi quia.",
        "dateLastEdited": "2017-11-28T04:59:13.759Z"
      },
      {
        "name": "Regional Configuration Designer",
        "image": "http://lorempixel.com/640/480",
        "description": "Rerum voluptatibus deleniti. Et quo ea magnam quisquam aliquam sequi sed praesentium. Similique est maiores. Tempora sed ad dolores error deserunt possimus sed perferendis molestiae. Doloribus fuga velit ipsum voluptatem ut ducimus.",
        "dateLastEdited": "2018-07-27T21:33:53.485Z"
      },
      {
        "name": "District Metrics Executive",
        "image": "http://lorempixel.com/640/480",
        "description": "Odit repudiandae et nemo voluptas quae. Voluptatibus inventore iure deserunt aliquid qui esse. Impedit molestias ea sed. Neque perspiciatis excepturi odit. Quibusdam facere dolor. Adipisci recusandae recusandae.",
        "dateLastEdited": "2018-07-14T21:01:42.717Z"
      }];
    component.searchText = "Dynamic Designer";
    component.searchData();
    expect(component.searchedData?.length).toEqual(1);
    expect(component.page).toEqual(1);
    expect(component.totalPages).toEqual(0);
  });

  it('should search the data exactly', () => {
    component.allData = [
      {
        "name": "Customer Assurance Liaison",
        "image": "http://lorempixel.com/640/480",
        "description": "Vel voluptatem id repudiandae aut omnis. Deleniti tempore aliquam quia magnam eos. Sunt saepe nisi delectus.",
        "dateLastEdited": "2018-05-19T12:33:25.545Z"
      },
      {
        "name": "Dynamic Infrastructure Designer",
        "image": "http://lorempixel.com/640/480",
        "description": "Quaerat in rerum. Possimus reprehenderit provident ea voluptatem qui et enim. Ducimus ea soluta esse modi quia.",
        "dateLastEdited": "2017-11-28T04:59:13.759Z"
      },
      {
        "name": "Regional Configuration Designer",
        "image": "http://lorempixel.com/640/480",
        "description": "Rerum voluptatibus deleniti. Et quo ea magnam quisquam aliquam sequi sed praesentium. Similique est maiores. Tempora sed ad dolores error deserunt possimus sed perferendis molestiae. Doloribus fuga velit ipsum voluptatem ut ducimus.",
        "dateLastEdited": "2018-07-27T21:33:53.485Z"
      },
      {
        "name": "District Metrics Executive",
        "image": "http://lorempixel.com/640/480",
        "description": "Odit repudiandae et nemo voluptas quae. Voluptatibus inventore iure deserunt aliquid qui esse. Impedit molestias ea sed. Neque perspiciatis excepturi odit. Quibusdam facere dolor. Adipisci recusandae recusandae.",
        "dateLastEdited": "2018-07-14T21:01:42.717Z"
      }];
    component.searchText = '"Dynamic Designer"';
    component.searchData();
    expect(component.searchedData?.length).toEqual(0);
    expect(component.page).toEqual(0);
    expect(component.totalPages).toEqual(0);
  });

  it('left button is clicked and page number is decreased', () => {
    component.page = 4;
    component.left();
    fixture.detectChanges();
    expect(component.page).toEqual(3);
    expect(component.startIndex).toEqual(20);
    expect(component.endIndex).toEqual(30);
  });

  it('right button is clicked and page number is increased', () => {
    component.page = 4;
    component.right();
    fixture.detectChanges();
    expect(component.page).toEqual(5);
    expect(component.startIndex).toEqual(40);
    expect(component.endIndex).toEqual(50);
  });

  it('no action on right button click', () => {
    component.page = 4;
    component.totalPages = 4;
    component.right();
    fixture.detectChanges();
    expect(component.page).toEqual(4);
  });

  it('no action on left button click', () => {
    component.page = 1;
    component.left();
    fixture.detectChanges();
    expect(component.page).toEqual(1);
  });
});
