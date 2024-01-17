import BlockProfileTabs from '../components/blocks/BlockProfileTabs'
import StoryWrapper from './config/StoryWrapper'

export default {
    title: 'Block: Profile Tabs',
}

// Default State
export const StoryBlockProfileTabs = () => ({
    components: {
        StoryWrapper,
        BlockProfileTabs,
    },

    data: function() {
        return {
            title: 'Profile Tabs',
            data: {
            },
        }
    },

    template: `
        <StoryWrapper :title="title" :container="false">
            <BlockProfileTabs :data="data"/>
        </StoryWrapper>
    `,
})

StoryBlockProfileTabs.story = {
    name: 'Default State',
}
