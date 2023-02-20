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

//近期宣传要求
Mock.mock("/tom-dingtalk/notice/pageQueryList", {
	code: 200,
	data: [
		{
			id: 1,
			title: "关于在全市范围内依法对泥头车实施仙道、限速行驶措施的通知1",
			publish_time: "2018年6月15日",
			creator: "深圳公交"
		},
		{
			id: 2,
			title: "关于在全市范围内依法对泥头车实施仙道、限速行驶措施的通知2",
			publish_time: "2018年6月15日",
			creator: "深圳公交"
		},
		{
			id: 3,
			title: "关于在全市范围内依法对泥头车实施仙道、限速行驶措施的通知3",
			publish_time: "2018年6月15日",
			creator: "深圳公交"
		},
		{
			id: 4,
			title: "关于在全市范围内依法对泥头车实施仙道、限速行驶措施的通知4",
			publish_time: "2018年6月15日",
			creator: "深圳公交"
		},
		{
			id: 5,
			title: "关于在全市范围内依法对泥头车实施仙道、限速行驶措施的通知5",
			publish_time: "2018年6月15日",
			creator: "深圳公交"
		}
		
	],
	msg: ""
})

Mock.mock("/tom-dingtalk/notice/queryById", {
	code: 200,
	data: {
		id: 1,
		title: "关于在全市范围内依法对泥头车实施仙道、限速行驶措施的通知1",
		publish_time: "2018年6月15日",
		creator: "深圳公交",
		content: "为供给侧改革加把力。“破”要更坚决，抓住处置“僵尸企业”这个牛鼻子，清除无效供给的杂草乱木，为新动能茁壮成长腾出空间；“立”要更扎实，加强关键核心技术攻关，加快科技创新能力建设，让新产业、新模式、新业态焕发蓬勃生机；“降”要更彻底，以简政红利、税费“红包”激发微观经济发展潜能，使实体经济“血脉”更畅通、负担更轻、活力更旺。让全面深化改革开放挂满帆。改革开放不惑之年，继续推进的复杂程度、敏感程度、艰巨程度，一点都不亚于当初。过去40年中国经济高速增长靠的是改革开放，未来推动经济高质量发展仍然要靠改革开放。全面深化改革开放，必须下更强的决心、用更大的气力，推动重大改革成果落地见效，加快重大开放举措开花结果，让新一轮改革开放的红利惠及中国和世界。"
	},
	msg: ""
})

//话题
Mock.mock("/tom-dingtalk/topic/pageQueryList", {
	code: 200,
	data: [
		{
			id: 1,
			name: "交通安全1",
			create_time: "01月01日",
			introduction: "13亿人看了震惊，出了事故不报警，居然在桥上...",
			topicName: "深圳交警",
			img_url: "http://img3.imgtn.bdimg.com/it/u=1676781748,2855211183&fm=27&gp=0.jpg",
			weibo_url: "",
			isTop: true
		},
		{
			id: 2,
			name: "交通安全2",
			create_time: "01月01日",
			introduction: "13亿人看了震惊，出了事故不报警，居然在桥上...",
			topicName: "深圳交警",
			img_url: "http://img3.imgtn.bdimg.com/it/u=1676781748,2855211183&fm=27&gp=0.jpg",
			weibo_url: "",
			isTop: false
		},
		{
			id: 3,
			name: "交通安全3",
			create_time: "01月01日",
			introduction: "13亿人看了震惊，出了事故不报警，居然在桥上...",
			topicName: "深圳交警",
			img_url: "http://img3.imgtn.bdimg.com/it/u=1676781748,2855211183&fm=27&gp=0.jpg",
			isTop: false
		},
		{
			id: 4,
			name: "交通安全4",
			create_time: "01月01日",
			introduction: "13亿人看了震惊，出了事故不报警，居然在桥上...",
			topicName: "深圳交警",
			img_url: "http://img3.imgtn.bdimg.com/it/u=1676781748,2855211183&fm=27&gp=0.jpg",
			isTop: false
		},
		{
			id: 5,
			name: "交通安全5",
			create_time: "01月01日",
			introduction: "13亿人看了震惊，出了事故不报警，居然在桥上...",
			topicName: "深圳交警",
			img_url: "http://img3.imgtn.bdimg.com/it/u=1676781748,2855211183&fm=27&gp=0.jpg",
			isTop: false
		}
		
	],
	msg: ""
})

