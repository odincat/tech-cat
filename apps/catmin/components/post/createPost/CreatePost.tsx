import styles from './CreatePost.module.scss';
import { useUser } from '@lib/utils';
import { useState } from 'react';
import { Button, Input, Modal } from '@mantine/core';
import { RiLinkM, RiPriceTag3Fill, RiUserFill } from 'react-icons/ri';
import { ContextModalProps, useModals } from '@mantine/modals';

interface CreatePostProperties {
    isOpen: boolean;
}

const CreatePost = () => {
    const { userObject, roles } = useUser();
    
    return (
        <>
            <h2 className={styles.title}>Create new post</h2>
            <Input className={styles.input} placeholder="Title" icon={<RiPriceTag3Fill />}></Input>
            <Input className={styles.input} placeholder="Slug" icon={<RiLinkM />}></Input>
            <Input className={styles.input} placeholder="Author" icon={<RiUserFill />}></Input>
            <Button color="teal" compact>
                Create
            </Button>
        </>
    )
};

export default CreatePost;