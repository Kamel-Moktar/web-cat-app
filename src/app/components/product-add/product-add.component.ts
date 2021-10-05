import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {validateAndRewriteCoreSymbol} from "@angular/compiler-cli/src/ngtsc/imports";
import {ProductsService} from "../../servises/products.service";
import {Router} from "@angular/router";
import {Product} from "../../modeles/porduct.model";
import {ProductValidators} from "../../stat/product.stat";



@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.css']
})
export class ProductAddComponent implements OnInit {
  productFormGroup:FormGroup =this.fb.group({
    name :["",Validators.required],
  });
  submitted:boolean=false;
  nameFocused:boolean=true;
  priceFocused:boolean=true;
  quantityFocused:boolean=true;
  constructor(private fb:FormBuilder,private productsService : ProductsService, private router :Router) { }

  ngOnInit(): void {
    this.productFormGroup = this.fb.group({
      name: ["", ProductValidators.NAME_VALIDATOR],
      price: [0, ProductValidators.PRICE_VALIDATOR],
      quantity: [0, ProductValidators.QUANTITY_VALIDATOR],
      selected: [true, ProductValidators.SELECTED_VALIDATOR],
      available: [true, ProductValidators.AVAILABLE_VALIDATOR]
    })
  }
  onNewProduct(p:Product) {
    this.submitted=true;

    if (this.productFormGroup.invalid) return;
    this.productsService.addProduct(p).subscribe(data=>{

      this.router.navigateByUrl("/products").then();
    })

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



}
