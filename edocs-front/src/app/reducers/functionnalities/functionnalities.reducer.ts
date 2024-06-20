import { createReducer, on } from "@ngrx/store";
import { fetchFunctionnalities, fetchFunctionnalitiesSuccess } from "./functionnalities.actions";

export interface FunctionnalityState {
    functionnalities: any[];
    isLoading: boolean;
    hasLoaded: boolean;

}

export const initialState: FunctionnalityState = {
    functionnalities: [],
    isLoading: false,
    hasLoaded: false
};

export const functionnalitiesReducer = createReducer(
    initialState,
    on(fetchFunctionnalities,(state) => ({ ...state, isLoading: true })),
    on(fetchFunctionnalitiesSuccess,(state, { functionnalities }) => ({ ...state, functionnalities , isLoading: false, hasLoaded: true}))
)

export function reducer(state: FunctionnalityState = initialState, action: any): FunctionnalityState {
    return functionnalitiesReducer(state, action);
}