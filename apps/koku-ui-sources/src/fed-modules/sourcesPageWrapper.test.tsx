import { render, screen } from '@testing-library/react';
import React from 'react';

import SourcesPageWrapper from './sourcesPageWrapper';

describe('SourcesPageWrapper', () => {
  it('renders with i18n title and Redux-backed count (PR2 foundation)', () => {
    render(<SourcesPageWrapper />);
    expect(screen.getByTestId('sources-skeleton')).toBeInTheDocument();
    expect(screen.getByText('Sources')).toBeInTheDocument();
    expect(screen.getByTestId('sources-redux-count')).toHaveTextContent('0');
  });
});
