import BlockBlockProfileSecuritySettings from '../components/blocks/BlockBlockProfileSecuritySettings'
import StoryWrapper from './config/StoryWrapper'

export default {
    title: 'Block: Block Profile Security Settings',
}

// Default State
export const StoryBlockBlockProfileSecuritySettings = () => ({
    components: {
        StoryWrapper,
        BlockBlockProfileSecuritySettings,
    },

    data: function() {
        return {
            title: 'Block Profile Security Settings',
            data: {
            },
        }
    },

    template: `
        <StoryWrapper :title="title" :container="false">
            <BlockBlockProfileSecuritySettings :data="data"/>
        </StoryWrapper>
    `,
})

StoryBlockBlockProfileSecuritySettings.story = {
    name: 'Default State',
}
