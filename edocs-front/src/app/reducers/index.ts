
import { isDevMode } from '@angular/core';
import {routerReducer} from '@ngrx/router-store';
import { ActionReducer, ActionReducerMap, MetaReducer } from '@ngrx/store';
import { versionsReducer } from './versions/versions.reducer';
import { softwaresReducer } from './softwares/softwares.reducer';
import { functionnalitiesReducer } from './functionnalities/functionnalities.reducer';

export interface AppState { }

function debug(reducer : ActionReducer<any>) : ActionReducer<any> {
  return function(state, action) {
    console.groupCollapsed(action.type);
        console.log('state', state);
        console.log('action', action);
    console.groupEnd();
    return reducer(state, action);
  };
}

export const reducers: ActionReducerMap<AppState> = {
  router: routerReducer,
  softwares : softwaresReducer,
  versions : versionsReducer,
  functionnalities: functionnalitiesReducer
};

export const metaReducers: MetaReducer<AppState>[] =
  !isDevMode ? [ ] : [debug];