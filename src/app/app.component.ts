import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as heroActions from '../entities/ngrx/actions';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements  OnInit {
  header = 'Header';
  footer = 'Footer';
  loading$: Observable<boolean>;

  constructor(private store: Store<any>){

  }

  ngOnInit(){
    this.store.dispatch(new heroActions.GetHeroes);
  }
}
