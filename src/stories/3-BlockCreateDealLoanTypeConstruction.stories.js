import BlockCreateDealLoanTypeConstruction from '../components/blocks/BlockCreateDealLoanTypeConstruction'
import StoryWrapper from './config/StoryWrapper'

export default {
    title: 'Block: Create Deal Loan Type Construction',
}

// Default State
export const StoryBlockCreateDealLoanTypeConstruction = () => ({
    components: {
        StoryWrapper,
        BlockCreateDealLoanTypeConstruction,
    },

    data: function() {
        return {
            title: 'Create Deal Loan Type Construction',
            data: {
            },
        }
    },

    template: `
        <StoryWrapper :title="title" :container="false">
            <BlockCreateDealLoanTypeConstruction :data="data"/>
        </StoryWrapper>
    `,
})

StoryBlockCreateDealLoanTypeConstruction.story = {
    name: 'Default State',
}
