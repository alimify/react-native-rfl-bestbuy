import React, { useEffect, useState } from "react";
import { inject, observer } from "mobx-react";
import { StyleSheet, View, ScrollView, Image } from "react-native";
import Text from "../components/helpers/Text";
import Spinner from "../components/helpers/Spinner";
import DefaultStyles from "../constants/DefaultStyles";

import SiderBarItem from "../components/category/SideBarItem";
import Slot from "../components/category/Slot";

const CategoryScreen = props => {
  const { common } = props.store,
    [getLoading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        await common.fetchGlobals();
      } catch {
      } finally {
        await setLoading(false);
      }
    };
    loadData();
  }, [common, setLoading]);

  if (getLoading) {
    return <Spinner />;
  }

  const megaMenus = common.GLOBALS ? common.GLOBALS.megamenus : [];

  return (
    <View style={[DefaultStyles.flexContainer, styles.customBoxDesign]}>
      <View style={DefaultStyles.w25}>
        <ScrollView>
          {megaMenus.map(item => (
            <SiderBarItem key={item.id.toString()} category={item} />
          ))}
        </ScrollView>
      </View>
      <View style={DefaultStyles.w70}>
        <ScrollView>
          {/* Sub Category Slot */}
          {megaMenus.map(item => (
            <Slot key={item.id.toString()} category={item} />
          ))}
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  customBoxDesign: {
    paddingTop: 30,
  }
});

export default inject("store")(observer(CategoryScreen));
