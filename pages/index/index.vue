<template>
	<view id="index">
		<!-- 登录状态确认 -->
		<login ref="login"></login>
		
		<!-- 背景图片 -->
		<image src="../../static/1.jpg" mode="widthFix" class="bg"></image>
		<!-- 滚动公告 -->
		<view class="notice">
				<u-notice-bar mode="horizontal" :list="list"></u-notice-bar>
		</view>
		<!-- 打卡选项卡 -->
		<view class="clock_in_type">
			<view class="t1">
				<text class="iconfont icon-xueshengdushu"></text>
				<text class="detail">\n学习</text>
			</view>
			<view class="t1">
				<text class="iconfont icon-dati "></text>
				<text class="detail">\n练字</text>
			</view>
			<view class="t1">
				<text class="iconfont icon-yueliang"></text>
				<text class="detail">\n早睡</text>
			</view>
			<view class="t1">
				<text class="iconfont icon-richu"></text>
				<text class="detail">\n早起</text>
			</view>
			<view class="t1">
				<text class="iconfont icon-paobu"></text>
				<text class="detail">\n运动</text>
			</view>
			<view class="t1">
				<text class="iconfont icon-sheng"></text>
				<text class="detail">\n省钱</text>
			</view>
			<view class="t1">
				<text class="iconfont icon-jinyong"></text>
				<text class="detail">\n禁X</text>
			</view>
			<view class="t1">
				<text class="iconfont icon-shenglvehao"></text>
				<text class="detail">\n其他</text>
			</view>
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return{
				list:[
					'孙烧杯太可爱了吧孙烧杯太可爱了吧孙烧杯太可爱了吧孙烧杯太可爱了吧孙烧杯太可爱了吧孙烧杯太可爱了吧',
					]
			}
		},
		onLoad() {
			
		},
		methods: {
			
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
	.clock_in_type{
		position: absolute;
		width: 750rpx;
		height: 500rpx;
		left: 0;
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
