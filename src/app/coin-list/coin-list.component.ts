import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiService } from '../service/api.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { CurrencyService } from '../service/currency.service';
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-coin-list',
  templateUrl: './coin-list.component.html',
  styleUrls: ['./coin-list.component.scss']
})
export class CoinListComponent implements OnInit {

  customOptions: OwlOptions = {
  loop: true,
  touchDrag: false,
  rtl:true,
  autoplay:true,
  autoplayTimeout:1700,
  autoplayHoverPause:true,
  margin:10,
  dots:false,
  dotsData:false,
 
    responsive: {
      0: {
        items: 2
      },
      400: {
        items: 3
      },
      740: {
        items: 4
      },
      940: {
        items: 8
      }
    },
    nav: false
  }

  bannerData :any =[];
  currency : string = "INR";
  dataSource!: MatTableDataSource<any>;
  displayedColumns: string[] = ['symbol', 'current_price', 'price_change_percentage_24h', 'market_cap'];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private api:ApiService ,private router:Router ,private currencyService:CurrencyService ){}

  ngOnInit(): void {
    this.getAllData();
    this.getBannerData();
    this.currencyService.getCurrency()
    .subscribe(val=>{
      this.currency = val;
      this.getAllData();
      this.getBannerData();
    })
  }
 
  getBannerData(){
    this.api.getTrendingCurrency("INR").subscribe(res=>{
         console.log(res);
         this.bannerData=res;
    });
  }

  getAllData(){
    this.api.getCurrency("INR").subscribe(res=>{
         console.log(res);
         this.dataSource=new MatTableDataSource(res);
         this.dataSource.paginator = this.paginator;
         this.dataSource.sort = this.sort;
    });
  }
  
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  gotoDetails(row: any) {
    this.router.navigate(['coin-detail',row.id])
  }
}
