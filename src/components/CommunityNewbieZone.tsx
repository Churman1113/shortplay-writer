import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ChevronRight } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  MessageCircle,
  Users,
  HelpCircle,
  Lightbulb,
  TrendingUp,
  Star,
  Shield,
  Send,
  ThumbsUp,
  Eye,
  Clock,
  ChevronRight as ChevronRightIcon,
  User,
  Award,
  BookOpen,
  Video,
  FileText
} from 'lucide-react'

interface Discussion {
  id: string
  title: string
  author: string
  authorType: '新手' | '达人' | '导师'
  content: string
  likes: number
  views: number
  replies: number
  timeAgo: string
  tags: string[]
  isPinned?: boolean
}

interface Question {
  id: string
  title: string
  author: string
  isAnonymous: boolean
  content: string
  status: 'pending' | 'answered' | 'resolved'
  answers: number
  views: number
  timeAgo: string
  category: string
}

const pinnedDiscussions: Discussion[] = [
  {
    id: '1',
    title: '【必读】新手投稿指南汇总贴',
    author: '官方助手',
    authorType: '导师',
    content: '整理了所有新手投稿相关的常见问题，包括平台选择、格式要求、签约流程等...',
    likes: 328,
    views: 5621,
    replies: 156,
    timeAgo: '置顶',
    tags: ['新手必读', '投稿指南'],
    isPinned: true
  },
  {
    id: '2',
    title: '短剧剧本格式规范（官方版）',
    author: '官方助手',
    authorType: '导师',
    content: '官方发布的剧本格式规范文档，包括场景描写、对白格式、旁白等详细说明...',
    likes: 256,
    views: 4892,
    replies: 89,
    timeAgo: '置顶',
    tags: ['格式规范', '官方']
  }
]

const recentDiscussions: Discussion[] = [
  {
    id: '3',
    title: '求助：第8集付费卡点怎么设置比较好？',
    author: '编剧小白123',
    authorType: '新手',
    content: '我是新手，刚写到第8集，不知道卡点应该怎么设置才能让用户付费继续看...',
    likes: 45,
    views: 234,
    replies: 23,
    timeAgo: '2小时前',
    tags: ['付费卡点', '求助']
  },
  {
    id: '4',
    title: '分享：我的第一部剧本签约经历',
    author: '追梦编剧',
    authorType: '达人',
    content: '从投稿到签约的全过程分享，包括平台选择、编辑沟通、签约细节等...',
    likes: 128,
    views: 892,
    replies: 45,
    timeAgo: '5小时前',
    tags: ['签约经历', '经验分享']
  },
  {
    id: '5',
    title: '战神题材的开篇钩子怎么写？',
    author: '编剧新人小李',
    authorType: '新手',
    content: '看了很多战神剧，但不知道怎么写开篇，有没有大佬指点一下？',
    likes: 34,
    views: 189,
    replies: 18,
    timeAgo: '1天前',
    tags: ['战神', '开篇钩子']
  }
]

const newbieQuestions: Question[] = [
  {
    id: 'q1',
    title: '短剧剧本每集字数控制在多少合适？',
    author: '匿名用户',
    isAnonymous: true,
    content: '刚入门，想问一下老编剧们，每集剧本大概写多少字比较好？',
    status: 'answered',
    answers: 5,
    views: 234,
    timeAgo: '3小时前',
    category: '格式规范'
  },
  {
    id: 'q2',
    title: '重生复仇题材有哪些雷区？',
    author: '编剧新手',
    isAnonymous: false,
    content: '想写一个重生复仇的剧本，但听说有些雷区需要注意，有没有大神指教？',
    status: 'pending',
    answers: 0,
    views: 156,
    timeAgo: '6小时前',
    category: '题材创作'
  },
  {
    id: 'q3',
    title: '编辑说我的对白太书面化怎么办？',
    author: '匿名用户',
    isAnonymous: true,
    content: '投稿被拒了，编辑说对白不够口语化，不知道怎么改...',
    status: 'resolved',
    answers: 8,
    views: 345,
    timeAgo: '1天前',
    category: '投稿问题'
  }
]

const weeklyTopics = [
  { title: '本周话题：如何写出爆款开篇？', replies: 89 },
  { title: '热议：甜宠vs战神，哪个更好写？', replies: 156 },
  { title: '分享你的创作日常', replies: 234 }
]

const mentors = [
  { name: '李编剧', title: '签约作家', scripts: 5, badges: ['金笔奖', '人气王'] },
  { name: '王编辑', title: '平台编辑', scripts: 0, badges: ['导师'] },
  { name: '张作者', title: '资深编剧', scripts: 12, badges: ['金笔奖', '连续创作30天'] }
]

