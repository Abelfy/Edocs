import { Component, OnInit } from '@angular/core';
import { MatSelectModule } from '@angular/material/select';
import { Store } from '@ngrx/store';
import { CommonModule } from '@angular/common';

import { FormFunctionnalitiesListComponent } from '../form-functionnalities-list/form-functionnalities-list.component';
import { selectSoftwares } from '../../../../reducers/softwares';
import { selectVersions, selectVersionsHasLoaded } from '../../../../reducers/versions';
import { selectFunctionnalities, selectFunctionnalitiesHasLoaded } from '../../../../reducers/functionnalities';
import { fetchSoftware } from '../../../../reducers/softwares/softwares.actions';
import { fetchVersions } from '../../../../reducers/versions/versions.actions';
import { fetchFunctionnalities } from '../../../../reducers/functionnalities/functionnalities.actions';



@Component({
  selector: 'edocs-form',
  standalone: true,
  imports: [CommonModule,MatSelectModule,FormFunctionnalitiesListComponent],
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss'
})
export class FormComponent implements OnInit {

  softwares$ = this.store.select(selectSoftwares);
  softwaresHasLoaded$ = this.store.select(selectVersionsHasLoaded);
  versions$ = this.store.select(selectVersions);
  versionsHasLoaded$ = this.store.select(selectVersionsHasLoaded);
  functionnalities$ = this.store.select(selectFunctionnalities);
  functionnalitiesHasLoaded$ = this.store.select(selectFunctionnalitiesHasLoaded);

  constructor(private store : Store) { }

  ngOnInit() {
    this.store.dispatch(fetchSoftware());
  }

  fetchVersions() {
    this.store.dispatch(fetchVersions());
  }

  fetchFunctionnalities() {
    this.store.dispatch(fetchFunctionnalities());
  }
}
