import { render, screen } from '@testing-library/react';
import React from 'react';

import SourcesPageWrapper from './sourcesPageWrapper';

jest.mock('api/entities', () => ({
  listSources: jest.fn().mockResolvedValue({
    data: [],
    meta: { count: 0 },
    links: { first: '', next: null, previous: null, last: '' },
  }),
  getSource: jest.fn(),
  createSource: jest.fn(),
  updateSource: jest.fn(),
  deleteSource: jest.fn(),
  pauseSource: jest.fn(),
  resumeSource: jest.fn(),
  createApplication: jest.fn(),
  deleteApplication: jest.fn(),
}));

describe('SourcesPageWrapper', () => {
  it('renders Sources list shell (empty state when no sources)', async () => {
    render(<SourcesPageWrapper />);
    expect(await screen.findByText('Get started by connecting your sources')).toBeInTheDocument();
  });
});
