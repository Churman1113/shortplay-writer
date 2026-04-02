import { useState, useEffect } from 'react'
import AdminLayout from '@/components/admin/AdminLayout'
import {
  Users,
  FileText,
  TrendingUp,
  Activity,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  ArrowUp,
  ArrowDown,
  Eye,
  Edit,
  Trash2,
} from 'lucide-react'

interface Stats {
  totalUsers: number
  activeUsers: number
  totalScripts: number
  publishedScripts: number
  pendingScripts: number
  todayActive: number
  userGrowth: number
  scriptGrowth: number
}

interface RecentActivity {
  id: number
  type: 'user' | 'script' | 'login'
  action: string
  target: string
  time: string
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats>({
    totalUsers: 156,
    activeUsers: 89,
    totalScripts: 423,
    publishedScripts: 187,
    pendingScripts: 42,
    todayActive: 23,
    userGrowth: 12.5,
    scriptGrowth: 8.3,
  })
  const [loading, setLoading] = useState(true)
  const [recentActivity, setRecentActivity] = useState<RecentActivity[]>([
    { id: 1, type: 'user', action: '新用户注册', target: '编剧达人小明', time: '2分钟前' },
    { id: 2, type: 'script', action: '剧本提交审核', target: '《霸道总裁爱上我》', time: '5分钟前' },
    { id: 3, type: 'login', action: '管理员登录', target: 'admin@example.com', time: '10分钟前' },
    { id: 4, type: 'script', action: '剧本审核通过', target: '《重生之我是首富》', time: '15分钟前' },
    { id: 5, type: 'user', action: '用户升级VIP', target: '短剧创作者阿华', time: '20分钟前' },
    { id: 6, type: 'script', action: '剧本被退回', target: '《甜蜜暴击2》', time: '30分钟前' },
    { id: 7, type: 'login', action: '用户登录', target: 'writer@demo.com', time: '35分钟前' },
    { id: 8, type: 'script', action: '新建剧本', target: '《都市修仙传》', time: '1小时前' },
  ])

  useEffect(() => {
    // 模拟加载数据
    const timer = setTimeout(() => setLoading(false), 500)
    return () => clearTimeout(timer)
  }, [])

