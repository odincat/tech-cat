import styles from '@styles/Overview.module.scss'
import { useUser } from '@lib/utils';
import AdminShell from '@components/auth/adminshell/AdminShell';
import PostItem, { PostProperties } from '@components/post/postitem/PostItem';
import { Button } from '@mantine/core';
import { collection, getDocs, limit, orderBy, query, startAfter } from 'firebase/firestore';
import { useCollection } from "react-firebase-hooks/firestore";
import fire from 'pacman/firebase';
import { useEffect, useState } from 'react';
import { showNotification } from '@mantine/notifications';
import { RiEmotionHappyFill, RiErrorWarningFill, RiMore2Line } from 'react-icons/ri';
import utils from 'pacman/utils';

const LIMIT = 3;

const Overview = () => {
    const { user, userObject, roles } = useUser();

    const [loading, setLoading] = useState<boolean>(false);
    const [posts, setPosts] = useState<any>();

    const postQuery = query(collection(fire.useFireStore(),'users', user.uid, 'posts'), orderBy('createdAt'), limit(LIMIT));
    const [querySnapshot] = useCollection(postQuery);
    // const posts = querySnapshot?.docs.map((doc) => doc.data());

    useEffect(() => {
        const fetchedPosts = querySnapshot?.docs.map((doc) => doc.data());
        setPosts(fetchedPosts);
    }, [querySnapshot])

    const PostList = () => {

        return (
            <>
                {posts ? posts.map((post: any) => {
                    const postData: PostProperties = {...post}
                    
                    return (
                        <PostItem post={postData} className={styles.postItem} />
                    );
                }) : null}
            </>
        )
    };

    const loadMorePosts = async () => {
        setLoading(true);

        if(posts == null) {
            showNotification({ title: 'Error occured while fetching posts', message: 'Post object is null', icon: <RiErrorWarningFill />, color: 'red' })
            return;
        }

        const lastPost = posts[posts?.length - 1];
        const cursor = typeof lastPost.createdAt === 'number' ? utils.fromMillis(lastPost.createdAt) : lastPost.createdAt;

        const morePostsQuery = query(collection(fire.useFireStore(),'users', user.uid, 'posts'), orderBy('createdAt'), startAfter(cursor), limit(LIMIT));

        const sdf = await getDocs(morePostsQuery);

        const morePosts = sdf?.docs.map((doc) => doc.data());

        setPosts(posts.concat(morePosts));

        setLoading(false);

        if(morePosts?.length != null && morePosts.length < LIMIT) {
            showNotification({ title: 'You have reached the end', message: 'There is nothing there, honestly', icon: <RiErrorWarningFill />, color: 'red' })
            return;
        }

        showNotification({ title: 'Success!', message: 'Posts have been fetched successfully!', icon: <RiEmotionHappyFill />, color: 'green'})
    }

    return (
        <AdminShell>
            <div className={styles.container}>
                <div className={styles.header}>
                    <h2>Post overview</h2>
                    <p>Have the total control over all of your posts.</p>
                </div>
                <div className={styles.feed}>
                    <PostList />
                    <Button onClick={loadMorePosts} className={styles.loadMore}>Load more posts</Button>
                </div>
            </div>
        </AdminShell>
    )
};

Overview.auth = true;
export default Overview;
