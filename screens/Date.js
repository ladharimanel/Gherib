import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import LottieView from 'lottie-react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

const GheribData = () => {

    const navigation = useNavigation();

    const [loading, setLoading] = useState(true);
    const [tableData, setTableData] = useState([]);
    const [filteredTableData, setFilteredTableData] = useState([]);
    const [searchYear, setSearchYear] = useState('');
    const [searchMonth, setSearchMonth] = useState('');


    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            //  const response = await axios.get('http://5.135.79.232:1680/Date/AllDate');
            const response = await axios.get('http://41.226.178.8:1680/Date/AllDate');
            setTableData(response.data);
            setFilteredTableData(response.data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching data:', error);
            //setLoading(false);

        }
    };

    const formatDate = (inputDate) => {
        const year = inputDate.substring(0, 4);
        const month = inputDate.substring(4, 6);
        const day = inputDate.substring(6, 8);
        return `${day}/${month}/${year}`;
    };


    const handleItemPress = (item) => {
        navigation.navigate('DetailScreen', { item });
    };

    const currentYear = new Date().getFullYear();
    const yearsArray = Array.from({ length: currentYear - 2021 }, (_, index) => (2022 + index).toString());


    const calculateTotal = () => {
        let totalCaisse = 0;

        filteredTableData.forEach((item) => {
            totalCaisse += item.caisse;
        });

        return totalCaisse.toFixed(2);
    };

    const renderListItem = ({ item }) => {
        const formattedDate = formatDate(item.date);

        return (
            <TouchableOpacity onPress={() => handleItemPress(item)}>
                <View style={styles.row}>
                    <Text style={styles.text}>{formattedDate}</Text>
                    <Text style={styles.text}>{item.nbVoyageur}</Text>
                    <Text style={styles.text}>{item.caisse.toFixed(2)}</Text>
                </View>
            </TouchableOpacity>
        )
    };

    const filterData = () => {
        let filteredData = tableData;
        if (searchYear !== '') {
            filteredData = filteredData.filter(item => item.date.startsWith(searchYear));
        }
        if (searchMonth !== '') {
            filteredData = filteredData.filter(item => item.date.substring(4, 6) === searchMonth);
        }
        setFilteredTableData(filteredData);
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
                        <Picker
                            style={styles.pickerStyle}
                            selectedValue={searchYear}
                            onValueChange={(itemValue, itemIndex) => setSearchYear(itemValue)}
                        >
                            <Picker.Item label="Selectionner année" value="" />
                            {yearsArray.map((year) => (
                                <Picker.Item key={year} label={year} value={year} />
                            ))}
                        </Picker>

                        <Picker
                            style={styles.pickerStyle}
                            selectedValue={searchMonth}
                            onValueChange={(itemValue, itemIndex) =>
                                setSearchMonth(itemValue)}
                        >
                            <Picker.Item label="Selectionner mois" value="" />
                            <Picker.Item label="Janvier" value="01" />
                            <Picker.Item label="Fevrier" value="02" />
                            <Picker.Item label="Mars" value="03" />
                            <Picker.Item label="Avril" value="04" />
                            <Picker.Item label="Mai" value="05" />
                            <Picker.Item label="Juin" value="06" />
                            <Picker.Item label="Juillet" value="07" />
                            <Picker.Item label="Aout" value="08" />
                            <Picker.Item label="Septembre" value="09" />
                            <Picker.Item label="Octobre" value="10" />
                            <Picker.Item label="Novembre" value="11" />
                            <Picker.Item label="Decembre" value="12" />
                        </Picker>

                        <TouchableOpacity style={styles.loop} onPress={filterData}>
                            <FontAwesomeIcon icon={faMagnifyingGlass} size={30} color='grey' />
                        </TouchableOpacity>
                    </View>

                    <View style={[styles.row, styles.headerRow]}>
                        <Text style={[styles.text, styles.columnTitle]}>Date     </Text>
                        <Text style={[styles.text, styles.columnTitle]}>N° Tickets</Text>
                        <Text style={[styles.text, styles.columnTitle]}>Caisse</Text>

                    </View>
                    <FlatList
                        data={filteredTableData}
                        renderItem={renderListItem}

                    />
                    <View style={styles.totalBox}>
                        <Text style={styles.totalText}>Total: {calculateTotal()} </Text>
                    </View>
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
        margin: 6,
        fontSize: 18,
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
    totalBox: {
        borderTopWidth: 2,
        borderColor: '#C1C0B9',
        padding: 10,
        marginTop: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    totalText: {
        fontWeight: 'bold',
        fontSize: 18,
    },
    pickerStyle: {
        flex: 1,
        marginRight: 8,
        padding: 8,
        borderWidth: 1,
        borderRadius: 5,
        borderColor: 'grey',
    },
});

export default GheribData;
