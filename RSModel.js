'use strict';
import Store from './Store';
import {theRSController} from './index.android';

//业务模型
class RSModel{
	//构造函数
	constructor(){
		//上次用户登录信息
		this.LastLoginUserInfo = null;

		//异步加载结束个数
		this.AsyncStorageNo = 0;
	}

	//加载本地信息
	loadLocalInfo() {
		  var testuserinfo ={
	        username:'admin',
	        password:'admin',
	        serveraddress:'192.168.8.188',
	      }

        Store.set('userInfo',null);

	  //获取上次登录信息
      Store.get('userInfo').then((data) => {
        this.LastLoginUserInfo = data;
        this.AsyncStorageNo++;
      })
	}
	// [{name:'', id:''}]
	getAsyncStorageNo(){
		console.log(this.AsyncStorageNo);
		return this.AsyncStorageNo;
	}

	//得到用户上次登录信息
	// {serverId:'', userName:'', passwd:''}
	getuserInfo(){
		return this.LastLoginUserInfo;
	}

///////////////////////////////////////////////////////////////////////////////
// 提供给控制器专用接口
	//设置当前通信地址

	//设置登录信息
	setuserInfo(userName,password,serveraddress){

		var testuserinfo ={
	        username:userName,
	        password:password,
	        serveraddress:serveraddress,
	      }

		this.LastLoginUserInfo =  testuserinfo;
		Store.set('userinfo', this.lastLoginUserName);
	}

}

//导出模块
module.exports = RSModel;