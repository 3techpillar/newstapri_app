import { FlatList, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import useAuthStore from '../store/useAuthStore';
import { baseUrl } from '../utils/apiCofig';
import { ScrollView } from 'react-native-gesture-handler';

const Transactions = () => {
  const [transactions, setTransactions] = useState([]);
  const user = useAuthStore((state) => state.user);

  const fetchTransaction = async () => {
    try {
      const res = await axios.get(`${baseUrl}/v1/transaction/${user._id}`);
      const data = res.data;
      setTransactions(data.transactions );
    } catch (error) {
      console.log('Transaction fetch error:', error.message);
    }
  };

  useEffect(() => {
    if (user?._id) {
      fetchTransaction();
    }
  }, [user._id]);

  

  return (
       <View style={styles.container}>
      <Text style={styles.header}>📋 My Transactions</Text>

    
      <View style={styles.tableHeader}>
        <Text style={styles.headerText}>Date</Text>
        <Text style={styles.headerText}>Description</Text>
        <Text style={styles.headerText}>Type</Text>
        <Text style={styles.headerText}>Points</Text>
        <Text style={styles.headerText}>Amount</Text>
        <Text style={styles.headerText}>Status</Text>
      </View>

    
      <ScrollView>
        {transactions.length === 0 ? (
          <Text style={styles.emptyText}>No transactions found.</Text>
        ) : (
          transactions.map((item, index) => (
            <View
              key={index}
              style={[
                styles.tableRow,
                index % 2 === 0 ? styles.rowEven : styles.rowOdd,
              ]}
            >
              <Text style={styles.cell}>{new Date(item.createdAt).toLocaleDateString()}</Text>
              <Text style={styles.cell}>{item.description}</Text>
              <Text style={styles.cell}>{item.type}</Text>
              <Text style={styles.cell}>{item.points}</Text>
              <Text style={styles.cell}>{item.amount}</Text>
              <Text style={[styles.cell, styles[item.status]]}>{item.status}</Text>
            </View>
          ))
        )}
      </ScrollView>
    </View>
  );
};



export default Transactions;

const styles = StyleSheet.create({
  container: {
     flex: 1,
      padding: 10,
       backgroundColor: '#f4f6f8',
       paddingTop:40,
       },

  header: {
    fontSize: 22,
    width:"100%",
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 10,
    color: '#333',
  },

  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#0066cc',
    paddingVertical: 10,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  headerText: {
    flex: 1,
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 14,
  },

  tableRow: {
    flexDirection: 'row',
    paddingVertical: 10,
    paddingHorizontal: 4,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  rowEven: {
    backgroundColor: '#ffffff',
  },
  rowOdd: {
    backgroundColor: '#f0f4f7',
  },
  cell: {
    flex: 1,
    textAlign: 'center',
    fontSize: 13,
    color: '#333',
  },

  emptyText: {
    marginTop: 20,
    textAlign: 'center',
    color: '#999',
    fontSize: 16,
  },

  // Status Styles
  approved: {
    color: '#2e7d32',
    fontWeight: '600',
  },
  pending: {
    color: '#ff9800',
    fontWeight: '600',
  },
  rejected: {
    color: '#c62828',
    fontWeight: '600',
  },
});