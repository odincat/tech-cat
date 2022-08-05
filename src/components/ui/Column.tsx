import { styled } from "@stitches";

export const CColumn = styled('div', {
    width: '100%',
    display: 'grid',

    variants: {
        columns: {
            1: {},
            2: {
                gridTemplateColumns: '1fr 1fr',
            },
            3: {
                gridTemplateColumns: '1fr 1fr 1fr',
            }
        }
    }
})