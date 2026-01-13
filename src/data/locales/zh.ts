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
    /** 追番组件 */
    anime: {
      title: "正在追",
      subtitle: "番剧观看进度",
      status: {
        watching: "正在看",
        completed: "已看完",
        planned: "想看",
        onhold: "搁置",
        dropped: "抛弃",
      },
      year: "年份",
      studio: "制作",
      empty: "暂时没有番剧数据",
    },
  },
};
