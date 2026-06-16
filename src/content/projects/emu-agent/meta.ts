const meta = {
  title: "EMU Agent",
  titleZh: "EMU Agent｜储能智能运维诊断系统",
  year: "2024–Present",
  subtitle: "Intelligent O&M Diagnostic System for Energy Storage",
  subtitleZh: "储能智能运维诊断系统",
  description: "An intelligent O&M diagnostic system for EMS/EMU energy storage scenarios, combining real-time data, historical alarms, RAG knowledge base, and Agent Workflow for alarm analysis, root cause attribution, remedial recommendations, and report generation.",
  descriptionZh: "面向储能 EMS/EMU 场景的智能运维诊断系统，结合实时数据、历史告警、RAG 知识库与 Agent Workflow，实现告警分析、原因归因、处置建议和报告生成。",
  techStack: ["FastAPI", "SQLite", "RAG", "AgentGraph", "Vue 3", "TypeScript", "ECharts", "C++", "Modbus TCP", "IEC61850 GOOSE/MMS"],
  highlights: [
    "Encapsulated historical snapshot, alarm record, and control command query APIs via FastAPI",
    "Combined RAG retrieval of fault specifications, equipment documentation, and operational experience",
    "Orchestrated intent recognition, data reading, anomaly analysis, knowledge retrieval, root cause attribution, and report generation via DAG AgentGraph",
    "Stored operational snapshots, power dispatch, control commands, and alarm information in SQLite",
  ],
  highlightsZh: [
    "基于 FastAPI 封装历史快照、告警记录和控制命令查询接口",
    "结合 RAG 检索故障规范、设备说明和运维经验文档",
    "通过 DAG AgentGraph 编排意图识别、数据读取、异常分析、知识检索、原因归因和报告生成",
    "基于 SQLite 存储运行快照、功率分配、控制命令和告警信息",
  ],
  image: "/emu-agent-demo.gif",
  article: "/blog/from-ems-data-to-agent-diagnosis",
  source: "https://github.com/ruopulin/emu-agent",
}

export default meta
