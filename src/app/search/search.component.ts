import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { of } from 'rxjs/observable/of';

import {
   debounceTime, distinctUntilChanged, switchMap
 } from 'rxjs/operators';

import { Name } from '../../entities/ngrx/name';
import { NameService } from '../name.service';
import { Store } from '@ngrx/store';
import { selectAllHeroes } from '../../entities/ngrx/reducer';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: [ './search.component.css' ]
})
export class SearchComponent implements OnInit {
  heroes$: Observable<Name[]>;

  private searchTerms = new Subject<string>();

  constructor(private nameService: NameService, private store:Store<any>) {}

  public search(term: string): void {
    this.searchTerms.next(term);
  }

  public searchStore(term){
    var filteredHeroes: Name[];
    this.store.select(selectAllHeroes).subscribe(names => {
      filteredHeroes = names.filter(hero=>hero.name.toLowerCase().indexOf(term.toLowerCase()) != -1);
      });

    return of(filteredHeroes);
  }

  ngOnInit(): void {
    this.heroes$ = this.searchTerms.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((term: string) => this.searchStore(term)),
    );
  }
}
