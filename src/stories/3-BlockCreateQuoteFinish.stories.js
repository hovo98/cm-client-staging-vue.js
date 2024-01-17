import BlockCreateQuoteFinish from '../components/blocks/BlockCreateQuoteFinish'
import StoryWrapper from './config/StoryWrapper'

export default {
    title: 'Block: Create Quote Finish',
}

// Default State
export const StoryBlockCreateQuoteFinish = () => ({
    components: {
        StoryWrapper,
        BlockCreateQuoteFinish,
    },

    data: function() {
        return {
            title: 'Create Quote Finish',
            data: {
            },
        }
    },

    template: `
        <StoryWrapper :title="title" :container="false">
            <BlockCreateQuoteFinish :data="data"/>
        </StoryWrapper>
    `,
})

StoryBlockCreateQuoteFinish.story = {
    name: 'Default State',
}
