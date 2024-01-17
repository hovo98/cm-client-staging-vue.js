import PartPurchaseForm from '../components/parts/PartPurchaseForm'
import StoryWrapper from './config/StoryWrapper'

export default {
    title: 'Part: Purchase Form',
}

// Default State
export const StoryPartPurchaseForm = () => ({
    components: {
        StoryWrapper,
        PartPurchaseForm,
    },

    data: function() {
        return {
            title: 'Purchase Form',
            data: {
            },
        }
    },

    template: `
        <StoryWrapper :title="title" :container="true">
            <PartPurchaseForm :data="data"/>
        </StoryWrapper>
    `,
})

StoryPartPurchaseForm.story = {
    name: 'Default State',
}
