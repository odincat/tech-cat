import { GLOBAL_statusMessage, useStore } from '@lib/store';
import { useUser } from '@lib/utils';
import { Button, Checkbox, Input, InputWrapper, Modal, NativeSelect } from '@mantine/core';
import { showNotification } from '@mantine/notifications';
import { deleteDoc, doc } from 'firebase/firestore';
import { useRouter } from 'next/router';
import fire from 'pacman/firebase';
import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { RiCheckFill, RiDeleteBin2Fill, RiSave2Fill } from 'react-icons/ri';
import { PostProperties } from '../postitem/PostItem';
import styles from './PostEditor.module.scss'

const PostEditor = ({ post }: { post: PostProperties | undefined }) => {
    const { user } = useUser();
    const router = useRouter();

    const globalStatusMessage = useStore(GLOBAL_statusMessage);

    const [loading, setLoading] = useState(false);
    const [ePost, setEPost] = useState<PostProperties>();

    const { register, handleSubmit, reset, watch, formState: { errors }, formState } = useForm({ mode: 'onChange'});

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
                <div className={styles.published}><Checkbox color='teal' label={post?.published ? 'Published' : 'Private'} /></div>
                <div className={styles.actions}>
                    <SaveButton />
                    <DeleteButton />
                </div>
            </div>
        )
    };

    const Main = () => {
        return (
            <>
                <form onSubmit={handleSubmit(() => console.log('asd'))}>

                </form>
            </>
        )
    }

    const MetaModal = () => {
        const [open, setOpen] = useState(false);

        return(
            <>
                <Modal className={styles.metaModal} opened={open} title="Set new title" onClose={() => setOpen(false)}>
                    <InputWrapper defaultValue={post?.title} label="Title" description="This will only affect the display title, not the slug">
                        <Input />
                    </InputWrapper>
                    <InputWrapper defaultValue={post?.slug} label="Slug" description="">
                        <Input />
                    </InputWrapper>
                    <Button color="teal">Apply</Button>
                </Modal>
                <Button onClick={() => setOpen(true)} compact>Change meta</Button>
            </>
        );
    }

    return (
        <div className={styles.editor}>
            {post == undefined && null}
            <div className={styles.head}>
                <h2>{post?.title}</h2>
                <MetaModal />
            </div>
            <div className={styles.container}>
                <div className={styles.main}><Main /></div>
                <div><SideBar /></div>
            </div>
        </div>
    );
};


export default PostEditor;