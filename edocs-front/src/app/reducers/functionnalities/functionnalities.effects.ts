import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { fetchFunctionnalities, fetchFunctionnalitiesSuccess, functionnalitiesFailure } from "./functionnalities.actions"
import { catchError, map, mergeMap, of, tap } from "rxjs";
import { Injectable } from "@angular/core";
import { FunctionnalitiesService } from "../../shared/services/functionnalities/functionnalities.service";

@Injectable()
export class FunctionnalityEffects {

    loadFunctionnalities$ = createEffect(() => this.actions$.pipe(
        ofType(fetchFunctionnalities),
        mergeMap(() => {            
            return this.functionnalitiesService.fetchSoftwares().pipe(
                map(functionnalities => fetchFunctionnalitiesSuccess({ functionnalities: functionnalities })),
                catchError(error => of(functionnalitiesFailure(error)))
            )
        })
    ));

    constructor(private actions$: Actions, private functionnalitiesService: FunctionnalitiesService, private readonly store: Store) { }
}