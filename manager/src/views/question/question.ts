export default {
	columns: [{
		title: '序号',
		dataIndex: '',
		key: 'rowIndex',
		width: 60,
		align: 'center',
		customRender: function (t) {
			return t.index + 1
		},
	}, {
		title: '标题',
		dataIndex: 'title'
	}, {
		title: '分类',
		dataIndex: 'category'
	},
	// {
	// 	title: '提醒',
	// 	dataIndex: 'type'
	// }, 
	{
		title: '操作',
		dataIndex: 'action',
		width: 180,
		slots: { customRender: 'action' },
		align: 'center'
	}]
}
