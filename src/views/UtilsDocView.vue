<template>
  <div class="utils-doc clearfix">
    <div class="tab clearfix" style="width: 100%">
      <div
        class="fl tab-item"
        v-for="module in modules"
        :key="module.id"
        :class="{ active: activeModule === module.id }"
        @click="selectModule(module.id)"
      >
        <span class="tab-name">{{ module.name }}</span>
        <span class="tab-count">{{ module.functions.length }}</span>
      </div>
    </div>
    <div class="left fl">
      <div class="tab_content">
        <div class="function-list">
          <div
            class="function-item"
            v-for="func in getCurrentModule.functions"
            :key="func.name"
            :class="{ active: activeFunction === func.name }"
            @click="selectFunction(func.name)"
          >
            <div class="clearfix">
              <span class="function-name fl">{{ func.name }}</span>
              <span class="function-category fl">{{ func.category }}</span>
            </div>
            <!-- <div class="function-name">{{ func.name }}</div> -->
            <!-- <div class="function-desc">{{ func.description }}</div> -->
          </div>
        </div>
      </div>
    </div>
    <div class="right fr">
      <!-- 模块内容 -->
      <el-card class="module-content-card">
        <div slot="header" class="card-header">
          <!-- <span>模块内容</span> -->
        </div>
        <div v-if="getCurrentFunction()" class="function-detail">
          <el-descriptions
            :title="getCurrentFunction().name"
            :column="1"
            border
            style="margin-bottom: 50px"
          >
            <el-descriptions-item label="函数签名">
              <el-tag type="primary">{{
                getCurrentFunction().signature
              }}</el-tag>
            </el-descriptions-item>
            <el-descriptions-item label="描述">
              {{ getCurrentFunction().description }}
            </el-descriptions-item>
            <el-descriptions-item label="分类">
              <el-tag>{{ getCurrentFunction().category }}</el-tag>
            </el-descriptions-item>
          </el-descriptions>

          <!-- 参数表格 -->
          <div class="params-section" style="margin-bottom: 50px">
            <h4 style="padding: 10px 5px">参数</h4>
            <el-table :data="getCurrentFunction().params" border>
              <el-table-column prop="name" label="参数名" width="120" />
              <el-table-column prop="type" label="类型" width="120">
                <template slot-scope="scope">
                  <el-tag size="small" type="warning">{{
                    scope.row.type
                  }}</el-tag>
                </template>
              </el-table-column>
              <el-table-column prop="description" label="描述" />
            </el-table>
          </div>

          <!-- 返回值 -->
          <div class="returns-section" style="margin-bottom: 50px">
            <h4 style="padding: 10px 5px">返回值</h4>
            <el-descriptions :column="1" border>
              <el-descriptions-item label="类型">
                <el-tag type="success">{{
                  getCurrentFunction().returns.type
                }}</el-tag>
              </el-descriptions-item>
              <el-descriptions-item label="描述">
                {{ getCurrentFunction().returns.description }}
              </el-descriptions-item>
            </el-descriptions>
          </div>

          <!-- 代码示例 -->
          <div class="example-section" style="margin-bottom: 50px">
            <h4 style="padding: 10px 5px">代码示例</h4>
            <el-tabs type="border-card" class="code-tabs">
              <el-tab-pane label="基础用法">
                <div class="code-editor">
                  <div class="code-header">
                    <div class="code-dots">
                      <span class="dot red"></span>
                      <span class="dot yellow"></span>
                      <span class="dot green"></span>
                    </div>
                    <div class="code-title">example.js</div>
                  </div>
                  <div class="code-content">
                    <pre><code class="javascript">{{ getCurrentFunction().example }}</code></pre>
                  </div>
                </div>
              </el-tab-pane>
              <el-tab-pane label="高级用法">
                <div class="code-editor">
                  <div class="code-header">
                    <div class="code-dots">
                      <span class="dot red"></span>
                      <span class="dot yellow"></span>
                      <span class="dot green"></span>
                    </div>
                    <div class="code-title">advanced.js</div>
                  </div>
                  <div class="code-content">
                    <pre><code class="javascript">{{ getCurrentFunction().advancedExample || '暂无高级示例' }}</code></pre>
                  </div>
                </div>
              </el-tab-pane>
            </el-tabs>
          </div>
        </div>
        <el-empty v-else description="请选择一个函数查看详情" />
      </el-card>
    </div>
  </div>
</template>

