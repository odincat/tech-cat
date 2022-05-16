import { Button } from '@mantine/core';
import styles from './PostItem.module.scss';
import { RiCalendarFill, RiDiscussFill, RiBallPenFill, RiHeart2Fill, RiLinkM, RiHashtag, RiPriceTag2Fill, RiPriceTag3Fill } from 'react-icons/ri';
import { FieldValue, Timestamp } from 'firebase/firestore';
import { DateTime } from 'luxon';

export interface PostProperties {
    title: string;
    tags: string[];
    content: string;
    slug: string;
    thumbnail: string;
    uid: string;
    id: string;
    username: string;
    author: string;
    createdAt: any;
    updatedAt: any;
    published: boolean;
    trashed: boolean;
    commentCount: number;
    heartCount: number;
}

export interface PostItemProperties {
    post: PostProperties;
    className?: string;
}

const PostItem = ({ post, className }: PostItemProperties) => {

    const createdAtRaw = typeof post?.createdAt === 'number' ? new Date(post.createdAt) : post.createdAt.toDate();
    const createdAt = DateTime.fromJSDate(createdAtRaw).setLocale('de-DE').toLocaleString(DateTime.DATETIME_SHORT);

    const updatedAtRaw = typeof post?.updatedAt === 'number' ? new Date(post.updatedAt) : post.updatedAt.toDate();
    const updatedAt = DateTime.fromJSDate(updatedAtRaw).setLocale('de-DE').toLocaleString(DateTime.DATETIME_SHORT);

    return (
        <div className={`${styles.postItem} ${className}`}>
            <div className={styles.postMeta}>
                <h3 className={styles.postTitle}>{post.title}</h3>
                {post.tags.length > 0 && (<p className={styles.tags}><RiPriceTag3Fill /> {post.tags.map((tag, i) => <span className={styles.tagItem} key={i}>{tag}</span>)}</p>)}
                <p className={styles.slug}><RiLinkM /> /{post.slug}</p>
                <p className={styles.postPublishDate}><RiCalendarFill /> {createdAt} {updatedAt !== createdAt && (<span className={styles.postEditDate}>(<RiBallPenFill /> {updatedAt})</span>)}</p>
                {/* <p>{post.content}</p> */}
            </div>
            <div className={styles.postNumbers}>
                <span className={styles.postHeartCount}><RiHeart2Fill className={styles.icon} /> {post.heartCount}</span>
                <span className={styles.postCommentCount}><RiDiscussFill className={styles.icon} /> {post.commentCount}</span>
            </div>
            <div className={styles.postEdit}>
                <Button>Edit</Button>
            </div>
        </div>
    );
};

export default PostItem;