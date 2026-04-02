import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Link as LinkIcon,
  Edit3,
  Award,
  FileText,
  Star,
  TrendingUp,
  Settings,
  Bell,
  Shield,
  ArrowLeft
} from 'lucide-react';

const userStats = {
  scripts: 12,
  submissions: 28,
  accepted: 5,
  earnings: '¥45,000',
  followers: 234,
  following: 89,
};

const achievements = [
  { id: 1, name: '初出茅庐', desc: '完成首部剧本', icon: '🌱', unlocked: true },
  { id: 2, name: '投稿达人', desc: '累计投稿10次', icon: '📤', unlocked: true },
  { id: 3, name: '签约编剧', desc: '首次剧本被采纳', icon: '✍️', unlocked: true },
  { id: 4, name: '爆款制造机', desc: '剧本播放量破亿', icon: '🔥', unlocked: false },
  { id: 5, name: '创作大师', desc: '完成10部剧本', icon: '👑', unlocked: false },
  { id: 6, name: '社区达人', desc: '获得1000个赞', icon: '❤️', unlocked: false },
];

const recentScripts = [
  { id: 1, title: '《总裁的契约新娘》', status: '已投稿', date: '2025-03-28', views: null },
  { id: 2, title: '《重生之嫡女归来》', status: '已通过', date: '2025-03-25', views: '1.2万' },
  { id: 3, title: '《我的闪婚老公》', status: '创作中', date: '2025-03-20', views: null },
];

const notifications = [
  { id: 1, type: 'success', message: '恭喜！您的剧本《重生之嫡女归来》已通过审核', time: '2小时前', read: false },
  { id: 2, type: 'info', message: '您关注的编剧"创作达人"发布了新作品', time: '5小时前', read: false },
  { id: 3, type: 'warning', message: '您的剧本《总裁的契约新娘》需要补充材料', time: '1天前', read: true },
  { id: 4, type: 'info', message: '系统通知：平台新增AI润色功能', time: '2天前', read: true },
];

