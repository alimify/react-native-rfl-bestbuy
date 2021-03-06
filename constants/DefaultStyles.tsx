import { StyleSheet} from 'react-native';
import Colors from './Colors'

const styles = StyleSheet.create({
    pickerDesign: {
        paddingLeft: 5,
        marginTop: 5,
        marginLeft: 5,
        marginRight: 5,
        borderColor: Colors.baseColor1,
        borderWidth: 1,
        borderRadius: 3,
        alignSelf: 'center',
    },
    pickerHeight: {
        height: 30
    },
    specificationBackground: {
        flex: 1,
    },
    modalTitleContainer: {
        // flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
    },
    modalTitleStyle: {
        fontSize: 17,
        fontWeight: "bold",
        paddingHorizontal: 10,
        paddingVertical: 6,
        width: '95%',
        color: 'white'
    },
    titleMore: {
        fontFamily: "raleway-regular",
        color: "purple",
        fontSize: 12
    },
    sectionTitle: {
        fontFamily: 'raleway-semi-bold',
        color: "purple"
    },
    itemContainer: {
        width: 120,
        backgroundColor: "white",
        padding: 5,
        paddingHorizontal: 10,
        marginLeft: 13,
        paddingTop: 20,
        paddingBottom: 30
    },
    itemTitle: {
        fontFamily: "raleway-regular",
        fontSize: 12,
        marginTop: 12,
        height: 35,
        lineHeight: 16,
        textTransform: 'capitalize'
    },
    baseColor4: {
        color: Colors.baseColor4
    },
    bgBaseColor4: {
        backgroundColor: Colors.baseColor4,
        color: Colors.baseColor8
    },
    fontColor1: {
        color: Colors.fontColor1
    },
    flatListRow: {
        flexGrow: 1,
        justifyContent: 'space-between',
        flexBasis: '50%',
        flexWrap: 'wrap'
    },
    flex: {
        flex: 1
    },
    flexContainer: {
        flexWrap: 'wrap',
        flexDirection: 'row'
    },
    stickyBottom: {
        position: 'absolute',
        bottom: 0
    },
    w20: {
        width: '20%'
    },
    w25: {
        width: '25%'
    },
    w30: {
        width: '30%'
    },
    w33: {
        width: '33%'
    },
    w35: {
        width: '35%'
    },
    w40: {
        width: '40%'
    },
    w45: {
        width: '45%'
    },
    w50: {
        width: '50%'
    },
    w55: {
        width: '55%'
    },
    w60: {
        width: '60%'
    },
    w65: {
        width: '65%'
    },
    w70: {
        width: '70%'
    },
    w71: {
        width: '71%'
    },
    w80: {
        width: '80%'
    },
    w85: {
        width: '85%'
    },
    w90: {
        width: '90%'
    },
    w95: {
        width: '95%'
    },
    w100: {
        width: '100%'
    },

    /*Padding*/
    p1: {
        padding: 1
    },
    p2: {
        padding: 2
    },
    p3: {
        padding: 3
    },
    p4: {
        padding: 4
    },
    p5: {
        padding: 5
    },
    pb1: {
        paddingBottom: 1
    },
    pb2: {
        paddingBottom:2
    },
    pb3: {
        paddingBottom:3
    },
    pb4: {
        paddingBottom:4
    },
    pb5: {
        paddingBottom:5
    },
    pt1: {
        paddingTop: 1
    },
    pt2: {
        paddingTop: 2
    },
    pt3: {
        paddingTop: 3
    },
    pt4: {
        paddingTop: 4
    },
    pt5: {
        paddingTop: 5
    },
    ph1: {
        paddingHorizontal: 1
    },
    ph2: {
        paddingHorizontal: 2
    },
    ph3: {
        paddingHorizontal: 3
    },
    ph4: {
        paddingHorizontal: 4
    },
    ph5: {
        paddingHorizontal: 5
    },
    pv1: {
        paddingVertical: 1
    },
    pv2: {
        paddingVertical: 2
    },
    pv3: {
        paddingVertical: 3
    },
    pv4: {
        paddingVertical: 4
    },
    pv5: {
        paddingVertical: 5
    },
    m1: {
        margin: 1
    },
    m2: {
        margin: 2
    },
    m3: {
        margin: 3
    },
    m4: {
        margin: 4
    },
    m5: {
        margin: 5
    },
    ml10: {
        marginLeft: 10
    }
});


export default styles