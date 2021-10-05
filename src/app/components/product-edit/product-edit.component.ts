import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ProductsService} from "../../servises/products.service";
import {ProductValidators} from "../../stat/product.stat";
import {Product} from "../../modeles/porduct.model";
import {ActivatedRoute, Router} from "@angular/router";


@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit {
  productFormGroup:FormGroup=this.fb.group({
                                              name :["",Validators.required],
    });
  productId : number;
  submitted:boolean=false;
  nameFocused:boolean=true;
  priceFocused:boolean=true;
  quantityFocused:boolean=true;

  constructor(private fb: FormBuilder,private productService:ProductsService,private router:Router,private activatroute: ActivatedRoute) {
    this.productId=activatroute.snapshot.params.id;
  }

  ngOnInit(): void {
    this.productService.getProduct(this.productId).subscribe(product=>{
    this.productFormGroup = this.fb.group({
    id:[product.id],
    name:[product.name, ProductValidators.NAME_VALIDATOR],
    price:[product.price, ProductValidators.PRICE_VALIDATOR],
    quantity:[product.quantity, ProductValidators.QUANTITY_VALIDATOR],
    selected:[product.selected, ProductValidators.SELECTED_VALIDATOR],
    available:[product.available, ProductValidators.AVAILABLE_VALIDATOR],
  })
    });
  }

  onNameFocusOut() {
    this.nameFocused=false;
  }

  onNameFocus() {
    this.nameFocused=true;
  }


  onPriceFocusOut() {
    this.priceFocused=false;
  }

  onPriceFocus() {
    this.priceFocused=true;
  }
  onQuantityFocusOut() {
    this.quantityFocused=false;
  }

  onQuantityFocus() {
    this.quantityFocused=true;
  }

  onEditProduct(p:Product) {
    this.submitted=true;

    if (this.productFormGroup.invalid) return;
    this.productService.editProduct(p).subscribe(data=>{
      this.router.navigateByUrl("/products");
    })

  }

}
