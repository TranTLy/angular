import { Injectable } from '@angular/core';
import * as firebase from 'firebase'
import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database';
import UserModel from './models/user.model';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private db: AngularFireDatabase) { }
  save(user: firebase.User) {
    this.db.object('/users/' + user.uid).update({
      name: user.displayName,
      email: user.email
    });
  }

  get(uid: string): AngularFireObject<UserModel> {
    return this.db.object('/users/' + uid);
  }
}
