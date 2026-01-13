/**
 * 界面文本配置文件 (Locale: zh-CN)
 * 存放项目中所有可定制的界面文案
 */
export default {
  /**
   * 网站元数据
   * 用于 SEO 和浏览器标签页显示
   */
  meta: {
    /** 网站标题 */
    title: "FERXAL",
    /** 网站描述 */
    description: "Ferxal的个人主页",
    /** Open Graph 标题 (通常与 title 一致) */
    ogTitle: "FERXAL",
    /** Open Graph 描述 (通常与 description 一致) */
    ogDescription: "Ferxal的个人主页",
    /** GitHub Corner 的无障碍标签 */
    githubAriaLabel: "查看项目源代码",
  },

  /**
   * 列表组件相关文本
   */
  articleList: {
    /** 文章列表底部的“查看更多”按钮文本 */
    viewMore: "查看更多",
  },

  /**
   * 页脚相关文本
   */
  footer: {
    /** "Made with ... by" 的前缀/后缀部分 */
    madeWith: "made with ❤️ by",
    /** "Powered by" 的前缀 */
    poweredBy: "🚀 powered by",
    /** "Inspired by" 的前缀 */
    inspiredBy: "💡 inspired by",
    /** ICP 备案号 */
    icp: "京ICP备2024045824号",
    /** ICP 备案链接 */
    icpUrl: "https://beian.miit.gov.cn",
    /** 公安备案号 */
    police: "京公网安备11010502054688号",
    /** 公安备案链接 */
    policeUrl: "https://beian.mps.gov.cn/#/query/webSearch?code=11010502054688",
  },

  /**
   * 客户端脚本使用的文本
   */
  scripts: {
    /** 粉丝数后缀 (例如 " Followers") */
    followersSuffix: " Followers",
  },

  /**
   * 组件相关文本体系
   */
  components: {
    /** 卡片基础组件 */
    card: {
      /** 默认按钮文本 */
      defaultBtnText: "了解更多",
    },
    /** 文章列表组件 */
    articles: {
      title: "文章列表",
      viewMore: "查看更多",
    },
  },
};
