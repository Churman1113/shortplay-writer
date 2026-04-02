import { useState } from 'react'
import AdminLayout from '@/components/admin/AdminLayout'
import {
  Shield,
  Key,
  Lock,
  Eye,
  EyeOff,
  Smartphone,
  Mail,
  Clock,
  CheckCircle,
  AlertTriangle,
  RefreshCw,
  Plus,
  Trash2,
  Edit,
  X,
} from 'lucide-react'

interface APIKey {
  id: string
  name: string
  key: string
  permissions: string[]
  createdAt: string
  lastUsed: string
  active: boolean
}

interface LoginLog {
  id: number
  user: string
  email: string
  ip: string
  location: string
  device: string
  time: string
  status: 'success' | 'failed'
}

export default function AdminSecurity() {
  const [showApiKeyModal, setShowApiKeyModal] = useState(false)
  const [newApiKeyName, setNewApiKeyName] = useState('')
  const [generatedKey, setGeneratedKey] = useState<string | null>(null)

  const apiKeys: APIKey[] = [
    {
      id: '1',
      name: '前端应用密钥',
      key: 'sk_live_xxxxxxxxxxxxxxxxxxxx',
      permissions: ['read:users', 'write:scripts'],
      createdAt: '2026-01-15',
      lastUsed: '2026-04-01 10:30',
      active: true,
    },
    {
      id: '2',
      name: '移动端密钥',
      key: 'sk_live_yyyyyyyyyyyyyyyyyyyy',
      permissions: ['read:scripts'],
      createdAt: '2026-02-20',
      lastUsed: '2026-04-01 08:15',
      active: true,
    },
  ]

  const loginLogs: LoginLog[] = [
    { id: 1, user: '管理员', email: 'admin@example.com', ip: '192.168.1.1', location: '广东深圳', device: 'Chrome / Windows', time: '2026-04-01 14:30', status: 'success' },
    { id: 2, user: '张三', email: 'zhangsan@example.com', ip: '10.0.0.5', location: '北京朝阳', device: 'Safari / iOS', time: '2026-04-01 14:25', status: 'success' },
    { id: 3, user: '未知', email: 'hacker@test.com', ip: '203.0.113.50', location: '境外', device: 'curl / Linux', time: '2026-04-01 14:20', status: 'failed' },
    { id: 4, user: '李四', email: 'lisi@example.com', ip: '172.16.0.8', location: '上海浦东', device: 'Firefox / macOS', time: '2026-04-01 14:15', status: 'success' },
    { id: 5, user: '王五', email: 'wangwu@example.com', ip: '192.168.2.10', location: '广东广州', device: '微信内嵌', time: '2026-04-01 14:10', status: 'success' },
  ]

  const securitySettings = [
    { name: '双因素认证', enabled: false, description: '登录时需要手机验证码' },
    { name: '登录通知', enabled: true, description: '新设备登录时发送邮件通知' },
    { name: 'IP白名单', enabled: false, description: '仅允许指定IP访问管理后台' },
    { name: '会话超时', enabled: true, description: '30分钟无操作自动退出登录' },
    { name: '密码强度检查', enabled: true, description: '强制要求强密码（8位以上）' },
  ]

  const handleGenerateKey = () => {
    if (!newApiKeyName.trim()) return
    const key = 'sk_live_' + Array.from({ length: 24 }, () => Math.random().toString(36).charAt(2)).join('')
    setGeneratedKey(key)
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* 安全概览 */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-5">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-green-100">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-800">安全</p>
                <p className="text-sm text-slate-500">系统状态</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-5">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-blue-100">
                <Key className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-800">{apiKeys.length}</p>
                <p className="text-sm text-slate-500">API密钥</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-5">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-amber-100">
                <Clock className="h-6 w-6 text-amber-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-800">{loginLogs.filter(l => l.status === 'failed').length}</p>
                <p className="text-sm text-slate-500">失败登录</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-5">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-purple-100">
                <Shield className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-800">高</p>
                <p className="text-sm text-slate-500">安全等级</p>
              </div>
            </div>
          </div>
        </div>

        {/* 安全设置 */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-100">
          <div className="p-5 border-b border-slate-100">
            <h3 className="font-semibold text-slate-800">安全设置</h3>
          </div>
          <div className="p-5 space-y-4">
            {securitySettings.map((setting, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
                <div className="flex items-center gap-4">
                  <div className={`p-2 rounded-lg ${setting.enabled ? 'bg-green-100' : 'bg-slate-200'}`}>
                    {setting.enabled ? (
                      <CheckCircle className="h-5 w-5 text-green-600" />
                    ) : (
                      <Lock className="h-5 w-5 text-slate-500" />
                    )}
                  </div>
                  <div>
                    <p className="font-medium text-slate-800">{setting.name}</p>
                    <p className="text-sm text-slate-500">{setting.description}</p>
                  </div>
                </div>
                <button
                  className={`relative w-12 h-6 rounded-full transition-colors ${
                    setting.enabled ? 'bg-teal-500' : 'bg-slate-300'
                  }`}
                >
                  <span
                    className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-transform ${
                      setting.enabled ? 'left-7' : 'left-1'
                    }`}
                  />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* API密钥管理 */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-100">
          <div className="p-5 border-b border-slate-100 flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-slate-800">API密钥</h3>
              <p className="text-sm text-slate-500 mt-1">管理第三方应用的访问密钥</p>
            </div>
            <button
              onClick={() => setShowApiKeyModal(true)}
              className="px-4 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600 flex items-center gap-2"
            >
              <Plus className="h-4 w-4" />
              创建密钥
            </button>
          </div>
          <div className="p-5">
            <div className="space-y-4">
              {apiKeys.map((apiKey) => (
                <div key={apiKey.id} className="p-4 border border-slate-200 rounded-xl">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-slate-100">
                        <Key className="h-4 w-4 text-slate-600" />
                      </div>
                      <div>
                        <p className="font-medium text-slate-800">{apiKey.name}</p>
                        <p className="text-sm text-slate-500 font-mono">{apiKey.key.slice(0, 20)}...</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg">
                        <Edit className="h-4 w-4" />
                      </button>
                      <button className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {apiKey.permissions.map((perm) => (
                      <span key={perm} className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full font-mono">
                        {perm}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center gap-4 text-sm text-slate-500">
                    <span>创建于 {apiKey.createdAt}</span>
                    <span>最后使用 {apiKey.lastUsed}</span>
                    <span className={`flex items-center gap-1 ${apiKey.active ? 'text-green-600' : 'text-red-600'}`}>
                      <span className={`w-2 h-2 rounded-full ${apiKey.active ? 'bg-green-500' : 'bg-red-500'}`} />
                      {apiKey.active ? '活跃' : '已禁用'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 登录日志 */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-100">
          <div className="p-5 border-b border-slate-100">
            <h3 className="font-semibold text-slate-800">登录日志</h3>
            <p className="text-sm text-slate-500 mt-1">最近的登录活动记录</p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-5 py-3 text-left text-xs font-semibold text-slate-600 uppercase">状态</th>
                  <th className="px-5 py-3 text-left text-xs font-semibold text-slate-600 uppercase">用户</th>
                  <th className="px-5 py-3 text-left text-xs font-semibold text-slate-600 uppercase">IP地址</th>
                  <th className="px-5 py-3 text-left text-xs font-semibold text-slate-600 uppercase">位置</th>
                  <th className="px-5 py-3 text-left text-xs font-semibold text-slate-600 uppercase">设备</th>
                  <th className="px-5 py-3 text-left text-xs font-semibold text-slate-600 uppercase">时间</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {loginLogs.map((log) => (
                  <tr key={log.id} className="hover:bg-slate-50">
                    <td className="px-5 py-4">
                      {log.status === 'success' ? (
                        <span className="inline-flex items-center gap-1 px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">
                          <CheckCircle className="h-3 w-3" /> 成功
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2 py-1 bg-red-100 text-red-700 text-xs rounded-full">
                          <AlertTriangle className="h-3 w-3" /> 失败
                        </span>
                      )}
                    </td>
                    <td className="px-5 py-4">
                      <p className="font-medium text-slate-800">{log.user}</p>
                      <p className="text-sm text-slate-500">{log.email}</p>
                    </td>
                    <td className="px-5 py-4 text-sm font-mono text-slate-600">{log.ip}</td>
                    <td className="px-5 py-4 text-sm text-slate-600">{log.location}</td>
                    <td className="px-5 py-4 text-sm text-slate-600">{log.device}</td>
                    <td className="px-5 py-4 text-sm text-slate-600">{log.time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* 创建API密钥弹窗 */}
      {showApiKeyModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="p-5 border-b border-slate-100 flex items-center justify-between">
              <h3 className="font-semibold text-lg text-slate-800">创建API密钥</h3>
              <button
                onClick={() => {
                  setShowApiKeyModal(false)
                  setNewApiKeyName('')
                  setGeneratedKey(null)
                }}
                className="p-2 hover:bg-slate-100 rounded-lg"
              >
                <X className="h-5 w-5 text-slate-500" />
              </button>
            </div>
            <div className="p-5">
              {!generatedKey ? (
                <>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-slate-700 mb-2">密钥名称</label>
                    <input
                      type="text"
                      value={newApiKeyName}
                      onChange={(e) => setNewApiKeyName(e.target.value)}
                      placeholder="例如: 前端应用密钥"
                      className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-slate-700 mb-2">权限</label>
                    <div className="space-y-2">
                      {['read:users', 'write:users', 'read:scripts', 'write:scripts'].map((perm) => (
                        <label key={perm} className="flex items-center gap-2">
                          <input type="checkbox" className="rounded border-slate-300 text-teal-600" />
                          <span className="text-sm text-slate-700 font-mono">{perm}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </>
              ) : (
                <div className="mb-4">
                  <label className="block text-sm font-medium text-slate-700 mb-2">API密钥</label>
                  <div className="p-3 bg-slate-100 rounded-lg font-mono text-sm break-all">
                    {generatedKey}
                  </div>
                  <p className="text-xs text-amber-600 mt-2 flex items-center gap-1">
                    <AlertTriangle className="h-4 w-4" />
                    请立即复制密钥，关闭后将无法再次查看
                  </p>
                </div>
              )}
            </div>
            <div className="p-5 border-t border-slate-100 flex gap-3">
              {!generatedKey ? (
                <>
                  <button
                    onClick={() => setShowApiKeyModal(false)}
                    className="flex-1 px-4 py-2 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200"
                  >
                    取消
                  </button>
                  <button
                    onClick={handleGenerateKey}
                    disabled={!newApiKeyName.trim()}
                    className="flex-1 px-4 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600 disabled:opacity-50"
                  >
                    生成密钥
                  </button>
                </>
              ) : (
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(generatedKey)
                    setShowApiKeyModal(false)
                    setNewApiKeyName('')
                    setGeneratedKey(null)
                  }}
                  className="flex-1 px-4 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600"
                >
                  复制并关闭
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  )
}
