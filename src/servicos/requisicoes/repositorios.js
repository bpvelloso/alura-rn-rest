import { Alert } from "react-native";
import { api } from "../api";

export async function buscaRepositoriosPorId(userId) {
    console.log("Buscando repositorios de: "+userId);
    try{
        const resultado = await api.get('/repos?postId='+userId)
        console.log("Resultado: ",resultado.data);
        return resultado.data
    }catch(err){
        console.log("Erro:",err)
        return []
    }
}

export async function atualizaRepositorio(repo) {
    console.log("Buscando repositorios de: ",repo);
    try{
        await api.put('/repos/'+repo.id, repo)
        console.log("Resultado: sucesso");
        return 'sucesso'
    }catch(err){
        console.log("Erro:",err)
        return 'erro'
    }
}

export async function buscaRepositoriosPorIdENome(userId,nome) {
    console.log("Buscando repositorios de: "+userId);
    try{
        const resultado = await api.get('/repos?postId='+userId+'&q='+nome)
        console.log("Resultado: ",resultado.data);
        return resultado.data
    }catch(err){
        console.log("Erro:",err)
        return []
    }
}

export async function criaRepositorio(nome, data, postId) {
    console.log("Criando repositorios: ",nome);
    try{
        await api.post('/repos/', {
            name: nome,
            data: data,
            postId, postId
        })
        console.log("Resultado: post sucesso");
        return 'sucesso'
    }catch(err){
        console.log("Erro:",err)
        return 'erro'
    }
}

export async function deletaRepositorio(id) {
    console.log("Deletando repositorio: ",id);
    try{
        await api.delete('/repos/'+id)
        console.log("Resultado: delete sucesso");
        return 'sucesso'
    }catch(err){
        console.log("Erro:",err)
        return 'erro'
    }
}