<script>
export default {
  name: 'UtilsDocView',
  data() {
    return {
      activeModule: 'basic',
      activeFunction: 'debounce',
      activeCollapse: 'basic',
      modules: [
        {
          id: 'basic',
          name: '基础工具',
          icon: 'el-icon-tools',
          functions: [
            {
              name: '防抖函数',
              category: '性能优化',
              description:
                '在事件被触发n秒后再执行回调，如果在这n秒内又被触发，则重新计时',
              signature:
                'debounce(func: Function, wait: number, immediate?: boolean): Function',
              params: [
                { name: 'func', type: 'Function', description: '要防抖的函数' },
                {
                  name: 'wait',
                  type: 'number',
                  description: '等待时间（毫秒）',
                },
                {
                  name: 'immediate',
                  type: 'boolean',
                  description: '是否立即执行',
                },
              ],
              returns: { type: 'Function', description: '防抖后的函数' },
              example: `import utils from '@/utils'

const debouncedSearch = utils.debounce(searchFunction, 300)
input.addEventListener('input', debouncedSearch)`,
            },
            {
              name: '节流函数',
              category: '性能优化',
              description: '规定在一个单位时间内，只能触发一次函数',
              signature: 'throttle(func: Function, limit: number): Function',
              params: [
                { name: 'func', type: 'Function', description: '要节流的函数' },
                {
                  name: 'limit',
                  type: 'number',
                  description: '时间间隔（毫秒）',
                },
              ],
              returns: { type: 'Function', description: '节流后的函数' },
              example: `import utils from '@/utils'

const throttledScroll = utils.throttle(handleScroll, 100)
window.addEventListener('scroll', throttledScroll)`,
            },
            {
              name: '深度克隆',
              category: '对象操作',
              description: '深度克隆对象或数组，支持循环引用',
              signature: 'deepClone(obj: any): any',
              params: [
                { name: 'obj', type: 'any', description: '要克隆的对象' },
              ],
              returns: { type: 'any', description: '克隆后的对象' },
              example: `import utils from '@/utils'

const cloned = utils.deepClone(originalObject)`,
            },
            {
              name: '格式化日期',
              category: '日期时间',
              description: '将日期格式化为指定格式的字符串',
              signature:
                'formatDate(date: Date|string|number, format?: string): string',
              params: [
                {
                  name: 'date',
                  type: 'Date|string|number',
                  description: '日期对象、字符串或时间戳',
                },
                {
                  name: 'format',
                  type: 'string',
                  description: '格式字符串，默认为YYYY-MM-DD HH:mm:ss',
                },
              ],
              returns: { type: 'string', description: '格式化后的日期字符串' },
              example: `import utils from '@/utils'

utils.formatDate(new Date(), 'YYYY-MM-DD') // '2023-12-25'`,
            },
            {
              name: '相对时间',
              category: '日期时间',
              description: '获取相对于当前时间的描述',
              signature: 'getRelativeTime(date: Date|string|number): string',
              params: [
                {
                  name: 'date',
                  type: 'Date|string|number',
                  description: '目标日期',
                },
              ],
              returns: { type: 'string', description: '相对时间描述' },
              example: `import utils from '@/utils'

utils.getRelativeTime(new Date(Date.now() - 3600000)) // '1小时前'`,
            },
            {
              name: '格式化数字',
              category: '数字处理',
              description: '格式化数字，添加千分位分隔符',
              signature:
                'formatNumber(num: number, separator?: string): string',
              params: [
                { name: 'num', type: 'number', description: '要格式化的数字' },
                {
                  name: 'separator',
                  type: 'string',
                  description: '分隔符，默认为逗号',
                },
              ],
              returns: { type: 'string', description: '格式化后的数字字符串' },
              example: `import utils from '@/utils'

utils.formatNumber(1234567) // '1,234,567'`,
            },
            {
              name: '格式化文件大小',
              category: '数字处理',
              description: '将字节数格式化为可读的文件大小',
              signature:
                'formatFileSize(bytes: number, precision?: number): string',
              params: [
                { name: 'bytes', type: 'number', description: '字节数' },
                {
                  name: 'precision',
                  type: 'number',
                  description: '小数位数，默认为2',
                },
              ],
              returns: { type: 'string', description: '格式化后的文件大小' },
              example: `import utils from '@/utils'

utils.formatFileSize(1024) // '1.00 KB'`,
            },
            {
              name: '生成随机字符串',
              category: '字符串处理',
              description: '生成指定长度的随机字符串',
              signature:
                'generateRandomString(length: number, chars?: string): string',
              params: [
                { name: 'length', type: 'number', description: '字符串长度' },
                {
                  name: 'chars',
                  type: 'string',
                  description: '字符集，默认为字母数字',
                },
              ],
              returns: { type: 'string', description: '随机字符串' },
              example: `import utils from '@/utils'

utils.generateRandomString(8) // 'aB3xY9mN'`,
            },
            {
              name: '生成UUID',
              category: '字符串处理',
              description: '生成符合RFC4122标准的UUID v4',
              signature: 'generateUUID(): string',
              params: [],
              returns: { type: 'string', description: 'UUID字符串' },
              example: `import utils from '@/utils'

utils.generateUUID() // 'f47ac10b-58cc-4372-a567-0e02b2c3d479'`,
            },
          ],
        },
        {
          id: 'validation',
          name: '验证工具',
          icon: 'el-icon-check',
          functions: [
            {
              name: '验证手机号',
              category: '表单验证',
              description: '验证中国大陆手机号格式',
              signature: 'validatePhone(phone: string): boolean',
              params: [
                { name: 'phone', type: 'string', description: '手机号码' },
              ],
              returns: { type: 'boolean', description: '验证结果' },
              example: `import utils from '@/utils'

utils.validatePhone('13800138000') // true`,
            },
            {
              name: '验证邮箱',
              category: '表单验证',
              description: '验证邮箱地址格式',
              signature: 'validateEmail(email: string): boolean',
              params: [
                { name: 'email', type: 'string', description: '邮箱地址' },
              ],
              returns: { type: 'boolean', description: '验证结果' },
              example: `import utils from '@/utils'

utils.validateEmail('user@example.com') // true`,
            },
            {
              name: '验证身份证',
              category: '表单验证',
              description: '验证身份证号码格式（15位或18位）',
              signature: 'validateIdCard(idCard: string): boolean',
              params: [
                { name: 'idCard', type: 'string', description: '身份证号码' },
              ],
              returns: { type: 'boolean', description: '验证结果' },
              example: `import utils from '@/utils'

utils.validateIdCard('110101199003077777') // true`,
            },
            {
              name: '验证密码',
              category: '表单验证',
              description: '验证密码强度（8-20位，包含字母和数字）',
              signature: 'validatePassword(password: string): boolean',
              params: [
                { name: 'password', type: 'string', description: '密码' },
              ],
              returns: { type: 'boolean', description: '验证结果' },
              example: `import utils from '@/utils'

utils.validatePassword('abc123456') // true`,
            },
            {
              name: '验证中文姓名',
              category: '表单验证',
              description: '验证中文姓名格式（2-8个汉字）',
              signature: 'validateChineseName(name: string): boolean',
              params: [
                { name: 'name', type: 'string', description: '中文姓名' },
              ],
              returns: { type: 'boolean', description: '验证结果' },
              example: `import utils from '@/utils'

utils.validateChineseName('张三') // true`,
            },
            {
              name: '验证银行卡',
              category: '表单验证',
              description: '验证银行卡号格式（16-19位数字）',
              signature: 'validateBankCard(cardNumber: string): boolean',
              params: [
                { name: 'cardNumber', type: 'string', description: '银行卡号' },
              ],
              returns: { type: 'boolean', description: '验证结果' },
              example: `import utils from '@/utils'

utils.validateBankCard('6222021234567890123') // true`,
            },
            {
              name: '验证URL',
              category: '表单验证',
              description: '验证URL地址格式',
              signature: 'validateUrl(url: string): boolean',
              params: [{ name: 'url', type: 'string', description: 'URL地址' }],
              returns: { type: 'boolean', description: '验证结果' },
              example: `import utils from '@/utils'

utils.validateUrl('https://www.example.com') // true`,
            },
            {
              name: '验证IPv4',
              category: '表单验证',
              description: '验证IPv4地址格式',
              signature: 'validateIPv4(ip: string): boolean',
              params: [{ name: 'ip', type: 'string', description: 'IP地址' }],
              returns: { type: 'boolean', description: '验证结果' },
              example: `import utils from '@/utils'

utils.validateIPv4('192.168.1.1') // true`,
            },
          ],
        },
        {
          id: 'dom',
          name: 'DOM操作',
          icon: 'el-icon-document',
          functions: [
            {
              name: '元素选择器',
              category: 'DOM查询',
              description: '获取第一个匹配的元素',
              signature: '$(selector: string, context?: Element): Element|null',
              params: [
                { name: 'selector', type: 'string', description: 'CSS选择器' },
                {
                  name: 'context',
                  type: 'Element',
                  description: '查找上下文，默认为document',
                },
              ],
              returns: { type: 'Element|null', description: '匹配的元素' },
              example: `import utils from '@/utils'

const button = utils.$("#myButton")`,
            },
            {
              name: '多元素选择器',
              category: 'DOM查询',
              description: '获取所有匹配的元素',
              signature: '$$(selector: string, context?: Element): NodeList',
              params: [
                { name: 'selector', type: 'string', description: 'CSS选择器' },
                {
                  name: 'context',
                  type: 'Element',
                  description: '查找上下文，默认为document',
                },
              ],
              returns: { type: 'NodeList', description: '匹配的所有元素' },
              example: `import utils from '@/utils'

const buttons = utils.$$("button")`,
            },
            {
              name: '添加CSS类',
              category: 'CSS操作',
              description: '为元素添加一个或多个CSS类',
              signature:
                'addClass(element: Element, className: string|Array): void',
              params: [
                { name: 'element', type: 'Element', description: '目标元素' },
                {
                  name: 'className',
                  type: 'string|Array',
                  description: '类名或类名数组',
                },
              ],
              returns: { type: 'void', description: '无返回值' },
              example: `import utils from '@/utils'

utils.addClass(el, 'active')`,
            },
            {
              name: '移除CSS类',
              category: 'CSS操作',
              description: '从元素移除一个或多个CSS类',
              signature:
                'removeClass(element: Element, className: string|Array): void',
              params: [
                { name: 'element', type: 'Element', description: '目标元素' },
                {
                  name: 'className',
                  type: 'string|Array',
                  description: '类名或类名数组',
                },
              ],
              returns: { type: 'void', description: '无返回值' },
              example: `import utils from '@/utils'

utils.removeClass(el, 'active')`,
            },
            {
              name: '切换CSS类',
              category: 'CSS操作',
              description: '切换元素的CSS类',
              signature:
                'toggleClass(element: Element, className: string, force?: boolean): boolean',
              params: [
                { name: 'element', type: 'Element', description: '目标元素' },
                { name: 'className', type: 'string', description: '类名' },
                {
                  name: 'force',
                  type: 'boolean',
                  description: '强制添加或移除',
                },
              ],
              returns: { type: 'boolean', description: '是否包含该类' },
              example: `import utils from '@/utils'

utils.toggleClass(el, 'active')`,
            },
            {
              name: '检查CSS类',
              category: 'CSS操作',
              description: '检查元素是否包含指定的CSS类',
              signature:
                'hasClass(element: Element, className: string): boolean',
              params: [
                { name: 'element', type: 'Element', description: '目标元素' },
                { name: 'className', type: 'string', description: '类名' },
              ],
              returns: { type: 'boolean', description: '是否包含该类' },
              example: `import utils from '@/utils'

utils.hasClass(el, 'active') // true/false`,
            },
            {
              name: '设置样式',
              category: 'CSS操作',
              description: '设置元素的CSS样式',
              signature:
                'setStyle(element: Element, styles: Object|string, value?: string): void',
              params: [
                { name: 'element', type: 'Element', description: '目标元素' },
                {
                  name: 'styles',
                  type: 'Object|string',
                  description: '样式对象或属性名',
                },
                { name: 'value', type: 'string', description: '样式值' },
              ],
              returns: { type: 'void', description: '无返回值' },
              example: `import utils from '@/utils'

utils.setStyle(el, { color: 'red', fontSize: '16px' })`,
            },
            {
              name: '获取样式',
              category: 'CSS操作',
              description: '获取元素的计算样式',
              signature: 'getStyle(element: Element, property: string): string',
              params: [
                { name: 'element', type: 'Element', description: '目标元素' },
                { name: 'property', type: 'string', description: '样式属性名' },
              ],
              returns: { type: 'string', description: '样式值' },
              example: `import utils from '@/utils'

utils.getStyle(el, 'color') // 'rgb(255, 0, 0)'`,
            },
            {
              name: '显示元素',
              category: '显示控制',
              description: '显示隐藏的元素',
              signature: 'show(element: Element, display?: string): void',
              params: [
                { name: 'element', type: 'Element', description: '目标元素' },
                {
                  name: 'display',
                  type: 'string',
                  description: '显示类型，默认为block',
                },
              ],
              returns: { type: 'void', description: '无返回值' },
              example: `import utils from '@/utils'

utils.show(el, 'flex')`,
            },
            {
              name: '隐藏元素',
              category: '显示控制',
              description: '隐藏元素',
              signature: 'hide(element: Element): void',
              params: [
                { name: 'element', type: 'Element', description: '目标元素' },
              ],
              returns: { type: 'void', description: '无返回值' },
              example: `import utils from '@/utils'

utils.hide(el)`,
            },
            {
              name: '切换显示',
              category: '显示控制',
              description: '切换元素的显示状态',
              signature: 'toggle(element: Element, display?: string): boolean',
              params: [
                { name: 'element', type: 'Element', description: '目标元素' },
                {
                  name: 'display',
                  type: 'string',
                  description: '显示类型，默认为block',
                },
              ],
              returns: { type: 'boolean', description: '当前是否显示' },
              example: `import utils from '@/utils'

utils.toggle(el, 'flex')`,
            },
            {
              name: '滚动到元素',
              category: '滚动操作',
              description: '平滑滚动到指定元素',
              signature:
                'scrollToElement(element: Element, options?: Object): void',
              params: [
                { name: 'element', type: 'Element', description: '目标元素' },
                { name: 'options', type: 'Object', description: '滚动选项' },
              ],
              returns: { type: 'void', description: '无返回值' },
              example: `import utils from '@/utils'

utils.scrollToElement(targetEl, { behavior: 'smooth' })`,
            },
            {
              name: '滚动到顶部',
              category: '滚动操作',
              description: '平滑滚动到页面顶部',
              signature: 'scrollToTop(options?: Object): void',
              params: [
                { name: 'options', type: 'Object', description: '滚动选项' },
              ],
              returns: { type: 'void', description: '无返回值' },
              example: `import utils from '@/utils'

utils.scrollToTop({ behavior: 'smooth' })`,
            },
            {
              name: '创建元素',
              category: 'DOM创建',
              description: '创建DOM元素',
              signature:
                'createElement(tagName: string, attributes?: Object, children?: Array): Element',
              params: [
                { name: 'tagName', type: 'string', description: '标签名' },
                { name: 'attributes', type: 'Object', description: '属性对象' },
                { name: 'children', type: 'Array', description: '子元素数组' },
              ],
              returns: { type: 'Element', description: '创建的元素' },
              example: `import utils from '@/utils'

utils.createElement('div', { class: 'container' })`,
            },
            {
              name: '移除元素',
              category: 'DOM操作',
              description: '从DOM中移除元素',
              signature: 'removeElement(element: Element): void',
              params: [
                {
                  name: 'element',
                  type: 'Element',
                  description: '要移除的元素',
                },
              ],
              returns: { type: 'void', description: '无返回值' },
              example: `import utils from '@/utils'

utils.removeElement(el)`,
            },
            {
              name: '检查视口可见',
              category: 'DOM查询',
              description: '检查元素是否在可视区域内',
              signature:
                'isInViewport(element: Element, threshold?: number): boolean',
              params: [
                { name: 'element', type: 'Element', description: '目标元素' },
                {
                  name: 'threshold',
                  type: 'number',
                  description: '阈值（0-1），默认为0',
                },
              ],
              returns: { type: 'boolean', description: '是否在视口中' },
              example: `import utils from '@/utils'

utils.isInViewport(el, 0.5) // 元素50%可见时返回true`,
            },
          ],
        },
        {
          id: 'math',
          name: '数学计算',
          icon: 'el-icon-data-analysis',
          functions: [
            {
              name: '精确加法',
              category: '精确计算',
              description: '精确的加法运算，避免浮点数精度问题',
              signature: 'add(a: number, b: number): number',
              params: [
                { name: 'a', type: 'number', description: '第一个数' },
                { name: 'b', type: 'number', description: '第二个数' },
              ],
              returns: { type: 'number', description: '精确的和' },
              example: `import utils from '@/utils'

utils.add(0.1, 0.2) // 0.3`,
            },
            {
              name: '精确减法',
              category: '精确计算',
              description: '精确的减法运算，避免浮点数精度问题',
              signature: 'subtract(a: number, b: number): number',
              params: [
                { name: 'a', type: 'number', description: '被减数' },
                { name: 'b', type: 'number', description: '减数' },
              ],
              returns: { type: 'number', description: '精确的差' },
              example: `import utils from '@/utils'

utils.subtract(0.3, 0.1) // 0.2`,
            },
            {
              name: '精确乘法',
              category: '精确计算',
              description: '精确的乘法运算，避免浮点数精度问题',
              signature: 'multiply(a: number, b: number): number',
              params: [
                { name: 'a', type: 'number', description: '第一个数' },
                { name: 'b', type: 'number', description: '第二个数' },
              ],
              returns: { type: 'number', description: '精确的积' },
              example: `import utils from '@/utils'

utils.multiply(0.1, 0.2) // 0.02`,
            },
            {
              name: '精确除法',
              category: '精确计算',
              description: '精确的除法运算，避免浮点数精度问题',
              signature: 'divide(a: number, b: number): number',
              params: [
                { name: 'a', type: 'number', description: '被除数' },
                { name: 'b', type: 'number', description: '除数' },
              ],
              returns: { type: 'number', description: '精确的商' },
              example: `import utils from '@/utils'

utils.divide(0.3, 0.1) // 3`,
            },
            {
              name: '随机数',
              category: '随机函数',
              description: '生成指定范围内的随机数',
              signature: 'random(min: number, max: number): number',
              params: [
                { name: 'min', type: 'number', description: '最小值' },
                { name: 'max', type: 'number', description: '最大值' },
              ],
              returns: { type: 'number', description: '随机数' },
              example: `import utils from '@/utils'

utils.random(1, 100) // 1-100之间的随机数`,
            },
            {
              name: '随机整数',
              category: '随机函数',
              description: '生成指定范围内的随机整数',
              signature: 'randomInt(min: number, max: number): number',
              params: [
                { name: 'min', type: 'number', description: '最小值（包含）' },
                { name: 'max', type: 'number', description: '最大值（包含）' },
              ],
              returns: { type: 'number', description: '随机整数' },
              example: `import utils from '@/utils'

utils.randomInt(1, 10) // 1-10之间的随机整数`,
            },
            {
              name: '计算百分比',
              category: '数值计算',
              description: '计算数值的百分比',
              signature:
                'percentage(value: number, total: number, precision?: number): number',
              params: [
                { name: 'value', type: 'number', description: '当前值' },
                { name: 'total', type: 'number', description: '总值' },
                { name: 'precision', type: 'number', description: '精度位数' },
              ],
              returns: { type: 'number', description: '百分比' },
              example: `import utils from '@/utils'

utils.percentage(25, 100) // 25`,
            },
            {
              name: '数值限制',
              category: '数值计算',
              description: '将数值限制在指定范围内',
              signature:
                'clamp(value: number, min: number, max: number): number',
              params: [
                { name: 'value', type: 'number', description: '要限制的值' },
                { name: 'min', type: 'number', description: '最小值' },
                { name: 'max', type: 'number', description: '最大值' },
              ],
              returns: { type: 'number', description: '限制后的值' },
              example: `import utils from '@/utils'

utils.clamp(15, 0, 10) // 10`,
            },
            {
              name: '线性插值',
              category: '数值计算',
              description: '在两个值之间进行线性插值',
              signature: 'lerp(start: number, end: number, t: number): number',
              params: [
                { name: 'start', type: 'number', description: '起始值' },
                { name: 'end', type: 'number', description: '结束值' },
                { name: 't', type: 'number', description: '插值因子（0-1）' },
              ],
              returns: { type: 'number', description: '插值结果' },
              example: `import utils from '@/utils'

utils.lerp(0, 100, 0.5) // 50`,
            },
            {
              name: '数值映射',
              category: '数值计算',
              description: '将数值从一个范围映射到另一个范围',
              signature:
                'map(value: number, inMin: number, inMax: number, outMin: number, outMax: number): number',
              params: [
                { name: 'value', type: 'number', description: '要映射的值' },
                {
                  name: 'inMin',
                  type: 'number',
                  description: '输入范围最小值',
                },
                {
                  name: 'inMax',
                  type: 'number',
                  description: '输入范围最大值',
                },
                {
                  name: 'outMin',
                  type: 'number',
                  description: '输出范围最小值',
                },
                {
                  name: 'outMax',
                  type: 'number',
                  description: '输出范围最大值',
                },
              ],
              returns: { type: 'number', description: '映射后的值' },
              example: `import utils from '@/utils'

utils.map(5, 0, 10, 0, 100) // 50`,
            },
            {
              name: '平均值',
              category: '统计函数',
              description: '计算数组的平均值',
              signature: 'average(numbers: Array<number>): number',
              params: [
                {
                  name: 'numbers',
                  type: 'Array<number>',
                  description: '数字数组',
                },
              ],
              returns: { type: 'number', description: '平均值' },
              example: `import utils from '@/utils'

utils.average([1, 2, 3, 4, 5]) // 3`,
            },
            {
              name: '中位数',
              category: '统计函数',
              description: '计算数组的中位数',
              signature: 'median(numbers: Array<number>): number',
              params: [
                {
                  name: 'numbers',
                  type: 'Array<number>',
                  description: '数字数组',
                },
              ],
              returns: { type: 'number', description: '中位数' },
              example: `import utils from '@/utils'

utils.median([1, 2, 3, 4, 5]) // 3`,
            },
            {
              name: '最大值',
              category: '统计函数',
              description: '获取数组中的最大值',
              signature: 'max(numbers: Array<number>): number',
              params: [
                {
                  name: 'numbers',
                  type: 'Array<number>',
                  description: '数字数组',
                },
              ],
              returns: { type: 'number', description: '最大值' },
              example: `import utils from '@/utils'

utils.max([1, 5, 3, 9, 2]) // 9`,
            },
            {
              name: '最小值',
              category: '统计函数',
              description: '获取数组中的最小值',
              signature: 'min(numbers: Array<number>): number',
              params: [
                {
                  name: 'numbers',
                  type: 'Array<number>',
                  description: '数字数组',
                },
              ],
              returns: { type: 'number', description: '最小值' },
              example: `import utils from '@/utils'

utils.min([1, 5, 3, 9, 2]) // 1`,
            },
            {
              name: '求和',
              category: '统计函数',
              description: '计算数组所有元素的和',
              signature: 'sum(numbers: Array<number>): number',
              params: [
                {
                  name: 'numbers',
                  type: 'Array<number>',
                  description: '数字数组',
                },
              ],
              returns: { type: 'number', description: '总和' },
              example: `import utils from '@/utils'

utils.sum([1, 2, 3, 4, 5]) // 15`,
            },
            {
              name: '阶乘',
              category: '数学函数',
              description: '计算数字的阶乘',
              signature: 'factorial(n: number): number',
              params: [
                { name: 'n', type: 'number', description: '要计算阶乘的数字' },
              ],
              returns: { type: 'number', description: '阶乘结果' },
              example: `import utils from '@/utils'

utils.factorial(5) // 120`,
            },
            {
              name: '判断质数',
              category: '数学函数',
              description: '判断一个数是否为质数',
              signature: 'isPrime(n: number): boolean',
              params: [
                { name: 'n', type: 'number', description: '要判断的数字' },
              ],
              returns: { type: 'boolean', description: '是否为质数' },
              example: `import utils from '@/utils'

utils.isPrime(17) // true`,
            },
            {
              name: '最大公约数',
              category: '数学函数',
              description: '计算两个数的最大公约数',
              signature: 'gcd(a: number, b: number): number',
              params: [
                { name: 'a', type: 'number', description: '第一个数' },
                { name: 'b', type: 'number', description: '第二个数' },
              ],
              returns: { type: 'number', description: '最大公约数' },
              example: `import utils from '@/utils'

utils.gcd(12, 18) // 6`,
            },
            {
              name: '最小公倍数',
              category: '数学函数',
              description: '计算两个数的最小公倍数',
              signature: 'lcm(a: number, b: number): number',
              params: [
                { name: 'a', type: 'number', description: '第一个数' },
                { name: 'b', type: 'number', description: '第二个数' },
              ],
              returns: { type: 'number', description: '最小公倍数' },
              example: `import utils from '@/utils'

utils.lcm(4, 6) // 12`,
            },
          ],
        },
        {
          id: 'storage',
          name: '存储工具',
          icon: 'el-icon-folder',
          functions: [
            {
              name: '存储数据',
              category: '本地存储',
              description: '将数据存储到localStorage，支持设置过期时间',
              signature:
                'storage.set(key: string, value: any, expire?: number): void',
              params: [
                { name: 'key', type: 'string', description: '存储键名' },
                { name: 'value', type: 'any', description: '要存储的值' },
                {
                  name: 'expire',
                  type: 'number',
                  description: '过期时间（毫秒），可选',
                },
              ],
              returns: { type: 'void', description: '无返回值' },
              example: `import utils from '@/utils'

utils.storage.set('user', { name: 'John' }, 3600000) // 1小时后过期`,
            },
            {
              name: '获取数据',
              category: '本地存储',
              description: '从localStorage获取数据，如果数据已过期会自动删除',
              signature: 'storage.get(key: string): any',
              params: [
                { name: 'key', type: 'string', description: '存储键名' },
              ],
              returns: {
                type: 'any',
                description: '存储的值，如果不存在或已过期则返回null',
              },
              example: `import utils from '@/utils'

utils.storage.get('user') // 返回存储的用户数据或null`,
            },
            {
              name: '删除数据',
              category: '本地存储',
              description: '从localStorage删除指定数据',
              signature: 'storage.remove(key: string): void',
              params: [
                { name: 'key', type: 'string', description: '存储键名' },
              ],
              returns: { type: 'void', description: '无返回值' },
              example: `import utils from '@/utils'

utils.storage.remove('user')`,
            },
            {
              name: '清空存储',
              category: '本地存储',
              description: '清空所有localStorage数据',
              signature: 'storage.clear(): void',
              params: [],
              returns: { type: 'void', description: '无返回值' },
              example: `import utils from '@/utils'

utils.storage.clear()`,
            },
          ],
        },
        {
          id: 'url',
          name: 'URL工具',
          icon: 'el-icon-link',
          functions: [
            {
              name: '获取URL参数',
              category: 'URL解析',
              description: '获取URL中的指定参数值',
              signature:
                'urlUtils.getParam(name: string, url?: string): string|null',
              params: [
                { name: 'name', type: 'string', description: '参数名' },
                {
                  name: 'url',
                  type: 'string',
                  description: 'URL字符串，默认为当前页面URL',
                },
              ],
              returns: { type: 'string|null', description: '参数值' },
              example: `import utils from '@/utils'

utils.urlUtils.getParam('id') // 从当前URL获取id参数`,
            },
            {
              name: '获取所有参数',
              category: 'URL解析',
              description: '获取URL中的所有参数',
              signature: 'urlUtils.getAllParams(url?: string): Object',
              params: [
                {
                  name: 'url',
                  type: 'string',
                  description: 'URL字符串，默认为当前页面URL',
                },
              ],
              returns: { type: 'Object', description: '参数对象' },
              example: `import utils from '@/utils'

utils.urlUtils.getAllParams() // { id: '123', name: 'John' }`,
            },
            {
              name: '构建URL',
              category: 'URL构建',
              description: '根据基础URL和参数构建完整URL',
              signature:
                'urlUtils.buildUrl(baseUrl: string, params: Object): string',
              params: [
                { name: 'baseUrl', type: 'string', description: '基础URL' },
                { name: 'params', type: 'Object', description: '参数对象' },
              ],
              returns: { type: 'string', description: '完整URL' },
              example: `import utils from '@/utils'

utils.urlUtils.buildUrl('/api/users', { page: 1, size: 10 })`,
            },
          ],
        },
        {
          id: 'array',
          name: '数组工具',
          icon: 'el-icon-menu',
          functions: [
            {
              name: '数组去重',
              category: '数组处理',
              description: '移除数组中的重复元素',
              signature:
                'arrayUtils.unique(arr: Array, key?: string|Function): Array',
              params: [
                { name: 'arr', type: 'Array', description: '原数组' },
                {
                  name: 'key',
                  type: 'string|Function',
                  description: '去重依据的键名或函数',
                },
              ],
              returns: { type: 'Array', description: '去重后的数组' },
              example: `import utils from '@/utils'

utils.arrayUtils.unique([1, 2, 2, 3]) // [1, 2, 3]`,
            },
            {
              name: '数组分组',
              category: '数组处理',
              description: '按指定条件对数组元素进行分组',
              signature:
                'arrayUtils.groupBy(arr: Array, key: string|Function): Object',
              params: [
                { name: 'arr', type: 'Array', description: '原数组' },
                {
                  name: 'key',
                  type: 'string|Function',
                  description: '分组依据的键名或函数',
                },
              ],
              returns: { type: 'Object', description: '分组后的对象' },
              example: `import utils from '@/utils'

utils.arrayUtils.groupBy(users, 'department')`,
            },
            {
              name: '数组分块',
              category: '数组处理',
              description: '将数组分割成指定大小的块',
              signature: 'arrayUtils.chunk(arr: Array, size: number): Array',
              params: [
                { name: 'arr', type: 'Array', description: '原数组' },
                { name: 'size', type: 'number', description: '每块的大小' },
              ],
              returns: { type: 'Array', description: '分块后的二维数组' },
              example: `import utils from '@/utils'

utils.arrayUtils.chunk([1, 2, 3, 4, 5], 2) // [[1, 2], [3, 4], [5]]`,
            },
            {
              name: '数组扁平化',
              category: '数组处理',
              description: '将多维数组扁平化为一维数组',
              signature:
                'arrayUtils.flatten(arr: Array, depth?: number): Array',
              params: [
                { name: 'arr', type: 'Array', description: '多维数组' },
                {
                  name: 'depth',
                  type: 'number',
                  description: '扁平化深度，默认为1',
                },
              ],
              returns: { type: 'Array', description: '扁平化后的数组' },
              example: `import utils from '@/utils'

utils.arrayUtils.flatten([[1, 2], [3, 4]]) // [1, 2, 3, 4]`,
            },
          ],
        },
        {
          id: 'device',
          name: '设备检测',
          icon: 'el-icon-mobile-phone',
          functions: [
            {
              name: '检测移动设备',
              category: '设备检测',
              description: '检测当前是否为移动设备',
              signature: 'deviceUtils.isMobile(): boolean',
              params: [],
              returns: { type: 'boolean', description: '是否为移动设备' },
              example: `import utils from '@/utils'

utils.deviceUtils.isMobile() // true/false`,
            },
            {
              name: '检测平板设备',
              category: '设备检测',
              description: '检测当前是否为平板设备',
              signature: 'deviceUtils.isTablet(): boolean',
              params: [],
              returns: { type: 'boolean', description: '是否为平板设备' },
              example: `import utils from '@/utils'

utils.deviceUtils.isTablet() // true/false`,
            },
            {
              name: '检测桌面设备',
              category: '设备检测',
              description: '检测当前是否为桌面设备',
              signature: 'deviceUtils.isDesktop(): boolean',
              params: [],
              returns: { type: 'boolean', description: '是否为桌面设备' },
              example: `import utils from '@/utils'

utils.deviceUtils.isDesktop() // true/false`,
            },
            {
              name: '获取浏览器信息',
              category: '浏览器检测',
              description: '获取当前浏览器的详细信息',
              signature: 'deviceUtils.getBrowserInfo(): Object',
              params: [],
              returns: { type: 'Object', description: '浏览器信息对象' },
              example: `import utils from '@/utils'

utils.deviceUtils.getBrowserInfo() // { name: 'Chrome', version: '91.0' }`,
            },
            {
              name: '获取操作系统',
              category: '系统检测',
              description: '获取当前操作系统信息',
              signature: 'deviceUtils.getOS(): string',
              params: [],
              returns: { type: 'string', description: '操作系统名称' },
              example: `import utils from '@/utils'

utils.deviceUtils.getOS() // 'Windows'`,
            },
          ],
        },
      ],
    }
  },
  computed: {
    totalFunctions() {
      return this.modules.reduce(
        (total, module) => total + module.functions.length,
        0
      )
    },
    getCurrentModule() {
      return (
        this.modules.find(module => module.id === this.activeModule) ||
        this.modules[0]
      )
    },
  },
  methods: {
    selectModule(moduleId) {
      this.activeModule = moduleId
      this.activeCollapse = moduleId
      const module = this.modules.find(m => m.id === moduleId)
      if (module && module.functions.length > 0) {
        this.activeFunction = module.functions[0].name
      }
    },
    selectFunction(functionName) {
      this.activeFunction = functionName
    },
    getCurrentFunction() {
      const currentModule = this.getCurrentModule
      return currentModule.functions.find(
        func => func.name === this.activeFunction
      )
    },
  },
}
</script>

