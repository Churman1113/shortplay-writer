import { Link } from 'react-router-dom'

// 剧灵Logo组件 - 书本+星星设计
export default function JulingLogo({ size = 'large', variant = 'light' }: { size?: 'small' | 'medium' | 'large', variant?: 'light' | 'dark' }) {
  const sizes = {
    small: { width: 48, height: 48, title: 'text-2xl', subtitle: 'text-xs' },
    medium: { width: 56, height: 56, title: 'text-3xl', subtitle: 'text-sm' },
    large: { width: 64, height: 64, title: 'text-4xl', subtitle: 'text-base' },
  }

  const s = sizes[size]
  const isLight = variant === 'light'

  return (
    <Link to="/dashboard" className="flex items-center gap-3 group">
      {/* Logo图标 - 打开的书本+星星 */}
      <div className="relative flex-shrink-0 group-hover:scale-105 transition-transform duration-300">
        {/* 背景光晕 */}
        <div className={`absolute inset-0 rounded-xl blur-lg opacity-50 ${isLight ? 'bg-[#0D9488]/30' : 'bg-[#0D9488]/40'}`} />

        {/* 书本容器 */}
        <div
          className={`relative ${isLight ? 'bg-white' : 'bg-gradient-to-br from-[#0D9488] to-[#134E4A]'} rounded-xl shadow-lg group-hover:shadow-xl transition-all duration-300 overflow-hidden`}
          style={{ width: s.width, height: s.height }}
        >
          {/* 书本SVG */}
          <svg
            viewBox="0 0 100 100"
            className="w-full h-full p-2"
          >
            {/* 书本边框 */}
            <path
              d="M10 20 Q50 35 90 20 L90 80 Q50 95 10 80 Z"
              fill="none"
              stroke={isLight ? '#0D9488' : '#FFFFFF'}
              strokeWidth="3"
            />
            {/* 书脊 */}
            <line x1="50" y1="27" x2="50" y2="87" stroke={isLight ? '#0D9488' : '#FFFFFF'} strokeWidth="2" />
            {/* 左页线条 */}
            <line x1="20" y1="35" x2="45" y2="38" stroke={isLight ? '#0D9488' : '#FFFFFF'} strokeWidth="1.5" opacity="0.6" />
            <line x1="20" y1="45" x2="45" y2="48" stroke={isLight ? '#0D9488' : '#FFFFFF'} strokeWidth="1.5" opacity="0.6" />
            <line x1="20" y1="55" x2="45" y2="58" stroke={isLight ? '#0D9488' : '#FFFFFF'} strokeWidth="1.5" opacity="0.6" />
            <line x1="20" y1="65" x2="45" y2="68" stroke={isLight ? '#0D9488' : '#FFFFFF'} strokeWidth="1.5" opacity="0.6" />
            {/* 右页线条 */}
            <line x1="55" y1="38" x2="80" y2="35" stroke={isLight ? '#0D9488' : '#FFFFFF'} strokeWidth="1.5" opacity="0.6" />
            <line x1="55" y1="48" x2="80" y2="45" stroke={isLight ? '#0D9488' : '#FFFFFF'} strokeWidth="1.5" opacity="0.6" />
            <line x1="55" y1="58" x2="80" y2="55" stroke={isLight ? '#0D9488' : '#FFFFFF'} strokeWidth="1.5" opacity="0.6" />
            <line x1="55" y1="68" x2="80" y2="65" stroke={isLight ? '#0D9488' : '#FFFFFF'} strokeWidth="1.5" opacity="0.6" />
            {/* 金色星星 */}
            <polygon
              points="50,32 53,42 64,42 55,49 58,59 50,53 42,59 45,49 36,42 47,42"
              fill="#F59E0B"
              className="animate-pulse"
            />
          </svg>
        </div>
      </div>

      {/* 品牌文字 - 两行文字垂直居中，大字更突出 */}
      <div className="flex flex-col justify-center">
        <span className={`${s.title} font-black tracking-tight text-[#0D9488] leading-none ${isLight ? 'text-white' : ''}`}>
          剧灵
        </span>
        <span className={`${s.subtitle} font-medium text-slate-500 leading-tight ${isLight ? 'text-white/80' : ''}`}>
          短剧编剧创作平台
        </span>
      </div>
    </Link>
  )
}
