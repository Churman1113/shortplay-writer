import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  BookOpen,
  FileText,
  Lightbulb,
  AlertTriangle,
  ArrowRight,
  CheckCircle,
  Play,
  Clock,
  Star,
  Target,
  Users,
  Zap,
  MessageCircle,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  Book,
  Scroll,
  Video
} from 'lucide-react'

interface Lesson {
  id: string
  title: string
  duration: string
  type: 'video' | 'article' | 'guide'
  completed: boolean
  description: string
}

interface GlossaryItem {
  term: string
  definition: string
  example?: string
}

const basicsLessons: Lesson[] = [
  { id: 'b1', title: '什么是短剧剧本', duration: '5分钟', type: 'video', completed: true, description: '了解短剧的定义和特点' },
  { id: 'b2', title: '短剧剧本的标准格式', duration: '10分钟', type: 'video', completed: true, description: '学习场景、对白、旁白的规范写法' },
  { id: 'b3', title: '单集字数与时长的关系', duration: '3分钟', type: 'article', completed: false, description: '800-1200字约等于1-2分钟' },
  { id: 'b4', title: '付费卡点概念解析', duration: '8分钟', type: 'article', completed: false, description: '什么是付费卡点，如何设置' }
]

const creationLessons: Lesson[] = [
  { id: 'c1', title: '如何写一个吸引人的大纲', duration: '15分钟', type: 'video', completed: false, description: '大纲是剧本的骨架，决定故事走向' },
  { id: 'c2', title: '人物小传写法', duration: '12分钟', type: 'article', completed: false, description: '主角、配角、反派的人设设计' },
  { id: 'c3', title: '开篇钩子设计技巧', duration: '10分钟', type: 'video', completed: false, description: '前3集如何抓住观众眼球' },
  { id: 'c4', title: '爽点与虐点的节奏设计', duration: '8分钟', type: 'article', completed: false, description: '如何让观众又爱又恨' }
]

const genreLessons: Lesson[] = [
  { id: 'g1', title: '甜宠剧写作指南', duration: '20分钟', type: 'guide', completed: false, description: '高糖剧情设计，CP感营造' },
  { id: 'g2', title: '战神/赘婿剧写作指南', duration: '20分钟', type: 'guide', completed: false, description: '男频爽文改编技巧' },
  { id: 'g3', title: '重生复仇剧写作指南', duration: '20分钟', type: 'guide', completed: false, description: '重生设定的核心爽点' },
  { id: 'g4', title: '萌宝/闪婚剧写作指南', duration: '15分钟', type: 'guide', completed: false, description: '甜宠变种，差异化写法' }
]

const pitfalls = [
  {
    title: '开篇节奏太慢',
    description: '用大量篇幅描写背景、铺垫日常',
    solution: '前3集必须出现核心冲突或悬念',
    severity: 'high'
  },
  {
    title: '对白过于书面化',
    description: '角色说话像在念课文，不像正常人',
    solution: '口语化表达，多用短句',
    severity: 'high'
  },
  {
    title: '付费点设置不当',
    description: '卡点太早流失观众，太晚影响收益',
    solution: '第8-12集设第一个卡点，悬念要强',
    severity: 'medium'
  },
  {
    title: '人物动机不清晰',
    description: '角色行为没有合理原因',
    solution: '每个重要行为都要有动机支撑',
    severity: 'medium'
  },
  {
    title: '剧情过于平淡',
    description: '缺乏冲突，没有让观众期待的点',
    solution: '每集结尾设置悬念，吸引继续看',
    severity: 'high'
  }
]

const glossary: GlossaryItem[] = [
  {
    term: '付费卡点',
    definition: '用户需要付费才能继续观看的剧情节点，通常设置在高潮或悬念处。',
    example: '第10集主角即将揭露真相，却戛然而止，用户必须付费才能看到'
  },
  {
    term: '开篇钩子',
    definition: '在前几集内快速抓住观众注意力的设计，可以是强冲突、悬念或震撼场景。',
    example: '开篇即展示主角重生回到关键时间节点'
  },
  {
    term: '爽点',
    definition: '让观众感到痛快、满足的剧情设计，如主角逆袭、打脸反派等。',
    example: '废物赘婿身份曝光，众人震惊'
  },
  {
    term: '虐点',
    definition: '让观众感到心疼、难受的剧情，通常是主角的悲惨遭遇。',
    example: '女主被陷害入狱，男主被迫离开'
  },
  {
    term: '人物小传',
    definition: '记录角色背景、性格、动机等的文档，是塑造角色的基础。',
    example: '姓名、年龄、外貌、性格、背景故事、与其他角色的关系'
  },
  {
    term: '起承转合',
    definition: '故事结构的四个阶段：起因、发展、高潮、结局。',
    example: '起：主角遭遇变故；承：陷入困境；转：获得转机；合：达成目标'
  }
]

