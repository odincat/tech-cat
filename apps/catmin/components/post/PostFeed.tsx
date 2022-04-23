import PostItem, { PostProperties } from "./PostItem";

const PostFeed = ({ posts }: any) => {
    return (
        <div>
            {posts ? posts.map((post: PostProperties) => <PostItem post={post} />) : null}
        </div>
    );
};

export default PostFeed;