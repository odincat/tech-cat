import { GLOBAL_statusMessage, useStore } from '@lib/store';
import { useUser } from '@lib/utils';
import { Button, Checkbox, Drawer, Input, InputWrapper, Modal, MultiSelect, NativeSelect } from '@mantine/core';
import { showNotification } from '@mantine/notifications';
import { deleteDoc, doc } from 'firebase/firestore';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import fire from 'pacman/firebase';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { RiCheckFill, RiDeleteBin2Fill, RiLinkM, RiPriceTag3Fill, RiSave2Fill, RiUserFill } from 'react-icons/ri';
import { PostProperties } from '../postitem/PostItem';
import pUtils from 'pacman/utils';

const RichTextEditor = dynamic(() => import('@mantine/rte'), { ssr: false});

import styles from './PostEditor.module.scss';

const PostEditor = ({ post }: { post: PostProperties | undefined }) => {
    const { user } = useUser();

    const router = useRouter();

    const globalStatusMessage = useStore(GLOBAL_statusMessage);

    const [loading, setLoading] = useState(false);
    const [editingPost, setEditingPost] = useState<PostProperties>();

    useEffect(() => {
        setLoading(true);
        setEditingPost(post);
        setLoading(false);
    }, [post]);


    // Update status bar
    useEffect(() => {
        if(!post?.title) return;
        if(post?.title.length > 85) {
            globalStatusMessage.set(`editing Post...`);
            return;
        }
        globalStatusMessage.set(`editing "${post?.title}"...`);
    }, [post?.title]);

    const SideBar = () => {
        const SaveButton = () => {
            const handleClick = () => {

            }

            return <Button color='teal' onClick={handleClick} compact><RiSave2Fill className={styles.icon} /> Save changes</Button>;
        }

        const DeleteButton = () => {
            const [open, setOpen] = useState(false);
            const validateRef = useRef<HTMLInputElement>(null);
            const [valid, setValid] = useState(false);

            const handleClick = () => {
                setOpen(true);
            }

            const handleChange = () => {
                if(validateRef.current!.value.toLowerCase() !== post?.slug.toLowerCase()) {
                    setValid(false) ;
                    return;
                }
                setValid(true);
            }

            const handleDelete = () => {
                if(!valid) return;

                const postRef = doc(fire.useFireStore(), 'users', user.uid, 'posts', post!!.id);
                deleteDoc(postRef).then(() => {
                    showNotification({ title: 'Success!', message: 'Post has been deleted', color: 'teal', icon: <RiCheckFill /> });
                    router.push('/dash');
                });
            }

            return(
                <>
                    <Modal opened={open} title="Delete this post?" onClose={() => setOpen(false)}>
                        <div className={styles.modalContent}>
                            <InputWrapper label="Validation" description='Please type the slug of this post in order to delete it.'>
                                <Input onChange={handleChange} ref={validateRef} />
                            </InputWrapper>
                            <Button disabled={!valid} className={styles.confirm} onClick={handleDelete} color='red'><RiDeleteBin2Fill className={styles.icon} /> Delete post</Button>
                            <b>I understand that this action cannot be reverted.</b>
                        </div>
                    </Modal>
                    <Button className={styles.deleteButton} onClick={handleClick} color='red' compact><RiDeleteBin2Fill className={styles.icon} /> Delete post</Button>
                </>
            );
        };


        return (
            <div className={styles.sidebar}>
                <div className={styles.head}>
                    <h4>Actions</h4>
                </div>
                <div className={styles.published}>
                    <Checkbox defaultChecked={editingPost?.published} color='teal' label={post?.published ? 'Published' : 'Private'} />
                </div>
                <div className={styles.actions}>
                    <SaveButton />
                    <DeleteButton />
                </div>
            </div>
        )
    };

    const Main = () => {
        const [content, setContent] = useState(editingPost?.content);

        useEffect(() => {
            setContent(editingPost?.content);
        }, [editingPost]);

        return (
            <div className={styles.main}>
                <div className={styles.editorContainer}>
                    <RichTextEditor value={content ?? ''} onChange={setContent} />
                </div>
            </div>
        )
    }

    const MetaDrawer = () => {
        const [metaDrawerOpen, setMetaDrawerOpen] = useState(false);
        
        const [tags, setTags] = useState(editingPost?.tags);
        
        const handleClose = () => {
            if(titleError) {
                showNotification({ title: 'Invalid fields!', message: 'Make sure you check all of your fields.', color: 'red' });
                return;
            }

            setMetaDrawerOpen(false);
        };
        
        useEffect(() => {
            setTitle(editingPost?.title);
            setTags(editingPost?.tags);
        }, [editingPost]);
        
        const [title, setTitle] = useState(editingPost?.title);
        const [titleError, setTitleError] = useState(false);

        const smartChange = (newValue: string, minLength: number, maxLength: number, setter: (content: string) => void, errorSetter: (isError: boolean) => void) => {
            const valid = pUtils.validateString(newValue, minLength, maxLength, setter);

            if(!valid) {
                errorSetter(true);
                return;
            }

            errorSetter(false);
        }

        return(
            <>
            <Drawer opened={metaDrawerOpen} onClose={handleClose} title="Edit post meta" padding="xl" size="xl">
                <InputWrapper label="Title" error={titleError ? 'Title needs to be at least 5 characters long (max. 200)!' : ''} description="This will only affect the display title, not the slug">
                    <Input invalid={titleError} defaultValue={editingPost?.title} onChange={(e: React.ChangeEvent<HTMLInputElement>) => smartChange(e.target.value, 5, 200, setTitle, setTitleError)} icon={<RiPriceTag3Fill />} />
                </InputWrapper>
                <InputWrapper defaultValue={post?.slug} label="Slug" description="">
                    <Input defaultValue={editingPost?.slug} icon={<RiLinkM />} />
                </InputWrapper>
                <InputWrapper label="Author" description="Name of the Author(s). Will be public, so watch out what you leak ;) Default: Account name">
                    <Input defaultValue={editingPost?.author} icon={<RiUserFill />}></Input>
                </InputWrapper>
                <MultiSelect
                    className={styles.tags}
                    data={tags}
                    defaultValue={editingPost?.tags}
                    label="Topics"
                    description="Select topics or hashtags that match the content of your post "
                    placeholder="Add tags"
                    searchable
                    creatable
                    getCreateLabel={(query) => `+ Add ${query}`}
                    onCreate={(query) => setTags((current) => [...current, query])}/>
            </Drawer>
                <Button onClick={() => setMetaDrawerOpen(true)} compact>Change meta</Button>
            </>
        );
    }

    return (
        <div className={styles.editor}>
            {post == undefined && null}
            <div className={styles.head}>
                <h2>{editingPost?.title}</h2>
                <MetaDrawer />
            </div>
            <div className={styles.container}>
                <Main />
                <SideBar />
            </div>
        </div>
    );
};


export default PostEditor;