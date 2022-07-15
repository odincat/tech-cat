import { Post } from './Post';

const PostFeed = () => {
    const PostItem = ({
        postTitle,
        postSlug,
        postUid,
        postCategory,
        postExerpt,
        postThumbnail,
        postThumbnailAlt,
        postContent,
        postIsPublished,
        postAuthor,
        postCreatedAt,
        postUpdatedAt,
    }: Post) => {
        return (
            <>
                <div className='post-item-container'>
                    <footer>
                        <img src={postThumbnail} alt={postThumbnailAlt} />
                        <h3>{postTitle}</h3>
                        <p>{postExerpt}</p>
                        <span>sad</span>
                    </footer>
                </div>
            </>
        );
    };
};

export default PostFeed;
