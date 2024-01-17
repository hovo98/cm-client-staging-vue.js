import PartInputSelect from '../components/parts/PartInputSelect'
import StoryWrapper from './config/StoryWrapper'

export default {
    title: 'Part: Input Select',
}

// Default State
export const StoryPartInputSelect = () => ({
    components: {
        StoryWrapper,
        PartInputSelect,
    },

    data: function() {
        return {
            title: 'Input Select',
            data: {
            },
        }
    },

    template: `
        <StoryWrapper :title="title" :container="true">
            <PartInputSelect :data="data"/>
        </StoryWrapper>
    `,
})

StoryPartInputSelect.story = {
    name: 'Default State',
}
