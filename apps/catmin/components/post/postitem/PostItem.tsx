import { Button } from '@mantine/core';
import styles from './PostItem.module.scss';
import { RiCalendarFill, RiDiscussFill, RiBallPenFill, RiHeart2Fill } from 'react-icons/ri';

export interface PostProperties {
    title: string;
    content: string;
    slug: string;
    uid: string;
    username: string;
    createdAt: string;
    updatedAt: string;
    published: boolean;
    trashed: boolean;
    commentCount: number;
    heartCount: number;
}

export interface PostItemProperties {
    post: PostProperties
}

const PostItem = ({ post }: PostItemProperties) => {
    return (
        <div className={styles.postItem}>
            <div className={styles.postMeta}>
                <h3 className={styles.postTitle}>{post.title}</h3>
                <span className={styles.postPublishDate}><RiCalendarFill /> {post.createdAt} ({post.updatedAt !== post.createdAt && (<span className={styles.postEditDate}><RiBallPenFill /> {post.updatedAt}</span>)})</span>
                
                <p>{post.content}</p>
            </div>
            <div className={styles.postNumbers}>
                <span className={styles.postHeartCount}><RiHeart2Fill className={styles.icon} /> {post.heartCount}</span>
                <span className={styles.postCommentCount}><RiDiscussFill className={styles.icon} /> {post.commentCount}</span>
            </div>
            <div className={styles.postEdit}>
                <Button>Edit</Button>
            </div>
        </div>
    )
};

export default PostItem;