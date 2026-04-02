import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import {
  Compass,
  Play,
  FileText,
  Send,
  Award,
  ChevronRight,
  ChevronLeft,
  X,
  Sparkles,
  Target,
  Lightbulb,
  CheckCircle,
  Rocket,
  BookOpen,
  MessageCircle,
  Star
} from 'lucide-react'

interface GuideStep {
  id: string
  title: string
  description: string
  icon: React.ReactNode
  link?: string
  linkLabel?: string
  tips?: string[]
}

const guideSteps: GuideStep[] = [
  {
    id: '1',
    title: '了解短剧剧本格式',
    description: '短剧剧本有独特的格式要求，包括场景描写、对白格式、旁白等。掌握这些基础才能创作出合格的剧本。',
    icon: <BookOpen className="w-6 h-6" />,
    link: '/learning',
    linkLabel: '去学习',
    tips: [
      '场景描写：用括号包裹，如【客厅】',
      '对白格式：角色名 + 冒号 + 台词',
      '每集字数控制在800-1200字'
    ]
  },
  {
    id: '2',
    title: '创建你的第一部剧本',
    description: '点击新建剧本，选择题材类型，开始你的创作之旅。我们提供多种题材模板供你参考。',
    icon: <FileText className="w-6 h-6" />,
    link: '/editor',
    linkLabel: '开始创作',
    tips: [
      '建议从80-100集开始练手',
      '选择热门题材更容易过稿',
      '先写大纲再写正文'
    ]
  },
  {
    id: '3',
    title: '完成大纲和人设',
    description: '在动笔之前，先完善你的大纲和人设。大纲决定故事走向，人设让角色更立体。',
    icon: <Target className="w-6 h-6" />,
    link: '/editor',
    linkLabel: '完善大纲',
    tips: [
      '大纲包含：核心冲突、起承转合',
      '人设包含：外在特征、内心动机',
      '付费卡点位置要提前规划'
    ]
  },
  {
    id: '4',
    title: '使用AI辅助创作',
    description: '我们的AI助手可以帮助你优化对白、生成剧情灵感、检查剧本格式等。',
    icon: <Sparkles className="w-6 h-6" />,
    link: '/ai-assistant',
    linkLabel: '使用AI助手',
    tips: [
      '可以帮你生成剧情灵感',
      '可以优化对白使其更自然',
      '可以检查格式是否规范'
    ]
  },
  {
    id: '5',
    title: '评估和优化剧本',
    description: '完成初稿后，使用剧本评估工具检查剧本质量，获取专业的优化建议。',
    icon: <Lightbulb className="w-6 h-6" />,
    link: '#',
    linkLabel: '立即评估',
    tips: [
      '评估包括：开篇钩子、剧情结构',
      '人物塑造、情感共鸣、市场潜力',
      '根据建议优化后再投稿'
    ]
  },
  {
    id: '6',
    title: '投稿并获取收益',
    description: '当剧本达到投稿标准后，选择合适的平台进行投稿。签约成功即可获得收益！',
    icon: <Send className="w-6 h-6" />,
    link: '/submission',
    linkLabel: '了解投稿',
    tips: [
      '不同平台有不同的收稿偏好',
      '准备好完整剧本更容易过稿',
      '关注平台的审核周期'
    ]
  }
]

const achievements = [
  { id: 'first_script', label: '完成第一部剧本', icon: <FileText className="w-4 h-4" />, earned: false },
  { id: 'outline', label: '完成大纲', icon: <Target className="w-4 h-4" />, earned: false },
  { id: 'ten_episodes', label: '完成10集', icon: <Play className="w-4 h-4" />, earned: false },
  { id: 'first_submit', label: '首次投稿', icon: <Send className="w-4 h-4" />, earned: false }
]

interface OnboardingGuideProps {
  isNewUser?: boolean
  onComplete?: () => void
}

