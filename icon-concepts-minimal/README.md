# Aera · 黑白极简图标 / v2

[交互选择页](http://localhost:5173/icon-concepts-minimal/index.html)

依据用户提供的参考图，采用白色底、深黑色实心符号、圆润轮廓与少量负形留白。保留圆体 a 和小鲸两个方案，当前 App 使用圆体 a。

| 编号 | 名称 | 形态 |
| --- | --- | --- |
| 01 | 圆体 a | 粗圆环与圆头竖笔画组成小写 a，圆形留白。 |
| 02 | 小鲸 | 厚实圆润的鲸身、小尾巴与一颗圆眼。 |

每套包含：

- `app-icon.svg` / `app-icon.png`：白底 App 图标，PNG 为 1024 × 1024。源图使用完整方形画布，预览中通过 CSS 显示圆角。
- `mark.svg` / `mark.png`：透明背景标识，用于 Agent 欢迎页和对话头像。PNG 为 1024 × 1024，眼睛或圆心为透明负形。
- `glyph.svg`：同一符号采用更紧凑的取景，用于小尺寸导航。默认颜色 `#202020`，内联 SVG 可通过 `currentColor` 调整。

生成与导出：

```powershell
node scripts/create-minimal-icons.mjs
node scripts/preview-minimal-icons.mjs
node scripts/select-brand.mjs soft-a
```

预览页面支持两个保留方案切换，包含 App 图标、Agent 头像、导航以及界面示意。点击只更新预览。界面图形位于 `src/assets/brand/`，随代码构建；桌面图标与选择记录位于 `public/brand/`。如后续改用小鲸，运行 `node scripts/select-brand.mjs whale` 并重新构建。该脚本会同步图形、导航轮廓、App 图标、favicon 与页面版本。
