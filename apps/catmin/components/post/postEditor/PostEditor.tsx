import { GLOBAL_statusMessage, useStore } from '@lib/store';
import { useUser } from '@lib/utils';
import {
    Button,
    Checkbox,
    Drawer,
    Input,
    InputWrapper,
    LoadingOverlay,
    Modal,
    MultiSelect,
} from '@mantine/core';
import { showNotification } from '@mantine/notifications';
import { deleteDoc, doc, serverTimestamp, snapshotEqual, updateDoc } from 'firebase/firestore';
import { useRouter } from 'next/router';
import fire from 'pacman/firebase';
import { createRef, useEffect, useRef, useState } from 'react';
import {
    RiCheckFill,
    RiDeleteBin2Fill,
    RiGlobalLine,
    RiLinkM,
    RiPriceTag3Fill,
    RiSave2Fill,
    RiUserFill,
} from 'react-icons/ri';
import { PostProperties } from '../postitem/PostItem';
import utils from 'pacman/utils';

import styles from './PostEditor.module.scss';
import RichTextEditor from './RichTextEditor';
import { getDownloadURL, ref, uploadBytes, uploadBytesResumable } from 'firebase/storage';
import { UserProfile } from 'firebase/auth';

interface HookProps {
    editingPost: PostProperties | undefined;
}

const PostEditor = ({ post }: { post: PostProperties | undefined }) => {
    const { user } = useUser();

    const globalStatusMessage = useStore(GLOBAL_statusMessage);

    const [loading, setLoading] = useState(false);
    const [editingPost, setEditingPost] = useState<PostProperties>();

    const { renderDrawer, title, slug, author, tags } = useSettingsDrawer({
        editingPost,
    });
    const { renderMain, content } = useMain({ editingPost, user });

    const handleSave = async () => {
        const postRef = doc(
            fire.useFireStore(),
            'users',
            user.uid,
            'posts',
            post!.id,
        );

        await updateDoc(postRef, {
            title: title,
            slug: slug,
            author: author,
            tags: tags,
            published: published,
            updatedAt: serverTimestamp(),
        }).then(() => {
            showNotification({
                title: 'Success',
                message: 'Post has been successfully updated!',
                color: 'teal',
            });
        });
    };

    const { renderSidebar, published } = useSidebar({
        post,
        editingPost,
        user,
        handleSave,
    });

    useEffect(() => {
        setLoading(true);
        setEditingPost(post);
        setLoading(false);
    }, [post]);

    // Update status bar
    useEffect(() => {
        if (!post?.title) return;
        if (post?.title.length > 85) {
            globalStatusMessage.set(`editing Post...`);
            return;
        }
        globalStatusMessage.set(`editing "${post?.title}"...`);
    }, [post?.title]);

    return (
        <div className={styles.editor}>
            {post == undefined && null}
            <div className={styles.head}>
                <h2>{title}</h2>
                {renderDrawer}
            </div>
            <div className={styles.container}>
                {renderMain}
                {renderSidebar}
            </div>
        </div>
    );
};

const useMain = ({ editingPost, user }: { editingPost: PostProperties | undefined; user: any }) => {
    const [content, setContent] = useState(editingPost?.content);

    useEffect(() => {
        setContent(editingPost?.content);
    }, [editingPost]);

    const handleImageUpload = (file: File): Promise<string> => new Promise((resolve, reject) => {
        const currentYear = new Date().getFullYear();
        const currentTimestamp = Date.now();

        const storageRef = ref(fire.useStorage(), `uploads/${currentYear}/${user?.uid}/${currentTimestamp}`);

        uploadBytes(storageRef, file).then(() => {
            getDownloadURL(storageRef).then((url) => {
                console.log(url)
                resolve(url.toString());
            })
        }).catch(() => {
            reject(new Error('File upload failed'));
        });
    });

    return {
        content,
        renderMain: (
            <div className={styles.main}>
                <div className={styles.editorContainer}>
                    {content ? (
                        <RichTextEditor value={content} onChange={setContent} onImageUpload={handleImageUpload} />
                    ) : (
                        <LoadingOverlay visible={true} />
                    )}
                </div>
            </div>
        ),
    };
};

