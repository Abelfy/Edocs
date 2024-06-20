import { createAction, props } from "@ngrx/store";

export const fetchVersions = createAction('[Versions] Fetch Versions');

export const fetchVersionsSuccess = createAction('[Versions] Fetch Versions Success', props<{ versions: any[] }>());

export const versionsFailure = createAction('[Versions] Fetch Versions Failure', props<{ error: any }>());