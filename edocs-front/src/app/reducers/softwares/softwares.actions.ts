import { createAction, props } from "@ngrx/store";

export const fetchSoftware = createAction('[Software] Fetch Softwares');

export const fetchSoftwareSuccess = createAction('[Software] Fetch Softwares Success', props<{ softwares: any[] }>());

export const softwareFailure = createAction('[Software] Fetch Softwares Failure', props<{ error: any }>());