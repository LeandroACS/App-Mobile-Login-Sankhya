import { StyleSheet, View, Image,Text } from 'react-native';
import { Button } from 'react-native-elements/dist/buttons/Button';
import { Input } from 'react-native-elements/dist/input/Input';
import {useState} from "react";

export default function Login({navigation}) {

  const[Login, setLogin] = useState(null)           //Variavel que armazena o Login
  const[password, setPassword] = useState(null)     //Variavel que armazena a Senha
  const[ErroLogin, setErroLogin] = useState(null)   //Variavel que armazena o status de erro 

  //Requisição HTTP
  const entrar = () => {
     
    let strBody = '{ "serviceName": "MobileLoginSP.login", "requestBody": { "NOMUSU": { "$": "'+Login+'" }, "INTERNO":{ "$": "'+password+'" }, "KEEPCONNECTED": { "$": "S" } } }';  //Corpo da requisição HTTP

    const url = 'ipserver/mge/service.sbr?serviceName=MobileLoginSP.login&outputType=json';  // URL JSON
    const options = {
      method: 'POST',
      qs: {serviceName: 'MobileLoginSP.login', outputType: 'json'},
      headers: {
        'Content-Type': 'application/json',
      },
      body : strBody,
    }
    
    fetch(url,options)
    .then(response => response.json())
    .then(json => {                         //retorno da requisição
      var status = json.status
      if(status == 1){                      //Se status = 1 navega para a pagina principal
        navigation.reset({
          index:0,
          routes:[{name:"Principal"}]
        }
        )}
      else if(status == 0){                 //Se status = 0 apresenta msg de erro do retorno da api 
        setErroLogin(json.statusMessage)
        return false
      }  
    }) 
    .catch(err => console.log(err.message))
  } 
/*
  fetch(url,options)
  .then(response => response.json())
  .then(texto => console.log(texto))
  .catch(err => console.log(err.message))
}
*/
  return (
    <View style={styles.container}>

      <Image source={{ uri: "https://alianzo.com.br/wp-content/uploads/2020/11/logo-Social-.png" }}  //Imagem 
      style={{ width: 305, height: 159,marginVertical:100}} />

      <Input
        placeholder='Login'                                                                          //Campo de digitação Login
        leftIcon={{ type: 'font-awesome', name:'user'}}
        onChangeText={value => setLogin(value)}
        keyboardType="default"
      />

      <Input
        placeholder='Pass'                                                                           //Campo de digitação Senha 
        leftIcon={{ type: 'font-awesome', name:'lock'}}
        onChangeText={value => setPassword(value)}
        secureTextEntry={true}
        errorMessage={ErroLogin}
      />

    <Button                                                                                          //Botão de Entrar 
      title="Entrar"
      loading={false}
      loadingProps={{ size: 'small', color: 'black' }}
      buttonStyle={{
        backgroundColor: 'rgba(10, 10, 10, 1)',
        borderRadius: 5,
      }}
      titleStyle={{ fontWeight: 'bold', fontSize: 23 }}
      containerStyle={{
        marginHorizontal: 50,
        height: 50,
        width: 200,
        marginVertical: 10,
      }}

      onPress={() => entrar()}                                                                   //Function de ação do botão, atualmente chamando o console log. 
    />
    
    </View>
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'orange',
    alignItems: 'center',
    //justifyContent: 'center',
  },
});
