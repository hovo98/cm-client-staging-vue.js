import BlockCreateDealForm from '../components/blocks/BlockCreateDealForm'
import StoryWrapper from './config/StoryWrapper'

export default {
    title: 'Block: Create Deal Form',
}

// Default State
export const StoryBlockCreateDealForm = () => ({
    components: {
        StoryWrapper,
        BlockCreateDealForm,
    },

    data: function() {
        return {
            title: 'Create Deal Form',
            data: {
            },
        }
    },

    template: `
        <StoryWrapper :title="title" :container="false">
            <BlockCreateDealForm :data="data"/>
        </StoryWrapper>
    `,
})

StoryBlockCreateDealForm.story = {
    name: 'Default State',
}
