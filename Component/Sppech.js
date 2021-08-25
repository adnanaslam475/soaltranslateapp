import React, { useState, useEffect, useRef } from 'react';
import {
  Text,
  View,
  Alert,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Dimensions,
  Animated,
  ActivityIndicator,
  TouchableHighlight
} from 'react-native';
import { Dialog, Input } from 'react-native-elements';
import { styles } from '../styles';
import { useSelector } from 'react-redux';
import KeyboardStickyView from 'rn-keyboard-sticky-view';
import McIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Picker } from '@react-native-picker/picker';
import Voice from '@react-native-community/voice';
import axios from 'axios';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Languages from '../translation.json';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';


const Speech = (props) => {
  const scrollref = useRef(null);
  const state = useSelector(s => s.reducer)
  const [open, setopen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [start, setStart] = useState(false);
  const [error, setError] = useState('');
  const [languageCode, setLanguageCode] = useState('')
  const [translations, setTranslations] = useState([])
  const [end, setEnd] = useState('');
  const [text, setText] = useState('');
  const [to, setTo] = useState('');
  const [fullwidth, setfullwidth] = useState(false);
  const [from, setfrom] = useState('');
  const [lanugageModal, setlanguageModal] = useState(false)
  const [update, setUpdate] = useState(false);
  const [msg, setmsg] = useState('');
  const [anim, setanim] = useState(new Animated.Value(180))

  useEffect(() => {
    AsyncStorage.getItem('lang').then(res => {
      const lang = JSON.parse(res)
      setLanguageCode(Languages[lang])
    }).catch(e => {
      console.log('nhi ara', e)
    })
  }, [update])

  useEffect(() => {
    Voice.onSpeechError = onSpeechError;
    Voice.onSpeechResults = onSpeechResults;
    return () => {
      Voice.destroy().then(() => Voice.removeAllListeners).catch(e => {
        Alert.alert("ERROR!!!", "Cannot close voice recording. try again...",
          [{ text: "OK" }]);
      });
    };
  }, []);



  const onSpeechError = (e) => {
    setError(JSON.stringify(e.error));
  };

  const onSpeechResults = (e) => {
    setText(e.value.reverse()[0])
  };

  const startRecognizing = async () => {
    try {
      // en-US
      await Voice.start('en-US'); //yahn pr device language aegi
      setError('');
      setEnd('');
      setStart(true)
    } catch (e) {
      Alert.alert("ERROR!!!", 'please check permissions',
        [{ text: "OK" }]);
    }
  };

  const stopRecognizing = async () => {
    setStart(false)
    try {
      await Voice.stop();
      await Voice.cancel();
      await Voice.destroy();
    } catch (e) {
      console.error(e);
    }
  };


  function send() {
    if (text.trim().length) {
      setLoading(true);
      let obj = { text, position: 'right' }
      setTranslations(p => [...p, obj])
      axios.get(`https://lanugaetransltor.herokuapp.com/tasks?input=${text}&from=${from}&to=${to}`,
        {
          headers: { 'Content-Type': 'application/json' }
        }).then(({data}) => {
          console.log(data.ress)
          setLoading(false);
          const obj = {
            text: data.ress,
            position: 'left'
          };
          setTranslations(p => [...p, obj])
        }).catch(e => {
          Alert.alert("ERROR!!!", "Cannot Translate...", [{ text: "OK" }]);
          setLoading(false)
        })
      scrollref.current.scrollToEnd({ animated: true })
      setText('')
    }
    else {
      setmsg('please enter text')
    }
  }

  const saveLanguage = async lang => {
    try {
      const jsonValue = JSON.stringify(lang)
      await AsyncStorage.setItem('lang', jsonValue);
      setUpdate(!update)
    }
    catch (e) {
      console.log('cannto set 135');
      Alert.alert("ERROR!!!", "Cannot save...", [{ text: "OK" }]);
    }
  }

  // const animationWidth = a => {
  //   if (a) {
  //     Animated.timing(this.state.animationValue, {
  //       toValue: 300,
  //       timing: 1500
  //     }).start(() => {
  //       this.setState({ viewState: false })
  //     });
  //   }
  //   else {
  //     Animated.timing(this.state.animationValue, {
  //       toValue: 180,
  //       timing: 1500
  //     }).start(this.setState({ viewState: true })
  //     );
  //   }
  // }

  return (
    <>
      <ScrollView ref={scrollref} style={{
        ...styles.scroll,
        flex: 1,
        width: width,
        backgroundColor: state.settings?.color,
      }}>
        <Dialog
          visible={open}
          hardwareAccelerated={true}
          animated={true}
          animationType='fade'
          overlayStyle={{ width: width * 0.9 }}
          onBackdropPress={() => setopen(false)}>
          <View style={{ flexDirection: 'row' }}>
            <Input placeholder='Enter Text..'
              style={{ ...styles.mpzero }}
              maxLength={30}
              onChangeText={t => {setText(t);setmsg('')}} value={text} />
            <TouchableHighlight onPress={start === false ? startRecognizing : stopRecognizing}>
              <FontAwesome name='microphone'
                color={start === false ? 'blue' : 'green'} size={width * 0.1} />
            </TouchableHighlight>
          </View>
          {msg?<Text style={{...styles.err}}>{msg}</Text>:null}
          <TouchableOpacity style={{
            ...styles.btn,
            width: width * 0.4
          }}
            onPress={send}>
            <Text style={{ color: 'white' }}>Translate</Text>
          </TouchableOpacity>
        </Dialog>
        <Dialog visible={lanugageModal} animationType='fade'
          onBackdropPress={() => setlanguageModal(false)} >
          <Picker
            style={{
              ...styles.picker, borderWidth: 2, borderColor: 'black',
              width: 190,
            }}

            selectedValue={languageCode}
            onValueChange={lang => { saveLanguage(lang); setfrom(lang) }} >
            {Object.keys(Languages).map((key, i) => {
              // const arr = Object.values(Languages).filter(v => v[key])
              return (<Picker.Item key={i} style={{ borderWidth: 2 }}
                label={Languages[key]} value={key} />)
            })}
          </Picker>
          <Picker
            style={{
              ...styles.picker, borderWidth: 2, borderColor: 'black',
              width: 190,
            }}
            selectedValue={languageCode}
            onValueChange={lang => { saveLanguage(lang); setTo(lang) }} >
            {Object.keys(Languages).map((key, i) => {
              // const arr = Object.values(Languages).filter(v => v[key])
              return (<Picker.Item key={i} style={{ borderWidth: 2 }}
                label={Languages[key]} value={key} />)
            })}
          </Picker>
        </Dialog>
        {translations ? translations.map((v, i) => (<View style={{
          ...styles.marginLeft,
          alignItems: v.position == 'right' ? 'flex-end' : 'flex-start'
        }} key={i}>
          <View style={{ flexDirection: 'column' }} >
            {v?.text ? <View style={styles.txtvw} >
              <Text style={{ fontSize: state.settings?.size || 10 }}>{v.text}</Text>
            </View> : null}
          </View>
        </View>)) : <ActivityIndicator size='large' color='purple'
          style={styles.activity} />}
      </ScrollView>
      <KeyboardStickyView style={styles.keyboardView}>
        {fullwidth == false && <View style={{ display: 'flex', flexDirection: 'row' }}>
          <MaterialIcons name='language'
            onPress={() => setlanguageModal(true)}
            //  style={styles.txt}
            size={width * 0.09}
            color='lightblue' />
          {/* <TouchableOpacity onPress={() => { setfrom(true); setlanguageModal(true) }}>
            <Text style={styles.txt}>{'from'}</Text>
          </TouchableOpacity>
          <MaterialIcons name='sync-alt' style={styles.txt} size={width * 0.05}
            color='gray' />
          <TouchableOpacity onPress={() => setTo(true)}>
            <Text style={styles.txt}>To</Text>
          </TouchableOpacity> */}
        </View>}
        <Animated.View style={[styles.animatedBox, anim]} >
          <TextInput
            value={text}
            onChangeText={t => setText(t)}
            placeholder="Write something..."
            style={{
              ...styles.input,
              width: fullwidth ? width * 0.9 : width * 0.7,
            }}
          // onBlur={() => animationWidth('blur')}
          // onTouchStart={() => animationWidth('blur')}
          />
        </Animated.View>
        <TouchableHighlight onPress={() => setopen(true)}>
          <FontAwesome name='microphone'
            style={{ marginLeft: 5 }}
            color={'lightblue'} size={width * 0.1} />
        </TouchableHighlight>
        <TouchableOpacity style={{}}
          onPress={send} >
          <McIcon name='send-circle' color='lightblue' size={width * 0.14} />
        </TouchableOpacity>
      </KeyboardStickyView>
    </>
  );
};
const { width, height } = Dimensions.get('window');
export default Speech;

{/* <View style={{
  ...styles.container, flex: 1,
  backgroundColor: background || 'white'
}}
  onTouchStart={color}>
  <View style={styles.container}>
    <Text style={{
      alignSelf: 'flex-start',
      fontWeight: 'bold'
    }}> Enter Text  </Text>
    <View style={styles.vw}>
      <TextInput textAlign='center' value={text}
        style={styles.input}
        placeholder='enter text..'
        onChangeText={t => { setText(t); setempty(false) }} />

      <TouchableHighlight onPress={start === false ? startRecognizing : stopRecognizing}>
        <FontAwesome name='microphone'
          style={{ marginLeft: 5 }}
          color={start === false ? 'blue' : 'green'} size={width * 0.1} />
      </TouchableHighlight>
    </View>
    {empty ? <Text style={{ margin: 5, color: 'red' }}>Please Enter Text</Text> : null}
    <Picker
      style={styles.picker}
      selectedValue={languageCode}
      onValueChange={lang => saveLanguage(lang)} >
      {Object.keys(Languages).map((key, i) => {
        return (<Picker.Item key={i} label={Languages[key]} value={key} />)
      })}
    </Picker>
    {loading ? <ActivityIndicator color='blue' size={height * 0.07} /> :
      <TouchableOpacity style={styles.btn}
        onPress={send}>
        <Text style={{ color: 'white' }}>Translated into {languageCode}</Text>
      </TouchableOpacity>}
    <Text>{response}</Text>
  </View >
</View> */}


// 1.Speech to text
// 2. Bright yellow or light blue background
// 3. Rectangle speech boxes in format of messages
// 4. Cartoonified look
// 5. Ethnic cartoon characters
// 6.offline translation
// 7. Page that states the number of African languages available with flags like image sent
// 8. Text to be in format of the black writing sent in images
// 9. Yellow and Logo colours to be used
// 10. Language at top of box rather than just the flag of country
// 11. Flags of country next to country name in country list
// 12. People can record themselves saying words so that it is added to the app vocabulary
//13. just font size in settings

// {!from || to ? <Picker
//   style={styles.picker}
//   selectedValue={languageCode}
//   onValueChange={lang => { saveLanguage(lang) }} >
//   {Object.keys(Languages).map((key, i) => {
//     const arr = Object.values(Languages).filter(v => v[key])
//     return (<View key={i}>
//       <Image style={{width:30,height:20,}}source={{uri:arr[0].flag}} />
//       <Text style={{borderWidth:2}}>{key}</Text>
//       <Picker.Item key={i} label={key} value={key} />
//     </View>)
//   })}
// </Picker> : null}