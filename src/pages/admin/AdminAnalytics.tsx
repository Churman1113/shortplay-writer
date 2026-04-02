import { useState } from 'react'
import AdminLayout from '@/components/admin/AdminLayout'
import {
  TrendingUp,
  TrendingDown,
  Users,
  FileText,
  Eye,
  Star,
  Download,
  Calendar,
  ArrowUpRight,
  ArrowDownRight,
} from 'lucide-react'
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts'

const userGrowthData = [
  { month: '1月', users: 45, newUsers: 12 },
  { month: '2月', users: 68, newUsers: 23 },
  { month: '3月', users: 89, newUsers: 21 },
  { month: '4月', users: 112, newUsers: 23 },
  { month: '5月', users: 135, newUsers: 23 },
  { month: '6月', users: 156, newUsers: 21 },
]

const scriptGrowthData = [
  { month: '1月', scripts: 89, published: 34 },
  { month: '2月', scripts: 156, published: 67 },
  { month: '3月', scripts: 245, published: 112 },
  { month: '4月', scripts: 312, published: 145 },
  { month: '5月', scripts: 378, published: 166 },
  { month: '6月', scripts: 423, published: 187 },
]

const genreDistribution = [
  { name: '甜宠', value: 35, color: '#EC4899' },
  { name: '战神/赘婿', value: 28, color: '#EF4444' },
  { name: '重生复仇', value: 18, color: '#F97316' },
  { name: '虐恋', value: 12, color: '#6366F1' },
  { name: '其他', value: 7, color: '#94A3B8' },
]

const weeklyActivity = [
  { day: '周一', active: 45 },
  { day: '周二', active: 52 },
  { day: '周三', active: 48 },
  { day: '周四', active: 61 },
  { day: '周五', active: 55 },
  { day: '周六', active: 72 },
  { day: '周日', active: 68 },
]

const topScripts = [
  { title: '霸道总裁爱上我', views: 12500, rating: 4.8, growth: 15 },
  { title: '战神归来做奶爸', views: 15600, rating: 4.9, growth: 23 },
  { title: '我的七个姐姐', views: 11200, rating: 4.7, growth: 8 },
  { title: '重生之我是首富', views: 8900, rating: 4.6, growth: 12 },
  { title: '天价前妻', views: 7800, rating: 4.5, growth: -3 },
]

const COLORS = ['#EC4899', '#EF4444', '#F97316', '#6366F1', '#94A3B8']