export default function OnboardingGuide({ isNewUser = false, onComplete }: OnboardingGuideProps) {
  const [isOpen, setIsOpen] = useState(false) // 默认关闭，由父组件控制
  const [currentStep, setCurrentStep] = useState(0)
  const [completedSteps, setCompletedSteps] = useState<string[]>([])
  const [showFloating, setShowFloating] = useState(false) // 默认不显示浮动按钮

  // 当 isNewUser 变为 true 时打开弹窗
  useEffect(() => {
    if (isNewUser) {
      setIsOpen(true)
    }
  }, [isNewUser])

  const progress = (completedSteps.length / guideSteps.length) * 100

  const toggleStep = (stepId: string) => {
    setCompletedSteps(prev =>
      prev.includes(stepId) ? prev.filter(id => id !== stepId) : [...prev, stepId]
    )
  }

  const nextStep = () => {
    if (currentStep < guideSteps.length - 1) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const completeGuide = () => {
    setIsOpen(false)
    setShowFloating(true)
    onComplete?.()
  }

  const currentGuideStep = guideSteps[currentStep]

  // 浮动提示按钮
  if (!isOpen && showFloating) {
    return (
      <div className="fixed bottom-6 right-6 z-40">
        <Card className="border-0 shadow-xl bg-gradient-to-r from-[#0D9488] to-[#134E4A] text-white w-64">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Rocket className="w-5 h-5" />
                <span className="font-medium">新手任务</span>
              </div>
              <button
                onClick={() => setShowFloating(false)}
                className="text-white/60 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <Progress value={progress} className="h-2 mb-2 bg-white/20" />
            <p className="text-sm text-white/80 mb-3">
              完成 {completedSteps.length}/{guideSteps.length} 个任务
            </p>
            <div className="flex flex-wrap gap-1 mb-3">
              {achievements.map(ach => (
                <Badge
                  key={ach.id}
                  className={`text-xs ${
                    completedSteps.includes(ach.id)
                      ? 'bg-white/30 text-white'
                      : 'bg-white/10 text-white/60'
                  }`}
                >
                  {ach.label}
                </Badge>
              ))}
            </div>
            <Button
              onClick={() => setIsOpen(true)}
              className="w-full bg-white text-[#0D9488] hover:bg-white/90"
              size="sm"
            >
              继续学习 <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden shadow-2xl">
        {/* 头部 */}
        <div className="bg-gradient-to-r from-[#0D9488] to-[#134E4A] text-white p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                <Compass className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-xl font-bold">新手创作指南</h2>
                <p className="text-white/80 text-sm">完成以下步骤，快速成为短剧编剧</p>
              </div>
            </div>
            <button
              onClick={completeGuide}
              className="p-2 hover:bg-white/10 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* 进度条 */}
          <div className="mt-4">
            <div className="flex items-center justify-between text-sm text-white/80 mb-2">
              <span>学习进度</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <Progress value={progress} className="h-2 bg-white/20" />
          </div>

          {/* 步骤导航 */}
          <div className="flex gap-2 mt-4 overflow-x-auto pb-1">
            {guideSteps.map((step, index) => (
              <button
                key={step.id}
                onClick={() => setCurrentStep(index)}
                className={`flex-shrink-0 px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
                  index === currentStep
                    ? 'bg-white text-[#0D9488]'
                    : completedSteps.includes(step.id)
                    ? 'bg-white/30 text-white'
                    : 'bg-white/10 text-white/70 hover:bg-white/20'
                }`}
              >
                {index + 1}. {step.title.slice(0, 6)}
              </button>
            ))}
          </div>
        </div>

        {/* 内容区域 */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
          <div className="grid lg:grid-cols-2 gap-6">
            {/* 左侧：当前步骤详情 */}
            <div className="space-y-4">
              <Card className="border-0 shadow-lg bg-gradient-to-br from-slate-50 to-slate-100">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-14 h-14 bg-[#0D9488]/10 rounded-xl flex items-center justify-center text-[#0D9488]">
                      {currentGuideStep.icon}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <Badge className="bg-[#0D9488]/10 text-[#0D9488]">
                          第{currentStep + 1}步
                        </Badge>
                        {completedSteps.includes(currentGuideStep.id) && (
                          <Badge className="bg-green-100 text-green-700">
                            <CheckCircle className="w-3 h-3 mr-1" /> 已完成
                          </Badge>
                        )}
                      </div>
                      <h3 className="text-lg font-bold text-[#134E4A] mt-1">
                        {currentGuideStep.title}
                      </h3>
                    </div>
                  </div>

                  <p className="text-slate-600 mb-4">
                    {currentGuideStep.description}
                  </p>

                  {currentGuideStep.tips && (
                    <div className="bg-white rounded-lg p-4">
                      <h4 className="font-medium text-[#134E4A] mb-2 flex items-center gap-2">
                        <Lightbulb className="w-4 h-4 text-amber-500" />
                        小贴士
                      </h4>
                      <ul className="space-y-2">
                        {currentGuideStep.tips.map((tip, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm text-slate-600">
                            <span className="text-[#0D9488]">•</span>
                            {tip}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {currentGuideStep.link && (
                    <Link to={currentGuideStep.link}>
                      <Button className="w-full mt-4 bg-[#0D9488] hover:bg-[#0F766E]">
                        {currentGuideStep.linkLabel} <ChevronRight className="w-4 h-4 ml-2" />
                      </Button>
                    </Link>
                  )}
                </CardContent>
              </Card>

              {/* 导航按钮 */}
              <div className="flex items-center justify-between">
                <Button
                  variant="outline"
                  onClick={prevStep}
                  disabled={currentStep === 0}
                  className="border-[#0D9488] text-[#0D9488]"
                >
                  <ChevronLeft className="w-4 h-4 mr-1" /> 上一步
                </Button>
                <Button
                  onClick={() => toggleStep(currentGuideStep.id)}
                  variant="outline"
                  className={`border-[#0D9488] ${
                    completedSteps.includes(currentGuideStep.id)
                      ? 'bg-green-50 text-green-700 border-green-500'
                      : 'text-[#0D9488]'
                  }`}
                >
                  <CheckCircle className="w-4 h-4 mr-1" />
                  {completedSteps.includes(currentGuideStep.id) ? '已标记完成' : '标记完成'}
                </Button>
                {currentStep < guideSteps.length - 1 ? (
                  <Button
                    onClick={nextStep}
                    className="bg-[#0D9488] hover:bg-[#0F766E]"
                  >
                    下一步 <ChevronRight className="w-4 h-4 ml-1" />
                  </Button>
                ) : (
                  <Button
                    onClick={completeGuide}
                    className="bg-[#F97316] hover:bg-[#EA580C]"
                  >
                    <Star className="w-4 h-4 mr-1" /> 完成引导
                  </Button>
                )}
              </div>
            </div>

            {/* 右侧：任务列表 */}
            <div className="space-y-4">
              <Card className="border-0 shadow-md">
                <CardHeader>
                  <CardTitle className="text-[#134E4A] flex items-center gap-2">
                    <Award className="w-5 h-5 text-[#F97316]" />
                    任务清单
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {guideSteps.map((step, index) => (
                      <div
                        key={step.id}
                        className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-all ${
                          index === currentStep
                            ? 'bg-[#0D9488]/10 border border-[#0D9488]/30'
                            : 'hover:bg-slate-50'
                        }`}
                        onClick={() => setCurrentStep(index)}
                      >
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                            completedSteps.includes(step.id)
                              ? 'bg-green-100 text-green-600'
                              : index === currentStep
                              ? 'bg-[#0D9488] text-white'
                              : 'bg-slate-100 text-slate-400'
                          }`}
                        >
                          {completedSteps.includes(step.id) ? (
                            <CheckCircle className="w-4 h-4" />
                          ) : (
                            <span className="text-sm font-medium">{index + 1}</span>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className={`font-medium ${
                            completedSteps.includes(step.id) ? 'text-green-700' : 'text-slate-700'
                          }`}>
                            {step.title}
                          </p>
                          <p className="text-xs text-slate-500 truncate">{step.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* 成就预览 */}
              <Card className="border-0 shadow-md bg-gradient-to-r from-amber-50 to-orange-50">
                <CardHeader>
                  <CardTitle className="text-[#134E4A] text-base flex items-center gap-2">
                    <Star className="w-5 h-5 text-amber-500" />
                    完成后解锁成就
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-3">
                    {achievements.map(ach => (
                      <div
                        key={ach.id}
                        className={`flex items-center gap-2 p-2 rounded-lg ${
                          completedSteps.includes(ach.id)
                            ? 'bg-white/80'
                            : 'bg-white/50 opacity-60'
                        }`}
                      >
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center ${
                            completedSteps.includes(ach.id)
                              ? 'bg-amber-100 text-amber-600'
                              : 'bg-slate-100 text-slate-400'
                          }`}
                        >
                          {ach.icon}
                        </div>
                        <span className={`text-sm ${
                          completedSteps.includes(ach.id) ? 'text-slate-700' : 'text-slate-500'
                        }`}>
                          {ach.label}
                        </span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
