import BlockCreateDealPropertyTypeOwnerOccupied from '../components/blocks/BlockCreateDealPropertyTypeOwnerOccupied'
import StoryWrapper from './config/StoryWrapper'

export default {
    title: 'Block: Create Deal Property Type Owner Occupied',
}

// Default State
export const StoryBlockCreateDealPropertyTypeOwnerOccupied = () => ({
    components: {
        StoryWrapper,
        BlockCreateDealPropertyTypeOwnerOccupied,
    },

    data: function() {
        return {
            title: 'Create Deal Property Type Owner Occupied',
            data: {
            },
        }
    },

    template: `
        <StoryWrapper :title="title" :container="false">
            <BlockCreateDealPropertyTypeOwnerOccupied :data="data"/>
        </StoryWrapper>
    `,
})

StoryBlockCreateDealPropertyTypeOwnerOccupied.story = {
    name: 'Default State',
}
