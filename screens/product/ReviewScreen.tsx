import React,{useEffect, useState} from "react";
import { StyleSheet, Text, View, ScrollView, Image,TouchableOpacity } from "react-native";
import { inject, observer } from "mobx-react";

import Spinner from '../../components/helpers/Spinner'


const Review = props => {

    const likes = JSON.parse(props.review.likes),
          dislikes = JSON.parse(props.review.dislikes)

    return (
        <View style={styles.reviewItemContainer}>
            <View>
                <Image source={require('../../assets/img/profile.png')} style={styles.reviewItemImage} />
            </View>
            <View style={styles.reviewItemTextContainer}>
                <View>
                    <Text>{props.review.user.name}</Text>
                    <View style={styles.reviewItemDateTextContainer}>
                        <Text>{props.review.created_at} </Text>
                        <Text>{props.review.rating}</Text>
                    </View>
                </View>
                <View>
                    <Text>{props.review.comment}</Text>
                    <View style={styles.reviewItemLikeDislike}>
                        <TouchableOpacity onPress={() => props.likeDislike(props.review.id, 'like')}>
                            <Text>Like ({Array.isArray(likes) ? likes.length : 0})</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => props.likeDislike(props.review.id, 'dislike')}>
                            <Text>Dislike ({Array.isArray(dislikes) ? dislikes.length : 0})</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
    )
}


const ReviewScreen = props => {

  

    const { shop } = props.store,
        productId = props.navigation.getParam('productId'),
        [getLoading,setLoading] = useState(true)
    
    useEffect(() => {

        const loadData = async () => {
            
            await shop.fetchProductReviewsById({
                product_id: productId
            })

            setLoading(false)
        }

        loadData()

    },[shop,productId,setLoading])
    

    if (getLoading) {
        return <Spinner />
    }

    const likeDislike = async (review_id, col = 'like') => {
        await shop.fetchProductReviewLikeDislike({
            review_id: review_id,
            col: col
        })

        await shop.fetchProductReviewsById({
            product_id: productId
        })
    }

    const reviews = shop.PRODUCT_REVIEWS_BY_ID ? shop.PRODUCT_REVIEWS_BY_ID.reviews : []

    const ReviewsView = reviews.length > 0 ? (<View>
        {reviews.map((item) => <Review key={item.id.toString()} likeDislike={likeDislike} review={item} />)}
    </View>) : (<Text>
        No reviews found..
    </Text>);

    return (
        <View>
            {ReviewsView}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {

    },
    titleContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    recentTitle: {
        fontSize: 15,
        fontWeight: 'bold'
    },

    reviewText: {
        fontWeight: 'bold'
    },

    reviewStarText: {
        flex: 1,
        flexDirection: 'row'
    },

    reviewAmountText: {
        padding: 3,
        paddingHorizontal: 15
    },

    reviewItemContainer: {
        flex: 1,
        flexDirection: 'row',
        alignContent: 'center',
        flexBasis: 40
    },

    reviewItemImage: {
        height: 60,
        width: 60,
        borderRadius: 50,
    },

    reviewItemTextContainer: {
        marginLeft: 7
    },

    reviewItemDateTextContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },

    reviewItemLikeDislike: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between'
    }
});

export default inject("store")(observer(ReviewScreen));
