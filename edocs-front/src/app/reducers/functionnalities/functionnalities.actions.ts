import { createAction, props } from "@ngrx/store";

export const fetchFunctionnalities = createAction('[Functionnalities] Fetch Functionnalitiess');

export const fetchFunctionnalitiesSuccess = createAction('[Functionnalities] Fetch Functionnalitiess Success', props<{ functionnalities: any[] }>());

export const functionnalitiesFailure = createAction('[Functionnalities] Fetch Functionnalitiess Failure', props<{ error: any }>());