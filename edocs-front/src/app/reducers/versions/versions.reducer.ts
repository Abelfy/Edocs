import { createReducer, on } from "@ngrx/store";
import { fetchVersions, fetchVersionsSuccess } from "./versions.actions";

export interface VersionsState {
    versions: any[];
    isLoading: boolean;
    hasLoaded: boolean;
}

export const initialState: VersionsState = {
    versions: [],
    isLoading: false,
    hasLoaded: false
};

export const versionsReducer = createReducer(initialState,
    on(fetchVersions,(state) => ({ ...state, isLoading: true })),
    on(fetchVersionsSuccess,(state, { versions }) => ({ ...state, versions, isLoading: false, hasLoaded: true}))
)

export function reducer(state: VersionsState = initialState, action: any): VersionsState {
    return versionsReducer(state, action);
}