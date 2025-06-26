import { Dimensions, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import SearchPost from '../components/post/SearchPost'
import axios from 'axios'
import { baseUrl } from '../utils/apiCofig'
import { Image } from 'react-native'
import { useNavigation } from '@react-navigation/native'

const { width } = Dimensions.get('window');
const cardSize = (width - 60) / 2;

const Search = () => {
    const navigation = useNavigation();

    const [input, setinput] = useState('')
    const [searchNews, setsearchNews] = useState([])



    console.log("search input", input)

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            fetchSearchNews();
        }, 500);

        return () => clearTimeout(timeoutId);
    }, [input]);



    const fetchSearchNews = async () => {
        try {
            const res = await axios.get(`${baseUrl}/v1/post/getposts?searchTerm=${input}`)
            const data = res.data
            setsearchNews(data.posts)

        } catch (error) {
            console.log("please try after some time..", error)

        }

    }


    return (
        <>
            <Header />
            <ScrollView>
                <View style={styles.heading}>

                    <Text style={styles.discover}>Discover</Text>
                    <Text style={styles.desc}>News from all over the world</Text>
                </View>

                <View style={styles.container}>
                    <TextInput
                        placeholder="Search ...."
                        placeholderTextColor="gray" 
                        autoCorrect={false}
                        style={styles.input}
                        value={input}
                        onChangeText={setinput}

                    />
                </View>
                {input.length > 0 && (
                    <View style={styles.gridContainer}>
                        {searchNews.map((post, index) => (
                            <TouchableOpacity onPress={() => navigation.navigate('NewsDetail', { newsSlug: post.slug })} key={index} style={[styles.card, { width: cardSize, height: cardSize }]}>
                                {post.image && (
                                    <Image
                                        source={{ uri: post.image }}
                                        style={styles.image}
                                        resizeMode="cover"
                                    />
                                )}
                                <Text style={styles.title} numberOfLines={2}>{post.title}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                )}

                <SearchPost />




            </ScrollView>
        </>


    )
}

export default Search

const styles = StyleSheet.create({
    heading: {
        marginVertical: 15,
        marginHorizontal: 10
    },
    discover: {
        fontSize: 40,
        fontWeight: 800
    },
    desc: {
        fontSize: 18,
        color: "#454545"
    },
    container: {
        padding: 10,
    },
    input: {
        width: '100%',
        padding: 12,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        backgroundColor: '#dadada',
        
    },
    gridContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 16,
        paddingHorizontal: 16,
        marginTop: 10,
        justifyContent: 'space-between',
    },
    card: {
        backgroundColor: '#f2f2f2',
        borderRadius: 8,
        overflow: 'hidden',
        marginBottom: 16,
    },
    image: {
        width: '100%',
        height: '70%',
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
    },
    title: {
        fontSize: 14,
        fontWeight: '600',
        padding: 8,
        color: '#333',
    },
    textRegister: {
        borderBottomColor: '#000', 
        borderBottomWidth: 1,
        width: '100%',
        marginVertical: 10, 
    }



})