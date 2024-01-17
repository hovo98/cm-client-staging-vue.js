import BlockCreateDealFinishManagePriority from '../components/blocks/BlockCreateDealFinishManagePriority'
import StoryWrapper from './config/StoryWrapper'

export default {
    title: 'Block: Create Deal Finish Manage Priority',
}

// Default State
export const StoryBlockCreateDealFinishManagePriority = () => ({
    components: {
        StoryWrapper,
        BlockCreateDealFinishManagePriority,
    },

    data: function() {
        return {
            title: 'Create Deal Finish Manage Priority',
            data: {
            },
        }
    },

    template: `
        <StoryWrapper :title="title" :container="false">
            <BlockCreateDealFinishManagePriority :data="data"/>
        </StoryWrapper>
    `,
})

StoryBlockCreateDealFinishManagePriority.story = {
    name: 'Default State',
}
