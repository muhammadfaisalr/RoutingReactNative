import React, { useEffect } from 'react'
import { useState } from 'react'
import { StyleSheet, Text, View, Image, Dimensions } from 'react-native'
import { FlatList, TouchableHighlight, TouchableOpacity } from 'react-native-gesture-handler';
import { Data }from './data'
import { BottomSheet, Card, Icon, Button } from 'react-native-elements'
import { log, set } from 'react-native-reanimated';

export default function Home({route, navigation}) {
    const { username } = route.params;
    const [totalPrice, setTotalPrice] = useState(0);
    const [quantity, setQuantity] = useState(1);
    const [price, setPrice] = useState('')
    const [selectedProduct, setSelectedProduct] = useState('')
    const [products, setProducts] = useState([])
    const [isVisible, setVisibility] = useState(false)

    const currencyFormat=(num)=> {
        return 'Rp ' + num.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
      };

    const closeBottomSheet = () => {
        setQuantity(1)
        setVisibility(false)
    }

    const updateHarga =() => {
        setTotalPrice(0)
        let temp = 0
        for (let i = 0; i < products.length; i++){
            const data = products[i]
            console.log(data.price, data.quantity, data.price * data.quantity);
            temp += data.price * data.quantity
            setTotalPrice(temp)
        }

        
        closeBottomSheet()
        
        //? #Bonus (10 poin) -- HomeScreen.js --
        //? agar harga dapat update misal di tambah lebih dari 1 item atau lebih -->
            
    }

    const getQuantity = (id) => {
        let currentProduct = products.find(e => e.id === id)
        if(currentProduct != undefined) {
            setQuantity(currentProduct.quantity)
        }else{
            setQuantity(1)
        }
    }

    const addProduct = (id, quantity, price) => {
        let currentProduct = products.find(e => e.id === id)
        console.log(currentProduct)
        if(currentProduct != undefined){
            currentProduct.quantity = quantity
        }else{
            products.push({
                id : id,
                quantity : quantity,
                price: price
            })
        }

        updateHarga()

        // console.log(products);
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
            <View style={{flex: 1,  marginBottom: 20}}>
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
                                setVisibility(true)
                                setSelectedProduct(item.id)
                                setPrice(item.harga)
                                getQuantity(item.id)
                            }}>
                            <Card containerStyle={{borderRadius: 4, padding : 0}}>
                                <Image
                                    style={{width : Dimensions.get('window').width * 0.42, height : Dimensions.get('window').height * 0.2}}
                                    source={item.image}
                                />
                                <Text style={{margin : 8, fontWeight : 'bold', fontSize :12}}>{item.title}</Text>
                                <Text style={{marginHorizontal : 8}}>{currencyFormat(parseInt(item.harga))}</Text>
                                <Card.Divider style={{margin: 8}}></Card.Divider>
                            </Card>
                        </TouchableOpacity>
                    )
                }}
                />

                <BottomSheet containerStyle={{backgroundColor: 'rgba(0.5, 0.25, 0, 0.2)'}}
                    isVisible={isVisible}>
                        <Icon
                            containerStyle={{justifyContent: 'flex-end'}}
                            raised
                            name='close'
                            type='font-awesome'                     
                            color='#f50'
                            size={12}
                            onPress={() => 
                                closeBottomSheet()
                            } />
                        <View style={{flex : 1, flexDirection : 'row', padding : 12, justifyContent : 'center', borderTopLeftRadius: 12, borderTopRightRadius: 12, backgroundColor : 'white'}}>
                                <Icon
                                    raised
                                    name='minus'
                                    type='font-awesome'
                                    color='#f50'
                                    size={12}
                                    style={{alignItems : 'flex-end'}}
                                    onPress={() => 
                                        {
                                            if(quantity > 0){
                                                setQuantity(quantity - 1)
                                            }else{
                                                alert('Has Reached Minimum Qty')
                                            }
                                        }
                                    } />
                                    
                                    <Text style={{flex : 1, margin : 12}}>{quantity}</Text>
                                    
                                    <Icon
                                    raised
                                    name='plus'
                                    type='font-awesome'
                                    color='#f50'
                                    size={12}
                                    onPress={() => 
                                        setQuantity(quantity + 1)
                                    } />

                                </View>
                                <View style={{backgroundColor : 'white'}}>
                                    
                                <Button
                                    containerStyle={{margin : 16}}
                                        title="Save"
                                        type="solid"
                                        raised
                                        onPress={() => 
                                            addProduct(selectedProduct, quantity, price)
                                        }
                                        />
                                </View>

                    </BottomSheet>
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
