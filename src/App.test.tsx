
import { initialData } from './Mocks/initialData';
import { indexCountriesByName } from './utils/functions';

test('load all options', () => {
  const options = indexCountriesByName(initialData)
  expect(Object.keys(options).length).toBe(16657);
});
