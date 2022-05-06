import type { NextPage } from 'next'

import styles from '@styles/Create.module.scss'
import { useUser } from '@lib/utils';
import CreatePost from '@components/post/createPost/CreatePost';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useModals } from '@mantine/modals';
import AdminShell from '@components/auth/adminshell/AdminShell';
import MetatagConfig from '@components/metamanager/MetaManager';

const Create: NextPage = () => {
    const { userObject, roles } = useUser();
    const [open, setOpen] = useState(true);
    const router = useRouter();

    return (
        <AdminShell>
            <MetatagConfig title={`Create new post [${userObject?.username}]`} defaultTitleFormat={true} />
            <CreatePost />
        </AdminShell>
    )
};
    
export default Create;
