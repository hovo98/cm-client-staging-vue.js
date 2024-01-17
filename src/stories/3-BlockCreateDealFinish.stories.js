import BlockCreateDealFinish from '../components/blocks/BlockCreateDealFinish'
import StoryWrapper from './config/StoryWrapper'

export default {
    title: 'Block: Create Deal Finish',
}

// Default State
export const StoryBlockCreateDealFinish = () => ({
    components: {
        StoryWrapper,
        BlockCreateDealFinish,
    },

    data: function() {
        return {
            title: 'Create Deal Finish',
            data: {
            },
        }
    },

    template: `
        <StoryWrapper :title="title" :container="false">
            <BlockCreateDealFinish :data="data"/>
        </StoryWrapper>
    `,
})

StoryBlockCreateDealFinish.story = {
    name: 'Default State',
}
