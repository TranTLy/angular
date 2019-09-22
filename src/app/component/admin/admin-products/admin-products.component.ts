import { ProductService } from '../../../services/product/product.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import Product from 'src/app/models/product';
import { DataTableResource } from 'angular5-data-table';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.scss']
})
export class AdminProductsComponent implements OnInit, OnDestroy {
  products: Product[];
  subscription: Subscription;
  items: Product[] = [];
  itemCount: number;
  tableResource: DataTableResource<Product>;


  constructor(private productService: ProductService) {
    this.subscription = productService.getAll<Product>().subscribe(products => {
      this.products = products;
      this.initializeTable(this.products);
    });
  }

  private initializeTable(products: Product[]) {
    this.tableResource = new DataTableResource(products);
    this.tableResource.query({ offset: 0 })
      .then(items => this.items = items);
    this.tableResource.count()
      .then(count => this.itemCount = count);
  }

  reloadItems(param) {
    if (this.tableResource) {
      this.tableResource.query({ offset: param })
        .then(items => this.items = items);
      this.tableResource.count()
        .then(count => this.itemCount = count);
    }
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  filter(query: string) {
    // console.log('query: ' + query);
    const filterProducts = query ? this.products.filter(item =>
      item.title.trim().toLowerCase().includes(query.trim().toLowerCase()))
      : this.products;
    this.initializeTable(filterProducts);
  }

  ngOnInit() {
  }
}
