import { UserContext } from "@lib/context";
import { useContext } from "react";
import styles from '@styles/Dashboard.module.scss';
import AdminShell from "@components/auth/adminshell/AdminShell";
import MetatagConfig from "@components/metamanager/MetaManager";
import { useQuery } from "react-query";
import { Button } from "@mantine/core";
import PostItem, { PostProperties } from "@components/post/postitem/PostItem";

const Dashboard = () => {
    const { userObject, roles } = useContext(UserContext);
    
    const fetchQuote = async () => {
        const res = await fetch('https://motivational-quote-api.herokuapp.com/quotes/random');
        return res.json();
    };

    const { data, status } = useQuery('quote', fetchQuote, {
        refetchOnWindowFocus: false
    })

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

    return(
        <AdminShell>
            <MetatagConfig title={`Dashboard [${userObject?.username ?? 'loading'}]`} defaultTitleFormat={true} />
            <div className={styles.hero}>
                <div className={styles.emoji}>👋</div>
                <h1>Hello {userObject?.name}!</h1>
                What are you plans for today?
                <blockquote className={styles.quote}>
                    {data?.quote}
                    <span>{data?.person}</span>
                </blockquote>
            </div>
            <div className={styles.latestposts}>
                    <h2>Latest posts</h2>
                    <div className={styles.feed}>
                        <PostItem post={mockPost} />
                    </div>
                    <Button className={styles.morePosts}>View all posts</Button>
            </div>
        </AdminShell>
    );
};

export default Dashboard;