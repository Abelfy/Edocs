import { createFeatureSelector, createSelector } from "@ngrx/store";
import { FunctionnalityState } from "./functionnalities.reducer";

const featureSelector = createFeatureSelector<FunctionnalityState>('functionnalities');

export const selectFunctionnalities = createSelector(
    featureSelector,
    (state: FunctionnalityState) => state.functionnalities
)

export const selectFunctionnalitiesHasLoaded = createSelector(
    featureSelector,
    (state: FunctionnalityState) => state.hasLoaded
)