import React from 'react';
import { render, WithRoute } from 'lib/testHelpers';
import Topics from 'components/Topics/Topics';
import { screen } from '@testing-library/react';
import {
  clusterTopicCopyPath,
  clusterTopicNewPath,
  clusterTopicPath,
  clusterTopicsPath,
  getNonExactPath,
} from 'lib/paths';

const listContainer = 'listContainer';
const topicContainer = 'topicContainer';
const newCopyContainer = 'newCopyContainer';

jest.mock('components/Topics/List/ListContainer', () => () => (
  <div>{listContainer}</div>
));
jest.mock('components/Topics/Topic/TopicContainer', () => () => (
  <div>{topicContainer}</div>
));
jest.mock('components/Topics/New/New', () => () => (
  <div>{newCopyContainer}</div>
));

describe('Topics Component', () => {
  const clusterName = 'clusterName';
  const topicName = 'topicName';
  const setUpComponent = (path: string) => {
    return render(
      <WithRoute path={getNonExactPath(clusterTopicsPath())}>
        <Topics />
      </WithRoute>,
      { initialEntries: [path] }
    );
  };

  it('should check if the page is Topics List rendered', () => {
    setUpComponent(clusterTopicsPath(clusterName));
    expect(screen.getByText(listContainer)).toBeInTheDocument();
  });

  it('should check if the page is  New Topic  rendered', () => {
    setUpComponent(clusterTopicNewPath(clusterName));
    expect(screen.getByText(newCopyContainer)).toBeInTheDocument();
  });

  it('should check if the page is Copy Topic rendered', () => {
    setUpComponent(clusterTopicCopyPath(clusterName));
    expect(screen.getByText(newCopyContainer)).toBeInTheDocument();
  });

  it('should check if the page is Topic page rendered', () => {
    setUpComponent(clusterTopicPath(clusterName, topicName));
    expect(screen.getByText(topicContainer)).toBeInTheDocument();
  });
});
