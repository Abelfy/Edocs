import { Component } from '@angular/core';
import { PreviewerComponent } from '../components/previewer/previewer.component';


@Component({
  selector: 'edocs-preview-container',
  standalone: true,
  imports: [PreviewerComponent],
  templateUrl: './preview-container.component.html',
  styleUrl: './preview-container.component.scss'
})
export class PreviewContainerComponent {

}
