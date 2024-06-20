import { createFeatureSelector, createSelector } from "@ngrx/store";
import { VersionsState } from "./versions.reducer";

const featureSelector = createFeatureSelector<VersionsState>('versions');

export const selectVersions = createSelector(
    featureSelector,
    (state: VersionsState) => state.versions
);

export const selectVersionsHasLoaded = createSelector(
    featureSelector,
    (state: VersionsState) => state.hasLoaded
);