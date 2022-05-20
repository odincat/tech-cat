import AdminShell from '@components/auth/adminshell/AdminShell';
import MetatagConfig from '@components/metamanager/MetaManager';
import PostEditor from '@components/post/postEditor/PostEditor';
import { PostItemProperties, PostProperties } from '@components/post/postitem/PostItem';
import { useUser } from '@lib/utils';
import { Button } from '@mantine/core';
import styles from '@styles/PostEdit.module.scss'
import { collection, doc, getDocs, limit, query, where } from 'firebase/firestore';
import { useRouter } from 'next/router';
import fire from 'pacman/firebase';
import { useEffect, useState } from 'react';

const PostEdit = () => {
    const router = useRouter();
    const { username, slug } = router.query;
    const { user } = useUser();

    const [originalPost, setOriginalPost] = useState<PostProperties>();

    useEffect(() => {
        const postQuery = query(collection(fire.useFireStore(), 'users', user.uid, 'posts'), where('slug', '==', slug), limit(1));
        const getPost = async () => {
            const currentPosts = await getDocs(postQuery);
            
            const originalPostData = currentPosts.docs[0].data() as PostProperties;

            setOriginalPost(originalPostData);
        }

        getPost();
    }, [])

    return (
        <AdminShell>
            <MetatagConfig title={`Editing "${originalPost?.title}"`} defaultTitleFormat={true} />
            <PostEditor post={originalPost} />
        </AdminShell>
    )
};

PostEdit.auth = true;
export default PostEdit;
