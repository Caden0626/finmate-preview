# FinMate · App 图标方案

已选方案：**原版「折角 F」**，已接入主 App 的登录、Agent、银行卡、favicon 与桌面图标。重新同步：`node scripts/select-brand.mjs fold-f`。

[预览 FM 深化方案及应用效果](http://localhost:5174/finmate-icons/index.html)。点击各方案可查看白底登录、手机桌面、Agent 头像和深浅背景效果，也可切换图标反色。展开「对比上一版 01 与 03」可与原版比较。

| 方案 | 方向 |
| --- | --- |
| 01 折角 FM | 保留 F 折角，接入小写 m 双弧，共享上部连接 |
| 03 伴航 FM | F 演化为鳍形曲面，m 同向倾斜，保留清楚的字母间隙 |
| 原版 01 折角 F | 圆润首字母与卡片折角 |
| 原版 02 双弧 M | Mate 的 M，两道相接圆弧表达陪伴；源文件保留 |
| 原版 03 伴航 | Fin 的鳍形联想，偏生活方式和抽象形象 |

每套有 1024 × 1024 的白/黑底 App 图标和透明标识，以及导航用紧凑轮廓。SVG 使用完整画布；预览圆角由容器绘制，便于按平台调整裁切。PNG 从同一 SVG 导出。`glyph.svg` 保留 `currentColor` 以适应深浅主题。

本目录用于 FinMate 品牌方案预览。源图由 `scripts/create-finmate-icons.mjs` 生成，正式接入时可复用项目现有 `src/lib/brand.ts` 资源结构。
