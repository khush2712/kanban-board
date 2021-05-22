import { CdkDragDrop, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Story } from 'src/app/model/story.model';
import { BoardService } from 'src/app/services/board.service';
import { BoardEditDialog } from '../board.component';

@Component({
  selector: 'story-container',
  templateUrl: './story-container.component.html',
  styleUrls: ['./story-container.component.css']
})
export class StoryContainerComponent {

  @Input() storyList!: Story[];
  @Input() listId!: string;
  @Input() allowedList!: Array<string>;
  @Input() boardId!: number;
  @Output() refresh = new EventEmitter();


  constructor(private boardService: BoardService) {
  }

  drop(event: CdkDragDrop<Story[]>, statusNow: string) {

    if (event.previousContainer !== event.container) {
      var s: Story = event.item.data;

      this.boardService.updateStatus(s.id, statusNow)
        .subscribe((res) => {
          this.refresh.emit();
        });
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    }
  }
}
