import React, { useState } from 'react';
import { Text, View, TouchableOpacity, TextInput, Alert } from 'react-native';
import estilos from './estilos';
import { criaRepositorio } from '../../servicos/requisicoes/repositorios';

export default function CriarRepositorio({ route, navigation }) {
    const [nome, setNome] = useState('');
    const [data, setData] = useState('');

    async function criar() {
        const ret = await criaRepositorio(nome, data, route.params.id);
        if(ret==='sucesso'){
            Alert.alert("Repositório Criado")
            navigation.goBack()
        }else{
            Alert.alert("Erro criado repositório")
        }
    }

    return (
        <View style={estilos.container}>
            <TextInput
                placeholder="Nome do repositório"
                autoCapitalize="none"
                value={nome}
                onChangeText={setNome}
                style={estilos.entrada}
            />
            <TextInput
                placeholder="Data de criação"
                value={data}
                onChangeText={setData}
                autoCapitalize="none"
                style={estilos.entrada}
            />
            <TouchableOpacity style={estilos.botao} 
                onPress={()=>criar()}>
                <Text style={estilos.textoBotao}>
                    Criar
                </Text>
            </TouchableOpacity>
        </View>
    );
}
