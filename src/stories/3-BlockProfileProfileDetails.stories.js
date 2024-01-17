import BlockProfileBrokerDetails from '../components/blocks/BlockProfileBrokerDetails'
import StoryWrapper from './config/StoryWrapper'

export default {
    title: 'Block: Profile Profile Details',
}

// Default State
export const StoryBlockProfileBrokerDetails = () => ({
    components: {
        StoryWrapper,
        BlockProfileBrokerDetails,
    },

    data: function() {
        return {
            title: 'Profile Profile Details',
            data: {
            },
        }
    },

    template: `
        <StoryWrapper :title="title" :container="false">
            <BlockProfileBrokerDetails :data="data"/>
        </StoryWrapper>
    `,
})

StoryBlockProfileBrokerDetails.story = {
    name: 'Default State',
}
