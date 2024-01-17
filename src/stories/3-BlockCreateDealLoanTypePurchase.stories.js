import BlockCreateDealLoanTypePurchase from '../components/blocks/BlockCreateDealLoanTypePurchase'
import StoryWrapper from './config/StoryWrapper'

export default {
    title: 'Block: Create Deal Loan Type Purchase',
}

// Default State
export const StoryBlockCreateDealLoanTypePurchase = () => ({
    components: {
        StoryWrapper,
        BlockCreateDealLoanTypePurchase,
    },

    data: function() {
        return {
            title: 'Create Deal Loan Type Purchase',
            data: {
            },
        }
    },

    template: `
        <StoryWrapper :title="title" :container="false">
            <BlockCreateDealLoanTypePurchase :data="data"/>
        </StoryWrapper>
    `,
})

StoryBlockCreateDealLoanTypePurchase.story = {
    name: 'Default State',
}
