import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  CheckCircle,
  Circle,
  Clock,
  Send,
  FileText,
  MessageSquare,
  AlertCircle,
  ChevronRight,
  ChevronDown,
  ExternalLink,
  Star,
  Award,
  Target,
  Users,
  Building,
  DollarSign
} from 'lucide-react'

interface SubmissionStep {
  id: number
  title: string
  description: string
  status: 'pending' | 'in_progress' | 'completed' | 'error'
  details: string[]
  tips?: string[]
}

const defaultSteps: SubmissionStep[] = [
  {
    id: 1,
    title: '准备投稿材料',
    description: '整理剧本、人物小传、剧情大纲等必要材料',
    status: 'completed',
    details: [
      '完整剧本（80-100集）',
      '人物小传',
      '剧情大纲',
      '题材类型说明'
    ],
    tips: [
      '剧本格式要规范',
      '大纲要清晰呈现故事主线'
    ]
  },
  {
    id: 2,
    title: '选择投稿平台',
    description: '根据剧本题材选择最适合的平台',
    status: 'in_progress',
    details: [
      '抖音/红果：适合多种题材',
      '快手：适合搞笑、接地气内容',
      '九州文化：甜宠、古装优先',
      '点众科技：战神、男频为主',
      '麦芽传媒：虐恋、情感题材'
    ],
    tips: [
      '仔细阅读平台的收稿要求',
      '选择与剧本题材匹配的平台'
    ]
  },
  {
    id: 3,
    title: '提交投稿申请',
    description: '在平台或通过邮箱提交剧本',
    status: 'pending',
    details: [
      '登录平台作者后台',
      '上传剧本文档',
      '填写作品信息',
      '确认提交'
    ],
    tips: [
      '投稿邮箱注意格式规范',
      '邮件标题写清：题材+集数+亮点'
    ]
  },
  {
    id: 4,
    title: '等待审核',
    description: '平台编辑审核剧本（通常1-7天）',
    status: 'pending',
    details: [
      '初审：格式和题材审核',
      '复审：内容质量评估',
      '终审：市场潜力判断'
    ],
    tips: [
      '审核期间不要催促',
      '可以同时投多个平台'
    ]
  },
  {
    id: 5,
    title: '审核反馈',
    description: '收到平台审核结果',
    status: 'pending',
    details: [
      '通过：收到签约邀请',
      '修改：收到修改意见',
      '拒绝：收到拒稿理由'
    ],
    tips: [
      '认真对待修改意见',
      '拒绝不代表作品差，可能只是不适合该平台'
    ]
  },
  {
    id: 6,
    title: '签约与收益',
    description: '完成签约，开始获得收益',
    status: 'pending',
    details: [
      '确认分成比例',
      '签署版权协议',
      '获得作品收益',
      '享受分成收益'
    ]
  }
]

interface Platform {
  name: string
  logo: string
  genres: string[]
  advantage: string
  commission: string
  url: string
}

const platforms: Platform[] = [
  {
    name: '红果短剧',
    logo: '红果',
    genres: ['甜宠', '都市', '古装', '战神'],
    advantage: '字节系流量大，免费模式爆发',
    commission: '保底+分成',
    url: 'https://www.hongguo.com'
  },
  {
    name: '九州文化',
    logo: '九州',
    genres: ['甜宠', '古装', '虐恋'],
    advantage: '老牌短剧公司，渠道稳定',
    commission: '分成为主',
    url: 'https://www.jiuzhouwh.com'
  },
  {
    name: '点众科技',
    logo: '点众',
    genres: ['战神', '赘婿', '男频'],
    advantage: '男频题材头部平台',
    commission: '保底+高分成',
    url: 'https://www.dianzhongtech.com'
  },
  {
    name: '麦芽传媒',
    logo: '麦芽',
    genres: ['虐恋', '情感', '悬疑'],
    advantage: '情感题材见长',
    commission: '分成为主',
    url: 'https://www.maiya.tv'
  },
  {
    name: '映宇宙',
    logo: '映宇宙',
    genres: ['甜宠', '萌宝'],
    advantage: '海外渠道优势',
    commission: '保底+分成',
    url: 'https://www.inkey.com'
  }
]

interface SubmissionChecklist {
  id: string
  label: string
  checked: boolean
}

const defaultChecklist: SubmissionChecklist[] = [
  { id: 'c1', label: '剧本总集数达到80集以上', checked: true },
  { id: 'c2', label: '前10集内容完整精彩', checked: true },
  { id: 'c3', label: '人物小传已完成', checked: false },
  { id: 'c4', label: '大纲主线清晰', checked: false },
  { id: 'c5', label: '付费卡点位置已规划', checked: false },
  { id: 'c6', label: '剧本格式规范（场景、对白、旁白）', checked: false },
  { id: 'c7', label: '对白口语化', checked: false },
  { id: 'c8', label: '已通读检查错别字', checked: false },
  { id: 'c9', label: '题材符合目标平台需求', checked: false },
  { id: 'c10', label: '投稿邮件格式规范', checked: false }
]

