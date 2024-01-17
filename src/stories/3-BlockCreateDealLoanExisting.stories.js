import BlockCreateDealLoanExisting from '../components/blocks/BlockCreateDealLoanExisting'
import StoryWrapper from './config/StoryWrapper'

export default {
    title: 'Block: Create Deal Loan Existing',
}

// Default State
export const StoryBlockCreateDealLoanExisting = () => ({
    components: {
        StoryWrapper,
        BlockCreateDealLoanExisting,
    },

    data: function() {
        return {
            title: 'Create Deal Loan Existing',
            data: {
            },
        }
    },

    template: `
        <StoryWrapper :title="title" :container="false">
            <BlockCreateDealLoanExisting :data="data"/>
        </StoryWrapper>
    `,
})

StoryBlockCreateDealLoanExisting.story = {
    name: 'Default State',
}
