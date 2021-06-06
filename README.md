# Kanban Board
## Technologies Used
- Node.js v16.0.0
- NPM 7.10.0
- Angular 12.0.0
- Styling Library - [Angular Material](https://material.angular.io/)

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## APIs
- [Kanban Board API](https://parikshan2.friadd.in/)
  Developed and hosted. Not publicly available

## Structure
### Routes
- **Projects (*default*)** - Projects/Boards list.
![Projects](screenshots/projects.png?raw=true "Projects")
- **Board** - Shows tasks/stories for board. Add or edit tasks/stories
![Board](screenshots/board.png?raw=true "Board")
![Add Board](screenshots/add_edit_task.png?raw=true "Add Board")

### Components
#### 1. Projects - Projects/Boards list.
- Table shows current projects and boards.
- Add new project from top form.
- Select project to open it's board.
#### 2. Board - Tasks/stories list
- Kanban board of tasks/stories
- Drag and Drop between status to change
- Add new task/story
- Edit task/story by button near task/story card
#### 3. Story Container
- Container of story for particular status.
- Can be used multiple time if there is need of new status
#### 4. Story Card
- Task or Story card is to represent task/story.
- Button to edit that task/story.

### Service
#### Board Service
- Get list of boards or projects.
- Create new board or project.
- Get tasks/stories list.
- Create task/story.
- Update task/story.
- Update status of task/story.

### Observable
- Observable are used for API calls
  - [getBoardList](src/app/services/board.service.ts#L18-L23)
  - [getStoryList](src/app/services/board.service.ts#L29-L38)

### Pipe
- To show story title in title case [Link](src/app/components/board/story-card/story-card.component.html#L2)
- To show status text in title case [Link](src/app/components/board/story-container/story-container.component.html#L3)
- To show project name in title case [Link](src/app/components/projects/projects.component.html#L16)
