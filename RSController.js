'use strict';
var React = require('react-native');
var {
  AppRegistry,
  Component,
} = React;

//导入所有视图
var View1 = require('./View1');
var View1 = require('./View2');
var View1 = require('./View3');
var View1 = require('./View4');

//导入定时器模块
var TimerMixin = require('react-timer-mixin');
import {theRSModel} from './index.android';

//业务控制
class RSController{
	//构造函数
    constructor(){
		//导航对象
		this.theNavigator = null;

		//当前视图名称
		this.currentViewName = null;
    }

    //启动
    startUp() {
		//模型加载本地信息
		theRSModel.loadLocalInfo();
	}

	modelIsReady() {
		this.currentViewName = 'view1';
		this.theNavigator.resetTo({name:this.currentViewName});
	}

	//返回视图
	doReturn() {
		this.theNavigator.pop();
	}

	setCurrentView(name, view){
		this.currentViewName = name;
		this.currentView = view;
	}

	//界面跳转
	renderScene(route, navi) {
		this.theNavigator = navi;

		if(route.name === "view1") {
			return <View1 />;
		} else if(route.name === "view2") {
			return <View2 />;
		} else if(route.name === "view3") {
			return <View3 />;
		} else if(route.name === "view4") {
			return <View4 />;
		}
	}

    fetchData(url,callback){
      fetch(url, {
          method: "GET",
          headers: {
          "Content-Type": "application/x-www-form-urlencoded"
          },
      })

      //.then是返回数据 庵后res.ok是指网址的返回结果 然后在.json转为前端可用的固定结构
      .then(function(res) {
        if (res.ok) {
           res.json().then(function(data) {     
             callback(data);
          });
        } else {
          alert("通信错误");
        }
      }, function(e) {
        alert("Error submitting form!");
      });
    }

    //view1接口
    doView1Action(userName,password,servername) {
		var LOGIN_URL = 'http://'+servername+URL_LOGIN;
		LOGIN_URL = LOGIN_URL+'userName=';
		LOGIN_URL = LOGIN_URL+userName;
		LOGIN_URL = LOGIN_URL+'&password=';
		LOGIN_URL = LOGIN_URL+password;

        this.fetchData(LOGIN_URL,(data)=>{
	      if ('error' === data) {
	     	this.currentView.setErrorMessage("error login");
	      }
	      else if ('Ok' === data){
	        theRSModel.setuserInfo(userName, password,servername);
	        //请求路局列表数据 将获取数据存放在model里面 然后跳转至路局配置界面
	        var GETCOMPANY_URL = 'http://'+servername+URL_GETCOMPANYLIST;
			GETCOMPANY_URL = GETCOMPANY_URL+'userName=';
			GETCOMPANY_URL = GETCOMPANY_URL+userName;
			GETCOMPANY_URL = GETCOMPANY_URL+'&password=';
			GETCOMPANY_URL = GETCOMPANY_URL+password;

	        this.fetchData(GETCOMPANY_URL,(data)=>{     
		        theRSModel.setCompanyInfoList(data);
		        this.currentViewName ="configView";
		        this.theNavigator.resetTo({name:this.currentViewName});  
			    }); 
    	      }
	    }); 
    }

	doView2Action() {
       
	}

	doView3Action() {
       
	}

	doView4Action() {
       
	}

}

//导出模块
module.exports = RSController;