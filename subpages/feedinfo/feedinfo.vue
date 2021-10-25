<template>
	<view>
		<view class="feed-user">
			<u-avatar size="60" class="avatar" :src="feedInfo.uavg" />
			<view class="info">
				<text>{{ feedInfo.name }}</text>
			</view>
		</view>
		<view class="feed-info">
			<view class="title" v-if="!!feedInfo.dconcern">{{ feedInfo.dconcern }}</view>
				<image class="feed-imgs" mode="widthFix" :src="feedInfo.dimg"/>
			<view class="other">
				<text>{{ feedInfo.dtime}} 发布</text>
				<view class="reply" @click="reply1">回复</view>
			</view>
		</view>
		<!-- 评论区 -->
		<view>
			<view class="comment" v-for="(res, i) in commentList" :key="res.rid">
				<!-- <view class="left"><image :src="item.url" mode="aspectFill"></image></view> -->
				<view class="right">
					<view class="top">
						<view class="name">{{ res.fromuname }}</view>
					</view>
					<view class="content">{{ res.rContents }}</view>
					<view class="reply-box">
						<view class="item" v-for="(item, index) in res.replyVOS" :key="item.rid">
							<view class="username">{{ item.fromuname }}</view>
							<view class="text">{{ item.rContents }}</view>
						</view>
					</view>
					<view class="bottom">
						{{ res.rTime }}
						<view class="reply" @click="reply2({fid:res.rid,touid:res.fromuid})">回复</view>
					</view>
				</view>
			</view>
		</view>
		<!-- 发布评论区域 -->
		<view class="reply" v-if="isreply">
			<u-input v-model="rContents" :type="text" :border="true" :focus= "true"/>
			<u-button class="replyb" type="primary" size="medium" @click="RootReply({did:feedInfo.did,touid:feedInfo.uid})" v-if="isRootReply">回复</u-button>
			<u-button class="replyb" type="primary" size="medium" @click="SonReply(feedInfo.did)" v-if="!isRootReply">回复</u-button>
		</view>
		<u-toast ref="uToast"></u-toast>
	</view>
</template>

<script>
	// import Comment from '@/components/comment.vue'
	export default {
		data() {
			return {
				name:'',
				uavg:'',
				// 动态详情
				feedInfo: {},
				// 评论
				commentList: [],
				rContents:'',
				isreply: false,
				isRootReply:false,
				fid:'',
				touid:''
			}
		},
		async onLoad(params) {
				// 获取动态详情
				let res = await this.$u.api.selectThisDynamic(params)
				let resa = await this.$u.api.selectAUser({
					id : res.data[0].uid
				})
				console.log("test",resa.data.list[0])
				// let images = res.data.images.map(one => {
				// 	return this.BaseFileURL + one.file
				// // })
				this.feedInfo = {
					...resa.data,
					...res.data,
					name: resa.data.list[0].username,
					uavg: resa.data.list[0].uavg ? resa.data.list[0].uavg : '../static/nopic.png',
					uid: resa.data.list[0].id,	
					dconcern: res.data[0].dconcern,
					did: res.data[0].did,
					dimg: res.data[0].dimg,
					dtime: res.data[0].dtime,
				}
				console.log(this.feedInfo)
				// 获取评论
				let resb = await this.$u.api.selectUserReply(params)
				console.log(resb.data.data)
				let commentList= resb.data.data
				console.log(commentList)
				this.commentList = resb.data.data
			},
			methods:{
				reply1(){
					this.isreply = true,
					this.isRootReply = true,
					this.rContents = ''
				},
				reply2(params){
					this.isreply = true
					this.rContents = ''
					console.log(params)
					this.fid = params.fid
					this.touid = params.touid
				},
				RootReply(params){
					console.log(params)
					let fromuid = uni.getStorageSync("uid")
					let rContents = this.rContents
					console.log(fromuid)
					console.log(this.rContents)
					let res = this.$u.api.addRootReply({
						did : params.did,
						touid : params.touid,
						fromuid : fromuid,
						rContents : rContents
					})
					this.$refs.uToast.show({
						title:'回复成功',
						type:'success'
					})					
					this.isreply = false

				},
				SonReply(did){
					console.log(this.fid)
					let fromuid = uni.getStorageSync("uid")
					let rContents = this.rContents
					console.log(fromuid)
					console.log(this.rContents)
					console.log("t",this.touid)
					console.log("tsdas",this.fid)
					console.log(did)
					let res = this.$u.api.addSonReply({
						did : did,
						fid : this.fid,
						touid : this.touid,
						fromuid : fromuid,
						rContents : rContents
					})
					this.$refs.uToast.show({
						title:'回复成功',
						type:'success'
					})	
					this.isreply = false
					uni.navigateTo('/subpages/feedinfo/feedinfo?did=' + did)
					
				}
			}
	}
</script>

<style lang="scss" scoped>
	.feed-user {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		justify-content: flex-start;
		align-items: center;
		align-content: center;
		margin: 20upx 0 0 25upx;

		.info {
			display: flex;
			flex-direction: column;
			flex-wrap: wrap;
			justify-content: flex-end;
			align-items: left;
			margin-left: 20upx;
			font-size: 24upx;
			font-weight: bolder;
			color: #1f2046;
		}
	}

	.feed-info {
		width: 700upx;
		margin-top: 20upx;
		margin-left: 25upx;
		text-align: center;
		padding-bottom: 10upx;

		.title {
			font-size: 32upx;
			margin-bottom: 30upx;
			text-align: left;
			line-height: 52upx;
			color: #666;
		}

		.feed-imgs {
			margin: 5upx 0;
			width: 100%;
		}
		

		.other {
			display: flex;
			flex-direction: row;
			flex-wrap: wrap;
			justify-content: space-between;
			align-items: center;
			align-content: center;
			padding: 40upx 0 20upx;
			font-size: 24upx;
			color: #888;
			.reply {
				color: #5677fc;
				margin-left: 10rpx;
			}
			.micon {
				padding: 10upx 20upx;
			}
		}
		
	}

	.line {
		height: 30upx;
		width: 750upx;
		background-color: #f3f3f3;
	}
	.comment {
		display: flex;
		padding: 30rpx;
		.left {
			image {
				width: 64rpx;
				height: 64rpx;
				border-radius: 50%;
				background-color: #f2f2f2;
			}
		}
		.right {
			flex: 1;
			padding-left: 20rpx;
			font-size: 30rpx;
			.top {
				display: flex;
				justify-content: space-between;
				align-items: center;
				margin-bottom: 10rpx;
				.name {
					color: #5677fc;
				}
				.like {
					display: flex;
					align-items: center;
					color: #9a9a9a;
					font-size: 26rpx;
					.num {
						margin-right: 4rpx;
						color: #9a9a9a;
					}
				}
				.highlight {
					color: #5677fc;
					.num {
						color: #5677fc;
					}
				}
			}
			.content {
				margin-bottom: 10rpx;
			}
			.reply-box {
				background-color: rgb(242, 242, 242);
				border-radius: 12rpx;
				.item {
					padding: 20rpx;
					border-bottom: solid 2rpx $u-border-color;
					.username {
						font-size: 24rpx;
						color: #999999;
					}
				}
			}
			.bottom {
				margin-top: 20rpx;
				display: flex;
				font-size: 24rpx;
				color: #9a9a9a;
				.reply {
					color: #5677fc;
					margin-left: 10rpx;
				}
			}
		}
	}
</style>
