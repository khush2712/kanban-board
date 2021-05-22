import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CdkDragDrop, CdkDragEnter, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { BoardService } from 'src/app/services/board.service';
import { Story } from 'src/app/model/story.model';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit, OnDestroy {

  id!: number;
  private sub: any;
  stories!: Story[];

  todoList!: Story[];
  progressList!: Story[];
  reviewList!: Story[];
  doneList!: Story[];

  constructor(private boardService: BoardService, private route: ActivatedRoute, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.sub = this.route.params.subscribe(params => {
      this.id = +params['id'];
      this.refreshBoard();
    });
  }

  refreshBoard() {
    this.boardService.getStoryList(this.id).subscribe((stories) => {
      this.stories = stories;
      this.todoList = stories.filter(story => story.status === "todo");
      this.progressList = stories.filter(story => story.status === "progress");
      this.reviewList = stories.filter(story => story.status === "review");
      this.doneList = stories.filter(story => story.status === "done");
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  drop(event: CdkDragDrop<Story[]>, statusNow:string) {

    if (event.previousContainer !== event.container) {

      var s: Story = event.item.data;

      this.boardService.updateStatus(s.id, statusNow)
      .subscribe((res) => {
        this.refreshBoard();
      });
    } else {
    }
  }

  newStory() {
      var story: Story = {
        id: "",
        board: this.id.toString(),
        title: "",
        description: "",
        status: "todo"
      };
    const dialogRef = this.dialog.open(BoardEditDialog, {
      data: story
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result === undefined) return;
        this.boardService.createStory(result.board, result.title, result.description, result.status)
          .subscribe((res) => {
            this.refreshBoard();
          });
    });
  }
}

@Component({
  selector: 'board-edit-dialog',
  templateUrl: 'board-edit-dialog.html',
})
export class BoardEditDialog {

  constructor(
    public dialogRef: MatDialogRef<BoardEditDialog>,
    @Inject(MAT_DIALOG_DATA) public data: Story) { }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
