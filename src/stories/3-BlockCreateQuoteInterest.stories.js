import BlockCreateQuoteInterest from '../components/blocks/BlockCreateQuoteInterest'
import StoryWrapper from './config/StoryWrapper'

export default {
    title: 'Block: Create Quote Interest',
}

// Default State
export const StoryBlockCreateQuoteInterest = () => ({
    components: {
        StoryWrapper,
        BlockCreateQuoteInterest,
    },

    data: function() {
        return {
            title: 'Create Quote Interest',
            data: {
            },
        }
    },

    template: `
        <StoryWrapper :title="title" :container="false">
            <BlockCreateQuoteInterest :data="data"/>
        </StoryWrapper>
    `,
})

StoryBlockCreateQuoteInterest.story = {
    name: 'Default State',
}
