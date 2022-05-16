import { UserContext } from "@lib/context";
import { useContext, useEffect, useState } from "react";
import styles from '@styles/Dashboard.module.scss';
import AdminShell from "@components/auth/adminshell/AdminShell";
import MetatagConfig from "@components/metamanager/MetaManager";
import { Button } from "@mantine/core";
import { collection, getDocs, limit, orderBy, query } from "firebase/firestore";
import fire from "pacman/firebase";
import PostFeed from "@components/post/postfeed/PostFeed";
import { useRouter } from "next/router";

const Dashboard = () => {
    const { userObject, roles, user } = useContext(UserContext);
    const router = useRouter();

    const [posts, setPosts] = useState<any>();

    useEffect(() => {
        const fetchPosts = async () => {
            const morePostsQuery = query(collection(fire.useFireStore(),'users', user.uid, 'posts'), orderBy('createdAt', 'desc'), limit(3));
    
            const result = await getDocs(morePostsQuery);
    
            const morePosts = result?.docs.map((doc) => doc.data());

            setPosts(morePosts);
        }

        fetchPosts();
        }, [])


    return(
        <AdminShell>
            <MetatagConfig title={`Dashboard [${userObject?.username ?? 'loading'}]`} defaultTitleFormat={true} />
            <div className={styles.hero}>
                <div className={styles.emoji}>👋</div>
                <h1>Hello {userObject?.name}!</h1>
                What are you plans for today?
            </div>
            <div className={styles.latestposts}>
                    <h2>Latest posts</h2>
                    <div className={styles.feed}>
                        <PostFeed posts={posts} styles={styles} />
                    </div>
                    <Button onClick={() => {router.push('/dash/post/overview')}} className={styles.morePosts}>View all posts</Button>
            </div>
        </AdminShell>
    );
};

Dashboard.auth = true;
export default Dashboard;