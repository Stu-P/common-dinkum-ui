var chai = require('chai');
var sinonChai = require('sinon-chai');

chai.use(sinonChai);

import Enzyme from 'enzyme';

import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });