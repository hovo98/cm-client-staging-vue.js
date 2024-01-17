import PartCreateQuote from '../components/parts/PartCreateQuote'
import StoryWrapper from './config/StoryWrapper'

export default {
    title: 'Part: Create Quote',
}

// Default State
export const StoryPartCreateQuote = () => ({
    components: {
        StoryWrapper,
        PartCreateQuote,
    },

    data: function() {
        return {
            title: 'Create Quote',
            data: {
            },
        }
    },

    template: `
        <StoryWrapper :title="title" :container="true">
            <PartCreateQuote :data="data"/>
        </StoryWrapper>
    `,
})

StoryPartCreateQuote.story = {
    name: 'Default State',
}
