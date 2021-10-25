<template>
	<view id="index">
		<!-- 登录状态确认 -->
		<login ref="login" v-if="!loginState"></login>
		
		<!-- 背景图片 -->
		<image src="../../static/1.jpg" mode="widthFix" class="bg"></image>
		<!-- 滚动公告 -->
		<view class="notice">
				<u-notice-bar mode="horizontal" type="primary" :list="list"></u-notice-bar>
		</view>
		<!-- 下面的半圆导航 -->
		<view class="view-circle" />
		<!-- 打卡选项卡 -->
		<view class="clock_in_type">
			<view class="t1" @tap.stop="gotoClock(0)">
				<text class="iconfont icon-xueshengdushu"></text>
				<text class="detail">\n学习</text>
			</view>
			<view class="t1" @tap.stop="gotoClock(1)">
				<text class="iconfont icon-dati "></text>
				<text class="detail">\n练字</text>
			</view>
			<view class="t1" @tap.stop="gotoClock(2)">
				<text class="iconfont icon-yueliang"></text>
				<text class="detail">\n早睡</text>
			</view>
			<view class="t1" @tap.stop="gotoClock(3)">
				<text class="iconfont icon-richu"></text>
				<text class="detail">\n早起</text>
			</view>
			<view class="t1" @tap.stop="gotoClock(4)">
				<text class="iconfont icon-paobu"></text>
				<text class="detail">\n运动</text>
			</view>
			<view class="t1" @tap.stop="gotoClock(5)">
				<text class="iconfont icon-sheng"></text>
				<text class="detail">\n省钱</text>
			</view>
			<view class="t1" @tap.stop="gotoClock(6)">
				<text class="iconfont icon-jinyong"></text>
				<text class="detail">\n禁X</text>
			</view>
			<view class="t1" @tap.stop="gotoClock(7)">
				<text class="iconfont icon-shenglvehao"></text>
				<text class="detail">\n其他</text>
			</view>
		</view>
		
	</view>
</template>

<script>
	import {
		mapState,
		mapActions
	} from 'vuex'
	export default {
		data() {
			return{
				list:[
					'测试一下公告testtest，测试一下公告testtest，测试一下公告testtest，测试一下公告testtest',
					]
			}
		},
		onLoad() {
			
		},
		computed: {
			...mapState(['loginState', 'userInfo'])
		},
		methods: {
			gotoClock(n){
				uni.navigateTo({
					url:"/subpages/clock/clock?index="+n
				})
			},
		
		}
	}
</script>

<style>
	.bg{
		position: absolute;
		width:750rpx;
		height: 1325rpx;
		z-index: 1;
	}
	.notice{
		position: absolute;
		margin-top: 100rpx;
		z-index: 99999999;
	}
	.view-circle {
		overflow: hidden;
		border-width: 0;
		border-style: solid;
		position: absolute;
		z-index: 9;
		width: 750upx;
		height: 300upx;
		background: url(@/static/half-circle.png) no-repeat center;
		background-size: cover;
		bottom: 490upx;
		overflow-x: hidden;
	}
	.clock_in_type{
		background-color: #FFFFFF;
		position: absolute;
		width: 750rpx;
		height: 500rpx;
		left: 0;
		bottom: 0;
		top: 750rpx;
		z-index: 99;
	}
	/* 50 150 */
	.t1{
		float: left;	
		margin-left: 30rpx;
		margin-top: 50rpx;
		width: 150rpx;
		height: 180rpx;
		background-color: grey;
		z-index: 999;
		text-align: center;
		color: #000000;
	}
	.t1 .iconfont{
		font-size: 120rpx;
	}
	
</style>
