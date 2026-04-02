import { useState } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { X, Check, ArrowLeft, FileText } from 'lucide-react'

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

interface AuthModalProps {
  isOpen: boolean
  onClose: () => void
  defaultTab?: 'login' | 'register'
}

export default function AuthModal({ isOpen, onClose, defaultTab = 'login' }: AuthModalProps) {
  const [activeTab, setActiveTab] = useState<'login' | 'register'>(defaultTab)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [agreeTerms, setAgreeTerms] = useState(false)
  const [error, setError] = useState('')
  const [showTermsModal, setShowTermsModal] = useState<'agreement' | 'privacy' | null>(null)
  const { login, register } = useAuth()
  const [localLoading, setLocalLoading] = useState(false)

  if (!isOpen) return null

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLocalLoading(true)
    try {
      await login(email, password)
      onClose()
    } catch (err: any) {
      setError(err.message || '登录失败，请检查邮箱和密码')
    } finally {
      setLocalLoading(false)
    }
  }

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (password !== confirmPassword) {
      setError('两次输入的密码不一致')
      return
    }
    if (password.length < 6) {
      setError('密码长度至少为6位')
      return
    }
    if (!agreeTerms) {
      setError('请同意用户协议和隐私政策')
      return
    }

    setLocalLoading(true)
    try {
      await register(name, email, password)
      onClose()
    } catch (err: any) {
      setError(err.message || '注册失败，请稍后重试')
    } finally {
      setLocalLoading(false)
    }
  }

  const switchTab = (tab: 'login' | 'register') => {
    setActiveTab(tab)
    setError('')
    setName('')
    setEmail('')
    setPassword('')
    setConfirmPassword('')
  }

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div 
        className="bg-white rounded-2xl w-full max-w-md shadow-2xl overflow-hidden" 
        onClick={(e) => e.stopPropagation()}
      >
        {/* 顶部渐变栏 */}
        <div className="bg-gradient-to-r from-[#0D9488] to-[#134E4A] p-6 text-white relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1 hover:bg-white/20 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-white/20 flex items-center justify-center">
              <FileText className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-xl font-bold">短剧编剧创作平台</h2>
              <p className="text-white/80 text-sm">开启您的创作之旅</p>
            </div>
          </div>
        </div>

        {/* 标签切换 */}
        <div className="flex border-b">
          <button
            onClick={() => switchTab('login')}
            className={`flex-1 py-3 text-sm font-medium transition-colors ${
              activeTab === 'login'
                ? 'text-[#0D9488] border-b-2 border-[#0D9488] bg-[#0D9488]/5'
                : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            登录
          </button>
          <button
            onClick={() => switchTab('register')}
            className={`flex-1 py-3 text-sm font-medium transition-colors ${
              activeTab === 'register'
                ? 'text-[#0D9488] border-b-2 border-[#0D9488] bg-[#0D9488]/5'
                : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            注册
          </button>
        </div>

        {/* 表单内容 */}
        <div className="p-6">
          {error && (
            <div className="mb-4 p-3 text-sm text-red-600 bg-red-50 rounded-lg border border-red-200">
              {error}
            </div>
          )}

          {/* 登录表单 */}
          {activeTab === 'login' && (
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="modal-email" className="text-[#134E4A]">邮箱</Label>
                <Input
                  id="modal-email"
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="border-[#0D9488]/20 focus:border-[#0D9488] focus:ring-[#0D9488]"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="modal-password" className="text-[#134E4A]">密码</Label>
                <Input
                  id="modal-password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="border-[#0D9488]/20 focus:border-[#0D9488] focus:ring-[#0D9488]"
                />
              </div>
              <Button 
                type="submit" 
                className="w-full bg-[#F97316] hover:bg-[#EA580C] text-white"
                disabled={localLoading}
              >
                {localLoading ? '登录中...' : '登录'}
              </Button>
            </form>
          )}

          {/* 注册表单 */}
          {activeTab === 'register' && (
            <form onSubmit={handleRegister} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="modal-name" className="text-[#134E4A]">昵称</Label>
                <Input
                  id="modal-name"
                  type="text"
                  placeholder="您的编剧昵称"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="border-[#0D9488]/20 focus:border-[#0D9488] focus:ring-[#0D9488]"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="modal-reg-email" className="text-[#134E4A]">邮箱</Label>
                <Input
                  id="modal-reg-email"
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="border-[#0D9488]/20 focus:border-[#0D9488] focus:ring-[#0D9488]"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="modal-reg-password" className="text-[#134E4A]">密码</Label>
                <Input
                  id="modal-reg-password"
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
                <Label htmlFor="modal-confirm-password" className="text-[#134E4A]">确认密码</Label>
                <Input
                  id="modal-confirm-password"
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
                <Label htmlFor="modal-terms" className="text-sm text-[#134E4A]/70 cursor-pointer" onClick={() => setAgreeTerms(!agreeTerms)}>
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
              <Button 
                type="submit" 
                className="w-full bg-[#F97316] hover:bg-[#EA580C] text-white"
                disabled={localLoading}
              >
                {localLoading ? '注册中...' : '立即注册'}
              </Button>
            </form>
          )}

          {/* 切换提示 */}
          <p className="mt-4 text-sm text-center text-slate-500">
            {activeTab === 'login' ? (
              <>
                还没有账号？
                <button onClick={() => switchTab('register')} className="text-[#0D9488] hover:underline ml-1">
                  立即注册
                </button>
              </>
            ) : (
              <>
                已有账号？
                <button onClick={() => switchTab('login')} className="text-[#0D9488] hover:underline ml-1">
                  立即登录
                </button>
              </>
            )}
          </p>
        </div>
      </div>

      {/* 用户协议/隐私政策弹窗 */}
      {showTermsModal && (
        <div className="fixed inset-0 bg-black/50 z-[60] flex items-center justify-center p-4" onClick={() => setShowTermsModal(null)}>
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