  const statCards = [
    {
      title: '总用户数',
      value: stats.totalUsers,
      icon: Users,
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-50',
      iconColor: 'text-blue-500',
      change: `+${stats.userGrowth}%`,
      changeType: 'up' as const,
    },
    {
      title: '活跃用户',
      value: stats.activeUsers,
      icon: Activity,
      color: 'from-green-500 to-green-600',
      bgColor: 'bg-green-50',
      iconColor: 'text-green-500',
      change: '54%',
      changeType: 'up' as const,
    },
    {
      title: '剧本总数',
      value: stats.totalScripts,
      icon: FileText,
      color: 'from-purple-500 to-purple-600',
      bgColor: 'bg-purple-50',
      iconColor: 'text-purple-500',
      change: `+${stats.scriptGrowth}%`,
      changeType: 'up' as const,
    },
    {
      title: '已发布剧本',
      value: stats.publishedScripts,
      icon: CheckCircle,
      color: 'from-teal-500 to-teal-600',
      bgColor: 'bg-teal-50',
      iconColor: 'text-teal-500',
      change: '44%',
      changeType: 'up' as const,
    },
    {
      title: '待审核剧本',
      value: stats.pendingScripts,
      icon: Clock,
      color: 'from-amber-500 to-amber-600',
      bgColor: 'bg-amber-50',
      iconColor: 'text-amber-500',
      change: '-3',
      changeType: 'down' as const,
    },
    {
      title: '今日活跃',
      value: stats.todayActive,
      icon: Eye,
      color: 'from-rose-500 to-rose-600',
      bgColor: 'bg-rose-50',
      iconColor: 'text-rose-500',
      change: '+5',
      changeType: 'up' as const,
    },
  ]

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'user':
        return <Users className="h-4 w-4 text-blue-500" />
      case 'script':
        return <FileText className="h-4 w-4 text-purple-500" />
      case 'login':
        return <Activity className="h-4 w-4 text-green-500" />
      default:
        return <Clock className="h-4 w-4 text-slate-500" />
    }
  }

  if (loading) {
    return (
      <AdminLayout>
        <div className="animate-pulse space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-32 bg-slate-200 rounded-xl" />
            ))}
          </div>
        </div>
      </AdminLayout>
    )
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* 统计卡片 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
          {statCards.map((stat, index) => {
            const Icon = stat.icon
            return (
              <div
                key={index}
                className="bg-white rounded-xl shadow-sm border border-slate-100 p-5 hover:shadow-md transition-shadow"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                    <Icon className={`h-5 w-5 ${stat.iconColor}`} />
                  </div>
                  <div className={`flex items-center gap-1 text-xs font-medium ${
                    stat.changeType === 'up' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {stat.changeType === 'up' ? <ArrowUp className="h-3 w-3" /> : <ArrowDown className="h-3 w-3" />}
                    {stat.change}
                  </div>
                </div>
                <p className="text-2xl font-bold text-slate-800">{stat.value}</p>
                <p className="text-sm text-slate-500 mt-1">{stat.title}</p>
              </div>
            )
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* 实时活动 */}
          <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-slate-100">
            <div className="p-5 border-b border-slate-100">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-slate-800">实时活动</h3>
                  <p className="text-sm text-slate-500 mt-1">最近的系统操作记录</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                  </span>
                  <span className="text-xs text-green-600 font-medium">在线</span>
                </div>
              </div>
            </div>
            <div className="p-5">
              <div className="space-y-4">
                {recentActivity.map((activity) => (
                  <div key={activity.id} className="flex items-start gap-4 p-3 rounded-lg hover:bg-slate-50 transition-colors">
                    <div className="p-2 rounded-lg bg-slate-100">
                      {getActivityIcon(activity.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-slate-800">{activity.action}</p>
                      <p className="text-sm text-slate-500 truncate">{activity.target}</p>
                    </div>
                    <span className="text-xs text-slate-400 whitespace-nowrap">{activity.time}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 快速操作 */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-100">
            <div className="p-5 border-b border-slate-100">
              <h3 className="font-semibold text-slate-800">快速操作</h3>
              <p className="text-sm text-slate-500 mt-1">常用管理功能</p>
            </div>
            <div className="p-5 space-y-3">
              <button className="w-full flex items-center gap-3 p-3 rounded-lg bg-blue-50 hover:bg-blue-100 transition-colors text-left">
                <div className="p-2 rounded-lg bg-blue-100">
                  <Users className="h-4 w-4 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-800">批量审核用户</p>
                  <p className="text-xs text-slate-500">通过批量操作节省时间</p>
                </div>
              </button>
              <button className="w-full flex items-center gap-3 p-3 rounded-lg bg-purple-50 hover:bg-purple-100 transition-colors text-left">
                <div className="p-2 rounded-lg bg-purple-100">
                  <FileText className="h-4 w-4 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-800">审核剧本</p>
                  <p className="text-xs text-slate-500">共{stats.pendingScripts}个待审核</p>
                </div>
              </button>
              <button className="w-full flex items-center gap-3 p-3 rounded-lg bg-amber-50 hover:bg-amber-100 transition-colors text-left">
                <div className="p-2 rounded-lg bg-amber-100">
                  <AlertCircle className="h-4 w-4 text-amber-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-800">内容审查</p>
                  <p className="text-xs text-slate-500">检查违规内容</p>
                </div>
              </button>
              <button className="w-full flex items-center gap-3 p-3 rounded-lg bg-slate-50 hover:bg-slate-100 transition-colors text-left">
                <div className="p-2 rounded-lg bg-slate-100">
                  <TrendingUp className="h-4 w-4 text-slate-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-800">数据报表</p>
                  <p className="text-xs text-slate-500">查看详细统计数据</p>
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* 系统状态 */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-100">
          <div className="p-5 border-b border-slate-100">
            <h3 className="font-semibold text-slate-800">系统状态</h3>
          </div>
          <div className="p-5">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-full bg-green-100">
                  <CheckCircle className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-800">API服务</p>
                  <p className="text-xs text-green-600">运行正常</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-full bg-green-100">
                  <CheckCircle className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-800">数据库</p>
                  <p className="text-xs text-green-600">连接正常</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-full bg-green-100">
                  <CheckCircle className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-800">前端服务</p>
                  <p className="text-xs text-green-600">运行正常</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-full bg-amber-100">
                  <Clock className="h-6 w-6 text-amber-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-800">云存储</p>
                  <p className="text-xs text-amber-600">使用 2.3GB / 10GB</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}
