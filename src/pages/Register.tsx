import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '@/contexts/AuthContext'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { FileText, Sparkles, Shield, BookOpen, ArrowLeft, Check, X } from 'lucide-react'

// 用户协议内容
const userAgreementContent = `用户协议

欢迎您使用短剧编剧创作平台！

一、服务说明
短剧编剧创作平台（以下简称"平台"）是一个专业的短剧剧本创作工具，为用户提供剧本编辑、AI辅助创作、投稿管理等功能。

二、用户注册
1. 您在注册时应提供真实、准确的个人信息
2. 您有责任妥善保管账户信息，因个人保管不当造成的损失由用户自行承担
3. 用户不得以任何方式转让或授权他人使用其账户

三、内容规范
1. 用户创作的剧本内容需符合法律法规
2. 禁止上传或发布违法、有害、侵权的内容
3. 用户应对其创作内容的合法性负责

四、知识产权
1. 用户在平台上创作的剧本版权归用户所有
2. 用户授予平台必要的展示和传播权利
3. 平台不会将用户内容用于商业用途

五、隐私保护
平台尊重并保护用户隐私，具体详见《隐私政策》

六、服务变更
平台保留随时修改或中断服务的权利，并会提前通知用户

七、联系我们
如有任何问题，请联系我们的客服团队。`

// 隐私政策内容
const privacyPolicyContent = `隐私政策

更新日期：2024年1月1日

一、信息收集
1. 注册信息：您在注册时提供的昵称、邮箱等
2. 使用信息：您在使用平台过程中产生的数据
3. 设备信息：设备型号、操作系统等基本信息

二、信息使用
1. 提供、维护和改进我们的服务
2. 处理您的注册和登录请求
3. 向您发送服务相关的通知

三、信息共享
我们不会与第三方分享您的个人信息，以下情况除外：
1. 获得您的明确同意
2. 法律法规要求

四、信息安全
我们采用合理的安全措施保护您的个人信息，防止数据被未授权访问、使用或泄露。

五、Cookie使用
平台使用Cookie来改善用户体验，您可以通过浏览器设置禁用Cookie。

六、用户权利
您有权访问、更正、删除您的个人信息，如需行使这些权利，请联系我们。

七、儿童隐私
平台不向未满18周岁的未成年人提供服务。

八、政策变更
我们可能会不时更新本隐私政策，更新后会在平台上发布。

九、联系我们
如有任何隐私相关问题，请联系我们的客服团队。`

