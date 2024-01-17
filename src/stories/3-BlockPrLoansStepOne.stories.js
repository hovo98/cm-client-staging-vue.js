import BlockPrLoansStepOne from '../components/blocks/BlockPrLoansStepOne'
import StoryWrapper from './config/StoryWrapper'

export default {
    title: 'Block: Pr Loans Step One',
}

// Default State
export const StoryBlockPrLoansStepOne = () => ({
    components: {
        StoryWrapper,
        BlockPrLoansStepOne,
    },

    data: function() {
        return {
            title: 'Pr Loans Step One',
            data: {
            },
        }
    },

    template: `
        <StoryWrapper :title="title" :container="false">
            <BlockPrLoansStepOne :data="data"/>
        </StoryWrapper>
    `,
})

StoryBlockPrLoansStepOne.story = {
    name: 'Default State',
}
