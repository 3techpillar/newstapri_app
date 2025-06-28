import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { baseUrl } from '../../utils/apiCofig';
import { ScrollView, Text, View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Card } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
 








const Posts = () => {
    const navigation = useNavigation();

    const [news, setNews] = useState([]);
    const [showMore, setShowMore] = useState(false)

    useEffect(() => {
        fetchPosts();

    }, [])



    const fetchPosts = async () => {
        try {
            const res = await axios.get(`${baseUrl}/v1/post/getposts`);
            const data = res.data;

            setNews(data.posts)

            if (news.length < 12) {
                setShowMore(true)
            }
        } catch (error) {
            console.log("Error while fetching posts check again", error);
        }
    }
    const handleLoadMore = async () => {
        const startIndex = news.length;
        try {
            const res = await axios.get(`${baseUrl}/v1/post/getposts?startIndex=${startIndex}`);
            const data = res.data;

            setNews((prev) => [...prev, ...data.posts])

            if (news.length < 12) {
                setShowMore(false)
            }

        } catch (error) {
            console.log("Error while fetching posts check again", error);
        }

    }
    const handlePost = async (slug) => {
        navigation.navigate('NewsDetail', { newsSlug: slug });
    };

  



    return (


        <ScrollView style={styles.scrollView}>
            {news.length === 0 ? (
                <Text>No post found</Text>
            ) : (
                <>
                    {news.map((post, index) => (

                        <Card key={index} style={styles.card}>
                            <View style={styles.row}>
                                {post.image && (
                                    <Image
                                        source={{ uri: post.image }}
                                        style={styles.image}
                                        resizeMode="cover"
                                    />
                                )}
                                <TouchableOpacity
                                    style={{ flex: 1 }}
                                    onPress={() => handlePost(post.slug)}
                                >
                                    <View style={styles.textContainer}>
                                        <Text
                                            style={styles.title}
                                            numberOfLines={2}
                                            ellipsizeMode="tail"
                                        >
                                            {post.englishTitle}
                                        </Text>
                                        <Text style={styles.date}>
                                            {new Date(post.createdAt).toDateString()}
                                        </Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </Card>

                    ))}
                </>
            )}
            {showMore && (
                <TouchableOpacity
                    onPress={handleLoadMore}
                    style={styles.btn}
                >
                    <Text style={{ color: 'blue', fontWeight: 'bold' }}>View more...</Text>
                </TouchableOpacity>
            )}
            <View style={styles.horizontalLine} />

        </ScrollView>





    )
}


const styles = StyleSheet.create({
    card: {
        margin: 6,
        backgroundColor: '#f0f0f0',
        borderRadius: 10,
        overflow: "hidden"
    },
    row: {
        flexDirection: 'row',
        padding: 6,
    },
    image: {
        width: 90,
        height: 90,
        borderRadius: 8,
    },
    textContainer: {
        flex: 1,
        marginLeft: 10,
        justifyContent: 'center',
    },

    title: {
        fontSize: 18,
        fontWeight: 'bold',
        flexShrink: 1,
        overflow: 'ellipsis',
    },
    date: {
        color: '#666',
        fontSize: 14,
        marginTop: 4,
    },
    btn: {
        alignSelf: 'center',
        backgroundColor: '#eee',
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 6,
        marginVertical: 10

    },
    horizontalLine: {
        borderBottomColor: '#000',
        borderBottomWidth: 1,
        width: '100%',
        marginVertical: 0.2,
    }
});

export default Posts