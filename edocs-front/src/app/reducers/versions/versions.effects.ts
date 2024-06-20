import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { fetchVersions, fetchVersionsSuccess, versionsFailure } from "./versions.actions"
import { catchError, map, mergeMap, of } from "rxjs";
import { Injectable } from "@angular/core";
import { VersionsService } from "../../shared/services/versions/versions.service";

@Injectable()
export class VersionEffects {

    loadSoftwares$ = createEffect(() => this.actions$.pipe(
        ofType(fetchVersions),
        mergeMap(() => {            
            return this.versionsService.fetchVersions(1).pipe(
                map(versions => fetchVersionsSuccess({ versions })),
                catchError(error => of(versionsFailure(error)))
            )
        })
    ));

    constructor(private actions$: Actions, private versionsService: VersionsService, private readonly store: Store) { 
    }
}