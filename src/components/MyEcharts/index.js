import React, { Component } from 'react';
import echarts from 'echarts';

class MyEcharts extends Component {
	constructor(props) {
		super(props);
		this.myRef = React.createRef();
	}

	componentDidMount() {
		this.initChart();
		window.addEventListener('resize', this.resize, false);
	}

	initChart() {
		this.myChart = echarts.init(this.myRef.current);
		this.myChart.setOption(this.props.option);
	}

	resize = () => {
		if (this.myChart) {
			this.myChart.resize();
		}
	}

	shouldComponentUpdate(nextProps) {
		// 数据更新时，同步更新echarts图数据
		this.myChart.setOption(nextProps.option);
		// 不需要再次render，所以返回 false 即可
		return false;
	}

	componentWillUnmount() {
		this.myChart.dispose();
		this.myChart = null;
		window.removeEventListener('resize', this.resize, false);
	}

	render() {
		let height = this.props.height || '200px';
		let width = this.props.width || '100%';
		return (
			<div ref={this.myRef} style={{ width, height }}></div>
		);
	}
}
export default MyEcharts;