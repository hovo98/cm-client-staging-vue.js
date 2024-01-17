import PartInputDate from '../components/parts/PartInputDate'
import StoryWrapper from './config/StoryWrapper'

export default {
    title: 'Part: Input Date',
}

// Default State
export const StoryPartInputDate = () => ({
    components: {
        StoryWrapper,
        PartInputDate,
    },

    data: function() {
        return {
            title: 'Input Date',
            data: {
            },
        }
    },

    template: `
        <StoryWrapper :title="title" :container="true">
            <PartInputDate :data="data"/>
        </StoryWrapper>
    `,
})

StoryPartInputDate.story = {
    name: 'Default State',
}
