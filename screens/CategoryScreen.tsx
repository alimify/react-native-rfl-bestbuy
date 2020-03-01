import React, { useEffect, useState } from "react";
import { inject, observer } from "mobx-react";
import { StyleSheet, View, ScrollView, Image } from "react-native";
import Text from "../components/helpers/Text";
import Spinner from "../components/helpers/Spinner";
import DefaultStyles from "../constants/DefaultStyles";
import Colors from '../constants/Colors';

import SiderBarItem from "../components/category/SideBarItem";
import Slot from "../components/category/Slot";

const CategoryScreen = props => {
  const { common } = props.store,
    [getLoading, setLoading] = useState(true),
    [getSlotPosition, setSlotPosition] = useState({}),
    [getCurrentSlotPos, setCurrentSlotPos] = useState('')

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
          {megaMenus.map((item, key) => (
            <SiderBarItem key={item.id.toString()} category={item} slotActive={getCurrentSlotPos.length ? getSlotPosition[getCurrentSlotPos] && getSlotPosition[getCurrentSlotPos].id == item.id : key == 0} />

          ))}
        </ScrollView>
      </View>

      <View style={DefaultStyles.w70}>

        <ScrollView onScroll={(e) => {

          const positionKeys = Object.keys(getSlotPosition),
            curPos = parseInt(e.nativeEvent.contentOffset.y.toString()) + 200;


          var closest = positionKeys.reduce(function (prev, curr) {
            return (Math.abs(parseInt(curr) - curPos) < Math.abs(parseInt(prev) - curPos) ? curr : prev);
          });


          setCurrentSlotPos(closest)


        }}>

          {/* Sub Category Slot */}
          {megaMenus.map(item => (
            <Slot key={item.id.toString()} category={item}
              getSlotPosition={getSlotPosition}
              setSlotPosition={setSlotPosition}
            />
          ))}
        </ScrollView>
      </View>
      
      </View>
      );
    };
    
const styles = StyleSheet.create({
  customBoxDesign: {
    paddingTop: 10
  },
  backgroundColor: {
    backgroundColor: Colors.fontColor1
  }
});



export default inject("store")(observer(CategoryScreen));