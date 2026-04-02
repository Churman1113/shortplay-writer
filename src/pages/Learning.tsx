import { Link } from 'react-router-dom'
import NewbieLearning from '@/components/NewbieLearning'
import { Button } from '@/components/ui/button'
import { ChevronRight } from 'lucide-react'

export default function Learning() {
  return (
    <div className="p-4 lg:p-6">
      {/* 顶部返回栏 */}
      <div className="flex items-center gap-3 mb-6">
        <Link to="/dashboard">
          <Button variant="ghost" size="sm" className="gap-1">
            <ChevronRight className="w-4 h-4 rotate-180" />
            返回
          </Button>
        </Link>
        <div className="h-5 w-px bg-slate-200" />
        <h1 className="text-xl font-bold text-[#134E4A]">新手学习</h1>
      </div>
      <NewbieLearning />
    </div>
  )
}
