import { Name } from './name';
import { Injectable } from '@angular/core';
import { createEntityAdapter, EntityState } from '@ngrx/entity';
import { Action } from '@ngrx/store';

export const ADD_NAME = '[Names Test] ADD_NAME';
export const ADD_NAME_SUCCESS = '[Names Test] ADD_NAME_SUCCESS';

export const GET_NAMES = '[Names Test] GET_NAMES';
export const GET_NAMES_SUCCESS = '[Names Test] GET_NAMES_SUCCESS';

export const UPDATE_NAME = '[Names Test] UPDATE_NAME';
export const UPDATE_NAME_SUCCESS = '[Names Test] UPDATE_NAME_SUCCESS';

export const GET_NAME = '[Names Test] GET_NAME';
export const GET_NAME_SUCCESS = '[Names Test] GET_NAME_SUCCESS';

export const DELETE_NAME = '[Names Test] DELETE_NAME';
export const DELETE_NAME_SUCCESS = '[Names Test] DELETE_NAME_SUCCESS';

export const DELETE_ALL_NAMES = '[Names Test] DELETE_ALL_NAMES';
export const EDIT_ALL_NAMES = '[Names Test] EDIT_ALL_NAMES';

export const SELECT_NAME = '[Names Test] SELECT_NAME';

export class AddHero implements Action {
   readonly type = ADD_NAME;
   constructor(public payload: Name) {}
}
export class AddHeroSuccess implements Action  {
   readonly type = ADD_NAME_SUCCESS;
   constructor(public payload: Name) {}
}

export class GetHeroes implements Action {
   readonly type = GET_NAMES;
}
export class GetHeroesSuccess implements Action  {
   readonly type = GET_NAMES_SUCCESS;
   constructor(public payload: Name[]) {}
}

export class UpdateHero implements Action {
   readonly type = UPDATE_NAME;
   constructor(public payload: Name) {}
}

export class UpdateHeroSuccess implements Action  {
   readonly type = UPDATE_NAME_SUCCESS;
   constructor(public payload: Name) {}
}

export class DeleteHero implements Action {
   readonly type = DELETE_NAME;
   constructor(public payload: Name) {}
}
export class DeleteHeroSuccess implements Action  {
   readonly type = DELETE_NAME_SUCCESS;
   constructor(public payload: number) {}
}

export class DeleteAllNames implements Action {
   readonly type = DELETE_ALL_NAMES;
   constructor() {}
}
export class EditAllNames implements Action  {
   readonly type = EDIT_ALL_NAMES;
   constructor(public payload: Name) {}
}

export class SelectHero implements Action {
   readonly type = SELECT_NAME;
   constructor(public payload: number) {}
}