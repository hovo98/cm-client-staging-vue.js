import BlockPrLoansStepFour from '../components/blocks/BlockPrLoansStepFour'
import StoryWrapper from './config/StoryWrapper'

export default {
    title: 'Block: Pr Loans Step Four',
}

// Default State
export const StoryBlockPrLoansStepFour = () => ({
    components: {
        StoryWrapper,
        BlockPrLoansStepFour,
    },

    data: function() {
        return {
            title: 'Pr Loans Step Four',
            data: {
            },
        }
    },

    template: `
        <StoryWrapper :title="title" :container="false">
            <BlockPrLoansStepFour :data="data"/>
        </StoryWrapper>
    `,
})

StoryBlockPrLoansStepFour.story = {
    name: 'Default State',
}
