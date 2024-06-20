import { createReducer, on } from "@ngrx/store";
import { fetchSoftwareSuccess } from "./softwares.actions";

export interface SoftwareState {
    softwares: any[];

}

export const initialState: SoftwareState = {
    softwares: []
};

export const softwaresReducer = createReducer(
    initialState,
    on(fetchSoftwareSuccess,(state, { softwares }) => ({ ...state, softwares }))
)

export function reducer(state: SoftwareState = initialState, action: any): SoftwareState {
    return softwaresReducer(state, action);
}