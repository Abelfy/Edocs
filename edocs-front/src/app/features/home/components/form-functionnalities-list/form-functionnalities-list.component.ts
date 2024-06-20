import { Component, Input } from '@angular/core';
import { CdkDragDrop, DragDropModule, moveItemInArray } from '@angular/cdk/drag-drop';
import { MatListModule } from '@angular/material/list';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'edocs-form-functionnalities-list',
  standalone: true,
  imports: [CommonModule,DragDropModule,MatListModule,MatIconModule,MatCardModule,MatButtonModule],
  templateUrl: './form-functionnalities-list.component.html',
  styleUrl: './form-functionnalities-list.component.scss'
})
export class FormFunctionnalitiesListComponent {

  @Input({required : true}) functionnalities: any[] = [];

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray([...this.functionnalities], event.previousIndex, event.currentIndex);
  }
}
