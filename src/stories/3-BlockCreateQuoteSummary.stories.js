import BlockCreateQuoteSummary from '../components/blocks/BlockCreateQuoteSummary'
import StoryWrapper from './config/StoryWrapper'

export default {
    title: 'Block: Create Quote Summary',
}

// Default State
export const StoryBlockCreateQuoteSummary = () => ({
    components: {
        StoryWrapper,
        BlockCreateQuoteSummary,
    },

    data: function() {
        return {
            title: 'Create Quote Summary',
            data: {
            },
        }
    },

    template: `
        <StoryWrapper :title="title" :container="false">
            <BlockCreateQuoteSummary :data="data"/>
        </StoryWrapper>
    `,
})

StoryBlockCreateQuoteSummary.story = {
    name: 'Default State',
}
