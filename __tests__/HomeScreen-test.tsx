import { render } from '@testing-library/react-native';

import HomeScreen from '@/app/(tabs)/inicio/index';

describe('<HomeScreen />', () => {
  test('Text renders correctly on HomeScreen', () => {
    const { getByText } = render(<HomeScreen />);

    getByText('Browse the Docs');
  });
});
