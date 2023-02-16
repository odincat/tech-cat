import MetatagConfig from '@components/MetatagManager';
import { Shell } from '@components/Shell';
import { CInput } from '@components/ui/Input';
import { protectedRoute } from '@lib/routeProtection';
import { trpc } from '@lib/trpc';
import { createDictionary, useTranslation } from '@locales/utils';
import type { GetServerSideProps, NextPage } from 'next';
import { useForm } from 'react-hook-form';

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const auth = await protectedRoute(ctx, "AUTHOR", '/blog');
    if (auth?.redirect) return auth;

    return {
        props: {}
    };
}

const postDashboardDictionary = createDictionary({
    pageTitle: {
        de: 'Postverwaltung',
        en: 'Post Dashboard'
    },
    createNewPost: {
        de: 'Einen neuen Beitrag erstellen',
        en: 'Create new post',
        postTitle: {
            de: 'Titel',
            en: 'Title'
        },
        slug: {
            de: 'Wird erreichbar sein unter',
            en: 'Will be accessible under'
        }
    },
    comments: {
        de: 'Kommentare',
        en: 'Comments'
    }
});

interface CreatePostForm {
    title: string;
    slug: string;
}

const PostDashboard: NextPage = () => {
    const { ts } = useTranslation();

    const { register, getValues, watch, handleSubmit, formState: { errors, dirtyFields, touchedFields } } = useForm<CreatePostForm>();

    const postQuery = trpc.post.feed.useQuery({ amount: 7, offset: 0 });

    return (
        <Shell title={ts(postDashboardDictionary.pageTitle)}>
            <div>
                <section>
                    <h2>{ts(postDashboardDictionary.createNewPost)}</h2>
                    <form>
                        <CInput containerClass='w-[300px]' placeholder={ts(postDashboardDictionary.createNewPost.postTitle)} {...register('title')} />
                        <span>{ts(postDashboardDictionary.createNewPost.slug)}: </span>
                    </form>
                </section>
                <div>
                    /Posts
                </div>
                <div>
                    <h2>Comments</h2>
                </div>
            </div>
        </Shell>
    );
};

export default PostDashboard;
