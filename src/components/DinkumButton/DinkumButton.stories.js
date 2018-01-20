/*eslint-disable no-unused-vars*/
import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';

import DinkumButton  from './DinkumButton';

storiesOf('Dinkum Button', module)
    .add('Buton enabled', () => <DinkumButton onClick={action('clicked')} title='I am a button'/>)
    .add('Buton disabled', () => <DinkumButton disabled='true' onClick={action('clicked')} title='I am a button'/>);