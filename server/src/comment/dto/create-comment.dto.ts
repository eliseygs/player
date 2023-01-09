export class CreateCommentDto{
    readonly username: string;
    readonly text: string;
    readonly parentId: number;
}