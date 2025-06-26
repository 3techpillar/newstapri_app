import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
    FlatList,
    TextInput,
    TouchableOpacity,
    KeyboardAvoidingView,
    Platform,
} from 'react-native';
import { baseUrl } from '../../utils/apiCofig';
import useAuthStore from '../../store/useAuthStore';
import { formatTimeAgo } from '../../utils/Date';

const Comment = ({ postId }) => {
    const user = useAuthStore((state) => state.user);
    const token = useAuthStore((state) => state.token);

    const [comments, setComments] = useState([]);
    const [input, setInput] = useState('');

    useEffect(() => {
        fetchComments();
    }, [postId]);



    const fetchComments = async () => {

        try {
            const res = await axios.get(`${baseUrl}/v1/comment/getPostComment/${postId}`)
            setComments(res.data)
        } catch (error) {
            console.log("internal server error", error)

        }

    }


    const handleAddComment = async () => {
        if (input.trim() === '') return;
        try {
            const res = await axios.post(
                `${baseUrl}/v1/comment/create`,
                {
                    content: input,
                    postId,
                    userId: user._id,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            setComments([res.data, ...comments]);
            setInput('');
        } catch (error) {
            console.log('Error posting comment:', error.response?.data?.message || error.message);
        }
    };



    return (
        <View

            style={styles.container}
        >
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    value={input}
                    onChangeText={setInput}
                    placeholder="Write a comment..."
                    placeholderTextColor="#888"
                />
                <TouchableOpacity style={styles.button} onPress={handleAddComment}>
                    <Text style={styles.buttonText}>Post</Text>
                </TouchableOpacity>
            </View>
            <View contentContainerStyle={{ paddingBottom: 100 }}>
                {comments.map((item, index) => (
                    <View style={styles.commentBox} key={index}>
                        <View style={styles.commentRow}>
                            <View style={styles.profileCircle}>
                                <Text style={styles.profileInitial}>
                                    {item.user?.name?.charAt(0) || 'U'}
                                </Text>
                            </View>
                            <View style={styles.commentContent}>
                                <View style={styles.commentUser}>
                                <Text style={styles.userName}>{item.user?.name || 'Unknown'}</Text>
                                <Text style={styles.timestamp}>{formatTimeAgo(item.createdAt)}</Text>
                                </View>
                                <Text style={styles.commentText}>{item.content}</Text>
                            </View>
                        </View>
                    </View>
                ))}

            </View>
        </View>
    );
};




export default Comment;

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        paddingHorizontal: 16,
        paddingTop: 16,
    },
    commentBox: {
        backgroundColor: '#f2f2f2',
        padding: 12,
        borderRadius: 10,
        marginBottom: 10,
    },
    commentText: {
        fontSize: 16,
        color: '#333',
    },
    inputContainer: {
        flexDirection: "row",
        backgroundColor: '#fff',
        padding: 10,
        borderTopColor: '#ddd',
        borderTopWidth: 1,
        alignItems: 'center',
    },
    input: {
        flex: 1,
        backgroundColor: '#f0f0f0',
        borderRadius: 20,
        paddingHorizontal: 15,
        paddingVertical: 8,
        fontSize: 16,
        color: '#000',
    },
    button: {
        marginLeft: 10,
        backgroundColor: '#007bff',
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 20,
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
    },

    commentRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
},

profileCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#007bff',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
},

profileInitial: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
},

commentContent: {
    flex: 1,
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    padding: 10,
},

commentUser: {
    flexDirection: 'row',
    justifyContent: "space-between",
    alignItems: "center"
},

userName: {
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
},

timestamp: {
    marginTop: 4,
    fontSize: 12,
    color: '#888',
},
});
