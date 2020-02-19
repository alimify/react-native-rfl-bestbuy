import { inject,observer } from 'mobx-react'
import React,{useEffect,useState} from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import ProductDesign from '../components/helpers/ProductDesign';
import DefaultStyles from '../constants/DefaultStyles';
import Text from "../components/helpers/Text";
import Spinner from "../components/helpers/Spinner";

const CategoryProductScreen = (props) => {

    const { shop } = props.store,
        category = props.navigation.getParam('category'),
        [getLoading,setLoading] = useState(false)
    
    useEffect(() => {

        const loadingProduct = async (shop, category) => {
            setLoading(true)
            
            if (category.seo_url) {
                await shop.fetchSearchProducts({ slug: category.seo_url });
            }
            
            setLoading(false)
        }

        loadingProduct(shop,category)

    }, [shop, category])
    

    if (getLoading) {
        return <Spinner/>
    }
    
    const products = shop.SEARCH_PRODUCTS?shop.SEARCH_PRODUCTS.products.data:[]




    return (
        <View style={styles.container}>
            <ScrollView>
                <View style={DefaultStyles.flexContainer}>
                    {products.map((item,key) => {

                        return (
                            <View key={key.toString()} style={DefaultStyles.w50}>
                                <ProductDesign style={DefaultStyles.w95} product={item} key={key.toString()} />
                            </View>)                    
                    })}
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    productsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        marginLeft: 8,
        marginRight: 8
    }
});



export default inject("store")(observer(CategoryProductScreen));
