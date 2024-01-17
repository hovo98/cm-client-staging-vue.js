import BlockCreateQuoteStepThree from '../components/blocks/BlockCreateQuoteStepThree'
import StoryWrapper from './config/StoryWrapper'

export default {
    title: 'Block: Create Quote Step Three',
}

// Default State
export const StoryBlockCreateQuoteStepThree = () => ({
    components: {
        StoryWrapper,
        BlockCreateQuoteStepThree,
    },

    data: function() {
        return {
            title: 'Create Quote Step Three',
            data: {
            },
        }
    },

    template: `
        <StoryWrapper :title="title" :container="false">
            <BlockCreateQuoteStepThree :data="data"/>
        </StoryWrapper>
    `,
})

StoryBlockCreateQuoteStepThree.story = {
    name: 'Default State',
}
