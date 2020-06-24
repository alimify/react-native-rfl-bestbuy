import React, {useEffect, useState, useCallback} from "react";
import {inject, observer} from "mobx-react";
import {
    Text,
    StyleSheet,
    View,
    TouchableOpacity,
    ScrollView,
    RefreshControl,
    ActivityIndicator
} from "react-native";
import Spinner from "../components/helpers/Spinner";
import {Ionicons, AntDesign} from "@expo/vector-icons";
import {
    HeaderButtons,
    HeaderButton,
    Item
} from "react-navigation-header-buttons";

import Sliders from "../components/home/SliderBox";
import FlashSale from "../components/home/FlashSale";
import NewArrivals from "../components/home/NewArrivals";
import JustForYou from "../components/home/JustForYou";
import ProductSet from "../components/helpers/ProductSet";
import NavigationService from "../navigation/NavigationService";

const isCloseToBottom = ({layoutMeasurement, contentOffset, contentSize}) => {
    const paddingToBottom = 20;
    return (
        layoutMeasurement.height + contentOffset.y >=
        contentSize.height - paddingToBottom
    );
};

const HomeScreen = props => {
    const {home} = props.store,
        [getLoading, setLoading] = useState(true),
        [getRefreshing, setRefreshing] = useState(false),
        [getCategorySet1, setCategorySet1] = useState({}),
        [getCategorySet2, setCategorySet2] = useState({}),
        [getCategorySet3, setCategorySet3] = useState({}),
        [getBottomLoading, setBottomLoading] = useState(false);

    const onRefresh = useCallback(async () => {
        const loadData = async home => {
            setRefreshing(true);
            await home.fetchIndex();

            await home.fetchJustForYou({
                limit: 8
            });

            await home.fetchBestBuyChoices({
                limit: 8
            });

            setRefreshing(false);
        };

        loadData(home);
    }, [home, setRefreshing]);

    useEffect(() => {
        const loadData = async home => {
            setLoading(true);

            await home.fetchIndex();

            await home.fetchJustForYou({
                limit: 8
            });

            await home.fetchBestBuyChoices({
                limit: 8
            });
            setLoading(false);
        };

        loadData(home);
    }, [home, setLoading, setCategorySet1]);

    if (getLoading) {
        return <Spinner/>;
    }

    const deleteCategoryProducts = category => {
        if (category.hasOwnProperty("category_products")) {
            delete category.category_products;
            return category;
        }
        return category;
    };

    return (
        <ScrollView
            refreshControl={
                <RefreshControl refreshing={getRefreshing} onRefresh={onRefresh}/>
            }
            scrollEventThrottle={400}
            onScroll={async ({nativeEvent}) => {
                if (isCloseToBottom(nativeEvent)) {


                    if (!getCategorySet1.hasOwnProperty("products")) {

                        await setBottomLoading(true)

                        await home.fetchCategorySet({
                            category: 1,
                            loadFromApp: 1
                        });

                        const products = home.CATEGORY_SET.category_products;

                        await setCategorySet1({
                            category: deleteCategoryProducts(home.CATEGORY_SET),
                            products: products.map(item => item.product)
                        });

                        await setBottomLoading(false)

                    } else if (
                        getCategorySet1.hasOwnProperty("products") &&
                        !getCategorySet2.hasOwnProperty("products")
                    ) {
                        await setBottomLoading(true)

                        await home.fetchCategorySet({
                            category: 2,
                            loadFromApp: 1
                        });

                        const products = home.CATEGORY_SET.category_products;

                        await setCategorySet2({
                            category: deleteCategoryProducts(home.CATEGORY_SET),
                            products: products.map(item => item.product)
                        });

                        await setBottomLoading(false)

                    } else if (
                        getCategorySet1.hasOwnProperty("products") &&
                        getCategorySet2.hasOwnProperty("products") &&
                        !getCategorySet3.hasOwnProperty("products")
                    ) {

                        await setBottomLoading(true)

                        await home.fetchCategorySet({
                            category: 3,
                            loadFromApp: 1
                        });

                        const products = home.CATEGORY_SET.category_products;

                        await setCategorySet3({
                            category: deleteCategoryProducts(home.CATEGORY_SET),
                            products: products.map(item => item.product)
                        });

                        await setBottomLoading(false)
                    }
                }
            }}
        >
            <View>
                <View>
                    <Sliders sliders={home.INDEX ? home.INDEX.mobilesliders : false}/>
                </View>
                <View>
                    <FlashSale flashSales={home.INDEX ? home.INDEX.flash_sales : false}/>
                </View>
                <View>
                    <NewArrivals products={home.INDEX ? home.INDEX.new_arrivals : false} />
                </View>
                <View>
                    <JustForYou products={home.JUST_FOR_YOU}/>
                </View>
                <View>
                    <ProductSet
                        products={home.BESTBUY_CHOICES}
                        title="Recommended"
                        screen="Recommended"
                        params={{}}
                        limit={8}
                    />
                </View>

                {getCategorySet1.hasOwnProperty("products") ? (
                    <View>
                        <ProductSet
                            title={getCategorySet1.category.name}
                            products={getCategorySet1.products}
                            limit={8}
                            screen="CategoryProduct"
                            params={{
                                category: getCategorySet1.category
                            }}
                        />
                    </View>
                ) : (
                    <View></View>
                )}

                {getCategorySet2.hasOwnProperty("products") ? (
                    <View>
                        <ProductSet
                            title={getCategorySet2.category.name}
                            products={getCategorySet2.products}
                            limit={8}
                            screen="CategoryProduct"
                            params={{
                                category: getCategorySet2.category
                            }}
                        />
                    </View>
                ) : (
                    <View></View>
                )}

                {getCategorySet3.hasOwnProperty("products") ? (
                    <View>
                        <ProductSet
                            title={getCategorySet3.category.name}
                            screen="CategoryProduct"
                            params={{
                                category: getCategorySet3.category
                            }}
                            products={getCategorySet2.products}
                            limit={8}
                        />
                    </View>
                ) : (
                    <View></View>
                )}

                {getBottomLoading ? <ActivityIndicator size="large" color="#FBA939"/> : <View></View>}
            </View>
        </ScrollView>
    );
};

