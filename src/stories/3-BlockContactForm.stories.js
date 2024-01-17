import BlockContactForm from '../components/blocks/BlockContactForm'
import StoryWrapper from './config/StoryWrapper'

export default {
    title: 'Block: Contact Form',
}

// Default State
export const StoryBlockContactForm = () => ({
    components: {
        StoryWrapper,
        BlockContactForm,
    },

    data: function() {
        return {
            title: 'Contact Form',
            data: {
            },
        }
    },

    template: `
        <StoryWrapper :title="title" :container="false">
            <BlockContactForm :data="data"/>
        </StoryWrapper>
    `,
})

StoryBlockContactForm.story = {
    name: 'Default State',
}
