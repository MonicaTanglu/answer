import NProgress from 'nprogress' // progress bar
import { ACCESS_TOKEN } from '@/store/mutation-types'
import { createStorage } from '@/utils/storage'
import { isNavigationFailure, Router } from 'vue-router'

const storage = createStorage()
NProgress.configure({ showSpinner: false }) // NProgress Configuration

const allowList = ['login'] // no redirect whitelist
const loginRoutePath = '/login'
const defaultRoutePath = '/'

export function createRouterGuards(router: Router) {
	router.beforeEach((to, from, next) => {
		NProgress.start()
		const token = storage.get(ACCESS_TOKEN)
		if (token) {
			if (to.name === 'login') {
				next({ path: defaultRoutePath })
				NProgress.done()
			} else {
				next()
			}
		} else {
			if (allowList.includes(to.name as string)) {
				next()
			} else {
				next({ path: loginRoutePath, query: { redirect: to.fullPath }, replace: true })
				NProgress.done() // if current page is login will not trigger afterEach hook, so manually handle it
			}
		}
	})

	router.afterEach((to, from, failure) => {
		if (isNavigationFailure(failure)) {
			console.log('failed navigation', failure)
		}
		NProgress.done() // finish progress bar
	})

	router.onError((error) => {
		console.log(error, '路由错误')
	})
}
