import { Component } from '@angular/core';
import { FormComponent } from '../components/form/form.component';

@Component({
  selector: 'edocs-form-container',
  standalone: true,
  imports: [FormComponent],
  templateUrl: './form-container.component.html',
  styleUrl: './form-container.component.scss'
})
export class FormContainerComponent {

}
