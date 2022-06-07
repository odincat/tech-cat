import SignIn from '@components/backend/SignIn';
import MetatagConfig from '@components/MetatagManager';
import { css } from '@emotion/react';
import { UserContext } from '@lib/context';
import { useThemed } from '@styling/ThemeProvider';
import { colors } from '@styling/variables';
import type { NextPage } from 'next';
import { useContext } from 'react';

const Home: NextPage = () => {
    const { user } = useContext(UserContext);

    const theme = useThemed();

    return (
        <div>
            <MetatagConfig defaultTitleFormat={true} title='Home' />
            <h1>Hello world!</h1>
            <p>
                <span css={css`
                    background-color: ${theme.githubLink};
                    color: ${colors.blue}
                `}>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Rerum commodi rem eveniet aspernatur quae iure voluptatem
                    eum est deserunt, quia perspiciatis repellat possimus.
                    Ducimus aliquam dolor, quos dolorem ex assumenda.
                </span>
                <span>
                    Consequatur dolor quaerat quae odit qui aliquam error totam.
                    Quod at, porro rerum sunt dolore iure, eius totam quae
                    suscipit animi sed vero placeat accusamus facere minus enim
                    explicabo qui.
                </span>
                <span>
                    Rerum alias tenetur consequatur culpa dignissimos quae a?
                    Eaque error veritatis aut totam dolorem illo iusto,
                    cupiditate non iste quibusdam tempore nulla consectetur
                    nisi. Incidunt provident possimus dolores earum dolor!
                </span>
                <span>
                    Aliquid a ipsum dolore consequatur impedit optio quisquam id
                    quidem accusantium aperiam perspiciatis minima dicta
                    doloribus saepe quis ratione laboriosam in vitae cum,
                    officiis ducimus magnam iusto, eum possimus. A!
                </span>
                <span>
                    Quae, quia. Exercitationem cupiditate illo ducimus
                    asperiores voluptate ad magni hic eos recusandae maxime
                    facilis ullam maiores, dolor quo, dolorum animi officia sint
                    delectus? Dicta odio error consequatur deserunt id?
                </span>
            </p>
            <SignIn />
        </div>
    );
};

export default Home;
