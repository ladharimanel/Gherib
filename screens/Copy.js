import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { Table, Row, Rows } from 'react-native-table-component';
import axios from 'axios';
import { SearchBar } from 'react-native-elements';
import LottieView from 'lottie-react-native';


const GheribData = () => {
    const [tableData, setTableData] = useState([]);
    const [filteredTableData, setFilteredTableData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await axios.get('http://41.226.178.8:1680/Historique/getSociete?Societe=GHERIB FARHAT FRERES');
            setTableData(response.data);
            setFilteredTableData(response.data);
            console.log('kkkkkk',filteredTableData);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const searchFilter = (searchText) => {
        const [searchMonth, searchYear] = searchText.split('-');
        const filteredData = tableData.filter((item) => {

            const itemDate = new Date(item.date);
            return (
                itemDate.getMonth() + 1 === parseInt(searchMonth, 10) &&
                itemDate.getFullYear() === parseInt(searchYear, 10)
            );
        });

        setFilteredTableData(filteredData);
    };

    const renderTable = () => {
        const headers = ['Date', 'Voyageur', 'Recette']; // Replace with your actual column headers

        return (
            <Table borderStyle={{ borderWidth: 1, borderColor: '#C1C0B9' }}>
                <Row data={headers} style={styles.head} textStyle={styles.text} />
                <Rows data={filteredTableData.map(item => [item.date, item.nbVoyageur, item.recette, ])} textStyle={styles.text} />
            </Table>
        );
    };

    return (
        <View style={styles.container}>
            {/* <SearchBar
                placeholder="Search by Month-Year (MM-YYYY)"
                onChangeText={searchFilter}
                onSearchButtonPress={() => console.log('Search button pressed')}
        />*/}
            {loading ? (
                <View style={styles.animation}>
                    <LottieView
                        source={require('./../images/loading.json')}
                        autoPlay
                        loop
                        style={{ width: 300, height: 700 }}
                    />
                </View>
            ) : (
                renderTable()
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        paddingTop: 30,
        backgroundColor: '#fff'
    },
    head: {
        height: 40,
        backgroundColor: '#f1f8ff'
    },
    text: {
        margin: 6
    },
    animation: {
        //flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default GheribData;
