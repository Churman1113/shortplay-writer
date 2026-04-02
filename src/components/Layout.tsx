import { Outlet, useLocation, Link } from 'react-router-dom'
import { useAuth } from '@/contexts/AuthContext'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { 
  LayoutDashboard, 
  FileText, 
  Sparkles, 
  Send, 
  Shield, 
  BookOpen, 
  User,
  LogOut,
  Menu,
  X,
  Users,
  Trophy
} from 'lucide-react'
import { useState } from 'react'

const navItems = [
  { path: '/dashboard', label: '工作台', icon: LayoutDashboard },
  { path: '/editor', label: '剧本编辑', icon: FileText },
  { path: '/ai-assistant', label: 'AI助手', icon: Sparkles },
  { path: '/submission', label: '投稿中心', icon: Send },
  { path: '/copyright', label: '版权保护', icon: Shield },
  { path: '/learning', label: '学习资源', icon: BookOpen },
  { path: '/community', label: '社区', icon: Users },
  { path: '/achievements', label: '成就', icon: Trophy },
]

export default function Layout() {
  const { user, logout } = useAuth()
  const location = useLocation()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  if (!user) {
    return <Outlet />
  }

  return (
    <div className="min-h-screen bg-[#F0FDFA]">
      {/* 顶部导航 */}
      <header className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur-md">
        <div className="flex h-16 items-center justify-between px-4 lg:px-8">
          {/* Logo */}
          <Link to="/dashboard" className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#0D9488] to-[#134E4A] shadow-lg shadow-[#0D9488]/30">
              <span className="text-xl font-black text-white">剧</span>
            </div>
            <div className="flex flex-col justify-center">
              <span className="text-xl font-black text-[#0D9488] leading-tight">剧灵</span>
              <span className="text-xs text-slate-500 font-medium leading-tight">短剧编剧创作平台</span>
            </div>
          </Link>

          {/* 桌面端导航 */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon
              const isActive = location.pathname === item.path || location.pathname.startsWith(item.path + '/')
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-[#0D9488]/10 text-[#0D9488]'
                      : 'text-[#134E4A]/70 hover:bg-[#0D9488]/5 hover:text-[#134E4A]'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {item.label}
                </Link>
              )
            })}
          </nav>

          {/* 用户菜单 */}
          <div className="flex items-center gap-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-9 w-9 rounded-full">
                  <Avatar className="h-9 w-9">
                    <AvatarImage src={user.avatar} alt={user.name} />
                    <AvatarFallback className="bg-[#0D9488] text-white">
                      {user.name?.charAt(0) || 'U'}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium text-[#134E4A]">{user.name}</p>
                    <p className="text-xs text-[#134E4A]/60">{user.email}</p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link to="/profile" className="cursor-pointer">
                    <User className="mr-2 h-4 w-4" />
                    个人中心
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={logout} className="cursor-pointer text-red-600">
                  <LogOut className="mr-2 h-4 w-4" />
                  退出登录
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* 移动端菜单按钮 */}
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* 移动端导航 */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t bg-white">
            <nav className="flex flex-col p-4 gap-1">
              {navItems.map((item) => {
                const Icon = item.icon
                const isActive = location.pathname === item.path || location.pathname.startsWith(item.path + '/')
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                      isActive
                        ? 'bg-[#0D9488]/10 text-[#0D9488]'
                        : 'text-[#134E4A]/70 hover:bg-[#0D9488]/5 hover:text-[#134E4A]'
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                    {item.label}
                  </Link>
                )
              })}
            </nav>
          </div>
        )}
      </header>

      {/* 主内容区 */}
      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  )
}
