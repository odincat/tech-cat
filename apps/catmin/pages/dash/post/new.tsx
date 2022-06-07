import styles from '@styles/Create.module.scss';
import { useUser } from '@lib/utils';
import CreatePost from '@components/post/createPost/CreatePost';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import AdminShell from '@components/auth/adminshell/AdminShell';
import MetatagConfig from '@components/metamanager/MetaManager';

const Create = () => {
    const { userObject, roles } = useUser();
    const [open, setOpen] = useState(true);
    const router = useRouter();

    return (
        <AdminShell>
            <MetatagConfig
                title={`Create new post`}
                defaultTitleFormat={true}
            />
            <CreatePost />
        </AdminShell>
    );
};

Create.auth = true;
export default Create;
