import React, { useEffect, useState } from 'react';
import { TextInput, Text, View, FlatList, TouchableOpacity } from 'react-native';
import estilos from './estilos';
import { buscaRepositoriosPorId, buscaRepositoriosPorIdENome } from '../../servicos/requisicoes/repositorios';
import { useIsFocused } from '@react-navigation/native'


export default function Repositorios({ route, navigation }) {
    const [repo, setRepo] = useState([]);
    const [nomeRepo, setNomeRepo] = useState('');

    const estaNaTela = useIsFocused();
    

    async function filtrar() {
        
        if(nomeRepo){
            console.log("Filtrando por: ",nomeRepo);
            const repositorios = await buscaRepositoriosPorIdENome(route.params.id,nomeRepo)
            setRepo(repositorios)
        }
    }

    function Resto() {
        return (
    
        <View style={estilos.container}>
                <TextInput
                    placeholder="Filtrar por nome do repositório"
                    autoCapitalize="none"
                    value={nomeRepo}
                    style={estilos.entrada}
                    onChangeText={setNomeRepo}
                />
               


                <Text style={estilos.repositoriosTexto}>{repo.length} repositórios criados</Text>
                <TouchableOpacity 
                    style={estilos.botao}
                    onPress={() => navigation.navigate('CriarRepositorio',{id:route.params.id})}
                >
                    <Text style={estilos.textoBotao}>Adicionar novo repositório</Text>
                </TouchableOpacity>
        </View>
        )
    }

    useEffect(()=>{async function fetchRepos()  {
            const repositorios = await buscaRepositoriosPorId(route.params.id)
            setRepo(repositorios)
        }
        fetchRepos()
        }
        , [estaNaTela])

    useEffect(()=>{

            filtrar()
        }
        , [nomeRepo])

    return (
        

        <FlatList 
            data={repo}
            style={{width:'100%'}}
            keyExtractor={repo=>repo.id}
            ListFooterComponent={Resto}
            renderItem={({item}) => (
                <TouchableOpacity style={estilos.repositorio} 
                    onPress={() => navigation.navigate('InfoRepositorio',{item})}>
                    <Text style={estilos.repositorioNome}> {item.name} </Text>
                    <Text style={estilos.repositorioData}> Atualizado em {item.data} </Text>
                </TouchableOpacity>
            )}
            
        />
    );
}



