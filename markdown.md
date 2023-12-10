......

## 9.13:

1、新增点击 taskbar 栏和桌面图标出现对应界面（暂时只有 edge 界面）
2、完善 edge 界面：完成右上角图标的最小化、向下还原、关闭功能
3、完善 taskbar 栏的搜索框功能：搜索框输入内容后的 Search Online Web 功能
4、完成 taskbar 栏的点击 menu 里的 app 能打开对应界面功能（暂时只能打开 edge）

reducers 文件夹新增 apps.js 用于记录界面状态

## 9.14:

1、

## 9.15:

1、新增 store 界面（大致框架）
2、完善 taskbar 栏的搜索框功能：搜索框输入内容后的 Open 功能

## 9.16:

1、完成 store 界面
2、修复了控制台的一些警告
3、修复了 startmenu 的样式

## 9.17:

1、完成了 terminal 终端界面（逻辑未写）

## 9.18：

1、完成了 terminal 终端界面的逻辑

## 9.19:

1、完成了 notepad 笔记本界面（功能未实现）
2、完成了 calculator 计算器界面
3、完成 vscode 界面
4、完成 explorer 界面（功能未实现）
5、完成 whiteboard 界面（功能未实现）

## 9.20:

1、增加鼠标放置 taskbar 栏图标显示对应 app 小界面功能
2、完成了 calendar 日历的静态页面
3、重构项目文件结构

## 9.21:

1、增加鼠标右键桌面展示菜单功能

## 9.22:

1、完成了 whitboard 界面及功能
2、修复了 calendar 界面点击切换月份隐藏问题
3、更新了鼠标右键的菜单
4、新增了 about 界面

## 9.23:

1、完成了鼠标右键 taskbar 栏展示菜单功能
2、fix bugs

## 9.25:

1、完成 spotify 界面
播放列表界面未完成、播放条的功能未实现

## 9.26:

1、完善 spotify 界面部分功能：
歌曲切换、暂停、随机播放、顺序播放、播放进度条拖动、音量进度条拖动、喇叭关闭开启、歌曲列表查看、Favorite Albums 的点击功能
2、未完成：
Favorite Songs 点击对应歌曲发请求获取资源已实现但未能自动播放
Made for you
Favorite Artists
PLAYLISTS

## 9.27:

1、完成 Made for you 点击功能
2、PLAYLISTS

## 10.1：

1、锁屏界面

## 10.2:

1、完成锁屏界面

## 10.3：

1、完成锁屏、关机、重启功能
2、电池图标（会根据是否充电及电量情况更新图标）
使用 navigator.getBattery() API 来获取电池状况
由于是做展示用（ui 组件），Battery 组件只接受电量水平和是否充电两个状态，因此用 memo 包裹 Battery 组件以此来优化性能

memo 可以包裹一个函数组件，返回一个新的组件。这个新的组件在接收到新的 props 时，仅重新渲染原组件之前会进行浅层比较，只有当 props 发生变化时才会重新渲染，否则使用缓存的结果。
使用 memo 可以避免不必要的重新渲染，提高组件性能。

## 10.4:

1、更新 sidepane（夜间模式实现）

## 10.5:

1、音量大小和屏幕亮度可调节
2、store 界面新增下载 app 功能及查看详情页功能

## 10.6:

1、实现相机拍照功能：在组件中引用 react-webcam 库或使用原生的 getUserMedia API 来获取摄像头流

## 10.7:

1、修复自适应 bug 及右击鼠标打开 terminal 无法执行 cd..命令的 bug
2、实现鼠标右击桌面 app 出现菜单栏功能：
给桌面 app 的 dom 节点新增 data-menu='app'属性，用于和 data-menu='desk'、data-menu='taskbar 区别开，
右击鼠标时派发 action 会带上此属性，用于在 menu reducer 中决定展示的内容

useEffect(async () => {
// console.log(process.env.REACT_APP_DEVELOPEMENT);
if (process.env.REACT_APP_DEVELOPEMENT != "development") {
if (!widget.updated && !widget.hide) {
var tmpWdgt = await fetchApi(widget);
.......代码
}
}
});
会报错
useEffect 的回调函数不能是 async 函数
但可以在内部回调函数使用 async await
useEffect(() => {
// 防止竞态状态
if (process.env.REACT_APP_DEVELOPEMENT != "development") {
async function fetchData() {
if (!widget.updated && !widget.hide) {
var tmpWdgt = await fetchApi(widget);
......代码
}
}

      fetchData();
    }

});

## 10.8:

1、taskbar 栏更新
2、store 下载功能逻辑重写

## 10.9：

