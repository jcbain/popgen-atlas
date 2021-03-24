import React from 'react';
import { range } from 'lodash'

import Slider from '../components/charts/HistogramChart/Slider'

const data = range(0, 100)

export default {
  title: 'Components/Slider',
  component: Slider,
};

const Template = (args) => <Slider {...args} />;

export const WithData = Template.bind({});
WithData.args = {
    data: data,
};

export const LongData = Template.bind({});
LongData.args = {
    data: range(1, 1000)
}