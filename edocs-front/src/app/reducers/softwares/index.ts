import { createFeatureSelector, createSelector } from "@ngrx/store";
import { SoftwareState } from "./softwares.reducer";

const featureSelector = createFeatureSelector<SoftwareState>('softwares');

export const selectSoftwares = createSelector(
    featureSelector,
    (state: SoftwareState) => state.softwares
)