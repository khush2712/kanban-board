import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Story } from 'src/app/model/story.model';
import { BoardService } from 'src/app/services/board.service';
import { BoardEditDialog } from '../board.component';

@Component({
  selector: 'story-card',
  templateUrl: './story-card.component.html',
  styleUrls: ['./story-card.component.css']
})
export class StoryCardComponent implements OnInit {

  @Input() story!: Story;
  @Output() refresh = new EventEmitter();

  constructor(private boardService: BoardService, public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  openDialog(story: Story) {
    const dialogRef = this.dialog.open(BoardEditDialog, {
      data: story
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result === undefined) return;
      this.boardService.updateStory(result.id, result.title, result.description, result.status)
        .subscribe((res) => {
          this.refresh.emit();
        });
    });
  }
}
