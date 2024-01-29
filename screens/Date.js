import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, TextInput, Button } from 'react-native';
import axios from 'axios';
import LottieView from 'lottie-react-native';
import { format, parseISO, getYear, getMonth } from 'date-fns';
import { useNavigation } from '@react-navigation/native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';


const GheribData = () => {

    const navigation = useNavigation();

    const [tableData, setTableData] = useState([]);
    const [filteredTableData, setFilteredTableData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedMonth, setSelectedMonth] = useState('');
    const [selectedYear, setSelectedYear] = useState('');

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await axios.get('http://41.226.178.8:1680/Date/AllDate');
            setTableData(response.data);
            setFilteredTableData(response.data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const formatDate = (dateString) => {
        try {
            const parsedDate = parseISO(dateString);
            const formattedDate = format(parsedDate, 'dd/MM/yyyy');
            return formattedDate;
        } catch (error) {
            console.error('Error parsing date:', error);
            return 'Invalid Date';
        }
    };

    const handleItemPress = (item) => {
        navigation.navigate('DetailScreen', { item });
    };

    const handleSearch = () => {
        // Filter data based on selectedMonth and selectedYear
        const filteredData = tableData.filter((item) => {
            const itemMonth = getMonth(parseISO(item.date)) + 1;
            const itemYear = getYear(parseISO(item.date));

            return (
                (!selectedMonth || itemMonth.toString() === selectedMonth) &&
                (!selectedYear || itemYear.toString() === selectedYear)
            );
        });

        setFilteredTableData(filteredData);
    };

    const renderHeader = () => (
        <View style={[styles.row, styles.headerRow]}>
            <Text style={[styles.text, styles.columnTitle]}>Date     </Text>
            <Text style={[styles.text, styles.columnTitle]}>N° Tickets</Text>
            <Text style={[styles.text, styles.columnTitle]}>Recette</Text>
            <Text style={[styles.text, styles.columnTitle]}>Caisse</Text>

        </View>
    );

    const renderListItem = ({ item }) => {
        const caisse = item.montant1 - item.taxe - 300;
        return (
            <TouchableOpacity onPress={() => handleItemPress(item)}>
                <View style={styles.row}>
                    <Text style={styles.text}>{formatDate(item.date)}</Text>
                    <Text style={styles.text}>{item.nbVoyageur}</Text>
                    <Text style={styles.text}>{item.montant1}</Text>
                    <Text style={styles.text}>{caisse}</Text>

                </View>
            </TouchableOpacity>
        )
    };

    return (
        <View style={styles.container}>

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
                <>
                    <View style={styles.searchBar}>
                        <TextInput
                            style={styles.inputStyle}
                            placeholder="Mois (1-12)"
                            keyboardType="numeric"
                            onChangeText={(text) => setSelectedMonth(text)}
                            value={selectedMonth}
                        />
                        <TextInput
                            style={styles.inputStyle}
                            placeholder="Année"
                            keyboardType="numeric"
                            onChangeText={(text) => setSelectedYear(text)}
                            value={selectedYear}
                        />
                        <TouchableOpacity onPress={handleSearch} style={styles.loop}>
                            <FontAwesomeIcon icon={faMagnifyingGlass}
                                size={30}
                                color='grey' />
                        </TouchableOpacity>
                    </View>
                    <FlatList
                        ListHeaderComponent={renderHeader}
                        data={filteredTableData}
                        renderItem={renderListItem}
                    />
                </>
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
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderBottomWidth: 1,
        borderColor: '#C1C0B9',
        padding: 10,
    },
    text: {
        margin: 6
    },
    animation: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerRow: {
        backgroundColor: 'lightgrey',
        borderBottomWidth: 2,
        borderColor: '#C1C0B9',
    },
    columnTitle: {
        fontWeight: 'bold',
    },
    searchBar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
        alignItems: 'center',
        padding: 6,
        backgroundColor: '#fff',
        borderRadius: 8,
        borderWidth: 1,
        borderColor: 'grey',
        //margin: 10,
    },
    loop: {
        transform: [{ scaleX: -1 }],
        padding: 10,
        borderRadius: 5,
        backgroundColor: 'lightgrey',
    },
    inputStyle: {
        flex: 1,
        marginRight: 8,
        padding: 8,
        borderWidth: 1,
        borderRadius: 5,
        borderColor: 'grey',
    },
});

export default GheribData;
