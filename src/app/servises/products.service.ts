import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {isObservable} from "rxjs/internal-compatibility";
import {Observable} from "rxjs";
import {Product} from "../modeles/porduct.model";

@Injectable({providedIn :"root"})
export class ProductsService{
  constructor(private  http:HttpClient) {
  }
   getAllProduct() : Observable<Product[]>{
    let host1=environment.host1;
    return this.http.get<Product[]>(host1+"/Products");
   }
  getSelectedProduct() : Observable<Product[]>{
    let host1=environment.host1;
    return this.http.get<Product[]>(host1+"/Products?selected=true");
  }

  getAvailableProduct() : Observable<Product[]>{
    let host1=environment.host1;
    return this.http.get<Product[]>(host1+"/Products?available=true");
  }

  searchByName(value: string) :Observable<Product[]>{
    let host1=environment.host1;
    return this.http.get<Product[]>(host1+"/Products?name_like="+value);
  }

  setSelect(p: Product) : Observable<Product> {
    let host1=environment.host1;
    p.selected=!p.selected;
    return this.http.put<Product>(host1+"/Products/"+p.id,p);


  }

  deleteProduct(p: Product): Observable <void>  {

    let host1=environment.host1;
    return this.http.delete<void>(host1+"/Products/"+p.id);


  }

  addProduct(p: Product) {
    let host1=environment.host1;
    return this.http.post<Product>(host1+"/Products",p);
  }

  editProduct(p: Product) {
    let host1=environment.host1;
    return this.http.put<Product>(host1+"/Products/"+p.id,p);
  }

  getProduct(productId: number) {
    let host1=environment.host1;
    return this.http.get<Product>(host1+"/Products/"+productId);
  }
}
