import BlockCreateDealPropertyExpenses from '../components/blocks/BlockCreateDealPropertyExpenses'
import StoryWrapper from './config/StoryWrapper'

export default {
    title: 'Block: Create Deal Property Type Prop Exp',
}

// Default State
export const StoryBlockCreateDealPropertyExpenses = () => ({
    components: {
        StoryWrapper,
        BlockCreateDealPropertyExpenses,
    },

    data: function() {
        return {
            title: 'Create Deal Property Type Prop Exp',
            data: {
            },
        }
    },

    template: `
        <StoryWrapper :title="title" :container="false">
            <BlockCreateDealPropertyExpenses :data="data"/>
        </StoryWrapper>
    `,
})

StoryBlockCreateDealPropertyExpenses.story = {
    name: 'Default State',
}
