import PartDotsDropdown from '../components/parts/PartDotsDropdown'
import StoryWrapper from './config/StoryWrapper'

export default {
    title: 'Part: Dots Dropdown',
}

// Default State
export const StoryPartDotsDropdown = () => ({
    components: {
        StoryWrapper,
        PartDotsDropdown,
    },

    data: function() {
        return {
            title: 'Dots Dropdown',
            data: {
            },
        }
    },

    template: `
        <StoryWrapper :title="title" :container="true">
            <PartDotsDropdown :data="data"/>
        </StoryWrapper>
    `,
})

StoryPartDotsDropdown.story = {
    name: 'Default State',
}
