import { useState } from 'react'
import AdminLayout from '@/components/admin/AdminLayout'
import {
  Settings,
  Bell,
  Mail,
  Palette,
  Globe,
  Database,
  Code,
  Save,
  RefreshCw,
  Monitor,
  Smartphone,
  CheckCircle,
} from 'lucide-react'

export default function AdminSettings() {
  const [activeTab, setActiveTab] = useState('general')
  const [saved, setSaved] = useState(false)

  const handleSave = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  const tabs = [
    { id: 'general', label: '基本信息', icon: Settings },
    { id: 'notification', label: '通知设置', icon: Bell },
    { id: 'email', label: '邮件配置', icon: Mail },
    { id: 'appearance', label: '外观设置', icon: Palette },
    { id: 'api', label: 'API设置', icon: Code },
  ]

  return (
    <AdminLayout>
      <div className="flex gap-6">
        {/* 左侧菜单 */}
        <div className="w-64 flex-shrink-0">
          <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-2 sticky top-24">
            {tabs.map((tab) => {
              const Icon = tab.icon
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${
                    activeTab === tab.id
                      ? 'bg-teal-50 text-teal-700'
                      : 'text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  <span className="font-medium">{tab.label}</span>
                </button>
              )
            })}
          </div>
        </div>

        {/* 右侧内容 */}
        <div className="flex-1">
          {/* 基本信息 */}
          {activeTab === 'general' && (
            <div className="space-y-6">
              <div className="bg-white rounded-xl shadow-sm border border-slate-100">
                <div className="p-5 border-b border-slate-100">
                  <h3 className="font-semibold text-slate-800">基本信息</h3>
                </div>
                <div className="p-5 space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">网站名称</label>
                    <input
                      type="text"
                      defaultValue="短剧编剧助手"
                      className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">网站描述</label>
                    <textarea
                      defaultValue="专业的短剧剧本创作与管理平台"
                      rows={3}
                      className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 resize-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">网站URL</label>
                    <input
                      type="text"
                      defaultValue="https://shortplay.example.com"
                      className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
                    />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-slate-100">
                <div className="p-5 border-b border-slate-100">
                  <h3 className="font-semibold text-slate-800">系统配置</h3>
                </div>
                <div className="p-5 space-y-4">
                  <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
                    <div>
                      <p className="font-medium text-slate-800">维护模式</p>
                      <p className="text-sm text-slate-500">启用后普通用户无法访问</p>
                    </div>
                    <button className="relative w-12 h-6 rounded-full bg-slate-300">
                      <span className="absolute top-1 left-1 w-4 h-4 bg-white rounded-full shadow" />
                    </button>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
                    <div>
                      <p className="font-medium text-slate-800">用户注册</p>
                      <p className="text-sm text-slate-500">允许新用户注册账号</p>
                    </div>
                    <button className="relative w-12 h-6 rounded-full bg-teal-500">
                      <span className="absolute top-1 left-7 w-4 h-4 bg-white rounded-full shadow" />
                    </button>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">默认用户角色</label>
                    <select className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500">
                      <option value="writer">编剧</option>
                      <option value="studio">工作室</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 通知设置 */}
          {activeTab === 'notification' && (
            <div className="bg-white rounded-xl shadow-sm border border-slate-100">
              <div className="p-5 border-b border-slate-100">
                <h3 className="font-semibold text-slate-800">通知设置</h3>
                <p className="text-sm text-slate-500 mt-1">配置系统通知和提醒</p>
              </div>
              <div className="p-5 space-y-4">
                {[
                  { title: '新用户注册通知', desc: '有新用户注册时发送邮件通知管理员', enabled: true },
                  { title: '剧本提交通知', desc: '有用户提交剧本时发送邮件通知', enabled: true },
                  { title: '审核结果通知', desc: '剧本审核完成后通知作者', enabled: true },
                  { title: '系统更新通知', desc: '系统有新版本时发送通知', enabled: false },
                  { title: '安全警告通知', desc: '检测到异常登录时发送警告', enabled: true },
                ].map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
                    <div>
                      <p className="font-medium text-slate-800">{item.title}</p>
                      <p className="text-sm text-slate-500">{item.desc}</p>
                    </div>
                    <button className={`relative w-12 h-6 rounded-full transition-colors ${item.enabled ? 'bg-teal-500' : 'bg-slate-300'}`}>
                      <span className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-transform ${item.enabled ? 'left-7' : 'left-1'}`} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 邮件配置 */}
          {activeTab === 'email' && (
            <div className="bg-white rounded-xl shadow-sm border border-slate-100">
              <div className="p-5 border-b border-slate-100">
                <h3 className="font-semibold text-slate-800">邮件配置</h3>
                <p className="text-sm text-slate-500 mt-1">配置邮件发送服务</p>
              </div>
              <div className="p-5 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">SMTP服务器</label>
                  <input
                    type="text"
                    defaultValue="smtp.example.com"
                    className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">端口</label>
                    <input
                      type="text"
                      defaultValue="587"
                      className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">加密方式</label>
                    <select className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500">
                      <option value="tls">TLS</option>
                      <option value="ssl">SSL</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">发件人邮箱</label>
                  <input
                    type="email"
                    defaultValue="noreply@example.com"
                    className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">邮箱密码</label>
                  <input
                    type="password"
                    defaultValue="••••••••••••"
                    className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
                  />
                </div>
                <div>
                  <button className="px-4 py-2 border border-teal-500 text-teal-600 rounded-lg hover:bg-teal-50 flex items-center gap-2">
                    <RefreshCw className="h-4 w-4" />
                    发送测试邮件
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* 外观设置 */}
          {activeTab === 'appearance' && (
            <div className="bg-white rounded-xl shadow-sm border border-slate-100">
              <div className="p-5 border-b border-slate-100">
                <h3 className="font-semibold text-slate-800">外观设置</h3>
                <p className="text-sm text-slate-500 mt-1">自定义界面显示效果</p>
              </div>
              <div className="p-5 space-y-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-3">主题色</label>
                  <div className="flex gap-3">
                    {['#0D9488', '#0EA5E9', '#8B5CF6', '#EC4899', '#F97316', '#10B981'].map((color) => (
                      <button
                        key={color}
                        className={`w-10 h-10 rounded-lg border-2 ${
                          color === '#0D9488' ? 'border-slate-800' : 'border-transparent'
                        }`}
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-3">主题模式</label>
                  <div className="grid grid-cols-3 gap-4">
                    <button className="p-4 border-2 border-teal-500 rounded-xl bg-slate-50">
                      <Sun className="h-6 w-6 mx-auto mb-2" />
                      <p className="text-sm font-medium text-slate-800">浅色</p>
                    </button>
                    <button className="p-4 border-2 border-slate-200 rounded-xl">
                      <Moon className="h-6 w-6 mx-auto mb-2" />
                      <p className="text-sm font-medium text-slate-600">深色</p>
                    </button>
                    <button className="p-4 border-2 border-slate-200 rounded-xl">
                      <Monitor className="h-6 w-6 mx-auto mb-2" />
                      <p className="text-sm font-medium text-slate-600">跟随系统</p>
                    </button>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-3">Logo</label>
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-teal-400 to-teal-600 rounded-xl flex items-center justify-center">
                      <Code className="h-8 w-8 text-white" />
                    </div>
                    <button className="px-4 py-2 border border-slate-200 rounded-lg hover:bg-slate-50">
                      上传新Logo
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* API设置 */}
          {activeTab === 'api' && (
            <div className="bg-white rounded-xl shadow-sm border border-slate-100">
              <div className="p-5 border-b border-slate-100">
                <h3 className="font-semibold text-slate-800">API设置</h3>
                <p className="text-sm text-slate-500 mt-1">配置第三方API集成</p>
              </div>
              <div className="p-5 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">AI服务提供商</label>
                  <select className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500">
                    <option value="openai">OpenAI</option>
                    <option value="anthropic">Anthropic</option>
                    <option value="zhipu">智谱AI</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">API Key</label>
                  <input
                    type="password"
                    placeholder="sk-..."
                    className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">API Endpoint</label>
                  <input
                    type="text"
                    defaultValue="https://api.openai.com/v1"
                    className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
                  />
                </div>
                <div className="p-4 bg-slate-50 rounded-xl">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-slate-800">API额度使用</p>
                      <p className="text-sm text-slate-500">本月已使用 $12.50 / $100.00</p>
                    </div>
                    <div className="w-32 h-2 bg-slate-200 rounded-full overflow-hidden">
                      <div className="w-1/8 h-full bg-teal-500" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 保存按钮 */}
          <div className="mt-6 flex items-center justify-between">
            <p className="text-sm text-slate-500">
              最后保存于 2026-04-01 14:30
            </p>
            <button
              onClick={handleSave}
              className="px-6 py-2.5 bg-teal-500 text-white rounded-lg hover:bg-teal-600 flex items-center gap-2"
            >
              {saved ? <CheckCircle className="h-5 w-5" /> : <Save className="h-5 w-5" />}
              {saved ? '已保存' : '保存设置'}
            </button>
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}

function Sun(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <circle cx="12" cy="12" r="4"/>
      <path d="M12 2v2"/>
      <path d="M12 20v2"/>
      <path d="m4.93 4.93 1.41 1.41"/>
      <path d="m17.66 17.66 1.41 1.41"/>
      <path d="M2 12h2"/>
      <path d="M20 12h2"/>
      <path d="m6.34 17.66-1.41 1.41"/>
      <path d="m19.07 4.93-1.41 1.41"/>
    </svg>
  )
}

function Moon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/>
    </svg>
  )
}
