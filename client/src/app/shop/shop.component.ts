import { shopParams } from './../shared/models/shopParams';
import { ShopService } from './shop.service';
import { Product } from '../shared/models/product';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { brand } from '../shared/models/brand';
import { Type } from '../shared/models/type';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit{
  @ViewChild('search') searchTerm?:ElementRef;
  products:Product[]=[];
  brands:brand[]=[];
  types:Type[]=[];
  shopParams=new shopParams();
  sortOptions=[
    {name:'Alphabetical',value:'name'},
    {name:'Price: Low to High',value:'priceAsc'},
    {name:'Price: Hight to low',value:'priceDesc'},
  ];
  totalCount=0;
  constructor(private shopServiece:ShopService)
  {}
  ngOnInit(): void {
    this.getBrands();
    this.getProducts();
    this.getTypes();   
  }
  getProducts()
  {
    this.shopServiece.getProducts(this.shopParams).subscribe(
      {
        next:response=>{
          this.products=response.data;
          this.shopParams.pageNumber=response.pageIndex;
          this.shopParams.pageSize=response.pageSize;
          this.totalCount=response.count;
        },
        error:error=>console.log(error)
      }
     )
  }

  getBrands()
  {
    this.shopServiece.getBrands().subscribe(
      {
        next:response=>this.brands=[{id:0,name:'All'}, ...response],
        error:error=>console.log(error)
      }
     )
  }

  getTypes()
  {
    this.shopServiece.getTypes().subscribe(
      {
        next:response=>this.types=[{id:0,name:'All'}, ...response],
        error:error=>console.log(error)
      }
     )
  }
  onBrandSelected(brandId:number)
  {
    this.shopParams.brandId=brandId;
    this.shopParams.pageNumber=1;
    this.getProducts();
  }

  onTypeSelected(typeId:number)
  {
    this.shopParams.typeId=typeId;
    this.shopParams.pageNumber=1;
    this.getProducts();
  }
  onSortSelected(event:any)
  {
    this.shopParams.sort=event.target.value;
    this.getProducts();
  }

  onPageChanged(event:any)
  {
    if(this.shopParams.pageNumber!==event)
    {
      this.shopParams.pageNumber=event;
      this.getProducts();
    }
  }
  onSearch()
  {
   this.shopParams.search=this.searchTerm?.nativeElement.value;
   this.shopParams.pageNumber=1;
   this.getProducts();
  }
 onReset()
 {
  if(this.searchTerm) this.searchTerm.nativeElement.value='';
  this.shopParams=new shopParams();
  this.getProducts();
 }
}
