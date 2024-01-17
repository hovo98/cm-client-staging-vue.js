import BlockLenderIgnoreDeal from '../components/blocks/BlockLenderDeals/BlockLenderIgnoreDeal'
import StoryWrapper from './config/StoryWrapper'

export default {
    title: 'Block: Lender Ignore Deal',
}

// Default State
export const StoryBlockLenderIgnoreDeal = () => ({
    components: {
        StoryWrapper,
        BlockLenderIgnoreDeal,
    },

    data: function() {
        return {
            title: 'Lender Ignore Deal',
            data: {
            },
        }
    },

    template: `
        <StoryWrapper :title="title" :container="false">
            <BlockLenderIgnoreDeal :data="data"/>
        </StoryWrapper>
    `,
})

StoryBlockLenderIgnoreDeal.story = {
    name: 'Default State',
}
