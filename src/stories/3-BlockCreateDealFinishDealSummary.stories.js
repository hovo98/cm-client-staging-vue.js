import BlockCreateDealFinishDealSummary from '../components/blocks/BlockCreateDealFinishDealSummary'
import StoryWrapper from './config/StoryWrapper'

export default {
    title: 'Block: Create Deal Finish Deal Summary',
}

// Default State
export const StoryBlockCreateDealFinishDealSummary = () => ({
    components: {
        StoryWrapper,
        BlockCreateDealFinishDealSummary,
    },

    data: function() {
        return {
            title: 'Create Deal Finish Deal Summary',
            data: {
            },
        }
    },

    template: `
        <StoryWrapper :title="title" :container="false">
            <BlockCreateDealFinishDealSummary :data="data"/>
        </StoryWrapper>
    `,
})

StoryBlockCreateDealFinishDealSummary.story = {
    name: 'Default State',
}
