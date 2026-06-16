const meta = {
  title: "Dreamanga",
  titleZh: "Dreamanga 灵漫岛｜Agent 驱动的 AI 漫剧自动生成工作台",
  year: "2024–Present",
  subtitle: "Agent-Driven AI Comic Generation Workbench",
  subtitleZh: "Agent 驱动的 AI 漫剧自动生成工作台",
  description: "An Agentic Workflow workbench for AI comic creation, abstracting script parsing, storyboard planning, asset binding, prompt generation, video generation, and quality review into visual task nodes.",
  descriptionZh: "面向 AI 漫剧创作的 Agentic Workflow 工作台，将剧本解析、分镜规划、资产绑定、Prompt 生成、视频生成和质量审核抽象为可视化任务节点。",
  techStack: ["React", "React Flow", "LangGraph", "LLM", "Prompt Engineering", "Multi-Agent Workflow"],
  highlights: [
    "Built node-based Agentic Canvas with React Flow",
    "Orchestrated Director, Asset, Prompt, Video, and Review agents via LangGraph",
    "Designed structured JSON outputs constraining LLM generation of storyboards, character assets, and shot descriptions",
    "Supported context propagation, task routing, result persistence, and failure fallback",
  ],
  highlightsZh: [
    "基于 React Flow 构建节点式 Agentic Canvas",
    "基于 LangGraph 编排 Director、Asset、Prompt、Video、Review 等 Agent 节点",
    "设计结构化 JSON 输出，约束 LLM 生成分镜、角色资产和镜头描述",
    "支持上下文传递、任务流转、结果持久化和失败兜底",
  ],
  article: "/deep-dives/comic-generation-agent-workflow",
  source: "https://github.com/ruopulin/dreamanga",
}

export default meta