const stepByStepGuide = [
  {
    step: 1,
    title: '确定题材',
    description: '选择你想要创作的题材类型',
    tips: ['甜宠、战神、重生、古装等', '选择自己熟悉的领域', '考虑市场热门题材']
  },
  {
    step: 2,
    title: '构思大纲',
    description: '设计故事主线和核心冲突',
    tips: ['确定主线剧情', '规划起承转合', '设置3-5个关键转折点']
  },
  {
    step: 3,
    title: '设计人物',
    description: '为主角、配角、反派编写人设',
    tips: ['主角要有爽点和痛点', '反派要足够讨厌', '配角要有功能性']
  },
  {
    step: 4,
    title: '规划卡点',
    description: '确定付费卡点位置',
    tips: ['第1卡点：8-12集', '第2卡点：30集左右', '第3卡点：60集左右']
  },
  {
    step: 5,
    title: '开始写作',
    description: '按照大纲分集创作剧本',
    tips: ['每集约800-1200字', '注意格式规范', '每集结尾留悬念']
  },
  {
    step: 6,
    title: '修改完善',
    description: '完成后通读检查并优化',
    tips: ['检查格式错误', '优化对白', '加强冲突设计']
  }
]

export default function NewbieLearning() {
  const [expandedPitfall, setExpandedPitfall] = useState<string | null>(null)
  const [expandedGlossary, setExpandedGlossary] = useState<string | null>(null)

  const getTotalProgress = () => {
    const all = [...basicsLessons, ...creationLessons, ...genreLessons]
    const completed = all.filter(l => l.completed).length
    return Math.round((completed / all.length) * 100)
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'video': return <Play className="w-4 h-4" />
      case 'article': return <Book className="w-4 h-4" />
      case 'guide': return <Scroll className="w-4 h-4" />
      default: return <FileText className="w-4 h-4" />
    }
  }

  const getTypeBadge = (type: string) => {
    switch (type) {
      case 'video': return <Badge className="bg-red-100 text-red-700">视频</Badge>
      case 'article': return <Badge className="bg-blue-100 text-blue-700">文章</Badge>
      case 'guide': return <Badge className="bg-purple-100 text-purple-700">指南</Badge>
      default: return null
    }
  }

  return (
    <div className="p-4 lg:p-8 max-w-7xl mx-auto">
      {/* 头部 */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-12 h-12 bg-[#0D9488]/10 rounded-xl flex items-center justify-center">
            <BookOpen className="w-6 h-6 text-[#0D9488]" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-[#134E4A]">新手学习专区</h1>
            <p className="text-slate-600">从零开始，成为短剧编剧</p>
          </div>
        </div>

        {/* 总体进度 */}
        <Card className="mt-4 border-0 shadow-md bg-gradient-to-r from-[#0D9488]/5 to-transparent">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-slate-700">学习进度</span>
              <span className="text-sm font-bold text-[#0D9488]">{getTotalProgress()}%</span>
            </div>
            <Progress value={getTotalProgress()} className="h-2" />
            <p className="text-xs text-slate-500 mt-2">
              已完成 {basicsLessons.filter(l => l.completed).length + creationLessons.filter(l => l.completed).length} 节课
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="basics" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="basics">基础知识</TabsTrigger>
          <TabsTrigger value="creation">创作技巧</TabsTrigger>
          <TabsTrigger value="guide">分步指南</TabsTrigger>
          <TabsTrigger value="glossary">术语表</TabsTrigger>
        </TabsList>

        {/* 基础知识 */}
        <TabsContent value="basics" className="space-y-6 mt-6">
          {/* 必读内容 */}
          <Card className="border-0 shadow-md bg-gradient-to-r from-amber-50 to-orange-50">
            <CardHeader>
              <CardTitle className="text-[#134E4A] flex items-center gap-2">
                <Star className="w-5 h-5 text-amber-500" />
                新手必读
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="bg-white rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <FileText className="w-5 h-5 text-[#0D9488]" />
                    <h4 className="font-medium text-[#134E4A]">剧本格式规范</h4>
                  </div>
                  <p className="text-sm text-slate-600 mb-2">掌握标准格式是创作的第一步</p>
                  <Badge className="bg-green-100 text-green-700">已完成</Badge>
                </div>
                <div className="bg-white rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Clock className="w-5 h-5 text-[#F97316]" />
                    <h4 className="font-medium text-[#134E4A]">付费卡点概念</h4>
                  </div>
                  <p className="text-sm text-slate-600 mb-2">理解变现核心，优化收益</p>
                  <Badge className="bg-slate-100 text-slate-600">未完成</Badge>
                </div>
                <div className="bg-white rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Zap className="w-5 h-5 text-[#8B5CF6]" />
                    <h4 className="font-medium text-[#134E4A]">开篇钩子设计</h4>
                  </div>
                  <p className="text-sm text-slate-600 mb-2">前3集定生死，必须精彩</p>
                  <Badge className="bg-slate-100 text-slate-600">未完成</Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 避坑指南 */}
          <Card className="border-0 shadow-md">
            <CardHeader>
              <CardTitle className="text-[#134E4A] flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-red-500" />
                新手避坑指南
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {pitfalls.map((pitfall, index) => (
                  <div
                    key={index}
                    className={`border rounded-lg overflow-hidden ${
                      pitfall.severity === 'high' ? 'border-red-200' : 'border-amber-200'
                    }`}
                  >
                    <button
                      onClick={() => setExpandedPitfall(pitfall.title)}
                      className="w-full p-4 flex items-center justify-between text-left hover:bg-slate-50 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          pitfall.severity === 'high' ? 'bg-red-100 text-red-600' : 'bg-amber-100 text-amber-600'
                        }`}>
                          <AlertTriangle className="w-4 h-4" />
                        </div>
                        <div>
                          <h4 className="font-medium text-[#134E4A]">{pitfall.title}</h4>
                          <p className="text-sm text-slate-500">{pitfall.description}</p>
                        </div>
                      </div>
                      {expandedPitfall === pitfall.title ? (
                        <ChevronUp className="w-5 h-5 text-slate-400" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-slate-400" />
                      )}
                    </button>
                    {expandedPitfall === pitfall.title && (
                      <div className="px-4 pb-4 bg-green-50/50">
                        <p className="text-sm text-green-700">
                          <strong>解决方案：</strong>{pitfall.solution}
                        </p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* 课程列表 */}
          <Card className="border-0 shadow-md">
            <CardHeader>
              <CardTitle className="text-[#134E4A]">入门课程</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {basicsLessons.map((lesson) => (
                  <div
                    key={lesson.id}
                    className="flex items-center gap-4 p-4 rounded-lg bg-slate-50 hover:bg-slate-100 transition-colors cursor-pointer"
                  >
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                      lesson.completed ? 'bg-green-100 text-green-600' : 'bg-[#0D9488]/10 text-[#0D9488]'
                    }`}>
                      {lesson.completed ? (
                        <CheckCircle className="w-6 h-6" />
                      ) : (
                        getTypeIcon(lesson.type)
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className={`font-medium ${lesson.completed ? 'text-green-700' : 'text-[#134E4A]'}`}>
                          {lesson.title}
                        </h4>
                        {getTypeBadge(lesson.type)}
                      </div>
                      <p className="text-sm text-slate-500">{lesson.description}</p>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-slate-500">
                      <Clock className="w-4 h-4" />
                      {lesson.duration}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* 创作技巧 */}
        <TabsContent value="creation" className="space-y-6 mt-6">
          <Card className="border-0 shadow-md">
            <CardHeader>
              <CardTitle className="text-[#134E4A]">创作技巧课程</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                {creationLessons.map((lesson) => (
                  <div
                    key={lesson.id}
                    className="p-4 rounded-lg bg-slate-50 hover:bg-slate-100 transition-colors cursor-pointer border border-transparent hover:border-[#0D9488]/20"
                  >
                    <div className="flex items-start gap-3">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${
                        lesson.type === 'video' ? 'bg-red-100 text-red-600' : 'bg-blue-100 text-blue-600'
                      }`}>
                        {getTypeIcon(lesson.type)}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-medium text-[#134E4A]">{lesson.title}</h4>
                          {lesson.completed && <CheckCircle className="w-4 h-4 text-green-500" />}
                        </div>
                        <p className="text-sm text-slate-500 mb-2">{lesson.description}</p>
                        <div className="flex items-center gap-2">
                          {getTypeBadge(lesson.type)}
                          <span className="text-xs text-slate-400">{lesson.duration}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* 题材指南 */}
          <Card className="border-0 shadow-md">
            <CardHeader>
              <CardTitle className="text-[#134E4A]">题材写作指南</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                {genreLessons.map((lesson) => (
                  <div
                    key={lesson.id}
                    className="p-4 rounded-lg bg-purple-50/50 hover:bg-purple-50 transition-colors cursor-pointer"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <Scroll className="w-5 h-5 text-purple-600" />
                      <h4 className="font-medium text-[#134E4A]">{lesson.title}</h4>
                    </div>
                    <p className="text-sm text-slate-600">{lesson.description}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* 分步指南 */}
        <TabsContent value="guide" className="space-y-6 mt-6">
          <Card className="border-0 shadow-md bg-gradient-to-r from-[#0D9488]/5 to-transparent">
            <CardHeader>
              <CardTitle className="text-[#134E4A]">分步创作指南</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-slate-600 mb-6">
                按照以下步骤，从零开始完成你的第一部短剧剧本：
              </p>
              <div className="space-y-4">
                {stepByStepGuide.map((step, index) => (
                  <div key={index} className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div className="w-10 h-10 rounded-full bg-[#0D9488] text-white flex items-center justify-center font-bold">
                        {step.step}
                      </div>
                      {index < stepByStepGuide.length - 1 && (
                        <div className="w-0.5 h-full bg-[#0D9488]/20 mt-2" />
                      )}
                    </div>
                    <div className="flex-1 pb-6">
                      <h4 className="font-bold text-[#134E4A] mb-1">{step.title}</h4>
                      <p className="text-sm text-slate-600 mb-2">{step.description}</p>
                      <ul className="space-y-1">
                        {step.tips.map((tip, i) => (
                          <li key={i} className="text-sm text-slate-500 flex items-start gap-2">
                            <span className="text-[#0D9488]">•</span>
                            {tip}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Link to="/editor">
            <Button className="w-full bg-[#0D9488] hover:bg-[#0F766E]">
              <Play className="w-4 h-4 mr-2" /> 开始创作
            </Button>
          </Link>
        </TabsContent>

        {/* 术语表 */}
        <TabsContent value="glossary" className="space-y-6 mt-6">
          <Card className="border-0 shadow-md">
            <CardHeader>
              <CardTitle className="text-[#134E4A]">短剧编剧术语表</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {glossary.map((item, index) => (
                  <div
                    key={index}
                    className="border rounded-lg overflow-hidden"
                  >
                    <button
                      onClick={() => setExpandedGlossary(item.term)}
                      className="w-full p-4 flex items-center justify-between text-left hover:bg-slate-50 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <Book className="w-5 h-5 text-[#0D9488]" />
                        <h4 className="font-medium text-[#134E4A]">{item.term}</h4>
                      </div>
                      {expandedGlossary === item.term ? (
                        <ChevronUp className="w-5 h-5 text-slate-400" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-slate-400" />
                      )}
                    </button>
                    {expandedGlossary === item.term && (
                      <div className="px-4 pb-4 bg-slate-50">
                        <p className="text-sm text-slate-700 mb-2">{item.definition}</p>
                        {item.example && (
                          <div className="bg-white rounded-lg p-3">
                            <p className="text-xs font-medium text-slate-500 mb-1">示例：</p>
                            <p className="text-sm text-slate-600">{item.example}</p>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* 常见问题 */}
          <Card className="border-0 shadow-md bg-gradient-to-r from-blue-50 to-purple-50">
            <CardHeader>
              <CardTitle className="text-[#134E4A]">常见问题</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="bg-white rounded-lg p-4">
                  <h4 className="font-medium text-[#134E4A] mb-2">Q: 我没有任何写作经验，能学会吗？</h4>
                  <p className="text-sm text-slate-600">A: 当然可以！短剧剧本格式简单，套路清晰，只要认真学习教程并多加练习，就能写出合格的作品。</p>
                </div>
                <div className="bg-white rounded-lg p-4">
                  <h4 className="font-medium text-[#134E4A] mb-2">Q: 写一个完整的剧本需要多长时间？</h4>
                  <p className="text-sm text-slate-600">A: 视个人情况而定，一般来说，从大纲到完成80-100集的剧本，有经验的编剧需要2-4周，新手可能需要1-2个月。</p>
                </div>
                <div className="bg-white rounded-lg p-4">
                  <h4 className="font-medium text-[#134E4A] mb-2">Q: 投稿被拒了怎么办？</h4>
                  <p className="text-sm text-slate-600">A: 被拒是正常的，根据编辑反馈修改剧本，或者换一个平台投稿。也可以先学习优秀案例，提升自己的水平。</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
