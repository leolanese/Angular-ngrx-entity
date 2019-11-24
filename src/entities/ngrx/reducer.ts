import { createEntityAdapter, EntityState, EntityAdapter } from '@ngrx/entity';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Name } from './name';
import * as nameActions from './actions';

import { Observable } from 'rxjs/Observable';

export interface HeroState extends EntityState<Name> {
  selectedHeroId: number | null;
 }

const heroAdapter = createEntityAdapter<Name>({
    selectId: (hero: Name) => hero.id
});

const heroInitialState: HeroState = heroAdapter.getInitialState({
    selectedHeroId: null
});

export function heroReducer(
  state: HeroState = heroInitialState,
  action
) {
  console.log(action.type);
  /**
   * using Adapter Collection Methods
   */
  switch (action.type) {
    case nameActions.ADD_NAME_SUCCESS:
      return heroAdapter.addOne(action.payload, state);
    case nameActions.GET_NAMES_SUCCESS:
      return heroAdapter.addAll(action.payload, state);
    case nameActions.UPDATE_NAME_SUCCESS:
      return heroAdapter.updateOne(action.payload, state);
    case nameActions.DELETE_NAME_SUCCESS:      
      return heroAdapter.removeOne(action.payload, state);
    case nameActions.SELECT_NAME:
      return state.selectedHeroId = action.payload;
    case nameActions.DELETE_ALL_NAMES:
      return heroAdapter.removeAll(action.payload);
    case nameActions.EDIT_ALL_NAMES:
      return heroAdapter.updateMany(action.payload, state);

    default:
      return state;
  }
}

export const selectHeroState = createFeatureSelector<HeroState>('heroes');

export const { selectAll: selectAllHeroes, selectIds } = heroAdapter.getSelectors(
  selectHeroState
);

export const getSelectedHero = createSelector(
    selectHeroState,
    (state) => {
      return state.entities[state.selectedHeroId];
    }
)
