import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { use, useEffect, useState } from 'react'
import axios from 'axios';
import { baseUrl } from '../../utils/apiCofig';
import { SafeAreaView } from 'react-native-safe-area-context';
import Category from './Category';
import { Card } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

const SearchPost = () => {

    const navigation = useNavigation();

    const [categoryNews, setcategoryNews] = useState([])
    const[selectedCategory,setselectedCategory]=useState('national-news')
  


    useEffect(() => {
        const fetchCategoryNews = async () => {
            try {
                const res = await axios.get(`${baseUrl}/v1/post/getposts?category=${selectedCategory}`)
                const data = res.data;
                setcategoryNews(data.posts);
    
            } catch (error) {
                console.log("error while fetching category news", error)
    
            }
        }
        fetchCategoryNews()
    }, [selectedCategory])

    return (

        <SafeAreaView>

            <Category setSelectedCategory={setselectedCategory}  />

            <View>
                {categoryNews.length === 0 ? (
                    <Text>No posts found.</Text>
                ) : (
                    categoryNews.map((post, index) => (
                         <Card key={index} style={styles.card}>
                            <View style={styles.row}>
                                {post.image && (
                                    <Image
                                        source={{ uri: post.image }}
                                        style={styles.image}
                                        resizeMode="cover"
                                    />
                                )}
                                <TouchableOpacity onPress={()=>navigation.navigate('NewsDetail',{
                                    newsSlug:post.slug
                                })}>
                                <View style={styles.textContainer}>
                                    <Text style={styles.title}>{post.title}</Text>
                                    <Text style={styles.date}>
                                        {new Date(post.createdAt).toDateString()}
                                    </Text>
                                </View>
                                </TouchableOpacity>
                            </View>
                        </Card>
                    ))
                )}
            </View>
        </SafeAreaView>

    )
}

export default SearchPost

const styles = StyleSheet.create({

    card: {
        marginVertical: 1,
        marginHorizontal: 10,
        backgroundColor: '#f0f0f0',
        borderRadius: 8,
        overflow: 'hidden',
    },
    row: {
        flexDirection: 'row',
        padding: 10,
    },
    image: {
        width: 80,
        height: 80,
        borderRadius: 8,
    },
    textContainer: {
        flex: 1,
        paddingHorizontal: 10,
        justifyContent: 'center',
    },
    title: {
        fontWeight: 'bold',
        fontSize: 16,
        flexWrap: 'wrap',
    },
    date: {
        color: '#666',
        fontSize: 12,
        marginTop: 4,
    },
    btn: {
        alignSelf: 'center',
        marginBottom: 300,
        backgroundColor: '#eee',
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 6,
    }
})