export default function Register() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [agreeTerms, setAgreeTerms] = useState(false)
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [showTermsModal, setShowTermsModal] = useState<'agreement' | 'privacy' | null>(null)
  const { register } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    // 验证密码匹配
    if (password !== confirmPassword) {
      setError('两次输入的密码不一致')
      return
    }

    // 验证密码长度
    if (password.length < 6) {
      setError('密码长度至少为6位')
      return
    }

    // 验证同意条款
    if (!agreeTerms) {
      setError('请同意用户协议和隐私政策')
      return
    }

    setIsLoading(true)
    try {
      await register(name, email, password)
      navigate('/dashboard')
    } catch (err) {
      setError('注册失败，请稍后重试')
    } finally {
      setIsLoading(false)
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
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-[#0D9488] to-[#134E4A] flex-col justify-center px-12">
        <div className="max-w-md">
          <Link to="/login" className="inline-flex items-center text-white/80 hover:text-white mb-8 transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" />
            返回登录
          </Link>
          <h1 className="text-4xl font-bold text-white mb-6">加入短剧编剧创作平台</h1>
          <p className="text-white/90 text-lg mb-12">立即注册，开启您的短剧创作之旅</p>
          
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

      {/* 右侧 - 注册表单 */}
      <div className="flex-1 flex items-center justify-center p-4 bg-[#F0FDFA]">
        <Card className="w-full max-w-md border-0 shadow-xl">
          <CardHeader className="space-y-1">
            <div className="flex items-center justify-center mb-4 lg:hidden">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#0D9488]">
                <FileText className="h-7 w-7 text-white" />
              </div>
            </div>
            <CardTitle className="text-2xl text-center text-[#134E4A]">创建账号</CardTitle>
            <CardDescription className="text-center text-[#134E4A]/60">
              填写以下信息完成注册
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              {error && (
                <div className="p-3 text-sm text-red-600 bg-red-50 rounded-lg border border-red-200">
                  {error}
                </div>
              )}
              
              <div className="space-y-2">
                <Label htmlFor="name" className="text-[#134E4A]">昵称</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="您的编剧昵称"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="border-[#0D9488]/20 focus:border-[#0D9488] focus:ring-[#0D9488]"
                />
              </div>
              
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
                  placeholder="至少6位字符"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={6}
                  className="border-[#0D9488]/20 focus:border-[#0D9488] focus:ring-[#0D9488]"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="text-[#134E4A]">确认密码</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="再次输入密码"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  className="border-[#0D9488]/20 focus:border-[#0D9488] focus:ring-[#0D9488]"
                />
              </div>

              <div className="flex items-start gap-3">
                <button
                  type="button"
                  onClick={() => setAgreeTerms(!agreeTerms)}
                  className={`mt-0.5 flex-shrink-0 w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${
                    agreeTerms
                      ? 'bg-[#0D9488] border-[#0D9488]'
                      : 'border-[#0D9488]/30 hover:border-[#0D9488]'
                  }`}
                >
                  {agreeTerms && <Check className="w-3 h-3 text-white" />}
                </button>
                <Label htmlFor="terms" className="text-sm text-[#134E4A]/70 cursor-pointer" onClick={() => setAgreeTerms(!agreeTerms)}>
                  我已阅读并同意{' '}
                  <button type="button" onClick={(e) => { e.preventDefault(); setShowTermsModal('agreement') }} className="text-[#0D9488] hover:underline">
                    用户协议
                  </button>
                  {' '}和{' '}
                  <button type="button" onClick={(e) => { e.preventDefault(); setShowTermsModal('privacy') }} className="text-[#0D9488] hover:underline">
                    隐私政策
                  </button>
                </Label>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col gap-4">
              <Button 
                type="submit" 
                className="w-full bg-[#F97316] hover:bg-[#EA580C] text-white"
                disabled={isLoading}
              >
                {isLoading ? '注册中...' : '立即注册'}
              </Button>
              <p className="text-sm text-center text-[#134E4A]/60">
                已有账号？{' '}
                <Link to="/login">
                  <Button variant="link" className="text-[#0D9488] p-0 h-auto">
                    立即登录
                  </Button>
                </Link>
              </p>
            </CardFooter>
          </form>
        </Card>
      </div>

      {/* 用户协议/隐私政策弹窗 */}
      {showTermsModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setShowTermsModal(null)}>
          <div
            className="bg-white rounded-2xl w-full max-w-lg max-h-[80vh] shadow-2xl overflow-hidden flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-gradient-to-r from-[#0D9488] to-[#134E4A] p-4 text-white relative flex-shrink-0">
              <button
                onClick={() => setShowTermsModal(null)}
                className="absolute top-3 right-3 p-1 hover:bg-white/20 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
              <h2 className="text-lg font-bold">
                {showTermsModal === 'agreement' ? '用户协议' : '隐私政策'}
              </h2>
            </div>
            <div className="p-6 overflow-y-auto flex-1">
              <pre className="whitespace-pre-wrap text-sm text-slate-700 font-sans leading-relaxed">
                {showTermsModal === 'agreement' ? userAgreementContent : privacyPolicyContent}
              </pre>
            </div>
            <div className="p-4 border-t bg-slate-50 flex-shrink-0">
              <Button
                onClick={() => setShowTermsModal(null)}
                className="w-full bg-[#0D9488] hover:bg-[#0F766E] text-white"
              >
                我已阅读
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
