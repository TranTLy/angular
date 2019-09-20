import { AngularFireDatabase } from 'angularfire2/database';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

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

  getAll<T>() {
    return this.db.list('/products').snapshotChanges()
      .pipe(map(product => product.map(a => (<T>{ key: a.key, ...a.payload.val() }))));
  }

  get(id) {
    return this.db.object('/products/' + id).valueChanges();
  }

  delete(id) {
    return this.db.object('/products/' + id).remove();
  }

}
