'use strict';

var React = require('react-native');
var {
  AppRegistry,
  Component,
  StyleSheet,
  Text,
  TextInput,
  Image,
  Navigator,
  View,
  ToolbarAndroid,
  TouchableNativeFeedback,
  Dimensions,
  ToastAndroid,
  ListView,
  TouchableOpacity,
} = React;

import * as TimerMixin from 'react-timer-mixin';
import {theRSController, theRSModel} from './index.android';

//var serverlist = [];

class View1 extends Component {
  constructor(props) {
      super(props);
      this.serverlist = [];
      var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
      this.state = {
        dataSource :null,
        SelectId:0,
        userName:'admin',
        password:'admin',
        loginFailed:false,
      };
  }
  
    componentWillMount(){     

    }

    componentWillUpdate(){
    }

    setErrorMessage(loginres){
      this.setState({
        loginFailed :true,
      });
    }

    componentDidMount() {
       this.serverlist = theRSModel.getServerInfoList();
       var logininfo = theRSModel.getuserInfo();
       
       //退出登录后显示上次登录信息
       if (null != logininfo) {
         var serveradd = logininfo.serveradd;
         var findserverindex = 0;

         for(var i=0;i<this.serverlist.length; i++){
          if (serveradd == this.serverlist[i].address) {
            findserverindex = i;
            break;
          }
         }

         this.setState({
          SelectId:findserverindex,
          userName:logininfo.username,
          password:logininfo.serveradd,      
         });
       }

       var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.setState({
          dataSource :ds.cloneWithRows(this.serverlist),
          SelectId :0,
        });
    }

    checklogindata(){
      var checkres =0;

      if (null != this.state.userName && null != this.state.password) {
        checkres =1;        
      }

      return checkres;
    }

    _onPressLoginButton(){
      if (this.checklogindata()) {
        theRSController.doView1Action(this.state.userName,this.state.password,this.serverlist[this.state.SelectId].address);
      }
      else{
        ToastAndroid.show('用户名或者密码配置错误', ToastAndroid.SHORT);
      }
    }
   
   _pressRow(rowID: number) {
      var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
      this.serverlist = theRSModel.getServerInfoList();
      this.setState({
        SelectId :rowID,
       dataSource:ds.cloneWithRows(this.serverlist),
      });
   }

  _renderRow(rowData: string, sectionID: number, rowID: number) {
    var colorid = 'black';

     if (rowID == this.state.SelectId) {
        colorid = 'red';
     } 

    return (
      //如果等于点击id 那么颜色是红色 否则是黑色
        <TouchableOpacity
          onPress={()=>this._pressRow(rowID)}>     
            <View style={styles.row}>
              <Text style={{fontSize:16,color:colorid}}>
                {rowData.servername + '   '}
              </Text>
            </View>           
        </TouchableOpacity>
    );
  }

  _renderLoginFailed() {
    if (true == this.state.loginFailed) {
    return (   
      <View style={{width:Dimensions.get('window').width, height: 40,}}>
        <Text style={{fontSize: 20, color:'red', textAlign:'center',}}>登录失败</Text>
      </View>
      );
    }
  }

  _renderListView(){
    if (null !=this.state.dataSource) {
      return (
        <ListView horizontal = {true}
          dataSource={this.state.dataSource}
          renderRow={this._renderRow.bind(this)}
        />   
      );
    }
  }
    
  render() {
    theRSController.setCurrentView("loadingView", this);

    return (
      <View style={styles.AllContainer}>
        <View style={styles.container}>

          <Image
            style={{width:Dimensions.get('window').width*3/4, margin:20}} 
            source={require('./img/logo.png')}      
          />
        </View>

        <View style={styles.container}>
          <View style={styles.RowArea}>

           <View style={{width:80}}>                      
            <Text style = {{color:'black'}}>
            服务器
            </Text>
          </View>
       
          {this._renderListView()}

          </View>
        </View>

        <View style={styles.container}>
          <View style={styles.RowArea}>   

           <View style={{width:80,}}>          
            <Text style = {{color:'black'}}>
            用户名
            </Text>
          </View>
          
            <TextInput 
              style={{fontSize: 16, width:200, height: 40, borderColor: 'red', borderWidth: 2}} 
              onChangeText={(text) => this.setState({userName :text})} 
              value={this.state.userName} 
            />                      
          </View>
        </View>

        <View style={styles.container}>
          <View style={styles.RowArea}>             

           <View style={{width:80,}}>                      
            <Text style = {{color:'black'}}>
            密码
            </Text>
          </View>
          
            <TextInput 
              style={{fontSize: 16, width:200, height: 40, borderColor: 'red', borderWidth: 2}} 
              onChangeText={(text) => this.setState({password :text})} 
              value={this.state.password} 
            />                      
          </View>
        </View>

        <View style={styles.buttonContainer}>  
            <TouchableNativeFeedback
              onPress={this._onPressLoginButton.bind(this)}
              background={TouchableNativeFeedback.SelectableBackground()}>
              <View style={{width:Dimensions.get('window').width/2, height: 40, backgroundColor: '#29b6f6',margin:30}}>
                <Text style={{fontSize: 24, textAlign:'center',}}>登录</Text>
              </View>
            </TouchableNativeFeedback>
        </View>
        {this._renderLoginFailed()}
    </View> 
    )
  }
}

var styles = StyleSheet.create({
    AllContainer: {    
  },  
    
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 3,
    margin:3,
  },

  welcomeText: {
      borderWidth: 2,
      height:40,
      fontSize: 30,
      textAlign: 'center',  
  },
    
  buttonContainer:{
    justifyContent:'space-around',
    flexDirection: 'row',
  },

  flexContainer: {    
    justifyContent:'space-around',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    flexDirection: 'row'
  },

  RowArea:{
    width:Dimensions.get('window').width*3/4, 
    height:40, 
    flexDirection: 'row',
    alignItems: 'center',
  },

  container: {
    flex: 1,
    justifyContent:'space-around',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    flexDirection: 'row',
  },

  welcome: {
      fontSize: 16,
      borderWidth: 1,
      color:'black',
  },
});

module.exports = View1;