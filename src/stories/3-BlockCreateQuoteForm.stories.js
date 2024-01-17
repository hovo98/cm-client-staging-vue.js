import BlockCreateQuoteForm from '../components/blocks/BlockCreateQuoteForm'
import StoryWrapper from './config/StoryWrapper'

export default {
    title: 'Block: Create Quote Form',
}

// Default State
export const StoryBlockCreateQuoteForm = () => ({
    components: {
        StoryWrapper,
        BlockCreateQuoteForm,
    },

    data: function() {
        return {
            title: 'Create Quote Form',
            data: {
            },
        }
    },

    template: `
        <StoryWrapper :title="title" :container="false">
            <BlockCreateQuoteForm :data="data"/>
        </StoryWrapper>
    `,
})

StoryBlockCreateQuoteForm.story = {
    name: 'Default State',
}
