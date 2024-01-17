import BlockCreateDealPropertyInfo from '../components/blocks/BlockCreateDealPropertyInfo'
import StoryWrapper from './config/StoryWrapper'

export default {
    title: 'Block: Create Deal Property Info',
}

// Default State
export const StoryBlockCreateDealPropertyInfo = () => ({
    components: {
        StoryWrapper,
        BlockCreateDealPropertyInfo,
    },

    data: function() {
        return {
            title: 'Create Deal Property Info',
            data: {
            },
        }
    },

    template: `
        <StoryWrapper :title="title" :container="false">
            <BlockCreateDealPropertyInfo :data="data"/>
        </StoryWrapper>
    `,
})

StoryBlockCreateDealPropertyInfo.story = {
    name: 'Default State',
}