<style scoped lang="less">
.utils-doc {
  height: 100%;
  font-size: 19px; // 基础字体大小增大5px

  // 统一增大所有文字元素的字体大小
  p,
  span,
  div,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    text-align: left;
    font-size: inherit;
  }

  // Element UI 组件字体大小调整
  .el-card {
    font-size: 19px;
  }

  .el-menu-item {
    font-size: 19px;
  }

  .el-tag {
    font-size: 17px; // 标签字体稍小一些
  }

  .el-descriptions {
    font-size: 19px;
  }

  .el-table {
    font-size: 19px;
  }
}
/* Tab 样式 */
.tab {
  background: #f5f7fa;
  border-bottom: 1px solid #e4e7ed;
  padding: 0;
  margin-bottom: 20px;

  .tab-item {
    padding: 15px 25px;
    cursor: pointer;
    background: #f5f7fa;
    border-right: 1px solid #e4e7ed;
    transition: all 0.3s ease;
    font-weight: 500;
    color: #606266;
    display: flex;
    align-items: center;
    gap: 8px;

    .tab-name {
      font-weight: 600;
    }

    .tab-count {
      font-size: 20px;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      padding: 0px 10px;
      border-radius: 12px;
      font-weight: 600;
      // min-width: 18px;
      text-align: center;
      box-shadow: 0 2px 4px rgba(102, 126, 234, 0.3);
      border: 1px solid rgba(255, 255, 255, 0.2);
      transition: all 0.3s ease;
    }

    @keyframes pulse {
      0% {
        transform: scale(1);
      }
      50% {
        transform: scale(1.1);
      }
      100% {
        transform: scale(1);
      }
    }

    &:hover {
      background: #ecf5ff;
      color: #409eff;

      .tab-count {
        background: linear-gradient(135deg, #409eff 0%, #36cfc9 100%);
        color: white;
        box-shadow: 0 2px 6px rgba(64, 158, 255, 0.4);
        transform: scale(1.05);
      }
    }

    &.active {
      background: #409eff;
      color: white;
      position: relative;

      .tab-count {
        background: linear-gradient(135deg, #ff6b6b 0%, #feca57 100%);
        color: white;
        box-shadow: 0 2px 6px rgba(255, 107, 107, 0.4);
        animation: pulse 2s infinite;
      }

      &::after {
        content: '';
        position: absolute;
        bottom: -1px;
        left: 0;
        right: 0;
        height: 2px;
        background: #409eff;
      }
    }
  }
}

.left {
  width: 20%;
  height: calc(100vh - 200px);
  overflow-y: auto;

  .tab_content {
    padding: 20px;
    background: white;
    border-radius: 8px;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);

    .module-info {
      margin-bottom: 20px;
      padding-bottom: 15px;
      border-bottom: 1px solid #ebeef5;

      h3 {
        margin: 0 0 10px 0;
        color: #303133;
        font-size: 20px;
        font-weight: 600;
      }

      .module-desc {
        color: #606266;
        font-size: 22px;
        line-height: 1.6;
        margin: 0 0 10px 0;
      }

      .function-count {
        span {
          background: #f0f9ff;
          color: #409eff;
          padding: 4px 8px;
          border-radius: 4px;
          font-size: 12px;
          font-weight: 500;
        }
      }
    }

    .function-list {
      .function-item {
        padding: 16px;
        margin-bottom: 12px;
        border: none;
        border-radius: 12px;
        cursor: pointer;
        transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        background: linear-gradient(135deg, #ffffff 0%, #f8fafc 100%);
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04), 0 1px 3px rgba(0, 0, 0, 0.08);
        border-left: 4px solid transparent;
        position: relative;
        overflow: hidden;

        &::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(
            135deg,
            rgba(64, 158, 255, 0.05) 0%,
            rgba(64, 158, 255, 0.02) 100%
          );
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        &:hover {
          transform: translateY(-3px) scale(1.02);
          box-shadow: 0 8px 25px rgba(64, 158, 255, 0.15),
            0 3px 10px rgba(0, 0, 0, 0.1);
          border-left-color: #409eff;
          background: linear-gradient(135deg, #ffffff 0%, #f0f9ff 100%);

          &::before {
            opacity: 1;
          }

          .function-name {
            color: #409eff;
          }

          .function-category {
            background: linear-gradient(135deg, #409eff 0%, #36cfc9 100%);
            color: white;
            transform: scale(1.05);
          }
        }

        &.active {
          border-left-color: #409eff;
          background: linear-gradient(135deg, #ecf5ff 0%, #e1f3ff 100%);
          box-shadow: 0 6px 20px rgba(64, 158, 255, 0.2),
            0 2px 8px rgba(0, 0, 0, 0.1);
          transform: translateY(-2px);

          &::before {
            opacity: 1;
          }

          .function-name {
            color: #409eff;
            font-weight: 700;
          }

          .function-category {
            background: linear-gradient(135deg, #409eff 0%, #36cfc9 100%);
            color: white;
            box-shadow: 0 2px 8px rgba(64, 158, 255, 0.3);
          }

          .function-desc {
            color: #1f2937;
          }
        }

        .clearfix {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 8px;
        }

        .function-name {
          font-weight: 600;
          color: #1f2937;
          font-size: 26px;
          transition: all 0.3s ease;
          letter-spacing: 0.5px;
        }

        .function-category {
          font-size: 20px;
          color: #6b7280;
          background: linear-gradient(135deg, #f3f4f6 0%, #e5e7eb 100%);
          padding: 4px 10px;
          border-radius: 20px;
          font-weight: 500;
          transition: all 0.3s ease;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
        }

        .function-desc {
          font-size: 22px;
          color: #6b7280;
          line-height: 1.6;
          transition: all 0.3s ease;
          margin-top: 4px;
        }
      }
    }
  }
}

.right {
  width: 80%;
  height: calc(100vh - 200px);
  padding-left: 20px;

  .intro-card {
    height: 20%;
    margin-bottom: 20px;
  }

  .module-content-card {
    // height: calc(80% - 20px);
  }
}

/* 代码编辑器样式 */
.code-tabs {
  .el-tabs__content {
    padding: 0;
  }
}

.code-editor {
  background: #1e1e1e;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  border: 1px solid #333;
  font-family: 'Fira Code', 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;

  .code-header {
    background: linear-gradient(135deg, #2d2d2d 0%, #1e1e1e 100%);
    padding: 12px 16px;
    border-bottom: 1px solid #333;
    display: flex;
    align-items: center;
    justify-content: space-between;

    .code-dots {
      display: flex;
      gap: 8px;

      .dot {
        width: 12px;
        height: 12px;
        border-radius: 50%;
        display: inline-block;
        box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.3);

        &.red {
          background: linear-gradient(135deg, #ff5f57 0%, #ff3b30 100%);
        }

        &.yellow {
          background: linear-gradient(135deg, #ffbd2e 0%, #ff9500 100%);
        }

        &.green {
          background: linear-gradient(135deg, #28ca42 0%, #30d158 100%);
        }
      }
    }

    .code-title {
      color: #cccccc;
      font-size: 13px;
      font-weight: 500;
      letter-spacing: 0.5px;
    }
  }

  .code-content {
    background: #1e1e1e;
    padding: 0;
    margin: 0;
    overflow-x: auto;

    pre {
      margin: 0;
      padding: 20px;
      background: transparent;
      color: #d4d4d4;
      font-family: 'Fira Code', 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
      font-size: 29px;
      line-height: 1.6;
      overflow-x: auto;
      white-space: pre;

      code {
        background: transparent;
        color: inherit;
        padding: 0;
        font-family: inherit;
        font-size: inherit;
        border-radius: 0;

        /* JavaScript 语法高亮 */
        &.javascript {
          /* 关键字 */
          .keyword {
            color: #569cd6;
            font-weight: bold;
          }

          /* 字符串 */
          .string {
            color: #ce9178;
          }

          /* 注释 */
          .comment {
            color: #6a9955;
            font-style: italic;
          }

          /* 函数名 */
          .function {
            color: #dcdcaa;
          }

          /* 数字 */
          .number {
            color: #b5cea8;
          }

          /* 操作符 */
          .operator {
            color: #d4d4d4;
          }
        }
      }
    }

    /* 滚动条样式 */
    &::-webkit-scrollbar {
      height: 8px;
    }

    &::-webkit-scrollbar-track {
      background: #2d2d2d;
    }

    &::-webkit-scrollbar-thumb {
      background: #555;
      border-radius: 4px;

      &:hover {
        background: #666;
      }
    }
  }

  /* 悬停效果 */
  &:hover {
    box-shadow: 0 12px 40px rgba(0, 0, 0, 0.4);
    transform: translateY(-2px);
    transition: all 0.3s ease;
  }
}
</style>
