import { inject, observer } from "mobx-react";
import React, { useEffect, useState } from "react";
import { StyleSheet, View, ScrollView } from "react-native";
import Spinner from "../../components/helpers/Spinner";
import ProductSet from "../../components/helpers/ProductSet";

const Recommended = props => {
  const { home } = props.store,
    [getLoading, setLoading] = useState(true);

    useEffect(() => {
      
    const loadData = async () => {

      await home.fetchBestBuyChoicesAll({
        limit: 40
      });
        
      setLoading(false);
    };

    loadData();
  },[home,setLoading]);

  if (getLoading) {
    return <Spinner />;
  }

  return (
    <View style={styles.container}>
      <ScrollView>
        <ProductSet
          title={false}
          screen={false}
          products={home.BESTBUY_CHOICES_ALL}
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  },
  productsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    flexWrap: "wrap",
    marginLeft: 8,
    marginRight: 8
  }
});

export default inject("store")(observer(Recommended));
