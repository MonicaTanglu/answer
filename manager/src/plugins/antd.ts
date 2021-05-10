import { App } from 'vue'
// import { Button, Modal, Table, Menu, Input, Form, Card, Checkbox, Radio } from 'ant-design-vue'
import Antd from 'ant-design-vue'

import 'ant-design-vue/dist/antd.css'

export function setupAntd(app: App<Element>) {
  app.use(Antd)
}
