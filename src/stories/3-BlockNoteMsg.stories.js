import BlockNoteMsg from '../components/blocks/BlockNoteMsg'
import StoryWrapper from './config/StoryWrapper'

export default {
    title: 'Block: Note Msg',
}

// Default State
export const StoryBlockNoteMsg = () => ({
    components: {
        StoryWrapper,
        BlockNoteMsg,
    },

    data: function() {
        return {
            title: 'Note Msg',
            data: {
            },
        }
    },

    template: `
        <StoryWrapper :title="title" :container="false">
            <BlockNoteMsg :data="data"/>
        </StoryWrapper>
    `,
})

StoryBlockNoteMsg.story = {
    name: 'Default State',
}
