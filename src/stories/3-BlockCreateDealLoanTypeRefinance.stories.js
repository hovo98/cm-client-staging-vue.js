import BlockCreateDealLoanTypeRefinance from '../components/blocks/BlockCreateDealLoanTypeRefinance'
import StoryWrapper from './config/StoryWrapper'

export default {
    title: 'Block: Create Deal Loan Type Refinance',
}

// Default State
export const StoryBlockCreateDealLoanTypeRefinance = () => ({
    components: {
        StoryWrapper,
        BlockCreateDealLoanTypeRefinance,
    },

    data: function() {
        return {
            title: 'Create Deal Loan Type Refinance',
            data: {
            },
        }
    },

    template: `
        <StoryWrapper :title="title" :container="false">
            <BlockCreateDealLoanTypeRefinance :data="data"/>
        </StoryWrapper>
    `,
})

StoryBlockCreateDealLoanTypeRefinance.story = {
    name: 'Default State',
}
