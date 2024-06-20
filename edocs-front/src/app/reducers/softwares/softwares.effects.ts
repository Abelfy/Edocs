import { Actions, createEffect, ofType } from "@ngrx/effects";
import { SoftwaresService } from "../../services/softwares/softwares.service";
import { Store } from "@ngrx/store";
import { fetchSoftware, fetchSoftwareSuccess, softwareFailure } from "./softwares.actions"
import { catchError, map, mergeMap, of, tap } from "rxjs";
import { Injectable } from "@angular/core";

@Injectable()
export class SoftwareEffects {

    loadSoftwares$ = createEffect(() => this.actions$.pipe(
        ofType(fetchSoftware),
        tap(() => console.log('fetching softwares')),
        mergeMap(() => {            
            return this.softwaresService.fetchSoftwares().pipe(
                map(softwares => fetchSoftwareSuccess({ softwares: softwares })),
                catchError(error => of(softwareFailure(error)))
            )
        })
    ));

    constructor(private actions$: Actions, private softwaresService: SoftwaresService, private readonly store: Store) { 
    }
}