const HeaderSearchInput = props => {

    return (
        <TouchableOpacity
            style={styles.searchContainer}
            activeOpacity={1}
            onPress={() => {
                NavigationService.navigate("Search", {});
            }}
        >
            <View style={{
                    flex: 1,
                    flexDirection: "row",
                    width: 290,
                    paddingVertical: 5,
                    paddingLeft: 5
                }}>
                <View style={{width: 20}}>
                    <View pointerEvents="none" style={styles.searchBox}>
                        <Ionicons style={styles.searchIcon} name="md-search" size={20}/>
                    </View>
                </View>
                <View style={{marginTop: 2, paddingLeft: 2}}>
                    <Text style={{color: "#b4b5b3"}}> Search... </Text>
                </View>
            </View>
        </TouchableOpacity>
    );
};

const HeaderButtonComponent = props => {
    return (
        <HeaderButton
            {...props}
            IconComponent={Ionicons}
            iconSize={30}
            style={styles.menuPositioning}
            color="#000"
        />
    );
};

HomeScreen.navigationOptions = navData => {
    return {
        headerTitle: () => <HeaderSearchInput/>,
        headerLeft: () => (
            <HeaderButtons HeaderButtonComponent={HeaderButtonComponent}>
                <Item
                    title="Menu"
                    iconName="ios-menu"
                    onPress={() => {
                        navData.navigation.toggleDrawer();
                    }}
                />
            </HeaderButtons>
        )
    };
};

const styles = StyleSheet.create({
    menuPositioning: {
        marginLeft: 5
    },
    searchContainer: {
        borderRadius: 20,
        marginLeft: -20,
        backgroundColor: "#EEE",
        borderWidth: 0,
        borderColor: "#DDD"
    },
    searchBox: {
        flexDirection: "row",
        width: 300,
        marginLeft: -10,
        marginTop: 2
    },
    searchIcon: {
        color: "#b4b5b3",
        marginLeft: 15
    }
});

export default inject("store")(observer(HomeScreen));
