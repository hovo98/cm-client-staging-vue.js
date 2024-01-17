import BlockProfilePersonalSettings from '../components/blocks/BlockBlockProfilePersonalSettings'
import StoryWrapper from './config/StoryWrapper'

export default {
    title: 'Block: Block Profile Personal Settings',
}

// Default State
export const StoryBlockProfilePersonalSettings = () => ({
    components: {
        StoryWrapper,
        BlockProfilePersonalSettings,
    },

    data: function() {
        return {
            title: 'Block Profile Personal Settings',
            data: {
            },
        }
    },

    template: `
        <StoryWrapper :title="title" :container="false">
            <BlockProfilePersonalSettings :data="data"/>
        </StoryWrapper>
    `,
})

StoryBlockProfilePersonalSettings.story = {
    name: 'Default State',
}
