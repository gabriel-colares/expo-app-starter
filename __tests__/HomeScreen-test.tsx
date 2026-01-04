import React from 'react';
import { Image } from 'react-native';
import { render } from '@testing-library/react-native';

import Inicio from '@/app/(tabs)/inicio/index';

function flattenStyle(style: any) {
  if (!style) return {};
  if (Array.isArray(style)) return Object.assign({}, ...style);
  return style;
}

describe('<Inicio />', () => {
  test('renders CTA buttons', () => {
    const { getByText } = render(<Inicio />);

    getByText('Browse the Docs');
    getByText('Star the Repo');
  });

  test('renders the instructions (including the code label)', () => {
    const { getByText } = render(<Inicio />);

    // o "app/index.tsx" está em um <Text> aninhado, então é o mais estável pra buscar
    getByText('app/index.tsx');
    getByText('2. Save to see your changes instantly.');
  });

  test('renders the logo image with expected props', () => {
    const { UNSAFE_getByType } = render(<Inicio />);

    const img = UNSAFE_getByType(Image);
    const style = flattenStyle(img.props.style);

    expect(img).toBeTruthy();
    expect(img.props.resizeMode).toBe('contain');
    expect(style).toEqual(expect.objectContaining({ height: 76, width: 76 }));
  });

  test('matches snapshot', () => {
    const { toJSON } = render(<Inicio />);
    expect(toJSON()).toMatchSnapshot();
  });
});