1、修复在 store 下载一个 app，关闭 store 界面，再点进 store 该 app 仍能下载问题
在 store 界面设置变量，让已经下载过的 app 不能再下载
使用 useEffect 钩子，第二个参数设为空数组，每次进入 app 详情页面就判断该 app 是否下载过，下载则将 downState 变量设为 3
2、删除 app 逻辑
3、修复搜索框搜索 app 不按顺序呈现的 bug

## 10.13:

1、startmenu 和 searchpane 黑暗主题下的样式修复
2、修复右击窗口显示 bug 以及替换 menu 图标
3、增加本地存储逻辑，完善黑暗模式下 toolbar 的样式

## 10.14:

1、修复"Maximum update depth exceeded" bug
2、实现 app 拖拽功能

## 10.15:

1、实现 app 缩小后边框能拖拽改变大小
2、修复 store 界面进度条滚动左侧 tab 栏图标跟随问题

## 10.17:

1、更改锁屏界面
2、sidepane 界面增加电量显示
3、startmenu 界面宽度增加

## 10.18:

1、文件夹界面框架搭建

## 10.19：

1、文件夹界面切换及地址查找功能实现

## 10.20：

1、文件夹前进、后退、回退功能实现
2、widget 获取新闻 API 接口迁移

## 10.21:

1、文件夹地址栏切换
2、搜索功能实现

## 10.23:

1、settings 界面完成
2、统一滚动条样式

## 10.25:

1、修复了时间无法自动更新问题
2、重构 Battery 组件逻辑

## 12.6

图标可拖拽改变大小的逻辑:
ToolBar 是公共组件，每个界面的代码都有 ToolBar 组件包裹，因此想为每个图标实现拖拽功能，可以修改 ToolBar 的逻辑，给其加上四个 div 盒子,

让鼠标变为水平拉升的箭头的 css 属性:
cursor: w-resize

当鼠标移至四条边（即 div 盒子）上时改变鼠标变为水平拉伸的箭头，点击时触发 toolDrag 函数：
由于触发 toolDrag 函数有两个（一个是点击拖动界面，一个是点击拖拽改变界面大小），使用 data-op 属性来区分，为 0 则是拖拽移动界面，为 1 则是拖拽改变界面大小。)需要一个 if 条件判断。

鼠标按下时：
记录鼠标按下时相对于浏览器窗口客户区域的垂直和水平坐标位置属性：mouseStartClientYandX=[e.clientY,e.clientX]
记录界面即相对于浏览器顶部和左部的距离：
wnapp = e.target.parentElement.parentElement.parentElement;//界面的最外层 div 盒子元素
appStartOffsetTandL = [wnapp.offsetTop, wnapp.offsetLeft];
记录界面的高和宽：
pressMouseAppHandW = [
parseFloat(getComputedStyle(wnapp).height.replaceAll("px", "")),
parseFloat(getComputedStyle(wnapp).width.replaceAll("px", "")),
];

鼠标按下不松手拖拽界面移动时，触发 handleMouseMove 函数 ：
用当前鼠标相对于浏览器窗口的距离 e.clientY 和 e.clientX 减去鼠标按下时相对于浏览器窗口的距离再加上界面初始时距离浏览器顶部和左侧的距离即是鼠标松手后界面相对于浏览器顶部和左侧的距离：
let appEndOffsetTop = appStartOffsetTandL[0] + e.clientY - mouseStartClientYandX[0],
appEndOffsetLeft = appStartOffsetTandL[1] + e.clientX - mouseStartClientYandX[1];

鼠标松手后界面的高度和宽度等于按下鼠标时界面的宽度和高度+鼠标按下和松手时移动的差值：
let releaseMouseAppHeight = pressMouseAppHandW[0] + vec[0] _ (e.clientY - mouseStartClientYandX[0]),
releaseMouseAppWidth = pressMouseAppHandW[1] + vec[1] _ (e.clientX - mouseStartClientYandX[1]);

op===0（即拖拽界面移动但不改变大小）：
wnapp.style.top = appEndOffsetTop + "px";
wnapp.style.left = appEndOffsetLeft + "px";

op===1（拖拽界面改变大小但不移动）：
// 此处不可省略，因为拖拽一侧边框改变某一侧时，其余侧不可动，例如拉伸上侧边框，左右和下侧不可动
appEndOffsetTop = appStartOffsetTandL[0] + Math.min(vec[0], 0) _ (releaseMouseAppHeight - pressMouseAppHandW[0]);
appEndOffsetLeft = appStartOffsetTandL[1] + Math.min(vec[1], 0) _ (releaseMouseAppWidth - pressMouseAppHandW[1]);

wnapp.style.top = appEndOffsetTop + "px";
wnapp.style.left = appEndOffsetLeft + "px";
// 界面宽度和高度最小不能小于 360
wnapp.style.height = Math.max(releaseMouseAppHeight, 360) + "px";
wnapp.style.width = Math.max(releaseMouseAppWidth, 360) + "px";
