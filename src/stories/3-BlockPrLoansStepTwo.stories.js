import BlockPrLoansStepTwo from '../components/blocks/BlockPrLoansStepTwo'
import StoryWrapper from './config/StoryWrapper'

export default {
    title: 'Block: Pr Loans Step Two',
}

// Default State
export const StoryBlockPrLoansStepTwo = () => ({
    components: {
        StoryWrapper,
        BlockPrLoansStepTwo,
    },

    data: function() {
        return {
            title: 'Pr Loans Step Two',
            data: {
            },
        }
    },

    template: `
        <StoryWrapper :title="title" :container="false">
            <BlockPrLoansStepTwo :data="data"/>
        </StoryWrapper>
    `,
})

StoryBlockPrLoansStepTwo.story = {
    name: 'Default State',
}
