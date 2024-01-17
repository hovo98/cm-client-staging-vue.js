import BlockIndividualDealSlider from '../components/blocks/BlockIndividualDealSlider'
import StoryWrapper from './config/StoryWrapper'

export default {
    title: 'Block: Individual Deal Slider',
}

// Default State
export const StoryBlockIndividualDealSlider = () => ({
    components: {
        StoryWrapper,
        BlockIndividualDealSlider,
    },

    data: function() {
        return {
            title: 'Individual Deal Slider',
            data: {
            },
        }
    },

    template: `
        <StoryWrapper :title="title" :container="false">
            <BlockIndividualDealSlider :data="data"/>
        </StoryWrapper>
    `,
})

StoryBlockIndividualDealSlider.story = {
    name: 'Default State',
}
