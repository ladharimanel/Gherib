import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import axios from 'axios';

const DetailScreen = ({ route }) => {
  const { item } = route.params;

  const [details, setDetails] = useState(null);

  const fetchDetails = async () => {
    try {
      //const response = await axios.get(`http://5.135.79.232:1680/Historique/getSocDate?Societe=GHERIB FARHAT FRERES&Date=${item.date}`);
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
        const formattedHeureDepart =
          item.heure_Depart.substring(0, 2) + ':' + item.heure_Depart.substring(2);

        const caisse = (item.montant1 - item.taxe - 300).toFixed(2);

        return (
          <View style={styles.row} key={item.idhistorique}>
            <View style={styles.two}>
              <View style={styles.infoBox}>
                <Text style={styles.label}>Code Route: {item.codeRoute}</Text>
              </View>

              <View style={styles.infoBox}>
                <Text style={styles.label}>Départ: {formattedHeureDepart}</Text>
              </View>
            </View>

            <View style={styles.two}>
              <View style={styles.infoBox}>
                <Text style={styles.label}>N° Tickets: {item.nbVoyageur}</Text>
              </View>

              <View style={styles.infoBox}>
                <Text style={styles.label}>Recette: {item.montant1.toFixed(2)}</Text>
              </View>
            </View>

            <View style={styles.two}>
              <View style={styles.infoBox}>
                <Text style={styles.label}>Taxe: {item.taxe.toFixed(2)}</Text>
              </View>

              <View style={styles.infoBox}>
                <Text style={styles.label}>D'acces: {item.dacces.toFixed(2)}</Text>
              </View>
            </View>

            <View style={styles.infoBox}>
              <View style={styles.caisseBox}>
                <Text style={styles.label}>Caisse: {caisse}</Text>
              </View>
            </View>
          </View>
        );
      });
    } else {
      return <Text>Les informations pour cette page ne sont pas valables pour le moment</Text>;
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
    backgroundColor: '#ffff',
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
    borderWidth: 1.5,
    borderColor: '#C1C0B9',
    padding: 10,
    margin: 10,
    borderRadius: 10,
  },
  two: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    margin: 10,
  },
  text: {
    margin: 6,
    fontSize: 15,
    fontWeight: 'bold',
  },
  caisseBox: {
    backgroundColor: '#e6e6e6',
    padding: 8,
    borderRadius: 8,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'grey',
  },
  caisseText: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  infoBox: {
    flex: 1,
    paddingHorizontal: 8,
  },
  label: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 4,
  },
});

export default DetailScreen;