interface SubmissionProgressProps {
  isOpen: boolean
  onClose: () => void
}

export default function SubmissionProgress({ isOpen, onClose }: SubmissionProgressProps) {
  const [steps, setSteps] = useState<SubmissionStep[]>(defaultSteps)
  const [checklist, setChecklist] = useState<SubmissionChecklist[]>(defaultChecklist)
  const [expandedStep, setExpandedStep] = useState<number | null>(null)

  const completedCount = steps.filter(s => s.status === 'completed').length
  const progress = Math.round((completedCount / steps.length) * 100)

  const toggleChecklist = (id: string) => {
    setChecklist(prev =>
      prev.map(item => item.id === id ? { ...item, checked: !item.checked } : item)
    )
  }

  const checkedCount = checklist.filter(c => c.checked).length

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl w-full max-w-5xl max-h-[90vh] overflow-hidden shadow-2xl">
        {/* 头部 */}
        <div className="bg-gradient-to-r from-[#14B8A6] to-[#0D9488] text-white p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                <Target className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-xl font-bold">投稿全流程指南</h2>
                <p className="text-white/80 text-sm">从准备到签约，一站式了解投稿流程</p>
              </div>
            </div>
            <Button
              onClick={onClose}
              variant="ghost"
              className="text-white hover:bg-white/10"
            >
              关闭
            </Button>
          </div>

          {/* 进度概览 */}
          <div className="mt-4 grid grid-cols-3 gap-4">
            <div className="bg-white/10 rounded-lg p-3 text-center">
              <div className="text-2xl font-bold">{completedCount}/{steps.length}</div>
              <div className="text-sm text-white/80">完成步骤</div>
            </div>
            <div className="bg-white/10 rounded-lg p-3 text-center">
              <div className="text-2xl font-bold">{checkedCount}/{checklist.length}</div>
              <div className="text-sm text-white/80">检查清单</div>
            </div>
            <div className="bg-white/10 rounded-lg p-3 text-center">
              <div className="text-2xl font-bold">{progress}%</div>
              <div className="text-sm text-white/80">整体进度</div>
            </div>
          </div>
        </div>

        {/* 内容区域 */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-220px)]">
          <Tabs defaultValue="steps" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="steps">流程步骤</TabsTrigger>
              <TabsTrigger value="platforms">平台选择</TabsTrigger>
              <TabsTrigger value="checklist">投稿清单</TabsTrigger>
            </TabsList>

            {/* 流程步骤 */}
            <TabsContent value="steps" className="space-y-4 mt-4">
              {steps.map((step, index) => (
                <div
                  key={step.id}
                  className={`border rounded-xl overflow-hidden transition-all ${
                    step.status === 'completed' ? 'border-green-200 bg-green-50/30' :
                    step.status === 'in_progress' ? 'border-[#0D9488]/50 bg-[#0D9488]/5' :
                    'border-slate-200'
                  }`}
                >
                  <button
                    onClick={() => setExpandedStep(expandedStep === step.id ? null : step.id)}
                    className="w-full p-4 flex items-center gap-4 text-left"
                  >
                    {/* 状态图标 */}
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                      step.status === 'completed' ? 'bg-green-500 text-white' :
                      step.status === 'in_progress' ? 'bg-[#0D9488] text-white' :
                      step.status === 'error' ? 'bg-red-500 text-white' :
                      'bg-slate-100 text-slate-400'
                    }`}>
                      {step.status === 'completed' ? (
                        <CheckCircle className="w-5 h-5" />
                      ) : step.status === 'in_progress' ? (
                        <Clock className="w-5 h-5" />
                      ) : (
                        <Circle className="w-5 h-5" />
                      )}
                    </div>

                    {/* 步骤信息 */}
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-slate-400">步骤 {step.id}</span>
                        <Badge className={
                          step.status === 'completed' ? 'bg-green-100 text-green-700' :
                          step.status === 'in_progress' ? 'bg-[#0D9488]/10 text-[#0D9488]' :
                          'bg-slate-100 text-slate-600'
                        }>
                          {step.status === 'completed' ? '已完成' :
                           step.status === 'in_progress' ? '进行中' :
                           step.status === 'error' ? '有问题' : '待开始'}
                        </Badge>
                      </div>
                      <h4 className="font-medium text-[#134E4A] mt-1">{step.title}</h4>
                      <p className="text-sm text-slate-500">{step.description}</p>
                    </div>

                    {/* 展开箭头 */}
                    {expandedStep === step.id ? (
                      <ChevronDown className="w-5 h-5 text-slate-400" />
                    ) : (
                      <ChevronRight className="w-5 h-5 text-slate-400" />
                    )}
                  </button>

                  {/* 展开详情 */}
                  {expandedStep === step.id && (
                    <div className="px-4 pb-4 bg-white/50">
                      <div className="space-y-3">
                        <div>
                          <p className="text-sm font-medium text-slate-700 mb-2">具体内容：</p>
                          <ul className="space-y-1">
                            {step.details.map((detail, i) => (
                              <li key={i} className="text-sm text-slate-600 flex items-center gap-2">
                                <CheckCircle className="w-4 h-4 text-[#0D9488]" />
                                {detail}
                              </li>
                            ))}
                          </ul>
                        </div>
                        {step.tips && step.tips.length > 0 && (
                          <div className="bg-amber-50 rounded-lg p-3">
                            <p className="text-sm font-medium text-amber-700 mb-1">小贴士：</p>
                            <ul className="space-y-1">
                              {step.tips.map((tip, i) => (
                                <li key={i} className="text-sm text-amber-600">
                                  • {tip}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </TabsContent>

            {/* 平台选择 */}
            <TabsContent value="platforms" className="space-y-4 mt-4">
              <Card className="border-0 shadow-md bg-gradient-to-r from-blue-50 to-purple-50">
                <CardContent className="p-4">
                  <p className="text-sm text-slate-600">
                    <strong>提示：</strong>不同平台有不同的收稿偏好，选择与剧本题材匹配的平台可以大大提高过稿率。
                  </p>
                </CardContent>
              </Card>

              <div className="grid md:grid-cols-2 gap-4">
                {platforms.map((platform, index) => (
                  <Card key={index} className="border-0 shadow-md hover:shadow-lg transition-shadow">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 bg-[#0D9488]/10 rounded-xl flex items-center justify-center">
                            <Building className="w-6 h-6 text-[#0D9488]" />
                          </div>
                          <div>
                            <h4 className="font-bold text-[#134E4A]">{platform.name}</h4>
                            <p className="text-xs text-slate-500">{platform.commission}</p>
                          </div>
                        </div>
                        <Button 
                          size="sm" 
                          variant="outline" 
                          className="border-[#0D9488] text-[#0D9488]"
                          onClick={() => window.open(platform.url, '_blank')}
                        >
                          <ExternalLink className="w-3 h-3 mr-1" /> 官网
                        </Button>
                      </div>

                      <div className="space-y-2">
                        <div>
                          <p className="text-xs text-slate-500 mb-1">偏好题材：</p>
                          <div className="flex flex-wrap gap-1">
                            {platform.genres.map((genre, i) => (
                              <Badge key={i} className="text-xs bg-[#0D9488]/10 text-[#0D9488]">
                                {genre}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        <div>
                          <p className="text-xs text-slate-500">平台优势：</p>
                          <p className="text-sm text-slate-700">{platform.advantage}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* 投稿清单 */}
            <TabsContent value="checklist" className="space-y-4 mt-4">
              <Card className="border-0 shadow-md bg-gradient-to-r from-green-50 to-emerald-50">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-sm font-medium text-slate-700">投稿前检查清单</p>
                    <p className="text-sm font-bold text-green-600">{checkedCount}/{checklist.length} 已完成</p>
                  </div>
                  <Progress value={(checkedCount / checklist.length) * 100} className="h-2" />
                </CardContent>
              </Card>

              <Card className="border-0 shadow-md">
                <CardContent className="p-4">
                  <div className="space-y-3">
                    {checklist.map((item) => (
                      <label
                        key={item.id}
                        className="flex items-start gap-3 cursor-pointer p-2 rounded-lg hover:bg-slate-50 transition-colors"
                      >
                        <input
                          type="checkbox"
                          checked={item.checked}
                          onChange={() => toggleChecklist(item.id)}
                          className="mt-1 w-5 h-5 rounded border-slate-300 text-[#0D9488] focus:ring-[#0D9488]"
                        />
                        <span className={`text-sm ${
                          item.checked ? 'text-green-700 line-through' : 'text-slate-700'
                        }`}>
                          {item.label}
                        </span>
                      </label>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {checkedCount === checklist.length && (
                <Card className="border-0 shadow-md bg-green-50">
                  <CardContent className="p-4 flex items-center gap-3">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                      <Award className="w-6 h-6 text-green-600" />
                    </div>
                    <div>
                      <h4 className="font-bold text-green-700">准备就绪！</h4>
                      <p className="text-sm text-green-600">你已经完成了所有投稿检查，可以开始投稿了。</p>
                    </div>
                  </CardContent>
                </Card>
              )}
            </TabsContent>
          </Tabs>
        </div>

        {/* 底部操作 */}
        <div className="p-4 border-t bg-slate-50 flex items-center justify-between">
          <div className="text-sm text-slate-500">
            <MessageSquare className="w-4 h-4 inline mr-1" />
            有问题？联系平台编辑或查看帮助中心
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="border-[#0D9488] text-[#0D9488]">
              保存进度
            </Button>
            <Button className="bg-[#0D9488] hover:bg-[#0F766E]">
              <Send className="w-4 h-4 mr-1" /> 开始投稿
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
