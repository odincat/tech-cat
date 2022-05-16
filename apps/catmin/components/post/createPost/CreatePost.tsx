import styles from './CreatePost.module.scss';
import { toSlug, useUser } from '@lib/utils';
import React, { createRef, useEffect, useState } from 'react';
import { Button, Input, InputWrapper, MultiSelect } from '@mantine/core';
import { RiAddBoxFill, RiCheckboxCircleFill, RiInformationFill, RiLinkM, RiPriceTag3Fill, RiUserFill } from 'react-icons/ri';
import { useRouter } from 'next/router';
import { collection, doc, serverTimestamp, setDoc } from 'firebase/firestore';
import fire from 'pacman/firebase';
import { showNotification } from '@mantine/notifications';
import { PostProperties } from '../postitem/PostItem';

const CreatePost = () => {
    const { userObject, user } = useUser();
    const titleField = createRef<HTMLInputElement>();
    const slugField = createRef<HTMLInputElement>();
    const authorField = createRef<HTMLInputElement>();

    const router = useRouter();

    const [title, setTitle] = useState<string>('');
    const [slug, setSlug] = useState<string>('');
    const [author, setAuthor] = useState<string>('');
    const [tags, setTags] = useState<string[]>([]);

    const [dirty, setDirty] = useState<boolean>(false);
    const [error, setError] = useState();

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
            showNotification({title: 'Slug has been generated from title.', message: 'Check the slug and click on "create post" once again.', icon: <RiInformationFill />})
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
            tags: tags,
            content: '# Start writing!',
            thumbnail: '',
            id: docName,
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

        await setDoc(postDoc, data).then(() => {
            showNotification({
                title: 'Post has been successfully created',
                message: 'You will be redirected...',
                icon: <RiCheckboxCircleFill />,
                color: 'green'
            });

            router.push(`/dash/post/@${userObject?.username}/${slug}`);
        }).catch((error) => {
            setError(error);
        });
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
            {error && (<b className={styles.error}>{error}</b>)}
            <Button color="teal" className={styles.button} onClick={handleCreatePost} leftIcon={<RiAddBoxFill />}>
                Create Post
            </Button>
        </div>
    )
};

export default CreatePost;