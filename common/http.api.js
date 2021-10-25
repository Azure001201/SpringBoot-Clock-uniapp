// 此处第二个参数vm，就是我们在页面使用的this，你可以通过vm获取vuex等操作，更多内容详见uView对拦截器的介绍部分：
// https://uviewui.com/js/http.html#%E4%BD%95%E8%B0%93%E8%AF%B7%E6%B1%82%E6%8B%A6%E6%88%AA%EF%BC%9F
const install = (Vue, vm) => {
	let api = {}
	
	// 注册
	api.userRegister = params => vm.$u.post('user/register', params)
	
	// 登陆
	api.userLogin = params => vm.$u.post('user/login', params)
	
	// 更新用户数据
	api.updateUser = params => vm.$u.post('user/updateUser',params)
	
	//通过id获取用户信息
	api.selectUserById = params => vm.$u.post('user/selectUserById?id='+params.uid)
	
	// 打卡并发布动态
	api.addUserDynamic = params => vm.$u.post('dynamic/addUserDynamic',params) 
	
	// 查看所有小组
	api.selectAllGroups = params => vm.$u.post('group/selectAllGroups',params)
	
	// 加入小组
	api.userJoinGroup = params => vm.$u.post('group/userJoinGroup?uid='+params.uid+'&gid='+params.gid)
	
	// 创建小组
	api.userAddGroup = params => vm.$u.post('group/userAddGroup',params)
	
	// 退出小组
	api.userQuitGroup = params => vm.$u.delete('group/userQuitGroup?uid='+params.uid+'&gid='+params.gid)
	
	// 查看我的小组
	api.selectMyGroups = params => vm.$u.post('group/selectMyGroups?uid='+params.uid)
	
	// 通过名字搜索小组
	api.selectByGroupName = params => vm.$u.post('group/selectByGroupName',params)
	
	// 修改小组人数
	api.userGroupClock = params => vm.$u.post('group/userGroupClock?uid='+params.uid+'&gid='+params.gid) 
	
	//查看评论
	api.getComment = params => vm.$u.get('reply/selectUserReply?did='+params.did)
	
	//查看所有动态
	api.selectAllDynamic = params => vm.$u.post('dynamic/selectAllDynamic' , params)
	
	// 查看具体某一条动态
	api.selectThisDynamic = params => vm.$u.get('dynamic/selectThisDynamic?did='+ params.did)
	
	// 查看动态的评论区
	api.selectUserReply = params => vm.$u.post('reply/selectUserReply?did='+params.did) 
	
	// 一级评论
	api.addRootReply = params => vm.$u.post('reply/addRootReply',params) 
	
	// 二级评论
	api.addSonReply = params => vm.$u.post('reply/addSonReply',params)
	
	// 通过id查询普通用户
	api.selectAUser = params =>vm.$u.post('user/selectAUser',params)

	// 将各个定义的接口名称，统一放进对象挂载到vm.$u.api(因为vm就是this，也即this.$u.api)下
	vm.$u.api = api
}

export default {
	install
}