export default function AdminAnalytics() {
  const [timeRange, setTimeRange] = useState('30d')

  const stats = [
    {
      title: '用户增长率',
      value: '+12.5%',
      change: '+2.3%',
      trend: 'up',
      icon: Users,
      color: 'from-blue-500 to-blue-600',
    },
    {
      title: '剧本增长率',
      value: '+8.3%',
      change: '+1.2%',
      trend: 'up',
      icon: FileText,
      color: 'from-purple-500 to-purple-600',
    },
    {
      title: '平均浏览量',
      value: '10,234',
      change: '+15.6%',
      trend: 'up',
      icon: Eye,
      color: 'from-teal-500 to-teal-600',
    },
    {
      title: '平均评分',
      value: '4.6',
      change: '+0.2',
      trend: 'up',
      icon: Star,
      color: 'from-amber-500 to-amber-600',
    },
  ]

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* 时间筛选 */}
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-slate-800">数据概览</h2>
          <div className="flex items-center gap-2 bg-white rounded-lg p-1 border border-slate-200">
            {['7d', '30d', '90d', '1y'].map((range) => (
              <button
                key={range}
                onClick={() => setTimeRange(range)}
                className={`px-4 py-1.5 text-sm rounded-md transition-colors ${
                  timeRange === range
                    ? 'bg-teal-500 text-white'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                {range === '7d' ? '7天' : range === '30d' ? '30天' : range === '90d' ? '90天' : '1年'}
              </button>
            ))}
          </div>
        </div>

        {/* 核心指标 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, index) => {
            const Icon = stat.icon
            return (
              <div
                key={index}
                className="bg-white rounded-xl shadow-sm border border-slate-100 p-5"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className={`p-2 rounded-lg bg-gradient-to-br ${stat.color} text-white`}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className={`flex items-center gap-1 text-sm font-medium ${
                    stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {stat.trend === 'up' ? (
                      <ArrowUpRight className="h-4 w-4" />
                    ) : (
                      <ArrowDownRight className="h-4 w-4" />
                    )}
                    {stat.change}
                  </div>
                </div>
                <p className="text-2xl font-bold text-slate-800">{stat.value}</p>
                <p className="text-sm text-slate-500 mt-1">{stat.title}</p>
              </div>
            )
          })}
        </div>

        {/* 图表区域 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* 用户增长趋势 */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-slate-800">用户增长趋势</h3>
              <Download className="h-4 w-4 text-slate-400 cursor-pointer hover:text-slate-600" />
            </div>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={userGrowthData}>
                  <defs>
                    <linearGradient id="userGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#0D9488" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#0D9488" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                  <XAxis dataKey="month" tick={{ fontSize: 12 }} stroke="#94A3B8" />
                  <YAxis tick={{ fontSize: 12 }} stroke="#94A3B8" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#fff',
                      border: '1px solid #E2E8F0',
                      borderRadius: '8px',
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="users"
                    stroke="#0D9488"
                    strokeWidth={2}
                    fill="url(#userGradient)"
                    name="总用户"
                  />
                  <Line
                    type="monotone"
                    dataKey="newUsers"
                    stroke="#F97316"
                    strokeWidth={2}
                    dot={{ fill: '#F97316' }}
                    name="新增用户"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* 剧本增长趋势 */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-slate-800">剧本增长趋势</h3>
              <Download className="h-4 w-4 text-slate-400 cursor-pointer hover:text-slate-600" />
            </div>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={scriptGrowthData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                  <XAxis dataKey="month" tick={{ fontSize: 12 }} stroke="#94A3B8" />
                  <YAxis tick={{ fontSize: 12 }} stroke="#94A3B8" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#fff',
                      border: '1px solid #E2E8F0',
                      borderRadius: '8px',
                    }}
                  />
                  <Legend />
                  <Bar dataKey="scripts" fill="#8B5CF6" name="剧本总数" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="published" fill="#10B981" name="已发布" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* 题材分布 */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-slate-800">剧本题材分布</h3>
              <Download className="h-4 w-4 text-slate-400 cursor-pointer hover:text-slate-600" />
            </div>
            <div className="h-72 flex items-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={genreDistribution}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={2}
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    labelLine={false}
                  >
                    {genreDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* 周活跃趋势 */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-slate-800">本周用户活跃</h3>
              <Download className="h-4 w-4 text-slate-400 cursor-pointer hover:text-slate-600" />
            </div>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={weeklyActivity}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                  <XAxis dataKey="day" tick={{ fontSize: 12 }} stroke="#94A3B8" />
                  <YAxis tick={{ fontSize: 12 }} stroke="#94A3B8" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#fff',
                      border: '1px solid #E2E8F0',
                      borderRadius: '8px',
                    }}
                  />
                  <Bar dataKey="active" fill="#0EA5E9" radius={[4, 4, 0, 0]} name="活跃用户" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* 热门剧本榜单 */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-100">
          <div className="p-5 border-b border-slate-100">
            <h3 className="font-semibold text-slate-800">热门剧本榜单</h3>
          </div>
          <div className="p-5">
            <table className="w-full">
              <thead>
                <tr className="text-left text-sm text-slate-500">
                  <th className="pb-3 font-medium">排名</th>
                  <th className="pb-3 font-medium">剧本名称</th>
                  <th className="pb-3 font-medium text-right">浏览量</th>
                  <th className="pb-3 font-medium text-right">评分</th>
                  <th className="pb-3 font-medium text-right">增长率</th>
                </tr>
              </thead>
              <tbody>
                {topScripts.map((script, index) => (
                  <tr key={index} className="border-t border-slate-100">
                    <td className="py-3">
                      <span className={`inline-flex items-center justify-center w-6 h-6 rounded-full text-xs font-bold ${
                        index === 0 ? 'bg-amber-100 text-amber-700' :
                        index === 1 ? 'bg-slate-200 text-slate-700' :
                        index === 2 ? 'bg-orange-100 text-orange-700' :
                        'bg-slate-100 text-slate-600'
                      }`}>
                        {index + 1}
                      </span>
                    </td>
                    <td className="py-3 font-medium text-slate-800">{script.title}</td>
                    <td className="py-3 text-right text-slate-600">{script.views.toLocaleString()}</td>
                    <td className="py-3 text-right">
                      <div className="flex items-center justify-end gap-1 text-amber-500">
                        <Star className="h-4 w-4 fill-current" />
                        <span className="font-medium">{script.rating}</span>
                      </div>
                    </td>
                    <td className="py-3 text-right">
                      <span className={`inline-flex items-center gap-1 ${
                        script.growth >= 0 ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {script.growth >= 0 ? (
                          <TrendingUp className="h-4 w-4" />
                        ) : (
                          <TrendingDown className="h-4 w-4" />
                        )}
                        {Math.abs(script.growth)}%
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}
