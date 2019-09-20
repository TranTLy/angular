import { AngularFireDatabase } from 'angularfire2/database';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  constructor(private db: AngularFireDatabase) { }

  create(product) {
    this.db.list('/products').push(product);
  }

  update(id, product) {
    this.db.object('/products/' + id).update(product);
  }

  getAll() {
    return this.db.list('/products').snapshotChanges();
  }

  get(id) {
    return this.db.object('/products/' + id).valueChanges();
  }

  delete(id) {
    return this.db.object('/products/' + id).remove();
  }

}
