import { StyleSheet, Text, View, Image, Dimensions, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import Header from '../Header';
import axios from "axios"
import { baseUrl } from '../../utils/apiCofig';
import { ScrollView } from 'react-native-gesture-handler';
import RenderHTML from 'react-native-render-html';
import RecentPosts from '../post/RecentPosts';
import { TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import useAuthStore from '../../store/useAuthStore';
import Comment from '../post/Comment';
import { getApp } from '@react-native-firebase/app';
import { getAnalytics, logEvent, logLogin } from '@react-native-firebase/analytics';

const { width } = Dimensions.get('window');





const NewsDetail = ({ route }) => {
    const { newsSlug } = route.params;
    const [newsDetail, setNewsDetail] = useState([])
    const [like, setlike] = useState(false)
    const token = useAuthStore((state) => state.token);
    const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
    const user = useAuthStore((state) => state.user);
    const navigation = useNavigation();

    useEffect(() => {
        fetchNewsBySlug();
    }, [newsSlug]);

    useEffect(() => {
        useAuthStore.getState().loadUserFromStorage();
    }, []);

    useEffect(() => {
        const sendTestEvent = async () => {
            try {
                const app = getApp();
                const analytics = getAnalytics(app);

                await logEvent(analytics, 'News_clicked', {
                    status: 'Clicked',
                    timestamp: Date.now(),
                    news:newsSlug.slice(0,50)
                });
              
            } catch (error) {
                console.log('❌ Error logging event', error);
            }
        };

        sendTestEvent();
    }, [newsSlug]);


    const fetchNewsBySlug = async () => {
        try {
            const res = await axios.get(`${baseUrl}/v1/post/getposts?slug=${newsSlug}`)
            const data = res.data;
            const fetchedPost = data.posts?.[0];
            setNewsDetail(fetchedPost);

            if (fetchedPost?.likes?.includes(user._id)) {
                setlike(true);
            } else {
                setlike(false);
            }
        } catch (error) {
            console.log("Error while fetching news", error);

        }
    }

    const handleLike = async (id) => {
        try {
            const res = await axios.put(
                `${baseUrl}/v1/post/likepost/${id}`,
                { userId: user._id },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            console.log("after like-post", res.data)
            console.log("userId", user._id)

            setlike(!like);

            console.log("like-post-number", res.data.likes);
        } catch (error) {
            console.log("Internal server error from server", error.message);
        }
    };


    return (
        <>
            <Header />
            <ScrollView style={styles.container}>


                <Text style={styles.title}>{newsDetail.title}</Text>
                <Text style={styles.englishTitle}>{newsDetail.englishTitle}</Text>

                <Image source={{ uri: newsDetail.image }} style={styles.image} />

                <TouchableOpacity onPress={() => {
                    if (isAuthenticated) {
                        handleLike(newsDetail._id);
                    } else {
                        navigation.navigate('Signup');
                    }
                }}>

                    <Text style={{ color: like ? "red" : "gray",padding:"5",fontSize:15}}>
                        {like ? "♥ Liked" : "♡ Like"}
                    </Text>


                </TouchableOpacity>




                <RenderHTML
                    contentWidth={width}
                    source={{ html: newsDetail.content }}
                    tagsStyles={htmlStyles}

                />

                <Comment postId={newsDetail._id} />

                <RecentPosts />
            </ScrollView>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        backgroundColor: '#fff',
        padding: 16,

    },
    head: {
        marginBottom: 10,

    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#111',
        marginBottom: 4,
    },
    englishTitle: {
        fontSize: 16,
        fontWeight: '500',
        color: '#555',
        marginBottom: 10,
    },
    image: {
        width: '100%',
        height: 220,
        resizeMode: 'cover',
        borderRadius: 10,
        marginBottom: 16,
    },
    metaText: {
        fontSize: 14,
        color: '#888',
        marginTop: 12,
    },
    likes: {
        fontSize: 30,
        fontWeight: '500',
        color: '#333',
        marginVertical: 8,
    }
});
const htmlStyles = {
    p: {
        fontSize: 16,
        lineHeight: 26,
        color: '#333',
        marginBottom: 10,
    },
    h2: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#1a1a1a',
        marginVertical: 10,
        borderLeftWidth: 4,
        borderLeftColor: '#007bff',
        paddingLeft: 8,
        backgroundColor: '#f0f8ff',
    },
    strong: {
        fontWeight: 'bold',
    },
};




export default NewsDetail;
