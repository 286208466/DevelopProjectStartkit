import Mock from 'mockjs'

Mock.mock("/api/system/login", {
	code: 200,
	data: {
		id: 1,
        username: "VUE",
        token: ""
	},
	msg: ""
})