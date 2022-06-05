import styles from '@styles/Overview.module.scss';
import { useUser } from '@lib/utils';
import AdminShell from '@components/auth/adminshell/AdminShell';
import { Button } from '@mantine/core';
import {
    collection,
    getDocs,
    limit,
    orderBy,
    query,
    startAfter,
} from 'firebase/firestore';
import { useCollection } from 'react-firebase-hooks/firestore';
import fire from 'pacman/firebase';
import { useEffect, useState } from 'react';
import { showNotification } from '@mantine/notifications';
import {
    RiEmotionHappyFill,
    RiErrorWarningFill,
    RiMore2Line,
} from 'react-icons/ri';
import utils from 'pacman/utils';
import PostFeed from '@components/post/postfeed/PostFeed';
import { PostProperties } from '@components/post/postitem/PostItem';
import MetatagConfig from '@components/metamanager/MetaManager';

const LIMIT = 10;

const Overview = () => {
    const { user, userObject, roles } = useUser();

    const [loading, setLoading] = useState<boolean>(false);
    const [posts, setPosts] = useState<PostProperties[]>();

    // const posts = querySnapshot?.docs.map((doc) => doc.data());

    useEffect(() => {
        const getPosts = async () => {
            const postQuery = query(
                collection(fire.useFireStore(), 'users', user.uid, 'posts'),
                orderBy('createdAt', 'desc'),
                limit(LIMIT),
            );
            const currentPosts = await getDocs(postQuery);

            const postData = currentPosts.docs?.map<PostProperties>(
                (doc: any) => doc.data(),
            );

            setPosts(postData);
        };
        setLoading(true);
        getPosts().then(() => {
            setLoading(false);
        });
    }, []);

    const loadMorePosts = async () => {
        setLoading(true);

        if (posts == null) {
            showNotification({
                title: 'Error occured while fetching posts',
                message: 'Post object is null',
                icon: <RiErrorWarningFill />,
                color: 'red',
            });
            return;
        }

        const lastPost = posts[posts?.length - 1];
        const cursor =
            typeof lastPost.createdAt === 'number'
                ? utils.fromMillis(lastPost.createdAt)
                : lastPost.createdAt;

        const morePostsQuery = query(
            collection(fire.useFireStore(), 'users', user.uid, 'posts'),
            orderBy('createdAt', 'desc'),
            startAfter(cursor),
            limit(LIMIT),
        );

        const sdf = await getDocs(morePostsQuery);

        const morePostsData = sdf?.docs.map<PostProperties>((doc: any) =>
            doc.data(),
        );

        setPosts(posts.concat(morePostsData));

        setLoading(false);

        if (morePostsData?.length != null && morePostsData.length < LIMIT) {
            showNotification({
                title: 'You have reached the end',
                message: 'There is nothing there, honestly',
                icon: <RiErrorWarningFill />,
                color: 'red',
            });
            return;
        }

        showNotification({
            title: 'Success!',
            message: 'Posts have been fetched successfully!',
            icon: <RiEmotionHappyFill />,
            color: 'green',
        });
    };

    return (
        <AdminShell>
            <MetatagConfig
                title='Post control center'
                defaultTitleFormat={true}
            />
            <div className={styles.container}>
                <div className={styles.header}>
                    <h2>Post overview</h2>
                    <p>Have the total control over all of your posts.</p>
                </div>
                {posts != null ? (
                    <div className={styles.feed}>
                        <PostFeed posts={posts} styles={styles} />
                        <Button
                            onClick={loadMorePosts}
                            className={styles.loadMore}>
                            Load more posts
                        </Button>
                    </div>
                ) : null}
            </div>
        </AdminShell>
    );
};

Overview.auth = true;
export default Overview;
