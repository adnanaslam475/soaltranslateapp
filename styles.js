import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export const styles = StyleSheet.create({
    card: {
        width: width * 0.93,
        height: height * 0.1,
        backgroundColor: 'white',
        margin: 5,
        alignSelf: 'center',
        paddingTop: height*0.03,
        paddingLeft: height*0.03,
    },
    cont: {
        bottom: height*0.22,
        right: 0,
        position: 'absolute'
    },
    add: {
        position: 'absolute',
        bottom: height * 0.5,
        right: 0,

    },
    mpzero: { margin: 0, padding: 0 },
    clr: { flexDirection: 'row', margin: 10 },
    icon: {
        width: width * 0.18, height: height * 0.08,
        alignItems: 'center',
        margin: 2,
        justifyContent: 'space-around',
        borderRadius: 5,
    },
    slider: { width: width * 0.9, alignSelf: 'center' },
    txtvw: {
        backgroundColor: 'lightgray',
        borderRadius: width * 0.9,
        padding: 7,
        margin: 5,
        flexDirection: 'column'
    },
    scroll: {
        marginBottom: 20,
        backgroundColor: 'white',
    },
    txt: {
        fontWeight: 'bold',
        fontSize: width * 0.05,
        margin: 2,
    },
    tetx: {
        margin: 5,
        alignSelf: 'flex-end',
    }, input: {
        height: height * 0.08,
        borderRadius: 20,
        backgroundColor: 'lightgray'
    },
    container: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        padding: 5,
    },
    picker: {
        width: width * 0.8, height: 50,
        borderWidth: 1,
        borderRadius: 10, borderColor: 'gray'
    },
    vw: {
        display: 'flex', flexDirection: 'row',
        justifyContent: 'space-between'
    },
    btn: {
        width: width * 0.9,
        height: height * 0.07,
        borderRadius: 5,
        margin: 3,
        color: 'white',
        alignSelf: 'center',
        alignContent: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'blue',
    },
    rightArrow: {
        position: "absolute",
        backgroundColor: "#0078fe",
        //backgroundColor:"red",
        width: 20,
        height: 25,
        bottom: 0,
        borderBottomLeftRadius: 25,
        right: -10
    },
    main: {
        margin: 5,
        display: 'flex',
        alignSelf: 'flex-end',
    },
    keyboardView: {
        flexDirection: 'row',
        backgroundColor: 'white',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
    },
    rightArrowOverlap: {
        position: "absolute",
        backgroundColor: "#eeeeee",
        //backgroundColor:"green",
        width: 20,
        height: 35,
        bottom: -6,
        borderBottomLeftRadius: 18,
        right: -20

    },

})
