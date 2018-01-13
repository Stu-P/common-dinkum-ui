import { configure } from '@storybook/react';
import 'loki/configure-react';

// automatically import all files ending in *.stories.js
const req = require.context('../src/components/DinkumButton', true, /.stories.js$/);
function loadStories() {
  req.keys().forEach((filename) => req(filename));
}

configure(loadStories, module);
