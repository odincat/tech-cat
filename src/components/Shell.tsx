import { NextComponent } from '@lib/types';
import { ReactNode } from 'react';
import MetatagConfig from './MetatagManager';
import { Content, Header, Footer } from './Structure';

export const Shell: NextComponent<{
    children?: ReactNode;
    alignCenter?: boolean;
    topPadding?: boolean;
    title?: string;
    description?: string;
    color?: string;
    image?: string;
}> = (props) => {
    return (
        <>
            <MetatagConfig
                defaultTitleFormat={true}
                title={props.title ?? 'Page'}
                description={props.description}
                color={props.color ?? '#212121'}
                image={props.image ?? ''}
            />
            <Header />

            <Content alignCenter={props.alignCenter} topPadding={props.topPadding}>{props.children}</Content>

            <Footer />
        </>
    );
};
