import BlockProfileNotifications from '../components/blocks/BlockProfileNotifications'
import StoryWrapper from './config/StoryWrapper'

export default {
    title: 'Block: Profile Notifications',
}

// Default State
export const StoryBlockProfileNotifications = () => ({
    components: {
        StoryWrapper,
        BlockProfileNotifications,
    },

    data: function() {
        return {
            title: 'Profile Notifications',
            data: {
            },
        }
    },

    template: `
        <StoryWrapper :title="title" :container="false">
            <BlockProfileNotifications :data="data"/>
        </StoryWrapper>
    `,
})

StoryBlockProfileNotifications.story = {
    name: 'Default State',
}
