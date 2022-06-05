export interface Post {
    postTitle: string;
    postSlug: string;
    postUid: string;
    postCategory: Array<string>;
    postExerpt: string;
    postThumbnail: string;
    postThumbnailAlt: string;
    postContent: string;
    postIsPublished: boolean;
    postAuthor: string;
    postCreatedAt: Date;
    postUpdatedAt: Date;
}
