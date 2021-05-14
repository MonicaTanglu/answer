import Vue from 'vue'
import dayjs from "dayjs";
const app = Vue.createApp({})
/**
 *  字符串超长截取省略号显示
 *  使用方法 {{value | ellipsis(20)}}
 *  */
app.config.globalProperties.$filters = {
	ellipsis(value, len = 25) {
		if (!value) {
			return "";
		}
		if (value.length > len) {
			return value.slice(0, len) + '...'
		}
		return value
	},
	dayjs(dataStr, pattern = 'YYYY-MM-DD HH:mm:ss') {
		return dayjs(dataStr).format(pattern)
	}
}

/**
 * 使用方法 {{ item.opTime | dayjs("YYYY年M月D日") }}
 */
// Vue.filter('dayjs', function (dataStr, pattern = 'YYYY-MM-DD HH:mm:ss') {
// 	return dayjs(dataStr).format(pattern)
// })
