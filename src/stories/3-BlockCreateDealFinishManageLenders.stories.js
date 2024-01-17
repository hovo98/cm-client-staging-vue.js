import BlockCreateDealFinishManageLenders from '../components/blocks/BlockCreateDealFinishManageLenders'
import StoryWrapper from './config/StoryWrapper'

export default {
    title: 'Block: Create Deal Finish Manage Lenders',
}

// Default State
export const StoryBlockCreateDealFinishManageLenders = () => ({
    components: {
        StoryWrapper,
        BlockCreateDealFinishManageLenders,
    },

    data: function() {
        return {
            title: 'Create Deal Finish Manage Lenders',
            data: {
            },
        }
    },

    template: `
        <StoryWrapper :title="title" :container="false">
            <BlockCreateDealFinishManageLenders :data="data"/>
        </StoryWrapper>
    `,
})

StoryBlockCreateDealFinishManageLenders.story = {
    name: 'Default State',
}