const useSidebar = ({
    post,
    editingPost,
    user,
    handleSave,
}: {
    post: PostProperties | undefined;
    editingPost: PostProperties | undefined;
    user: any;
    handleSave: () => void;
}) => {
    const router = useRouter();

    const [published, setPublished] = useState(editingPost?.published);

    useEffect(() => {
        setPublished(editingPost?.published);
    }, [editingPost]);

    const SaveButton = () => {
        const handleClick = () => {
            handleSave();
        };

        return (
            <Button color='teal' onClick={handleClick} compact>
                <RiSave2Fill className={styles.icon} /> Save changes
            </Button>
        );
    };

    const DeleteButton = () => {
        const [open, setOpen] = useState(false);
        const validateRef = useRef<HTMLInputElement>(null);
        const [valid, setValid] = useState(false);

        const handleClick = () => {
            setOpen(true);
        };

        const handleChange = () => {
            if (
                validateRef.current!.value.toLowerCase() !==
                post?.slug.toLowerCase()
            ) {
                setValid(false);
                return;
            }
            setValid(true);
        };

        const handleDelete = () => {
            if (!valid) return;

            const postRef = doc(
                fire.useFireStore(),
                'users',
                user.uid,
                'posts',
                post!!.id,
            );
            deleteDoc(postRef).then(() => {
                showNotification({
                    title: 'Success!',
                    message: 'Post has been deleted',
                    color: 'teal',
                    icon: <RiCheckFill />,
                });
                router.push('/dash');
            });
        };

        return (
            <>
                <Modal
                    opened={open}
                    title='Delete this post?'
                    onClose={() => setOpen(false)}>
                    <div className={styles.modalContent}>
                        <InputWrapper
                            label='Validation'
                            description='Please type the slug of this post in order to delete it.'>
                            <Input onChange={handleChange} ref={validateRef} />
                        </InputWrapper>
                        <Button
                            disabled={!valid}
                            className={styles.confirm}
                            onClick={handleDelete}
                            color='red'>
                            <RiDeleteBin2Fill className={styles.icon} /> Delete
                            post
                        </Button>
                        <b>I understand that this action cannot be reverted.</b>
                    </div>
                </Modal>
                <Button
                    className={styles.deleteButton}
                    onClick={handleClick}
                    color='red'
                    compact>
                    <RiDeleteBin2Fill className={styles.icon} /> Delete post
                </Button>
            </>
        );
    };

    const ViewButton = () => {
        const baseUrl = utils.getBaseUrl('frontend');

        return (
            <>
                {published && (
                    <a
                        href={`${baseUrl}/post/${editingPost?.slug}`}
                        target='_blank'>
                        <Button color='blue' compact>
                            <RiGlobalLine /> Preview
                        </Button>
                    </a>
                )}
            </>
        );
    };

    return {
        published,
        renderSidebar: (
            <div className={styles.sidebar}>
                <div className={styles.head}>
                    <h4>Actions</h4>
                </div>
                <div className={styles.published}>
                    <p>Change post visibility</p>
                    <div className={styles.option}>
                        <Checkbox
                            checked={published}
                            onChange={(event) =>
                                setPublished(event.currentTarget.checked)
                            }
                            color='teal'
                            label={published ? 'Published' : 'Private'}
                        />
                        <ViewButton />
                    </div>
                </div>
                <div className={styles.actions}>
                    <SaveButton />
                    <DeleteButton />
                </div>
            </div>
        ),
    };
};

const useSettingsDrawer = ({ editingPost }: HookProps) => {
    const [settingsDrawerOpen, setSettingsDrawerOpen] = useState(false);

    const [title, setTitle] = useState(editingPost?.title);
    const [titleError, setTitleError] = useState(false);

    const [slug, setSlug] = useState(editingPost?.slug);
    const slugField = createRef<HTMLInputElement>();

    const [author, setAuthor] = useState(editingPost?.author);

    const [tags, setTags] = useState(editingPost?.tags);

    const handleClose = () => {
        if (titleError) {
            showNotification({
                title: 'Invalid fields!',
                message: 'Make sure you check all of your fields.',
                color: 'red',
            });
            return;
        }

        setSettingsDrawerOpen(false);
    };

    useEffect(() => {
        setTitle(editingPost?.title);
        setSlug(editingPost?.slug);
        setAuthor(editingPost?.author);
        setTags(editingPost?.tags);
    }, [editingPost]);

    const handleTitleChange = (
        newValue: string,
        minLength: number,
        maxLength: number,
        setter: (content: string) => void,
        errorSetter: (isError: boolean) => void,
    ) => {
        const valid = utils.validateString(
            newValue,
            minLength,
            maxLength,
            setter,
        );

        if (!valid) {
            errorSetter(true);
            return;
        }

        errorSetter(false);
    };

    const handleSlugChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const formattedSlug = utils.toSlug(e.target.value);

        setSlug(formattedSlug);

        slugField.current!.value = formattedSlug;
    };

    return {
        title,
        slug,
        author,
        tags,
        renderDrawer: (
            <>
                <Drawer
                    opened={settingsDrawerOpen}
                    onClose={handleClose}
                    title='Edit post meta'
                    padding='xl'
                    size='xl'>
                    <InputWrapper
                        label='Title'
                        error={
                            titleError
                                ? 'Title needs to be at least 5 characters long (max. 200)!'
                                : ''
                        }
                        description='This will only affect the display title, not the slug'>
                        <Input
                            invalid={titleError}
                            defaultValue={title}
                            onChange={(
                                e: React.ChangeEvent<HTMLInputElement>,
                            ) =>
                                handleTitleChange(
                                    e.target.value,
                                    5,
                                    200,
                                    setTitle,
                                    setTitleError,
                                )
                            }
                            icon={<RiPriceTag3Fill />}
                        />
                    </InputWrapper>
                    <InputWrapper
                        defaultValue={editingPost?.slug}
                        label='Slug'
                        description="URL of the post. Make sure it doesn't exist yet">
                        <Input
                            defaultValue={slug}
                            ref={slugField}
                            onChange={(
                                e: React.ChangeEvent<HTMLInputElement>,
                            ) => handleSlugChange(e)}
                            icon={<RiLinkM />}
                        />
                    </InputWrapper>
                    <InputWrapper
                        label='Author'
                        description='Name of the Author(s). Will be public, so watch out what you leak ;) Default: Account name'>
                        <Input
                            defaultValue={author}
                            onChange={(
                                e: React.ChangeEvent<HTMLInputElement>,
                            ) => setAuthor(e.target.value)}
                            icon={<RiUserFill />}></Input>
                    </InputWrapper>
                    <MultiSelect
                        className={styles.tags}
                        data={tags ?? ['']}
                        defaultValue={tags}
                        label='Topics'
                        description='Select topics or hashtags that match the content of your post '
                        placeholder='Add tags'
                        searchable
                        creatable
                        clearable
                        clearButtonLabel='Clear tags'
                        getCreateLabel={(query) => `+ Add ${query}`}
                        onChange={setTags}
                    />
                </Drawer>
                <Button onClick={() => setSettingsDrawerOpen(true)} compact>
                    Settings
                </Button>
            </>
        ),
    };
};

export default PostEditor;
