
import { api } from '@/api/api'
import { message } from 'ant-design-vue'
import { reactive, toRefs } from 'vue'
export default function getList(obj) {
	const dataParams = reactive({
		/* 查询条件-请不要在queryParam中声明非字符串值的属性 */
		queryParam: {},
		/* 数据源 */
		dataSource: [],
		/* 分页参数 */
		ipagination: {
			current: 1,
			pageSize: 10,
			pageSizeOptions: ['10', '20', '30'],
			showTotal: (total, range) => {
				return range[0] + '-' + range[1] + ' 共' + total + '条'
			},
			showQuickJumper: true,
			showSizeChanger: true,
			total: 0
		},
		/* 排序参数 */
		isorter: {
			column: 'createTime',
			order: 'desc'
		},
		/* 筛选参数 */
		filters: {},
		/* table加载状态 */
		loading: false,
		/* table选中keys */
		selectedRowKeys: [],
		/* table选中records */
		selectionRows: [],
		/* 查询折叠 */
		toggleSearchStatus: false,
		/* 高级查询条件生效状态 */
		superQueryFlag: false,
		/* 高级查询条件 */
		superQueryParams: '',
		/** 高级查询拼接方式 */
		superQueryMatchType: 'and'
	})
	const filterObj = (obj: any) => {
		if (!(typeof obj === 'object')) {
			return
		}

		for (const key in obj) {
			if (obj.hasOwnProperty(key) && (obj[key] === null || obj[key] === undefined || obj[key] === '')) {
				delete obj[key]
			}
		}
		return obj
	}
	const getQueryField = () => {
		// TODO 字段权限控制
		let str = 'id,'
		obj.columns.forEach(function (value) {
			str += ',' + value.dataIndex
		})
		return str
	}
	const getQueryParams = () => {
		// 获取查询条件
		const sqp = {}
		if (dataParams.superQueryParams) {
			sqp['superQueryParams'] = encodeURI(dataParams.superQueryParams)
			sqp['superQueryMatchType'] = dataParams.superQueryMatchType
		}
		const param: any = Object.assign(sqp, dataParams.queryParam, dataParams.isorter, dataParams.filters)
		param.field = getQueryField()
		param.pageNo = dataParams.ipagination.current
		param.pageSize = dataParams.ipagination.pageSize
		return filterObj(param)
	}

	const getListF = async () => {
		const params = getQueryParams() // 查询条件
		const res: any = await api.get(obj.url.list, 'empty', params)
		if (res.success) {
			dataParams.dataSource = res.result.records
			dataParams.ipagination.total = res.result.total
		}
		if (res.code === 510) {
			message.warning(res.message)
		}
		dataParams.loading = false
	}
	const handleToggleSearch = () => {
		dataParams.toggleSearchStatus = !dataParams.toggleSearchStatus
	}
	const handleTableChange = (pagination, filters, sorter) => {
		// 分页、排序、筛选变化时触发
		// TODO 筛选
		if (Object.keys(sorter).length > 0) {
			dataParams.isorter.column = sorter.field
			dataParams.isorter.order = sorter.order === 'ascend' ? 'asc' : 'desc'
		}
		dataParams.ipagination = pagination
		getListF()
	}
	const onSelectChange = (selectedRowKeys, selectionRows) => {
		dataParams.selectedRowKeys = selectedRowKeys
		dataParams.selectionRows = selectionRows
	}
	// getListF()
	return {
		data: toRefs(dataParams),
		// ...toRefs(dataParams),
		getListF: getListF,
		handleToggleSearch: handleToggleSearch,
		handleTableChange: handleTableChange,
		onSelectChange: onSelectChange
	};

}

