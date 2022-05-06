import styles from './CreatePost.module.scss';
import { toSlug, useUser } from '@lib/utils';
import React, { createRef, useEffect, useState } from 'react';
import { Button, Input, InputWrapper, MultiSelect } from '@mantine/core';
import { RiLinkM, RiPriceTag3Fill, RiUserFill } from 'react-icons/ri';
import { useRouter } from 'next/router';
import { collection, doc } from 'firebase/firestore';
import { firestore } from '@lib/firebase';

const CreatePost = () => {
    const { userObject, roles } = useUser();
    const titleField = createRef<HTMLInputElement>();
    const slugField = createRef<HTMLInputElement>();

    const router = useRouter();

    const [title, setTitle] = useState('');
    const [slug, setSlug] = useState('');
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

    const handleCreatePost = () => {
        if(title === '') {
            setDirty(true);
            return;
        }
        if(slug === '') {
            setSlug(titleField.current!.value);
        }

        if(dirty) setDirty(false);

        createPost();
    }

    const createPost = async () => {
        const docName = slug + Date.now().toString();

        // const userRef = collection(firestore, 'users');
        // const userRefPosts = collection(userRef, 'posts');
        // const postDoc = doc(userRef, )

        console.log(docName);
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
                <Input defaultValue={userObject?.name || ''} className={styles.input} placeholder="Author" icon={<RiUserFill />}></Input>
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