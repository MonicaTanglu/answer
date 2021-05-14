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
		title: '名称',
		dataIndex: 'name'
	}, {
		title: 'key值',
		dataIndex: 'key',
		width: 180,
	}, {
		title: '操作',
		dataIndex: 'action',
		// fixed: 'right',
		width: 180,
		slots: { customRender: 'action' },
		align: 'center'
	},],
	formCategory: [{
		label: '名称',
		type: 'input',
		key: 'name',
		value: null,
		required: true
	}, {
		label: 'key值',
		type: 'input',
		key: 'key',
		disabled: false,
		value: null,
		required: true
	}]
}
