import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from "@angular/common/http";
import { ProjectResponse } from '../model/project-response.model';
import { map } from 'rxjs/operators';
import { Project } from '../model/project.model';
import { Observable } from 'rxjs';
import { Story } from '../model/story.model';
import { StoryResponse } from '../model/story-response.model';

@Injectable({
  providedIn: 'root'
})
export class BoardService {
  private static serverURL = 'https://parikshan2.friadd.in/';

  constructor(private http: HttpClient) { }

  getBoardList(): Observable<Project[]> {
    return this.http.get<ProjectResponse>(BoardService.serverURL + "boards.php")
      .pipe(map((projects: ProjectResponse) =>
        projects.data
      ));
  }

  createProject(projName: string) {
    return this.http.post(BoardService.serverURL + "create_board.php", { name: projName });
  }

  getStoryList(board: number): Observable<Story[]> {
    let params = new HttpParams();
    params = params.append("board", board);
    return this.http.get<StoryResponse>(BoardService.serverURL + "stories.php", {
      params: params
    })
      .pipe(map((story: StoryResponse) =>
        story.data
      ));
  }

  createStory(board: number, title: string, description: string, status: string) {
    return this.http.post(BoardService.serverURL + "create_story.php",
      { board: board, title: title, description: description, status: status });
  }

  updateStory(id: number, title: string, description: string, status: string) {
    return this.http.post(BoardService.serverURL + "update_story.php",
      { id: id, title: title, description: description, status: status });
  }

  updateStatus(id: string, status: string) {
    return this.http.post(BoardService.serverURL + "update_story.php",
      { id: id, status: status });
  }
}
