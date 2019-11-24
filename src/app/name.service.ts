import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';

import { Name } from '../entities/ngrx/name';
import { MessageService } from './message.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class NameService {

  private heroesUrl = 'api/heroes';  // URL to web api

  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }

  /** GET heroes from the server */
  getHeroes (): Observable<Name[]> {
    return this.http.get<Name[]>(this.heroesUrl)
      .pipe(
        tap(heroes => this.log(`fetched heroes`)),
        catchError(this.handleError('getHeroes', []))
      );
  }

  /** GET hero by id. Return `undefined` when id not found */
  getHeroNo404<Data>(id: number): Observable<Name> {
    const url = `${this.heroesUrl}/?id=${id}`;
    return this.http.get<Name[]>(url)
      .pipe(
        map(heroes => heroes[0]), // returns a {0|1} element array
        tap(h => {
          const outcome = h ? `fetched` : `did not find`;
          this.log(`${outcome} hero id=${id}`);
        }),
        catchError(this.handleError<Name>(`getHero id=${id}`))
      );
  }

  /** GET hero by id. Will 404 if id not found */
  getHero(id: number): Observable<Name> {
    const url = `${this.heroesUrl}/${id}`;
    return this.http.get<Name>(url).pipe(
      tap(_ => this.log(`fetched hero id=${id}`)),
      catchError(this.handleError<Name>(`getHero id=${id}`))
    );
  }

  /* GET heroes whose name contains search term */
  searchHeroes(term: string): Observable<Name[]> {
    if (!term.trim()) {
      // if not search term, return empty hero array.
      return of([]);
    }
    return this.http.get<Name[]>(`api/heroes/?name=${term}`).pipe(
      tap(_ => this.log(`found heroes matching "${term}"`)),
      catchError(this.handleError<Name[]>('searchHeroes', []))
    );
  }

  //////// Save methods //////////

  /** POST: add a new hero to the server */
  addHero (name: Name): Observable<Name> {
    return this.http.post<Name>(this.heroesUrl, name, httpOptions).pipe(
      tap((name: Name) => this.log(`added hero w/ id=${name.id}`)),
      catchError(this.handleError<Name>('addName'))
    );
  }

  /** DELETE: delete the hero from the server */
  deleteHero (hero: Name): Observable<number> {
    const id = typeof hero === 'number' ? hero : hero.id;
    const url = `${this.heroesUrl}/${id}`;

    this.http.delete<Name>(url, httpOptions).pipe(
      tap(_ => this.log(`deleted hero id=${id}`)),
      catchError(this.handleError<Name>('deleteHero'))
    );

    return of(hero.id);
  }

  /** DELETE: delete all Names */
  deleteAllNames(): Observable<number> {
    const url = `${this.heroesUrl}`;

    this.http.delete<Name>(url, httpOptions).pipe(
      catchError(this.handleError<Name>('deleteHero'))
    );

    return of();
  }

  /** PUT: update the hero on the server */
  updateHero(hero: Name): Observable<any> {
    this.http.put(this.heroesUrl, hero, httpOptions).pipe(
      tap(_ => this.log(`updated hero id=${hero.id}`)),
      catchError(this.handleError<any>('updateName'))
    );
    return of(hero);
  }

    /** PUT: update the hero on the server */
  editAllNames(name): Observable<any> {
    this.http.put(this.heroesUrl, name, httpOptions).pipe(
      catchError(this.handleError<any>('updateName'))
    );
    return of(name);
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      this.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }

  /** Log a NameService message with the MessageService */
  private log(message: string) {
    this.messageService.add('NameService: ' + message);
  }
}
