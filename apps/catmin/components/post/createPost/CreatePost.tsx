import styles from './CreatePost.module.scss';
import { toSlug, useUser } from '@lib/utils';
import React, { createRef, useEffect, useState } from 'react';
import { Button, Input, InputWrapper, MultiSelect } from '@mantine/core';
import { RiCheckboxCircleFill, RiLinkM, RiPriceTag3Fill, RiUserFill } from 'react-icons/ri';
import { useRouter } from 'next/router';
import { collection, doc, serverTimestamp, setDoc } from 'firebase/firestore';
import fire from 'pacman/firebase';
import { showNotification } from '@mantine/notifications';
import { CheckCircle } from 'phosphor-react';
import { PostProperties } from '../postitem/PostItem';
import utils from 'pacman/utils';

const CreatePost = () => {
    const { userObject, user } = useUser();
    const titleField = createRef<HTMLInputElement>();
    const slugField = createRef<HTMLInputElement>();
    const authorField = createRef<HTMLInputElement>();

    const router = useRouter();

    const [title, setTitle] = useState('');
    const [slug, setSlug] = useState('');
    const [author, setAuthor] = useState('');
    const [dirty, setDirty] = useState(false);
    const [tags, setTags] = useState(['Type to add']);

    useEffect(() => {
        if(title !== '') setDirty(false);
    }, [title]);

    useEffect(() => {
        const formattedSlug = toSlug(slug);
        setSlug(formattedSlug);
        slugField.current!.value = formattedSlug;
    }, [slug]);

    useEffect(() => {
        setAuthor(userObject?.name || '');
        authorField.current!.value = userObject?.name || '';
    }, [])

    const handleCreatePost = () => {
        if(title === '') {
            setDirty(true);
            return;
        }
        if(slug === '') {
            setSlug(titleField.current!.value);
            showNotification({title: 'Slug has been generated from title.', message: 'Check the slug and click on "create post" once again.', icon: <RiCheckboxCircleFill />})
            return;
        }

        if(dirty) setDirty(false);

        createPost();
    }

    const createPost = async () => {
        const docName = `${slug}-${Date.now().toString()}`;

        const userCollectionRef = collection(fire.useFireStore(), 'users');
        const userRef = doc(userCollectionRef, user?.uid);
        const userPosts = collection(userRef, 'posts');
        const postDoc = doc(userPosts, docName);

        const data: PostProperties = {
            title: title,
            slug: slug,
            content: '# Start writing!',
            thumbnail: '',
            uid: user?.uid,
            username: userObject!.username,
            author: author,
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp(),
            published: false,
            trashed: false,
            commentCount: 0,
            heartCount: 0
        };

        await setDoc(postDoc, data).then((e) => {console.log(e)});
    }

    return (
        <div className={styles.container}>
            <h2 className={styles.title}>Create new post</h2>
                <InputWrapper label="Title" description="Select the title of the post" required>
                    <Input className={styles.input} placeholder="Title" onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)} ref={titleField} invalid={dirty} icon={<RiPriceTag3Fill />}></Input>
                </InputWrapper>
            <div>
                <InputWrapper label="Slug" description="Defines the URL of the post. If left empty, the slug will be generated automatically from the title.">
                    <Input className={styles.input} placeholder="Slug" onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSlug(e.target.value)} ref={slugField} icon={<RiLinkM />}></Input>
                </InputWrapper>
            </div>
            <InputWrapper label="Author" description="Name of the Author(s). Will be public, so watch out what you leak ;) Default: Account name">
                <Input className={styles.input} placeholder="Author" onChange={(e: React.ChangeEvent<HTMLInputElement>) => setAuthor(e.target.value)} ref={authorField} icon={<RiUserFill />}></Input>
            </InputWrapper>
            <MultiSelect
                className={styles.tags}
                data={tags}
                label="Topics"
                description="Select topics or hashtags that match the content of your post "
                placeholder="Add tags"
                searchable
                creatable
                getCreateLabel={(query) => `+ Add ${query}`}
                onCreate={(query) => setTags((current) => [...current, query])}
            />
            <Button color="teal" className={styles.button} onClick={handleCreatePost}>
                Create Post
            </Button>
        </div>
    )
};

export default CreatePost;