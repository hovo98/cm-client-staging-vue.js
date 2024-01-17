import BlockProfileSidebar from '../components/blocks/BlockProfileSidebar'
import StoryWrapper from './config/StoryWrapper'

export default {
    title: 'Block: Profile Sidebar',
}

// Default State
export const StoryBlockProfileSidebar = () => ({
    components: {
        StoryWrapper,
        BlockProfileSidebar,
    },

    data: function() {
        return {
            title: 'Profile Sidebar',
            data: {
            },
        }
    },

    template: `
        <StoryWrapper :title="title" :container="false">
            <BlockProfileSidebar :data="data"/>
        </StoryWrapper>
    `,
})

StoryBlockProfileSidebar.story = {
    name: 'Default State',
}
