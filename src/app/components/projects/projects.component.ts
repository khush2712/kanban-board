import { Component, OnInit } from '@angular/core';
import { Project } from 'src/app/model/project.model';
import { BoardService } from 'src/app/services/board.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {

  displayedColumns: string[] = ['id', 'name'];
  projects!: Project[];


  constructor(private boardService: BoardService) { }

  ngOnInit(): void {
    this.refreshProjects();
  }

  refreshProjects() {
    this.boardService.getBoardList().subscribe((projects) => {
      this.projects=projects;
    });
  }

  createBoard(addNewProject: string) {
    if(addNewProject !== "") {
      this.boardService.createProject(addNewProject).subscribe(() => this.refreshProjects());
      alert("Project added");
    }
  }
}
