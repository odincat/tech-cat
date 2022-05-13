import styles from '@styles/Overview.module.scss'
import { useUser } from '@lib/utils';
import AdminShell from '@components/auth/adminshell/AdminShell';
import PostItem, { PostItemProperties, PostProperties } from '@components/post/postitem/PostItem';
import { Button } from '@mantine/core';
import { collection, doc, orderBy, query } from 'firebase/firestore';
import { useCollection, useCollectionOnce } from "react-firebase-hooks/firestore";
import fire from 'pacman/firebase';

const Overview = () => {
    const { user, userObject, roles } = useUser();
    
    const mockPost: PostProperties = {
        title: "Titel",
        tags: [],
        content: "bla bla bla",
        author: "odincat",
        slug: "ein-text",
        commentCount: 7,
        heartCount: 7,
        createdAt: "1.1.2022",
        updatedAt: "2.1.2022",
        published: true,
        trashed: false,
        uid: "bla",
        username: "odincat",
        thumbnail: "null"
    }

    const PostList = () => {
        const postsRef = collection(fire.useFireStore(), 'users', user.uid, 'posts');
        const postQuery = query(postsRef, orderBy('createdAt', 'desc'));
        const [snapshot, loading, error] = useCollectionOnce(postQuery);

        const posts = snapshot?.docs.map((doc) => doc.data());

        return (
            <>
                {posts ? posts.map((post: any) => <PostItem post={post} />) : null}
            </>
        );
    };

    return (
        <AdminShell>
            <div className={styles.container}>
                <div className={styles.header}>
                    <h2>Post overview</h2>
                    <p>Have the total control over all of your posts.</p>
                </div>
                <div className={styles.feed}>
                    <PostList />
                    <Button className={styles.loadMore}>Load more posts</Button>
                </div>
            </div>
        </AdminShell>
    )
};

Overview.auth = true;
export default Overview;
