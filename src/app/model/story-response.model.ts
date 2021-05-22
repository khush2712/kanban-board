import { Story } from "./story.model";

export interface StoryResponse {
    error: boolean
    data: Story[]
}
