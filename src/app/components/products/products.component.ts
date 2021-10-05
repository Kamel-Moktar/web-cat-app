import {Component, OnInit} from '@angular/core';
import {ProductsService} from "../../servises/products.service";
import {Product} from "../../modeles/porduct.model";
import {Observable, of} from "rxjs";
import {AppDataStat, DataStatEnum} from "../../stat/product.stat";
import {catchError, map, startWith} from "rxjs/operators";
import {Router} from "@angular/router";



@Component({
  selector: 'app-products',
  templateUrl:'./products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products$ : Observable<AppDataStat<Product[]>>|null=null;
  readonly DataStatEnum=DataStatEnum;
  constructor(private productsService : ProductsService, private router :Router) { }


  ngOnInit(): void {
  }

  onGetAllProducts() {
   this.products$=this.productsService.getAllProduct().pipe(
     map(data=>({dataStat:DataStatEnum.LOADED,data:data})),
     startWith({dataStat:DataStatEnum.LOADING}),
     catchError(err=>of({dataStat:DataStatEnum.ERROR, errorMessage :err.message}))
   );
  }

  onGetSelectedProducts() {
    this.products$=this.productsService.getSelectedProduct().pipe(
      map(data=>({dataStat:DataStatEnum.LOADED,data:data})),
      startWith({dataStat:DataStatEnum.LOADING}),
      catchError(err=>of({dataStat:DataStatEnum.ERROR, errorMessage :err.message}))
    );
  }

  onGetAvailableProducts() {
    this.products$=this.productsService.getAvailableProduct().pipe(
      map(data=>({dataStat:DataStatEnum.LOADED,data:data})),
      startWith({dataStat:DataStatEnum.LOADING}),
      catchError(err=>of({dataStat:DataStatEnum.ERROR, errorMessage :err.message}))
    );
  }

  OnSearch(value: any):void {
    this.products$=this.productsService.searchByName(value.keyword).pipe(
      map(data=>({dataStat:DataStatEnum.LOADED,data:data})),
      startWith({dataStat:DataStatEnum.LOADING}),
      catchError(err=>of({dataStat:DataStatEnum.ERROR, errorMessage :err.message}))
    );
  }

  onSelect(p:Product) {
    this.productsService.setSelect(p).subscribe(data=>{
      data.selected=p.selected
    });
  }

  onDelete(p: Product) {
    let v=confirm("voullez vous vraiment supprimer ce produit");
    if(v==true)
    this.productsService.deleteProduct(p).subscribe(data=>{ this.onGetAllProducts()});
  }

  OnNewProduct() {
    this.router.navigateByUrl("/newProduct");
  }

  onEdit(p: Product) {
    this.router.navigateByUrl("/editProduct/"+p.id);

  }
}
