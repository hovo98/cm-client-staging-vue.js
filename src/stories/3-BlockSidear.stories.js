import BlockDashboardSidebar from '../components/blocks/BlockDashboardSidebar'
import StoryWrapper from './config/StoryWrapper'

export default {
    title: 'Block: Dashboard Sidebar',
}

// Default State
export const StoryBlockDashboardSidebar = () => ({
    components: {
        StoryWrapper,
        BlockDashboardSidebar,
    },

    data: function() {
        return {
            title: 'Dashboarad Sidebar',
            data: {
            },
        }
    },

    template: `
        <StoryWrapper :title="title" :container="false">
            <BlockDashboardSidebar :data="data"/>
        </StoryWrapper>
    `,
})

StoryBlockDashboardSidebar.story = {
    name: 'Default State',
}
