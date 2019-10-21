import React, { Component } from 'react';
// import { useQuery } from '@apollo/react-hooks';
// import { gql } from 'apollo-boost';
import { View, FlatList, Image, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Video } from 'expo-av';

// const VIDEOS = gql`
// 	query Videos($limit: Int = 5) {
// 		videos(limit: $limit) {
// 			url
// 			thumbnails
// 			id
// 		}
// 	}
// `

// function Videos() {
// 	const { loading, error, data } = useQuery(VIDEOS);

// 	if (loading) return <p>Loading...</p>;
//   if (error) return <p>Error :(</p>;

//   return data;
// } 

class VideoList extends Component {
  constructor (props) {
    super(props);
    this.state = {
      currentItems: [{
        index: 0
      }],
      nowPlaying: 0
    };
    this.filmStripRef = React.createRef();
    this.videoRef = React.createRef();
  }

  onViewableItemsChanged = ({ viewableItems, changed }) => {
    this.setState({
      currentItems: viewableItems,
      nowPlaying: changed[0].index
    });
  }

  componentDidUpdate() {
    this.filmStripRef.current && this.goIndex();
  }

  goIndex = () => {
    this.filmStripRef.current.scrollToIndex({
      animated: true,
      index:this.state.currentItems[0].index
    });
  };

  updateVideo(index) {
    this.videoRef.current.scrollToIndex({
      animated: true,
      index
    });
    this.setState({
      nowPlaying: index
    });
  }

  render() {
    if (this.props.data.networkStatus === 1) {
      return (<Text>Loading</Text>);
    }
  
    if (this.props.data.error) {
      return <Text>Error: {data.error.message}</Text>;
    }

    return (
      <View>
        <Text style={styles.centerText}>Currently viewing video {this.state.nowPlaying + 1} of {this.props.data.videos.length}</Text>
        <FlatList
          ref={this.videoRef}
          viewabilityConfig={{
            viewAreaCoveragePercentThreshold: 50
          }}
          onViewableItemsChanged={this.onViewableItemsChanged}
          data={this.props.data.videos}
          horizontal
          style={styles.videos}
          keyExtractor={(item) => `video-list-${item.id}`}
          onEndReached={() => {
            // The fetchMore method is used to load new data and add it
            // to the original query we used to populate the list
            this.props.data.fetchMore({
              variables: { limit: this.props.data.videos.length + 5 },
              updateQuery: (previousResult, { fetchMoreResult }) => {
                // Don't do anything if there weren't any new items
                if (!fetchMoreResult || fetchMoreResult.videos.length === 0) {
                  return previousResult;
                }

                return {
                  // Concatenate the new feed results after the old ones
                  videos: fetchMoreResult.videos,
                };
              },
            });
          }}
          onEndReachedThreshold={0.2}
          renderItem={({item, index}) => (
            <Video
              source={{ uri: item.url }}
              rate={1.0}
              volume={1.0}
              isMuted={false}
              useNativeControls
              resizeMode="cover"
              shouldPlay={this.state.nowPlaying === index}
              style={styles.video}
              usePoster
              posterSource={{ uri: item.thumbnails[0] }}
            />
          )}
        />
        <FlatList
          ref={this.filmStripRef}
          data={this.props.data.videos}
          style={styles.filmstrip}
          horizontal
          keyExtractor={(item) => `thumbnail-list-${item.id}`}
          renderItem={({item, index}) => (
            <TouchableOpacity onPress={() => this.updateVideo(index)}>
              <Image
                source={{ uri: item.thumbnails[0] }}
                style={styles.image}
              />
            </TouchableOpacity>
          )}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  video: {
    width: 300,
    height: 300,
    borderRadius: 16,
    margin: 16
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 8,
    margin: 8
  },
  filmstrip: {
    flexGrow: 0,
    backgroundColor: '#dddddd',
  },
  videos: {
    flexGrow: 0,
    backgroundColor: '#eeeeee',
    marginTop: 16
  },
  centerText: {
    textAlign: 'center'
  }
});


export default VideoList;
