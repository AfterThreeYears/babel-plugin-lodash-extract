const babel = require('babel-core');
const plugin = require('../');

var example = `
import _ from 'lodash'
import isArray from 'lodash/isArray'
import { toString } from 'lodash'

isArray([])
_.add(1, 2)
toString(1)
_.add(1, 2)
isArray([1])
`;

it('works', () => {
  const {code} = babel.transform(example, {plugins: [plugin]});
  expect(code).toMatchSnapshot();
});