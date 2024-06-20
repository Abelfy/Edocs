import { Component } from '@angular/core';
import {MatGridListModule} from '@angular/material/grid-list';
import { FormContainerComponent } from './form-container/form-container.component';
import { PreviewContainerComponent } from './preview-container/preview-container.component';

@Component({
  standalone: true,
  imports: [MatGridListModule, FormContainerComponent, PreviewContainerComponent],
  templateUrl: './main.page.html',
  styleUrl: './main.page.scss'
})
export class MainPage {

}