//素材
Mock.mock("/tom-dingtalk/material/create", {
	code: 200,
	data: {},
	msg: ""
})

//我的报送
Mock.mock("/tom-dingtalk/material/queryCountByStatus", {
	code: 200,
	data: {
		check: 10,
		refuse: 5,
		pass: 6
	},
	msg: ""
})

Mock.mock("/tom-dingtalk/material/pageQueryMyPostList", {
	code: 200,
	data: [
		{
			id: 1,
			title: "交通安全1",
			type: "1",
			content: "13亿人看了震惊，出了事故不报警，居然在桥上...",
			status: 1,
			pic_url: "http://img3.imgtn.bdimg.com/it/u=1676781748,2855211183&fm=27&gp=0.jpg",
			video_url: "",
			post_time: "01月1日"
		},
		{
			id: 1,
			title: "交通安全1",
			type: "2",
			content: "13亿人看了震惊，出了事故不报警，居然在桥上...",
			status: 2,
			pic_url: "http://img3.imgtn.bdimg.com/it/u=1676781748,2855211183&fm=27&gp=0.jpg",
			video_url: "",
			post_time: "01月1日"
		},
		{
			id: 1,
			title: "交通安全1",
			type: "2",
			content: "13亿人看了震惊，出了事故不报警，居然在桥上...",
			status: 3,
			pic_url: "http://img3.imgtn.bdimg.com/it/u=1676781748,2855211183&fm=27&gp=0.jpg",
			video_url: "",
			post_time: "01月1日"
		},
		{
			id: 1,
			title: "交通安全1",
			type: "3",
			content: "13亿人看了震惊，出了事故不报警，居然在桥上...",
			status: 1,
			pic_url: "http://img3.imgtn.bdimg.com/it/u=1676781748,2855211183&fm=27&gp=0.jpg",
			video_url: "",
			post_time: "01月1日"
		},
		{
			id: 1,
			title: "交通安全1",
			type: "4",
			content: "13亿人看了震惊，出了事故不报警，居然在桥上...",
			status: 1,
			pic_url: "http://img3.imgtn.bdimg.com/it/u=1676781748,2855211183&fm=27&gp=0.jpg",
			video_url: "",
			post_time: "01月1日"
		}
		
	],
	msg: ""
})

Mock.mock("/tom-dingtalk/material/queryById", {
	code: 200,
	data: {
		id:"123",
		pic_url: ["http://fanyi.baidu.com/static/webpage/img/download/pic.png", "http://fanyi.baidu.com/static/webpage/img/download/pic.png","http://fanyi.baidu.com/static/webpage/img/download/pic.png","http://fanyi.baidu.com/static/webpage/img/download/pic.png", "http://fanyi.baidu.com/static/webpage/img/download/pic.png"]
		,video_url: [],
		title: "交通宣传",
		content: "10种语言，拍照后涂抹文字，即可快速获取翻译结果",
		type: 1,
		status: 2,
		post_time: "2018-11-11",
		locale: "广东深圳",
		event_time: "2018年11月11日",
		audit_detail: [
			{
				material_id:1,
				auditor_name: "小队",
				audit_time:"2015-11-11",
				audit_dept_name:"福田部门",
				audit_result:1
			},
			{
				material_id:1,
				auditor_name: "小队",
				audit_time:"2015-11-11",
				audit_dept_name:"福田部门",
				audit_result:1
			},
			{
				material_id:1,
				auditor_name: "小队",
				audit_time:"2015-11-11",
				audit_dept_name:"福田部门",
				audit_result:1
			},
			{
				material_id:1,
				auditor_name: "小队",
				audit_time:"2015-11-11",
				audit_dept_name:"福田部门",
				audit_result:1
			}
		]
	},
	msg: ""
})

//意见/
Mock.mock("/tom-dingtalk/feedback/submit", {
	code: 200,
	data: {},
	msg: ""
})