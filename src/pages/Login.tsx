import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '@/contexts/AuthContext'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { FileText, Sparkles, Shield, BookOpen } from 'lucide-react'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { login, isLoading } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await login(email, password)
      navigate('/dashboard')
    } catch (error) {
      console.error('Login failed:', error)
    }
  }

  const features = [
    { icon: FileText, title: '专业剧本编辑', desc: '专为短剧设计的编辑器，支持付费卡点管理' },
    { icon: Sparkles, title: 'AI智能辅助', desc: '大纲生成、台词润色、爆款剧本分析' },
    { icon: Shield, title: '版权保护', desc: '电子存证、合同模板、风险预警' },
    { icon: BookOpen, title: '学习资源', desc: '爆款拆解、拉片工具、行业课程' },
  ]

  return (
    <div className="min-h-screen flex">
      {/* 左侧 - 功能介绍 */}
      <div className="hidden lg:flex lg:w-1/2 bg-[#0D9488] flex-col justify-center px-12">
        <div className="max-w-md">
          <h1 className="text-4xl font-bold text-white mb-6">短剧编剧创作平台</h1>
          <p className="text-white/90 text-lg mb-12">从创意到变现的一站式短剧编剧工作台</p>
          
          <div className="space-y-6">
            {features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <div key={index} className="flex items-start gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/20">
                    <Icon className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold">{feature.title}</h3>
                    <p className="text-white/80 text-sm">{feature.desc}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* 右侧 - 登录表单 */}
      <div className="flex-1 flex items-center justify-center p-4 bg-[#F0FDFA]">
        <Card className="w-full max-w-md border-0 shadow-xl">
          <CardHeader className="space-y-1">
            <div className="flex items-center justify-center mb-4 lg:hidden">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#0D9488]">
                <FileText className="h-7 w-7 text-white" />
              </div>
            </div>
            <CardTitle className="text-2xl text-center text-[#134E4A]">欢迎回来</CardTitle>
            <CardDescription className="text-center text-[#134E4A]/60">
              登录您的编剧账号，开始创作
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-[#134E4A]">邮箱</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="border-[#0D9488]/20 focus:border-[#0D9488] focus:ring-[#0D9488]"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password" className="text-[#134E4A]">密码</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="border-[#0D9488]/20 focus:border-[#0D9488] focus:ring-[#0D9488]"
                />
              </div>
            </CardContent>
            <CardFooter className="flex flex-col gap-4">
              <Button 
                type="submit" 
                className="w-full bg-[#F97316] hover:bg-[#EA580C] text-white"
                disabled={isLoading}
              >
                {isLoading ? '登录中...' : '登录'}
              </Button>
              <p className="text-sm text-center text-[#134E4A]/60">
                还没有账号？{' '}
                <Link to="/register">
                  <Button variant="link" className="text-[#0D9488] p-0 h-auto">
                    立即注册
                  </Button>
                </Link>
              </p>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  )
}
