import { inject, observer } from "mobx-react";
import React, { useEffect, useState } from "react";
import { StyleSheet, View, ScrollView, Text } from "react-native";
import Spinner from "../../components/helpers/Spinner";
import ProductSet from "../../components/helpers/ProductSet";

const Recommended = props => {
  const { shop } = props.store,
    [getLoading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      await shop.fetchNewArrivals({
        page: 1
      });

      setLoading(false);
    };

    loadData();
  }, [shop, setLoading]);

  if (getLoading) {
    return <Spinner />;
  }

  return (
    <View style={styles.container}>
      <ScrollView>
        <ProductSet
          title={false}
          screen={false}
          products={shop.NEW_ARRIVALS ? shop.NEW_ARRIVALS.data : []}
        />
      </ScrollView>
    </View>
  );
};

Recommended.navigationOptions = navData => {

  return {
    headerTitle: () => <Text>New Arrivals</Text>,
    tabBarVisible: false
  };
};


const styles = StyleSheet.create({
  container: {
    // flex: 1,
    backgroundColor: "#F1F1F1",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 8,
    marginLeft: 0
  },
  productsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    flexWrap: "wrap",
    marginLeft: 5,
    marginRight: 5
  }
});

export default inject("store")(observer(Recommended));
