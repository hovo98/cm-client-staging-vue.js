import PartThankYouMessage from '../components/parts/PartThankYouMessage'
import StoryWrapper from './config/StoryWrapper'

export default {
    title: 'Part: Thank You Message',
}

// Default State
export const StoryPartThankYouMessage = () => ({
    components: {
        StoryWrapper,
        PartThankYouMessage,
    },

    data: function() {
        return {
            title: 'Thank You Message',
            data: {
            },
        }
    },

    template: `
        <StoryWrapper :title="title" :container="true">
            <PartThankYouMessage :data="data"/>
        </StoryWrapper>
    `,
})

StoryPartThankYouMessage.story = {
    name: 'Default State',
}
