import React, { useEffect } from 'react'
import { useState } from 'react'
import { StyleSheet, Text, View, Image, Button, Dimensions } from 'react-native'
import { FlatList, TouchableHighlight, TouchableOpacity } from 'react-native-gesture-handler';
import { Data }from './data'
import { Card, Icon } from 'react-native-elements'

export default function Home({route, navigation}) {
    const { username } = route.params;
    const [totalPrice, setTotalPrice] = useState(0);
    const [quantity, setQuantity] = useState({});

    const currencyFormat=(num)=> {
        return 'Rp ' + num.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
      };

    const increment = (quantity, item) => {
        let currentQty = quantity
        
        currentQty = {
            id : item.id,
            quantity : quantity
        }

        setQuantity(currentQty)
    }

    const getQuantity = (item) => {
        console.log(quantity, 'getQuantity');
        return Object.values(quantity).find(value => quantity[value] === item.id)
    }
    
    const updateHarga =(price, quantity)=>{
        console.log("UpdatPrice : " + price);
        const temp = Number(price) + totalPrice;
        console.log(temp)
        setTotalPrice(temp)
        
        //? #Bonus (10 poin) -- HomeScreen.js --
        //? agar harga dapat update misal di tambah lebih dari 1 item atau lebih -->
            
    }
    return (
        <View style={styles.container}>
            <View style={{flexDirection:'row', justifyContent:"space-between", padding: 16}}>
                <View>
                    <Text>Selamat Datang,</Text>
                    <Text style={{fontSize:18, fontWeight:'bold'}}>{username}</Text>
                </View>
                <View>
                    <Text>Total Harga:</Text>
                    <Text style={{fontSize:18, fontWeight:'bold'}}> {currencyFormat(totalPrice)}</Text>
                </View>
            </View>
            <View style={{flex: 1,  marginBottom: 20, paddingBottom: 60}}>
            {/* //? #Soal No 2 (15 poin) -- Home.js -- Function Home
            //? Buatlah 1 komponen FlatList dengan input berasal dari data.js   
            //? dan memiliki 2 kolom, sehingga menampilkan 2 item per baris (horizontal) -->

            //? #Soal No 3 (15 poin) -- HomeScreen.js --
             //? Buatlah styling komponen Flatlist, agar dapat tampil dengan baik di device untuk layouting bebas  --> */
             }
             <FlatList
                data = {Data}
                keyExtractor = {(item, index) => `${item.id}-${item.index}`}
                numColumns={2}
                containerStyle={{flex: 2}}
                renderItem={({item}) => {
                    return(
                        <TouchableOpacity onPress={() => { 
                                updateHarga(parseInt(item.harga))
                            }}>
                            <Card containerStyle={{borderRadius: 4, padding : 0}}>
                                <Image
                                    style={{width : Dimensions.get('window').width * 0.42, height : Dimensions.get('window').height * 0.2}}
                                    source={item.image}
                                />
                                <Text style={{margin : 8, fontWeight : 'bold', fontSize :12}}>{item.title}</Text>
                                <Text style={{marginHorizontal : 8}}>{currencyFormat(parseInt(item.harga))}</Text>
                                <Card.Divider style={{margin: 8}}></Card.Divider>
                                <View style={{flex : 1, flexDirection : 'row', justifyContent : 'center'}}>
                                <Icon
                                    raised
                                    name='minus'
                                    type='font-awesome'
                                    color='#f50'
                                    size={12}
                                    onPress={() => 
                                        setQuantity(quantity - 1)
                                    } />
                                    
                                    <Text style={{flex : 1}}>{getQuantity(item)}</Text>
                                    
                                    <Icon
                                    raised
                                    name='plus'
                                    type='font-awesome'
                                    color='#f50'
                                    size={12}
                                    onPress={() => 
                                        increment(1, item)
                                    } />
                                </View>
                            </Card>
                        </TouchableOpacity>
                    )
                }}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,        
        backgroundColor:'white', 
    },  
    content:{
        width: 150,
        height: 220,        
        margin: 5,
        borderWidth:1,
        alignItems:'center',
        borderRadius: 5,
        borderColor:'grey',    
    },
        
})
