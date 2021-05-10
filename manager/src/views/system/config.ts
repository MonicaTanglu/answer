export default {
	dictFormArr: [
		{label: '字典名称',type: 'input',key: 'name',value: ''},
		{label: '字典编码',type: 'input',key: 'key',value: ''},
		{label: '描述',type: 'textarea',key: 'remark',value: ''},
	],
	dictItemFormArr: [
		{label: '字典项名称',type: 'input',key: 'name',value: ''},
		{label: '字典项值',type: 'input',key: 'key',value: ''},
		{label: '描述',type: 'textarea',key: 'remark',value: ''},
	],
	reset: (list) => {
		for(let i=0,l=list.length;i<l;i++){
			list[i].value = ''
		}
		return list
	}
}
