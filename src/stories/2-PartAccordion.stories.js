import PartAccordion from '../components/parts/PartAccordion'
import StoryWrapper from './config/StoryWrapper'

export default {
    title: 'Part: Accordion',
}

// Default State
export const StoryPartAccordion = () => ({
    components: {
        StoryWrapper,
        PartAccordion,
    },

    data: function() {
        return {
            title: 'Accordion',
            data: {
            },
        }
    },

    template: `
        <StoryWrapper :title="title" :container="true">
            <PartAccordion :data="data"/>
        </StoryWrapper>
    `,
})

StoryPartAccordion.story = {
    name: 'Default State',
}
