import gql from 'graphql-tag';
import { graphql } from '@apollo/react-hoc';
import VideoList from './VideoList';

export default graphql(
	gql`
		query Videos($limit: Int!) {
			videos(limit: $limit) {
				url
				thumbnails
				id
			}
		}
	`,
	{
		options: {
			notifyOnNetworkStatusChange: true,
			variables: { limit: 5 }
		}
	}
)(VideoList);