export default function Profile() {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [userInfo, setUserInfo] = useState({
    name: '编剧小明',
    email: 'writer@example.com',
    phone: '138****8888',
    location: '北京',
    bio: '专注甜宠短剧创作，已创作10+部剧本，期待与更多平台合作。',
    website: '',
  });

  return (
    <div className="p-4 lg:p-8 max-w-7xl mx-auto space-y-6">
      {/* 顶部栏 */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="sm" onClick={() => navigate('/dashboard')} className="gap-1">
          <ArrowLeft className="w-4 h-4" />
          返回
        </Button>
        <div className="h-6 w-px bg-slate-200" />
        <h1 className="text-xl font-bold text-[#134E4A] flex-1">个人中心</h1>
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm">
            <Settings className="h-4 w-4 mr-2" />
            账号设置
          </Button>
          <Button variant="outline" size="sm">
            <Bell className="h-4 w-4 mr-2" />
            消息通知
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 左侧：个人信息 */}
        <div className="space-y-6">
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col items-center">
                <Avatar className="w-24 h-24 mb-4">
                  <AvatarImage src="" />
                  <AvatarFallback className="text-3xl bg-violet-100 text-violet-600">
                    {userInfo.name[0]}
                  </AvatarFallback>
                </Avatar>
                <h2 className="text-xl font-bold text-slate-900">{userInfo.name}</h2>
                <p className="text-slate-500 text-sm mt-1">短剧编剧</p>
                <div className="flex gap-2 mt-3">
                  <Badge variant="secondary">签约编剧</Badge>
                  <Badge variant="outline">Lv.3</Badge>
                </div>
                <p className="text-slate-600 text-center mt-4 text-sm">{userInfo.bio}</p>
                <div className="flex gap-6 mt-6 text-center">
                  <div>
                    <div className="text-xl font-bold text-slate-900">{userStats.scripts}</div>
                    <div className="text-xs text-slate-500">剧本</div>
                  </div>
                  <div>
                    <div className="text-xl font-bold text-slate-900">{userStats.followers}</div>
                    <div className="text-xs text-slate-500">粉丝</div>
                  </div>
                  <div>
                    <div className="text-xl font-bold text-slate-900">{userStats.following}</div>
                    <div className="text-xs text-slate-500">关注</div>
                  </div>
                </div>
                <Button 
                  variant="outline" 
                  className="mt-6 w-full"
                  onClick={() => setIsEditing(!isEditing)}
                >
                  <Edit3 className="h-4 w-4 mr-2" />
                  {isEditing ? '保存资料' : '编辑资料'}
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">联系信息</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3 text-sm">
                <Mail className="h-4 w-4 text-slate-400" />
                <span className="text-slate-600">{userInfo.email}</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Phone className="h-4 w-4 text-slate-400" />
                <span className="text-slate-600">{userInfo.phone}</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <MapPin className="h-4 w-4 text-slate-400" />
                <span className="text-slate-600">{userInfo.location}</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <LinkIcon className="h-4 w-4 text-slate-400" />
                <span className="text-slate-600">{userInfo.website || '未设置'}</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* 右侧：详细内容 */}
        <div className="lg:col-span-2 space-y-6">
          <Tabs defaultValue="overview" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="overview">数据概览</TabsTrigger>
              <TabsTrigger value="scripts">我的剧本</TabsTrigger>
              <TabsTrigger value="achievements">成就勋章</TabsTrigger>
              <TabsTrigger value="notifications">消息通知</TabsTrigger>
            </TabsList>

            {/* 数据概览 */}
            <TabsContent value="overview" className="space-y-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-slate-500">创作剧本</p>
                        <p className="text-2xl font-bold text-slate-900 mt-1">{userStats.scripts}</p>
                      </div>
                      <FileText className="h-8 w-8 text-violet-500" />
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-slate-500">累计投稿</p>
                        <p className="text-2xl font-bold text-slate-900 mt-1">{userStats.submissions}</p>
                      </div>
                      <TrendingUp className="h-8 w-8 text-blue-500" />
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-slate-500">已通过</p>
                        <p className="text-2xl font-bold text-slate-900 mt-1">{userStats.accepted}</p>
                      </div>
                      <Award className="h-8 w-8 text-green-500" />
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-slate-500">累计收益</p>
                        <p className="text-2xl font-bold text-slate-900 mt-1">{userStats.earnings}</p>
                      </div>
                      <Star className="h-8 w-8 text-yellow-500" />
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>创作趋势</CardTitle>
                  <CardDescription>近6个月创作数据统计</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-end justify-between gap-2">
                    {[
                      { month: '10月', scripts: 1, submissions: 2 },
                      { month: '11月', scripts: 2, submissions: 3 },
                      { month: '12月', scripts: 1, submissions: 4 },
                      { month: '1月', scripts: 3, submissions: 5 },
                      { month: '2月', scripts: 2, submissions: 6 },
                      { month: '3月', scripts: 3, submissions: 8 },
                    ].map((data) => (
                      <div key={data.month} className="flex-1 flex flex-col items-center gap-2">
                        <div className="w-full flex gap-1 h-48 items-end">
                          <div 
                            className="flex-1 bg-violet-500 rounded-t"
                            style={{ height: `${data.scripts * 20}%` }}
                          />
                          <div 
                            className="flex-1 bg-blue-400 rounded-t"
                            style={{ height: `${data.submissions * 10}%` }}
                          />
                        </div>
                        <span className="text-xs text-slate-500">{data.month}</span>
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-center gap-6 mt-4">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-violet-500 rounded" />
                      <span className="text-sm text-slate-600">创作剧本</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-blue-400 rounded" />
                      <span className="text-sm text-slate-600">投稿次数</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* 我的剧本 */}
            <TabsContent value="scripts" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>最近创作</CardTitle>
                  <CardDescription>您最近创作的剧本作品</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentScripts.map((script) => (
                      <div key={script.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-lg bg-violet-100 flex items-center justify-center">
                            <FileText className="h-5 w-5 text-violet-600" />
                          </div>
                          <div>
                            <h4 className="font-medium text-slate-900">{script.title}</h4>
                            <p className="text-sm text-slate-500">创建于 {script.date}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <Badge 
                            variant={script.status === '已通过' ? 'default' : script.status === '已投稿' ? 'secondary' : 'outline'}
                          >
                            {script.status}
                          </Badge>
                          {script.views && (
                            <span className="text-sm text-slate-500">播放量：{script.views}</span>
                          )}
                          <Button variant="ghost" size="sm">查看</Button>
                        </div>
                      </div>
                    ))}
                  </div>
                  <Button variant="outline" className="w-full mt-4">查看全部剧本</Button>
                </CardContent>
              </Card>
            </TabsContent>

            {/* 成就勋章 */}
            <TabsContent value="achievements" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>我的成就</CardTitle>
                  <CardDescription>完成特定目标解锁成就勋章</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {achievements.map((achievement) => (
                      <div 
                        key={achievement.id}
                        className={`p-4 border rounded-lg text-center ${
                          achievement.unlocked ? 'bg-violet-50 border-violet-200' : 'opacity-50'
                        }`}
                      >
                        <div className="text-4xl mb-2">{achievement.icon}</div>
                        <h4 className="font-semibold text-slate-900">{achievement.name}</h4>
                        <p className="text-xs text-slate-500 mt-1">{achievement.desc}</p>
                        {achievement.unlocked ? (
                          <Badge className="mt-3" variant="default">已解锁</Badge>
                        ) : (
                          <Badge className="mt-3" variant="outline">未解锁</Badge>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* 消息通知 */}
            <TabsContent value="notifications" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>消息中心</CardTitle>
                  <CardDescription>系统通知、投稿状态、互动消息</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {notifications.map((notification) => (
                      <div 
                        key={notification.id}
                        className={`flex items-start gap-4 p-4 border rounded-lg ${
                          !notification.read ? 'bg-violet-50 border-violet-200' : ''
                        }`}
                      >
                        <div className={`w-2 h-2 rounded-full mt-2 ${
                          notification.type === 'success' ? 'bg-green-500' :
                          notification.type === 'warning' ? 'bg-yellow-500' : 'bg-blue-500'
                        }`} />
                        <div className="flex-1">
                          <p className="text-slate-900">{notification.message}</p>
                          <p className="text-xs text-slate-500 mt-1">{notification.time}</p>
                        </div>
                        {!notification.read && (
                          <Badge variant="secondary">未读</Badge>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
