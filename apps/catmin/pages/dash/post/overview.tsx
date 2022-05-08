import styles from '@styles/Overview.module.scss'
import { useUser } from '@lib/utils';
import AdminShell from '@components/auth/adminshell/AdminShell';
import PostItem, { PostProperties } from '@components/post/postitem/PostItem';
import { Button } from '@mantine/core';

const Overview = () => {
    const { userObject, roles } = useUser();
    
    const mockPost: PostProperties = {
        title: "Titel",
        content: "bla bla bla",
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

    return (
        <AdminShell>
            <div className={styles.container}>
                <div className={styles.header}>
                    <h2>Post overview</h2>
                    <p>Have the total control over all of your posts.</p>
                </div>
                <div className={styles.feed}>
                    <PostItem post={mockPost} className={styles.postItem} />
                    <PostItem post={mockPost} className={styles.postItem} />
                    <Button className={styles.loadMore}>Load more posts</Button>
                </div>
            </div>
        </AdminShell>
    )
};

Overview.auth = true;
export default Overview;
