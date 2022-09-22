import { styled } from "@stitches";

export const CColumn = styled('div', {
    width: '100%',
    display: 'grid',
    variants: {
        columns: {
            1: {},
            2: {
                gridTemplateColumns: 'repeat(2, 1fr)',
            },
            3: {
                gridTemplateColumns: 'repeat(3, 1fr)',
            },
            4: {
                gridTemplateColumns: 'repeat(4, 1fr)',
            },
            5: {
                gridTemplateColumns: 'repeat(5, 1fr)',
            },
            6: {
                gridTemplateColumns: 'repeat(6, 1fr)',
            },
            'auto': {
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            }
        }
    },
    defaultVariants: {
        columns: 2
    }
})