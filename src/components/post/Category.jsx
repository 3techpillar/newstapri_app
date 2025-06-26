import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { baseUrl } from '../../utils/apiCofig';

const Category = ({ setSelectedCategory }) => {
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState('');

  useEffect(() => {
    fetchCategory();
  }, []);

  const fetchCategory = async () => {
    try {
      const res = await axios.get(`${baseUrl}/v1/category/get-active`);
      const data = res.data;
      setCategories(data); 
    } catch (error) {
      console.log('error while fetching category', error);
    }
  };

  const handlePress = (value) => {
    setActiveCategory(value);
    setSelectedCategory(value);
  };

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={styles.sliderContainer}
    >
      {categories.map((item) => (
        <TouchableOpacity
          key={item._id}
          style={[
            styles.categoryItem,
            activeCategory === item.value && styles.activeCategoryItem,
          ]}
          onPress={() => handlePress(item.value)}
        >
          <Text
            style={[
              styles.categoryText,
              activeCategory === item.value && styles.activeCategoryText,
            ]}
          >
            {item.categoryName}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};


export default Category;

const styles = StyleSheet.create({
  sliderContainer: {
    marginVertical: 10,
    paddingHorizontal: 10,
  },
  categoryItem: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: '#dadada',
    borderRadius: 20,
    marginRight: 10,
  },
  activeCategoryItem: {
    backgroundColor: '#007bff',
  },
  categoryText: {
    fontSize: 14,
    fontWeight: '500',
    color: 'black',
  },
  activeCategoryText: {
    color: 'white',
    fontWeight: '700',
  },
});

