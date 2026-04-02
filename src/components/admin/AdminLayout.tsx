import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useAuth } from '@/contexts/AuthContext'
import {
  LayoutDashboard,
  Users,
  FileText,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
  BarChart3,
  Database,
  Shield,
  Menu,
} from 'lucide-react'

interface AdminLayoutProps {
  children: React.ReactNode
}

const menuItems = [
  { icon: LayoutDashboard, label: '数据概览', path: '/admin' },
  { icon: Users, label: '用户管理', path: '/admin/users' },
  { icon: FileText, label: '剧本管理', path: '/admin/scripts' },
  { icon: BarChart3, label: '数据分析', path: '/admin/analytics' },
  { icon: Database, label: '系统数据', path: '/admin/database' },
  { icon: Shield, label: '安全设置', path: '/admin/security' },
  { icon: Settings, label: '系统设置', path: '/admin/settings' },
]

export default function AdminLayout({ children }: AdminLayoutProps) {
  const [collapsed, setCollapsed] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const location = useLocation()
  const { user, logout } = useAuth()

  const isActive = (path: string) => location.pathname === path

  return (
    <div className="min-h-screen bg-slate-100 flex">
      {/* 侧边栏 */}
      <aside
        className={`
          fixed top-0 left-0 h-full bg-gradient-to-b from-slate-900 to-slate-800 text-white z-50
          transition-all duration-300 shadow-xl
          ${collapsed ? 'w-20' : 'w-64'}
          ${mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}
      >
        {/* Logo */}
        <div className="h-16 flex items-center justify-between px-4 border-b border-slate-700/50">
          {!collapsed && (
            <div className="flex items-center gap-3">
              <div className="h-9 w-9 rounded-lg bg-gradient-to-br from-teal-400 to-teal-600 flex items-center justify-center">
                <Shield className="h-5 w-5 text-white" />
              </div>
              <div>
                <h1 className="font-bold text-sm">管理后台</h1>
                <p className="text-xs text-slate-400">短剧编剧助手</p>
              </div>
            </div>
          )}
          {collapsed && (
            <div className="h-9 w-9 rounded-lg bg-gradient-to-br from-teal-400 to-teal-600 flex items-center justify-center mx-auto">
              <Shield className="h-5 w-5 text-white" />
            </div>
          )}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="hidden lg:flex p-1.5 rounded-lg hover:bg-slate-700/50 transition-colors"
          >
            {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
          </button>
        </div>

        {/* 菜单 */}
        <nav className="p-3 space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon
            const active = isActive(item.path)
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setMobileOpen(false)}
                className={`
                  flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all
                  ${active
                    ? 'bg-gradient-to-r from-teal-500 to-teal-600 text-white shadow-lg shadow-teal-500/25'
                    : 'text-slate-300 hover:bg-slate-700/50 hover:text-white'
                  }
                `}
              >
                <Icon className={`h-5 w-5 flex-shrink-0 ${active ? 'text-white' : ''}`} />
                {!collapsed && <span className="text-sm font-medium">{item.label}</span>}
              </Link>
            )
          })}
        </nav>

        {/* 底部用户信息 */}
        <div className="absolute bottom-0 left-0 right-0 p-3 border-t border-slate-700/50">
          {!collapsed ? (
            <div className="flex items-center gap-3 p-2 rounded-lg bg-slate-800/50">
              <div className="h-9 w-9 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center text-sm font-bold">
                {user?.name?.charAt(0).toUpperCase() || 'A'}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{user?.name || '管理员'}</p>
                <p className="text-xs text-slate-400 truncate">{user?.email || 'admin@example.com'}</p>
              </div>
              <button
                onClick={logout}
                className="p-2 rounded-lg hover:bg-slate-700/50 transition-colors text-slate-400 hover:text-red-400"
                title="退出登录"
              >
                <LogOut className="h-4 w-4" />
              </button>
            </div>
          ) : (
            <button
              onClick={logout}
              className="w-full p-2 rounded-lg hover:bg-slate-700/50 transition-colors text-slate-400 hover:text-red-400 flex justify-center"
              title="退出登录"
            >
              <LogOut className="h-5 w-5" />
            </button>
          )}
        </div>
      </aside>

      {/* 移动端遮罩 */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* 主内容区 */}
      <main className={`flex-1 transition-all duration-300 ${collapsed ? 'lg:ml-20' : 'lg:ml-64'}`}>
        {/* 顶部栏 */}
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-4 lg:px-6 sticky top-0 z-30">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setMobileOpen(true)}
              className="lg:hidden p-2 rounded-lg hover:bg-slate-100 transition-colors"
            >
              <Menu className="h-5 w-5" />
            </button>
            <div>
              <h2 className="font-semibold text-slate-800">
                {menuItems.find(item => item.path === location.pathname)?.label || '后台管理'}
              </h2>
              <p className="text-xs text-slate-500">
                {new Date().toLocaleDateString('zh-CN', { year: 'numeric', month: 'long', day: 'numeric', weekday: 'long' })}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Link
              to="/"
              className="px-4 py-2 text-sm bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors flex items-center gap-2"
            >
              返回前台
            </Link>
          </div>
        </header>

        {/* 内容 */}
        <div className="p-4 lg:p-6">
          {children}
        </div>
      </main>
    </div>
  )
}
