import PartDottedList from '../components/parts/PartDottedList'
import StoryWrapper from './config/StoryWrapper'

export default {
    title: 'Part: Dotted List',
}

// Default State
export const StoryPartDottedList = () => ({
    components: {
        StoryWrapper,
        PartDottedList,
    },

    data: function() {
        return {
            title: 'Dotted List',
            data: {
            },
        }
    },

    template: `
        <StoryWrapper :title="title" :container="true">
            <PartDottedList :data="data"/>
        </StoryWrapper>
    `,
})

StoryPartDottedList.story = {
    name: 'Default State',
}
