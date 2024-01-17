import BlockPrLoansStepThree from '../components/blocks/BlockPrLoansStepThree'
import StoryWrapper from './config/StoryWrapper'

export default {
    title: 'Block: Pr Loans Step Three',
}

// Default State
export const StoryBlockPrLoansStepThree = () => ({
    components: {
        StoryWrapper,
        BlockPrLoansStepThree,
    },

    data: function() {
        return {
            title: 'Pr Loans Step Three',
            data: {
            },
        }
    },

    template: `
        <StoryWrapper :title="title" :container="false">
            <BlockPrLoansStepThree :data="data"/>
        </StoryWrapper>
    `,
})

StoryBlockPrLoansStepThree.story = {
    name: 'Default State',
}
