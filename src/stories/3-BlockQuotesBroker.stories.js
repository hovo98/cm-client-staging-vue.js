import BlockQuotesBroker from '../components/blocks/BlockQuotesBroker'
import StoryWrapper from './config/StoryWrapper'

export default {
    title: 'Block: Quotes Broker',
}

// Default State
export const StoryBlockQuotesBroker = () => ({
    components: {
        StoryWrapper,
        BlockQuotesBroker,
    },

    data: function() {
        return {
            title: 'Quotes Broker',
            data: {
            },
        }
    },

    template: `
        <StoryWrapper :title="title" :container="false">
            <BlockQuotesBroker :data="data"/>
        </StoryWrapper>
    `,
})

StoryBlockQuotesBroker.story = {
    name: 'Default State',
}
