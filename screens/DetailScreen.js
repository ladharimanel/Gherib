import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import axios from 'axios';

const DetailScreen = ({ route }) => {
  const { item } = route.params;

  const [details, setDetails] = useState(null);

  const fetchDetails = async () => {
    try {
      const response = await axios.get(`http://41.226.178.8:1680/Historique/getSocDate?Societe=GHERIB FARHAT FRERES&Date=${item.date}`);
      setDetails(response.data);
    } catch (error) {
      console.error('Error fetching details:', error);
    }
  };

  useEffect(() => {
    fetchDetails();
  }, []);


  const formatDate = (inputDate) => {
    const year = inputDate.substring(0, 4);
    const month = inputDate.substring(4, 6);
    const day = inputDate.substring(6, 8);
    return `${day}/${month}/${year}`;
  };



  const renderDetails = () => {
    if (details) {
      return details.map((item) => {

        const formattedDate = formatDate(item.date);

        const formattedHeureDepart =
          item.heure_Depart.substring(0, 2) + ':' + item.heure_Depart.substring(2);

        const caisse = item.montant1 - item.taxe - 300;
        return (
          <View style={styles.row} key={item.idhistorique}>
            <Text style={styles.text}>Code Route : {item.codeRoute}</Text>
            <Text style={styles.text}>Heure Depart : {formattedHeureDepart}</Text>
            <Text style={styles.text}>N° Tickets : {item.nbVoyageur}</Text>
            <Text style={styles.text}>Recette : {item.montant1}</Text>
            <Text style={styles.text}>Taxe : {item.taxe}</Text>
            <Text style={styles.text}>Caisse : {caisse}</Text>
          </View>
        );
      });
    } else {
      return <Text>les informations pour cette page ne sont pas valables pour le moment</Text>;
    }
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.titre}>Journée {formatDate(item.date)} détaillée : </Text>
        {renderDetails()}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    paddingTop: 30,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  titre: {
    // margin: 6,
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
  },
  row: {
    // flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderColor: '#C1C0B9',
    padding: 10,
  },
  text: {
    margin: 6,
    fontSize: 15,
    fontWeight: 'bold',
  },
});

export default DetailScreen;
