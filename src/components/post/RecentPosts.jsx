import { StyleSheet, Text, View, ScrollView, Image, TouchableOpacity, Dimensions, Alert } from 'react-native';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { baseUrl } from '../../utils/apiCofig';
import { useNavigation } from '@react-navigation/native';


const { width } = Dimensions.get('window');
const cardSize = (width - 60) / 2;

const RecentPosts = () => {
    const [recentNews, setRecentNews] = useState([]);
    const [index, setIndex] = useState(2);

    const navigation = useNavigation();

    useEffect(() => {
        fetchRecentNews();
    }, [index]);

    const fetchRecentNews = async () => {
        try {
            const res = await axios.get(`${baseUrl}/v1/post/getposts?limit=${index}`);
            setRecentNews(res.data.posts);
        } catch (error) {
            console.log("Error while fetching limit news", error);
        }
    };
    const handlepress=()=>{
        setIndex(index+2)
         fetchRecentNews()
    }

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.recent}>Recent News</Text>
            <View style={styles.grid}>
                {recentNews.map((item, i) => (
                    <TouchableOpacity
                        key={i}
                        style={styles.card}
                        onPress={() => {
                            navigation.navigate('NewsDetail', {
                                newsSlug: item.slug,
                            });
                        }}
                    >
                        <Image source={{ uri: item.image }} style={styles.image} />
                        <View style={styles.overlay}>
                            <Text style={styles.title} numberOfLines={3}>{item.title}</Text>
                        </View>
                    </TouchableOpacity>
                ))}
            </View>

            <TouchableOpacity onPress={handlepress}>
                <Text style={styles.btn}>Read more</Text>
            </TouchableOpacity>








        </ScrollView>
        
    );
};

export default RecentPosts;



const styles = StyleSheet.create({
    container: {
        padding: 10,
    },
    recent: {
        fontSize: 30,
        textAlign: "center",
        marginVertical: 15,
        fontWeight: 700
    },
    grid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    card: {
        width: cardSize,
        height: cardSize,
        marginBottom: 10,
        borderRadius: 10,
        overflow: 'hidden',
        backgroundColor: '#ccc',
        position: 'relative',
    },
    image: {
        width: '100%',
        height: '100%',
    },
    overlay: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        backgroundColor: 'rgba(0,0,0,0.5)',
        padding: 5,
    },
    title: {
        color: '#fff',
        fontSize: 13,
        fontWeight: 'bold',
    },
    btn:{
       alignSelf: 'center',
        marginBottom: 40,
        backgroundColor: '#eee',
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 6,
        

    }
});
