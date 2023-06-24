import React, { useEffect, useState } from 'react';
import { Text, View, TouchableOpacity, TextInput, Alert } from 'react-native';
import estilos from './estilos';
import { atualizaRepositorio, deletaRepositorio } from '../../servicos/requisicoes/repositorios';

export default function InfoRepositorio({ route, navigation }) {
    const [nome, setNome] = useState(route.params.item.name);
    const [data, setData] = useState(route.params.item.data);

    useEffect(() => {
        if(route.params.item){
            setData(route.params.item.data)
            setNome(route.params.item.name)
        }
    }, [])

    async function salvar(item) {
        let novoItem ={
            ...item,
            name:nome,
            data:data
        }
        const ret = await atualizaRepositorio(novoItem)
        if(ret === 'sucesso') {
            Alert.alert("Sucesso")
            navigation.goBack();
        }else{
            Alert.alert("Erro salvando alterações")
        }
    }

    async function apagar(id) {
       
        const ret = await deletaRepositorio(id)
        if(ret === 'sucesso') {
            Alert.alert("Repositório apagado com sucesso")
            navigation.goBack();
        }else{
            Alert.alert("Erro apagando repositório")
        }
    }

    return (
        <View style={estilos.container}>
            <TextInput
                placeholder="Nome do repositório"
                autoCapitalize="none"
                value={nome}
                style={estilos.entrada}
                onChangeText={setNome}
            />
            <TextInput
                placeholder="Data de criação"
                autoCapitalize="none"
                value={data}
                onChangeText={setData}
                style={estilos.entrada}
            />
            <TouchableOpacity 
                style={estilos.botao} 
                onPress={()=>salvar(route.params.item)}
            >
                <Text style={estilos.textoBotao}>
                    Salvar
                </Text>
            </TouchableOpacity>
            <TouchableOpacity 
                onPress={()=>apagar(route.params.item.id)}
                style={[estilos.botao, {backgroundColor: '#DD2B2B', marginTop: 10}]} 
            >
                <Text style={estilos.textoBotao}>
                    Deletar
                </Text>
            </TouchableOpacity>
        </View>
    );
}
