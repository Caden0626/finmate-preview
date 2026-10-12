# Aera · App Icon & Agent Companion / v1

方案预览：[本地交互选择页](http://localhost:5173/icon-concepts/index.html)。页面提供钴蓝底、冷白底、Agent 头像、24px 导航图标及所选方案的界面示意。选择只改变此页的预览。

| 编号 | 方案 | 设计方向 |
| --- | --- | --- |
| 01 | 轨道 A / ORBIT | 银色折叠 A、一条轨道与蓝色节点；精密、克制、科技。 |
| 02 | 银狐 / SILVER FOX | 白瓷脸颊、银色尖耳、蓝色杏眼；聪明、轻盈、亲和。推荐用于品牌吉祥物。 |
| 03 | 月光猫头鹰 / MOON OWL | 银色圆润轮廓、双眼结构、蓝色鸟喙；洞察、安心、专注。 |
| 04 | 浮光鲸 / LUMI WHALE | 流线的白色鲸身、蓝色胸鳍和上扬尾鳍；从容、自由、陪伴。 |

## 文件

每个方案各有一个目录：`orbit/`、`fox/`、`owl/`、`whale/`。

- `app-icon.svg` / `app-icon.png`：钴蓝底 App 图标。
- `app-icon-white.svg` / `app-icon-white.png`：冷白底 App 图标。
- `mark.svg` / `mark.png`：透明背景完整图形，用于 Agent 欢迎页、对话头像、品牌物料。
- `glyph.svg`：为小尺寸重新绘制的简化图标，用于 20–28px 导航与按钮。

PNG 为 1024 × 1024。App 图标文件为完整方形画布，预览中的圆角由 CSS 展示。透明图形保留 alpha。SVG 可缩放，包含可编辑路径、渐变与柔和投影；简化图标使用 `currentColor`，独立文件默认钴蓝色，作为内联 SVG 使用时可按状态改色。

## 色彩与材质

钴蓝 `#416AEE`；深色文字 `#17223A`；底色 `#F5F7FC`。主体以冷白与银色为主，通过低强度渐变表现体积，使用蓝色局部特征建立辨识度。完整头像保留材质；导航版减少细节。

这些图形是为本项目绘制的 SVG 设计稿。曾尝试内置 imagegen 工具生成银狐立体稿，但该调用因网络错误失败，未产生素材；最终交付全部通过本地 SVG 路径设计与浏览器渲染完成，没有调用 CLI/API 生成。

## 生成与导出

```powershell
node scripts/create-icon-concepts.mjs
node scripts/preview-icon-concepts.mjs
```

第一个脚本重建 SVG 图形与方案描述；第二个脚本使用本地 Vite 服务和系统 Chrome 检查预览、切换方案、两种底色与移动端宽度，并导出 PNG。对比截图位于 `artifacts/icon-concepts-blue.png`、`artifacts/icon-concepts-white.png`，各套界面示意位于 `artifacts/icon-context-*.png`。
