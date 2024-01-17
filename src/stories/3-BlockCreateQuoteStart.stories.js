import BlockCreateQuoteStart from '../components/blocks/BlockCreateQuoteStart'
import StoryWrapper from './config/StoryWrapper'

export default {
    title: 'Block: Create Quote Start',
}

// Default State
export const StoryBlockCreateQuoteStart = () => ({
    components: {
        StoryWrapper,
        BlockCreateQuoteStart,
    },

    data: function() {
        return {
            title: 'Create Quote Start',
            data: {
            },
        }
    },

    template: `
        <StoryWrapper :title="title" :container="false">
            <BlockCreateQuoteStart :data="data"/>
        </StoryWrapper>
    `,
})

StoryBlockCreateQuoteStart.story = {
    name: 'Default State',
}
