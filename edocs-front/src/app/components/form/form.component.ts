import { Component, OnInit } from '@angular/core';
import { MatSelectModule } from '@angular/material/select';
import { Store } from '@ngrx/store';
import { fetchSoftware } from '../../reducers/softwares/softwares.actions';
import { selectSoftwares } from '../../reducers/softwares';
import { CommonModule } from '@angular/common';

import {MatListModule} from '@angular/material/list';
import { fetchVersions } from '../../reducers/versions/versions.actions';
import { selectVersions, selectVersionsHasLoaded } from '../../reducers/versions';
import { fetchFunctionnalities } from '../../reducers/functionnalities/functionnalities.actions';
import { selectFunctionnalities, selectFunctionnalitiesHasLoaded } from '../../reducers/functionnalities';
import { FormFunctionnalitiesListComponent } from '../form-functionnalities-list/form-functionnalities-list.component';


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
