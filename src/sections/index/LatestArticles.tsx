import { CButton } from "@components/ui/Button";
import { trpc } from "@lib/trpc";
import { NextComponent } from "@lib/types";
import { useTranslation } from "@locales/utils";
import { Post } from "@prisma/client";
import { theme } from "@stitches";
import { format } from "date-fns";
import { de, enUS } from "date-fns/locale";
import Link from "next/link";
import { useEffect } from "react";
import { FaCalendarAlt, FaTag } from "react-icons/fa";

export const PostCard: NextComponent<{ post: Post }> = ({ post }) => {
    const { routerLocale } = useTranslation();      
    return (
        <div className="max-w-[300px] bg-gradient-to-b dark:from-gray-700 dark:to-[#212121] rounded">
            <img alt="Post thumbnail" src={post.thumbnailUrl} />
            <div className="p-5">
                <h3>{post.title}</h3>
                <span className="block mb-2"><FaCalendarAlt className="mr-1" /> {format(post.createdAt, 'PPP', { locale: routerLocale === 'de' ? de : enUS } )}</span>
                <span className="block mb-[1rem]"><FaTag className="mr-1" /> Category</span>
                <hr className="my-2" />
                <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores vitae distinctio qui. Mollitia similique voluptatibus ducimus laboriosam, exercitationem quas temporibus debitis, quisquam esse fugiat a culpa nesciunt tenetur sed dolore.
                </p>
                <Link
                    href={`/blog/${post.slug}`}
                    passHref
                    className="bold text-xl text-white mt-3 block"> 
                    
                        Read more
                    
                </Link>
            </div>
        </div>
    );
}

const testPost: Post = {
    id: '232',
    categorySlug: 'asdas',
    content: 'Lorem',
    createdAt: new Date(),
    slug: 'asdasd',
    exerpt: 'Preview',
    published: true,
    title: 'How Typescript has saved Javascript from its death',
    updatedAt: new Date(),
    userId: '123',
    thumbnailUrl: 'https://placekitten.com/300/200'
};

export const LatestArticles: NextComponent<{ posts?: Post[] }> = () => {

    return(
        <div className="mt-10">
            <h2>Latest articles</h2>
            <p className="w-[75%] m-auto mb-10">
                Here you can find a selection of my latest articles, mostly about programming and technology but sometimes you might also find a recipe or some travel photos aswell.
            </p>
            <div className="grid grid-cols-auto px-10 place-items-center gap-5 ">
                <PostCard post={testPost} />
                <PostCard post={testPost} />
                <PostCard post={testPost} />
                <PostCard post={testPost} />
            </div>

            <div className="mt-10">
            <h3>Interested in more?</h3>
            <p className="mb-5">
                You can find all my articles on my blog. There you can also find a search function to find articles about specific topics.
            </p>
            <CButton color={theme.colors.blue.value}>Go to blog</CButton>
            </div>
        </div>
    );
}
