import Select from "../src/Select";

export default {
    title: 'Select',
    component: Select,
    // argTypes: {
    //     variant: {
    //         type: 'string',
    //         description: ''
    //     }
    // }
}

const TemplateSelect = (args) => <Select {...args}/>

export const Primary = TemplateSelect.bind({})

Primary.args = {

    setOpen: () => {},

    open: true,

    options: [
        {label: `video`, value: `video`}, 
        {label: `audio`, value: `audio`}
      ]
}