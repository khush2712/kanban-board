import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BoardComponent } from './components/board/board.component';
import { ProjectsComponent } from './components/projects/projects.component';

const routes: Routes = [
  {path: 'board/:id', component: BoardComponent},
  {path: 'project', component: ProjectsComponent},
  { path: '', redirectTo: 'project', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
