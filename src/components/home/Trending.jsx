import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  ActivityIndicator,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { baseUrl } from '../../utils/apiCofig';
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window');

const Trending = () => {
  const [trendingNews, setTrendingNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    fetchTrendingPost();
  }, []);

  const fetchTrendingPost = async () => {
    try {
      const res = await axios.get(`${baseUrl}/v1/post/getposts?trending=true`);
      const data = res.data;
      setTrendingNews(data.posts || []);
    } catch (error) {
      console.log('Error while fetching trending news', error);
    } finally {
      setLoading(false);
    }
  };

  const scrollViewRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const totalSlides = 4;

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => {
        const nextIndex = (prevIndex + 1) % totalSlides;
        scrollViewRef.current?.scrollTo({ x: nextIndex * width, animated: true });
        return nextIndex;
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);



  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#000" />
      ) : trendingNews.length > 0 ? (
        <ScrollView
          horizontal
          ref={scrollViewRef}
          nestedScrollEnabled={true}
          pagingEnabled
          showsHorizontalScrollIndicator={true}
          style={styles.sliderContainer}
          onScroll={(e) => {
            const offsetX = e.nativeEvent.contentOffset.x;
            const index = Math.round(offsetX / width);
            setCurrentIndex(index);
          }}
          scrollEventThrottle={16}
        >
          {trendingNews.map((item, index) => (

            <TouchableOpacity
              key={index}
              onPress={() => {
                navigation.navigate('NewsDetail', {
                  newsSlug: item.slug,
                });
              }}
            >
              <View key={index} style={styles.slide}>
                <Image source={{ uri: item.image }} style={styles.image} />
                <View style={styles.textContainer}>
                  <Text style={styles.title} numberOfLines={2}>
                    {item.title}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      ) : (
        <Text style={styles.noNews}>No trending news found.</Text>
      )}

    </View>
  );
};

export default Trending;

const styles = StyleSheet.create({
  container: {
    margin: 1
  },
  sliderContainer: {
    width: '100%',

  },
  slide: {
    width: width,
    height: 230,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  textContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  title: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  noNews: {
    textAlign: 'center',
    fontSize: 16,
    color: 'gray',
    marginTop: 20,
  },
});
