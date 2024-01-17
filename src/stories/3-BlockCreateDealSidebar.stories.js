import BlockCreateDealSidebar from '../components/blocks/BlockCreateDealSidebar'
import StoryWrapper from './config/StoryWrapper'

export default {
    title: 'Block: Create Deal Sidebar',
}

// Default State
export const StoryBlockCreateDealSidebar = () => ({
    components: {
        StoryWrapper,
        BlockCreateDealSidebar,
    },

    data: function() {
        return {
            title: 'Create Deal Sidebar',
            data: {
            },
        }
    },

    template: `
        <StoryWrapper :title="title" :container="false">
            <BlockCreateDealSidebar :data="data"/>
        </StoryWrapper>
    `,
})

StoryBlockCreateDealSidebar.story = {
    name: 'Default State',
}
