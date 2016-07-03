'use strict';
var React = require('react-native');
var {
  AppRegistry,
  Component,
  Navigator,
  View,
  Text,
} = React;

//导入业务和模型
var RSModel = require('./RSModel.js');
var RSController = require('./RSController.js');

//导出单例对象
export var theRSModel;
export var theRSController;

//主控件
class RSAppProject extends Component {
	//构造函数
    constructor(props) {
      super(props);
      this.state = {
        initViewName:'view1',
        beginInitView:false,
      };
    }

	//加载组建
    componentWillMount() {
		//初始化模型单例对象
		theRSModel = new RSModel();

		//初始化控制单例对象
		theRSController = new RSController();

		//启动业务控制
		theRSController.startUp();
    }

	//组件加载完毕
	componentDidMount() {
    }

	renderScene(route, navi) {
		return theRSController.renderScene(route, navi);
	}

	//渲染组件
	render() {
		return (
			<Navigator
				initialRoute={{name: this.state.initViewName}}
				configureScene={() => {return Navigator.SceneConfigs.VerticalDownSwipeJump;}} 
				renderScene={this.renderScene} />
			);
	}
}

//注册主控件
AppRegistry.registerComponent('MyProject', () => RSAppProject);