export default function CommunityNewbieZone() {
  const [showNewPost, setShowNewPost] = useState(false)
  const [selectedTab, setSelectedTab] = useState('discussions')

  const getAuthorBadge = (type: string) => {
    switch (type) {
      case '导师': return <Badge className="bg-purple-100 text-purple-700">导师</Badge>
      case '达人': return <Badge className="bg-amber-100 text-amber-700">达人</Badge>
      default: return <Badge className="bg-slate-100 text-slate-600">新手</Badge>
    }
  }

  return (
    <div className="p-4 lg:p-6 max-w-7xl mx-auto space-y-5">
      {/* 顶部返回栏 */}
      <div className="flex items-center gap-3">
        <Link to="/dashboard">
          <Button variant="ghost" size="sm" className="gap-1">
            <ChevronRight className="w-4 h-4 rotate-180" />
            返回
          </Button>
        </Link>
        <div className="h-5 w-px bg-slate-200" />
        <h1 className="text-xl font-bold text-[#134E4A]">社区</h1>
      </div>

      {/* 头部 */}
      <div>
        <div className="flex items-center gap-3 mb-2">
          <div className="w-12 h-12 bg-[#8B5CF6]/10 rounded-xl flex items-center justify-center">
            <Users className="w-6 h-6 text-[#8B5CF6]" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-[#134E4A]">社区</h2>
            <p className="text-slate-600">与同行交流，共同成长</p>
          </div>
        </div>
      </div>

      {/* 新手专区入口 */}
      <Card className="mb-6 border-0 shadow-md bg-gradient-to-r from-purple-50 to-pink-50">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                <Lightbulb className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <h3 className="font-bold text-[#134E4A]">新手互助区</h3>
                <p className="text-sm text-slate-600">专门为新手开设的问答区域，可以匿名提问</p>
              </div>
            </div>
            <Button className="bg-purple-600 hover:bg-purple-700">
              进入新手区 <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          </div>
        </CardContent>
      </Card>

      <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="discussions">讨论</TabsTrigger>
          <TabsTrigger value="questions">问答</TabsTrigger>
          <TabsTrigger value="topics">话题</TabsTrigger>
          <TabsTrigger value="mentors">导师</TabsTrigger>
        </TabsList>

        {/* 讨论区 */}
        <TabsContent value="discussions" className="space-y-4 mt-4">
          {/* 置顶帖 */}
          {pinnedDiscussions.map((post) => (
            <Card key={post.id} className="border-0 shadow-md bg-amber-50/50">
              <CardContent className="p-4">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Star className="w-5 h-5 text-purple-600" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <Badge className="bg-amber-100 text-amber-700">置顶</Badge>
                      {post.tags.map((tag) => (
                        <Badge key={tag} className="bg-slate-100 text-slate-600">{tag}</Badge>
                      ))}
                    </div>
                    <h4 className="font-medium text-[#134E4A] hover:text-[#0D9488] cursor-pointer">
                      {post.title}
                    </h4>
                    <p className="text-sm text-slate-500 mt-1 line-clamp-2">{post.content}</p>
                    <div className="flex items-center gap-4 mt-2 text-xs text-slate-400">
                      <span>{post.author}</span>
                      <span>•</span>
                      <span>{post.likes} 赞</span>
                      <span>•</span>
                      <span>{post.replies} 回复</span>
                      <span>•</span>
                      <span>{post.views} 阅读</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}

          {/* 近期讨论 */}
          {recentDiscussions.map((post) => (
            <Card key={post.id} className="border-0 shadow-md hover:shadow-lg transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <User className="w-5 h-5 text-slate-400" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      {getAuthorBadge(post.authorType)}
                      {post.tags.map((tag) => (
                        <Badge key={tag} className="bg-[#0D9488]/10 text-[#0D9488]">{tag}</Badge>
                      ))}
                    </div>
                    <h4 className="font-medium text-[#134E4A] hover:text-[#0D9488] cursor-pointer">
                      {post.title}
                    </h4>
                    <p className="text-sm text-slate-500 mt-1 line-clamp-2">{post.content}</p>
                    <div className="flex items-center gap-4 mt-2 text-xs text-slate-400">
                      <span>{post.author}</span>
                      <span>•</span>
                      <span>{post.timeAgo}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 text-xs text-slate-400">
                    <div className="flex items-center gap-1">
                      <ThumbsUp className="w-3 h-3" /> {post.likes}
                    </div>
                    <div className="flex items-center gap-1">
                      <MessageCircle className="w-3 h-3" /> {post.replies}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}

          <Button
            onClick={() => setShowNewPost(true)}
            className="w-full bg-[#0D9488] hover:bg-[#0F766E]"
          >
            <MessageCircle className="w-4 h-4 mr-2" /> 发帖
          </Button>
        </TabsContent>

        {/* 问答区 */}
        <TabsContent value="questions" className="space-y-4 mt-4">
          <Card className="border-0 shadow-md bg-gradient-to-r from-purple-50 to-pink-50">
            <CardContent className="p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <HelpCircle className="w-6 h-6 text-purple-600" />
                <div>
                  <h4 className="font-medium text-[#134E4A]">新手问答区</h4>
                  <p className="text-sm text-slate-600">可以匿名提问，降低心理门槛</p>
                </div>
              </div>
              <Button variant="outline" className="border-purple-600 text-purple-600">
                <HelpCircle className="w-4 h-4 mr-1" /> 匿名提问
              </Button>
            </CardContent>
          </Card>

          {newbieQuestions.map((q) => (
            <Card key={q.id} className="border-0 shadow-md">
              <CardContent className="p-4">
                <div className="flex items-start gap-4">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                    q.status === 'resolved' ? 'bg-green-100' :
                    q.status === 'answered' ? 'bg-blue-100' : 'bg-slate-100'
                  }`}>
                    <HelpCircle className={`w-5 h-5 ${
                      q.status === 'resolved' ? 'text-green-600' :
                      q.status === 'answered' ? 'text-blue-600' : 'text-slate-400'
                    }`} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <Badge className={`text-xs ${
                        q.status === 'resolved' ? 'bg-green-100 text-green-700' :
                        q.status === 'answered' ? 'bg-blue-100 text-blue-700' :
                        'bg-amber-100 text-amber-700'
                      }`}>
                        {q.status === 'resolved' ? '已解决' :
                         q.status === 'answered' ? '已回答' : '待回答'}
                      </Badge>
                      <Badge className="bg-slate-100 text-slate-600 text-xs">{q.category}</Badge>
                      {q.isAnonymous && <Badge className="bg-slate-100 text-slate-400 text-xs">匿名</Badge>}
                    </div>
                    <h4 className="font-medium text-[#134E4A] hover:text-[#0D9488] cursor-pointer">
                      {q.title}
                    </h4>
                    <p className="text-sm text-slate-500 mt-1 line-clamp-2">{q.content}</p>
                    <div className="flex items-center gap-4 mt-2 text-xs text-slate-400">
                      <span>{q.isAnonymous ? '匿名用户' : q.author}</span>
                      <span>•</span>
                      <span>{q.timeAgo}</span>
                      <span>•</span>
                      <span>{q.answers} 回答</span>
                      <span>•</span>
                      <span>{q.views} 阅读</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}

          <Button variant="outline" className="w-full border-[#0D9488] text-[#0D9488]">
            <HelpCircle className="w-4 h-4 mr-2" /> 查看更多问题
          </Button>
        </TabsContent>

        {/* 话题区 */}
        <TabsContent value="topics" className="space-y-4 mt-4">
          <Card className="border-0 shadow-md bg-gradient-to-r from-[#0D9488]/5 to-transparent">
            <CardHeader>
              <CardTitle className="text-[#134E4A] flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-[#0D9488]" />
                本周热门话题
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {weeklyTopics.map((topic, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 rounded-lg bg-white hover:bg-slate-50 cursor-pointer transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-[#0D9488]/10 rounded-full flex items-center justify-center text-[#0D9488] font-bold text-sm">
                        {index + 1}
                      </div>
                      <span className="font-medium text-[#134E4A]">{topic.title}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-slate-500">
                      <MessageCircle className="w-4 h-4" />
                      {topic.replies}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-md">
            <CardHeader>
              <CardTitle className="text-[#134E4A]">参与话题赢徽章</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 rounded-lg bg-amber-50 text-center">
                  <Award className="w-8 h-8 text-amber-500 mx-auto mb-2" />
                  <p className="text-sm font-medium text-amber-700">活跃达人</p>
                  <p className="text-xs text-amber-600">参与话题讨论</p>
                </div>
                <div className="p-3 rounded-lg bg-purple-50 text-center">
                  <Star className="w-8 h-8 text-purple-500 mx-auto mb-2" />
                  <p className="text-sm font-medium text-purple-700">话题之星</p>
                  <p className="text-xs text-purple-600">优质回复获赞</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* 导师区 */}
        <TabsContent value="mentors" className="space-y-4 mt-4">
          <Card className="border-0 shadow-md bg-gradient-to-r from-purple-50 to-pink-50">
            <CardContent className="p-4">
              <p className="text-sm text-slate-600">
                资深编剧入驻社区，为新手答疑解惑。你可以向他们请教投稿、创作等问题。
              </p>
            </CardContent>
          </Card>

          <div className="grid md:grid-cols-3 gap-4">
            {mentors.map((mentor, index) => (
              <Card key={index} className="border-0 shadow-md">
                <CardContent className="p-4 text-center">
                  <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <User className="w-8 h-8 text-purple-600" />
                  </div>
                  <h4 className="font-bold text-[#134E4A]">{mentor.name}</h4>
                  <p className="text-sm text-slate-500">{mentor.title}</p>
                  <div className="flex justify-center gap-1 my-2">
                    {mentor.badges.map((badge) => (
                      <Badge key={badge} className="text-xs bg-amber-100 text-amber-700">{badge}</Badge>
                    ))}
                  </div>
                  <p className="text-xs text-slate-400">
                    {mentor.scripts > 0 ? `已签约 ${mentor.scripts} 部作品` : '平台编辑'}
                  </p>
                  <Button size="sm" variant="outline" className="mt-3 w-full">
                    向他提问
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
