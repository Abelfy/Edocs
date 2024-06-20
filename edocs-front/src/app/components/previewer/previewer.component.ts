import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
@Component({
  selector: 'edocs-previewer',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatIconModule],
  templateUrl: './previewer.component.html',
  styleUrl: './previewer.component.scss'
})
export class PreviewerComponent {

  @Input() previewId: string | undefined;

  apiUrl = 'http://localhost:3000/api/report/';
  constructor() { }
}
