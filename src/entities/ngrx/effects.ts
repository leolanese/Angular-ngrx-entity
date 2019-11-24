import { Injectable } from '@angular/core';
import { ofAction } from 'ngrx-actions';
import { Store } from '@ngrx/store';
import * as heroActions from './actions';
import { map, switchMap, catchError } from 'rxjs/operators';
import { NameService } from '../../app/name.service';
import { MessageService } from '../../app/message.service';
import { Actions, createEffect, ofType, Effect } from '@ngrx/effects';
import { Name } from '../../entities/ngrx/name';

@Injectable()
export class NameEffects {
  constructor(
    private store: Store<any>,
    private update$: Actions,
    private nameService: NameService,
    private messageService: MessageService) {}

@Effect()
addHero$ = this.update$.pipe(
  ofAction(heroActions.AddHero),
  switchMap(hero => this.nameService.addHero(hero.payload)),
  map(response => {
    this.messageService.add("Adding name to the store.");
    return new heroActions.AddHeroSuccess(response);
    },
  catchError(error => error.subscribe().switchMap(error =>{
    console.log(error)
  }))));

@Effect()
getHeroes$ = this.update$.pipe(
  ofAction(heroActions.GetHeroes),
  switchMap(hero => this.nameService.getHeroes()),
  map(response => {
    this.messageService.add("Populating store with heroes.");
    return new heroActions.GetHeroesSuccess(response);
    }));

@Effect()
updateHero$ = this.update$.pipe(
  ofAction(heroActions.UpdateHero),
  switchMap(hero => this.nameService.updateHero(hero.payload)),
  map(response => {
    this.messageService.add("Updating hero in the store.");
    return new heroActions.UpdateHeroSuccess(response);
    }));

@Effect()
deleteHero$ = this.update$.pipe(
  ofAction(heroActions.DeleteHero),
  switchMap(hero => this.nameService.deleteHero(hero.payload)),
  map(response => {
    this.messageService.add("Deleting hero in the store.");
    return new heroActions.DeleteHeroSuccess(response);
    }));

@Effect()
deleteAllNames$ = this.update$.pipe(
  ofAction(heroActions.DeleteAllNames),
  switchMap(hero => this.nameService.deleteAllNames()),
  map(response => {
    this.messageService.add("Deleting all names in the store.");
    return new heroActions.DeleteHeroSuccess(response);
    }));

@Effect()
editAllNames$ = this.update$.pipe(
  ofAction(heroActions.EditAllNames),
  switchMap(name => this.nameService.editAllNames(name)),
  map(response => {
    this.messageService.add("Editing all names in the store.");
    return new heroActions.UpdateHeroSuccess(response);
    }));

}
