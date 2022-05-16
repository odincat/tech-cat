import PostItem, { PostProperties } from "../postitem/PostItem";

const PostFeed = ({ posts, styles }: any) => {
    return (
        <>
            {posts ? posts.map((post: any) => {
                const postData: PostProperties = {...post}
                
                return (
                    <PostItem post={postData} key={postData.id} className={styles.postItem} />
                );
            }) : null}
        </>
    );
};

export default PostFeed;