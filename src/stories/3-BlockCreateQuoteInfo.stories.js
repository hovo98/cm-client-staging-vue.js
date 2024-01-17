import BlockCreateQuoteInfo from '../components/blocks/BlockCreateQuoteInfo'
import StoryWrapper from './config/StoryWrapper'

export default {
    title: 'Block: Create Quote Info',
}

// Default State
export const StoryBlockCreateQuoteInfo = () => ({
    components: {
        StoryWrapper,
        BlockCreateQuoteInfo,
    },

    data: function() {
        return {
            title: 'Create Quote Info',
            data: {
            },
        }
    },

    template: `
        <StoryWrapper :title="title" :container="false">
            <BlockCreateQuoteInfo :data="data"/>
        </StoryWrapper>
    `,
})

StoryBlockCreateQuoteInfo.story = {
    name: 'Default State',
}
