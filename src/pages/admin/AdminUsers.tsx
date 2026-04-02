import { useState, useEffect } from 'react'
import AdminLayout from '@/components/admin/AdminLayout'
import {
  Search,
  Filter,
  Plus,
  Users,
  Edit,
  Trash2,
  Eye,
  MoreVertical,
  ChevronLeft,
  ChevronRight,
  CheckCircle,
  XCircle,
  AlertCircle,
  Download,
  Upload,
  UserCheck,
  UserX,
  Crown,
  Shield,
  Mail,
  Calendar,
  FileText,
  X,
} from 'lucide-react'

interface User {
  id: number
  name: string
  email: string
  role: 'writer' | 'studio' | 'admin'
  status: 'active' | 'banned' | 'pending'
  scripts: number
  createdAt: string
  lastLogin: string
  vip: boolean
}

export default function AdminUsers() {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [roleFilter, setRoleFilter] = useState<string>('all')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [selectedUsers, setSelectedUsers] = useState<number[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [showDetailModal, setShowDetailModal] = useState(false)
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const itemsPerPage = 10

  useEffect(() => {
    // 模拟加载用户数据
    const mockUsers: User[] = [
      { id: 1, name: '张三', email: 'zhangsan@example.com', role: 'writer', status: 'active', scripts: 12, createdAt: '2025-01-15', lastLogin: '2026-04-01 10:30', vip: true },
      { id: 2, name: '李四', email: 'lisi@example.com', role: 'studio', status: 'active', scripts: 45, createdAt: '2025-02-20', lastLogin: '2026-04-01 09:15', vip: true },
      { id: 3, name: '王五', email: 'wangwu@example.com', role: 'writer', status: 'pending', scripts: 3, createdAt: '2026-03-25', lastLogin: '2026-03-28', vip: false },
      { id: 4, name: '赵六', email: 'zhaoliu@example.com', role: 'writer', status: 'active', scripts: 8, createdAt: '2025-06-10', lastLogin: '2026-03-30', vip: false },
      { id: 5, name: '钱七', email: 'qianqi@example.com', role: 'admin', status: 'active', scripts: 0, createdAt: '2024-12-01', lastLogin: '2026-04-01 11:00', vip: true },
      { id: 6, name: '孙八', email: 'sunba@example.com', role: 'writer', status: 'banned', scripts: 5, createdAt: '2025-08-15', lastLogin: '2026-01-10', vip: false },
      { id: 7, name: '周九', email: 'zhoujiu@example.com', role: 'studio', status: 'active', scripts: 28, createdAt: '2025-09-20', lastLogin: '2026-03-31', vip: true },
      { id: 8, name: '吴十', email: 'wushi@example.com', role: 'writer', status: 'active', scripts: 15, createdAt: '2025-11-05', lastLogin: '2026-04-01 08:45', vip: false },
      { id: 9, name: '郑十一', email: 'zheng11@example.com', role: 'writer', status: 'pending', scripts: 1, createdAt: '2026-03-28', lastLogin: '2026-03-29', vip: false },
      { id: 10, name: '冯十二', email: 'feng12@example.com', role: 'writer', status: 'active', scripts: 22, createdAt: '2025-04-18', lastLogin: '2026-03-25', vip: true },
    ]
    setTimeout(() => {
      setUsers(mockUsers)
      setLoading(false)
    }, 500)
  }, [])

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          user.email.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesRole = roleFilter === 'all' || user.role === roleFilter
    const matchesStatus = statusFilter === 'all' || user.status === statusFilter
    return matchesSearch && matchesRole && matchesStatus
  })

  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage)
  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  const handleSelectAll = () => {
    if (selectedUsers.length === paginatedUsers.length) {
      setSelectedUsers([])
    } else {
      setSelectedUsers(paginatedUsers.map(u => u.id))
    }
  }

  const handleSelectUser = (id: number) => {
    setSelectedUsers(prev =>
      prev.includes(id) ? prev.filter(uid => uid !== id) : [...prev, id]
    )
  }

  const handleViewUser = (user: User) => {
    setSelectedUser(user)
    setShowDetailModal(true)
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700"><CheckCircle className="h-3 w-3" />正常</span>
      case 'banned':
        return <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-700"><XCircle className="h-3 w-3" />封禁</span>
      case 'pending':
        return <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-amber-100 text-amber-700"><AlertCircle className="h-3 w-3" />待审核</span>
      default:
        return null
    }
  }

  const getRoleBadge = (role: string) => {
    switch (role) {
      case 'admin':
        return <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-700"><Shield className="h-3 w-3" />管理员</span>
      case 'studio':
        return <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700"><Crown className="h-3 w-3" />工作室</span>
      case 'writer':
        return <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-700"><Users className="h-3 w-3" />编剧</span>
      default:
        return null
    }
  }

  const stats = {
    total: users.length,
    active: users.filter(u => u.status === 'active').length,
    pending: users.filter(u => u.status === 'pending').length,
    banned: users.filter(u => u.status === 'banned').length,
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* 统计概览 */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-slate-100">
                <Users className="h-5 w-5 text-slate-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-800">{stats.total}</p>
                <p className="text-sm text-slate-500">总用户数</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-green-100">
                <CheckCircle className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-green-600">{stats.active}</p>
                <p className="text-sm text-slate-500">活跃用户</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-amber-100">
                <AlertCircle className="h-5 w-5 text-amber-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-amber-600">{stats.pending}</p>
                <p className="text-sm text-slate-500">待审核</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-red-100">
                <XCircle className="h-5 w-5 text-red-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-red-600">{stats.banned}</p>
                <p className="text-sm text-slate-500">已封禁</p>
              </div>
            </div>
          </div>
        </div>

        {/* 搜索和筛选 */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-5">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* 搜索框 */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <input
                type="text"
                placeholder="搜索用户名或邮箱..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
              />
            </div>

            {/* 角色筛选 */}
            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              className="px-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
            >
              <option value="all">全部角色</option>
              <option value="writer">编剧</option>
              <option value="studio">工作室</option>
              <option value="admin">管理员</option>
            </select>

            {/* 状态筛选 */}
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
            >
              <option value="all">全部状态</option>
              <option value="active">正常</option>
              <option value="pending">待审核</option>
              <option value="banned">已封禁</option>
            </select>

            {/* 批量操作 */}
            {selectedUsers.length > 0 && (
              <div className="flex items-center gap-2">
                <span className="text-sm text-slate-500">已选择 {selectedUsers.length} 项</span>
                <button className="px-3 py-2 text-sm bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors">
                  批量通过
                </button>
                <button className="px-3 py-2 text-sm bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors">
                  批量封禁
                </button>
              </div>
            )}
          </div>
        </div>

        {/* 用户列表 */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50 border-b border-slate-100">
                <tr>
                  <th className="px-5 py-3 text-left">
                    <input
                      type="checkbox"
                      checked={selectedUsers.length === paginatedUsers.length && paginatedUsers.length > 0}
                      onChange={handleSelectAll}
                      className="rounded border-slate-300 text-teal-600 focus:ring-teal-500"
                    />
                  </th>
                  <th className="px-5 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">用户</th>
                  <th className="px-5 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">角色</th>
                  <th className="px-5 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">状态</th>
                  <th className="px-5 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">剧本数</th>
                  <th className="px-5 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">注册时间</th>
                  <th className="px-5 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">最后登录</th>
                  <th className="px-5 py-3 text-right text-xs font-semibold text-slate-600 uppercase tracking-wider">操作</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {loading ? (
                  [...Array(5)].map((_, i) => (
                    <tr key={i}>
                      {[...Array(8)].map((_, j) => (
                        <td key={j} className="px-5 py-4">
                          <div className="h-4 bg-slate-100 rounded animate-pulse" />
                        </td>
                      ))}
                    </tr>
                  ))
                ) : paginatedUsers.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="px-5 py-12 text-center text-slate-500">
                      未找到匹配的用户
                    </td>
                  </tr>
                ) : (
                  paginatedUsers.map((user) => (
                    <tr key={user.id} className="hover:bg-slate-50 transition-colors">
                      <td className="px-5 py-4">
                        <input
                          type="checkbox"
                          checked={selectedUsers.includes(user.id)}
                          onChange={() => handleSelectUser(user.id)}
                          className="rounded border-slate-300 text-teal-600 focus:ring-teal-500"
                        />
                      </td>
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-full bg-gradient-to-br from-teal-400 to-teal-600 flex items-center justify-center text-white font-medium">
                            {user.name.charAt(0)}
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <p className="font-medium text-slate-800">{user.name}</p>
                              {user.vip && <Crown className="h-4 w-4 text-amber-500" />}
                            </div>
                            <p className="text-sm text-slate-500">{user.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-5 py-4">{getRoleBadge(user.role)}</td>
                      <td className="px-5 py-4">{getStatusBadge(user.status)}</td>
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-1">
                          <FileText className="h-4 w-4 text-slate-400" />
                          <span className="font-medium">{user.scripts}</span>
                        </div>
                      </td>
                      <td className="px-5 py-4 text-sm text-slate-600">{user.createdAt}</td>
                      <td className="px-5 py-4 text-sm text-slate-600">{user.lastLogin}</td>
                      <td className="px-5 py-4">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => handleViewUser(user)}
                            className="p-2 text-slate-400 hover:text-teal-600 hover:bg-teal-50 rounded-lg transition-colors"
                            title="查看详情"
                          >
                            <Eye className="h-4 w-4" />
                          </button>
                          <button
                            className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                            title="编辑"
                          >
                            <Edit className="h-4 w-4" />
                          </button>
                          {user.status === 'active' ? (
                            <button
                              className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                              title="封禁用户"
                            >
                              <UserX className="h-4 w-4" />
                            </button>
                          ) : user.status === 'banned' ? (
                            <button
                              className="p-2 text-slate-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                              title="解封用户"
                            >
                              <UserCheck className="h-4 w-4" />
                            </button>
                          ) : (
                            <>
                              <button
                                className="p-2 text-slate-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                                title="审核通过"
                              >
                                <CheckCircle className="h-4 w-4" />
                              </button>
                              <button
                                className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                title="拒绝"
                              >
                                <XCircle className="h-4 w-4" />
                              </button>
                            </>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* 分页 */}
          <div className="px-5 py-4 border-t border-slate-100 flex items-center justify-between">
            <p className="text-sm text-slate-500">
              显示 {(currentPage - 1) * itemsPerPage + 1} - {Math.min(currentPage * itemsPerPage, filteredUsers.length)} 条，共 {filteredUsers.length} 条
            </p>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
                className="p-2 rounded-lg border border-slate-200 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              {[...Array(Math.min(5, totalPages))].map((_, i) => {
                const page = i + 1
                return (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`w-10 h-10 rounded-lg text-sm font-medium transition-colors ${
                      currentPage === page
                        ? 'bg-teal-500 text-white'
                        : 'border border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    {page}
                  </button>
                )
              })}
              <button
                onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                disabled={currentPage === totalPages}
                className="p-2 rounded-lg border border-slate-200 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 用户详情弹窗 */}
      {showDetailModal && selectedUser && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="p-5 border-b border-slate-100 flex items-center justify-between">
              <h3 className="font-semibold text-lg text-slate-800">用户详情</h3>
              <button
                onClick={() => setShowDetailModal(false)}
                className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
              >
                <X className="h-5 w-5 text-slate-500" />
              </button>
            </div>
            <div className="p-5">
              <div className="flex items-center gap-4 mb-6">
                <div className="h-16 w-16 rounded-full bg-gradient-to-br from-teal-400 to-teal-600 flex items-center justify-center text-white text-2xl font-bold">
                  {selectedUser.name.charAt(0)}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="text-xl font-bold text-slate-800">{selectedUser.name}</h4>
                    {selectedUser.vip && <Crown className="h-5 w-5 text-amber-500" />}
                  </div>
                  <div className="flex items-center gap-2 mt-1">
                    {getRoleBadge(selectedUser.role)}
                    {getStatusBadge(selectedUser.status)}
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
                  <Mail className="h-5 w-5 text-slate-400" />
                  <div>
                    <p className="text-xs text-slate-500">邮箱</p>
                    <p className="text-sm font-medium text-slate-800">{selectedUser.email}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
                  <Calendar className="h-5 w-5 text-slate-400" />
                  <div>
                    <p className="text-xs text-slate-500">注册时间</p>
                    <p className="text-sm font-medium text-slate-800">{selectedUser.createdAt}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
                  <Eye className="h-5 w-5 text-slate-400" />
                  <div>
                    <p className="text-xs text-slate-500">最后登录</p>
                    <p className="text-sm font-medium text-slate-800">{selectedUser.lastLogin}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
                  <FileText className="h-5 w-5 text-slate-400" />
                  <div>
                    <p className="text-xs text-slate-500">剧本数量</p>
                    <p className="text-sm font-medium text-slate-800">{selectedUser.scripts} 个剧本</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="p-5 border-t border-slate-100 flex gap-3">
              <button className="flex-1 px-4 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition-colors">
                编辑用户
              </button>
              {selectedUser.status === 'active' ? (
                <button className="flex-1 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors">
                  封禁用户
                </button>
              ) : (
                <button className="flex-1 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors">
                  解封用户
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  )
}
