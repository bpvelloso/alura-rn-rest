import { api } from "../api"


export async function buscaUsuarioPorUsername(username) {
    console.log("Buscando dados de: "+username);
    try{
        const resultado = await api.get('/users?login='+username)
        console.log("Resultado: ",resultado.data);
        return resultado.data[0]
    }catch(err){
        console.log("Erro:",err)
        return {}
    }
}