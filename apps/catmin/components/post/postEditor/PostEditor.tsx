import { GLOBAL_statusMessage, useStore } from '@lib/store';
import { Button, Checkbox, Input, InputWrapper, Modal, NativeSelect } from '@mantine/core';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { RiEarthFill } from 'react-icons/ri';
import { PostProperties } from '../postitem/PostItem';
import styles from './PostEditor.module.scss'

const PostEditor = ({ post }: { post: PostProperties | undefined }) => {
    const globalStatusMessage = useStore(GLOBAL_statusMessage);
    const [loading, setLoading] = useState(false);

    const { register, handleSubmit, reset, watch, formState: { errors }, formState } = useForm({ mode: 'onChange'});

    useEffect(() => {
        if(!post?.title) return;
        if(post?.title.length > 85) {
            globalStatusMessage.set(`editing Post...`);
            return;
        }
        globalStatusMessage.set(`editing "${post?.title}"...`);
    }, [post?.title]);

    const SideBar = () => {
        return (
            <div className={styles.sidebar}>
                <div className={styles.head}>
                    <h4>Actions</h4>
                </div>

                <div className={styles.published}><Checkbox color={'green'} label={post?.published ? 'Published' : 'Private'} /></div>
                <Button color='green' compact>Save changes</Button>
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
                    <InputWrapper label="Title" description="This will only affect the display title, not the slug">
                        <Input />
                    </InputWrapper>
                    <InputWrapper label="Slug" description="">
                        <Input />
                    </InputWrapper>
                    <Button color="green">Apply</Button>
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