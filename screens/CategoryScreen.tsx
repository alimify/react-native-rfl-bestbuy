import React, { useEffect, useState } from 'react';
import { inject, observer } from "mobx-react";
import { StyleSheet, View, ScrollView, Image } from 'react-native';
import Text from "../components/helpers/Text";


import SiderBarItem from '../components/category/SideBarItem'
import Slot from '../components/category/Slot'

const CategoryScreen = props => {

  const { common } = props.store,
    [getLoading, setLoading] = useState(true);

  useEffect(() => {

    const loadData = async () => {
      try {
        await common.fetchGlobals()
      } catch{

      } finally {
        await setLoading(false)
      }

    }
    loadData()
  },[common,setLoading])

  if (getLoading) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }


  const megaMenus = common.GLOBALS ? common.GLOBALS.megamenus : [];

  return (
    <View style={styles.container}>
      <ScrollView style={styles.sideBarContainer}>
        {megaMenus.map(item => (
          <SiderBarItem key={item.id.toString()} category={item} />
        ))}
      </ScrollView>

      <ScrollView>
        {/* Sub Category Slot */}
        {megaMenus.map(item => (
          <Slot key={item.id.toString()} category={item} />
        ))}
      </ScrollView>
    </View>
  );

}


const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    // marginBottom: 70,
  },
  sideBarContainer: {
    // padding: 20,
    borderWidth: 1,
  }

})


export default inject("store")(observer(CategoryScreen));