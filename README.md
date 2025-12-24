🚀 MahiOpsAI – AI-Powered DevOps Monitoring Platform
📄 License
MIT License

🧠 Overview
MahiOpsAI is a web-based DevOps monitoring platform that leverages AI/LLMs to provide actionable insights for modern infrastructure.
It monitors servers, containers, and Kubernetes clusters, collects logs and metrics, and uses AI to:


Explain errors in simple, human-readable language


Predict failures before they happen


Suggest fixes automatically


This project demonstrates production-level DevOps + AI skills, making it ideal for GitHub portfolios, remote job applications, and freelance clients.

🏗 Architecture
       ┌──────────────────────┐
       │ Kubernetes / EKS     │
       │ Cluster              │
       │ - Pods               │
       │ - Nodes              │
       └─────────┬────────────┘
                 │ Metrics & Logs
        ┌────────▼─────────┐
        │ Prometheus        │
        │ Grafana           │
        │ Loki              │
        └────────┬─────────┘
                 │ API Calls
        ┌────────▼─────────┐
        │ FastAPI Backend   │
        │ - Metrics API     │
        │ - Logs API        │
        │ - AI Engine       │
        └────────┬─────────┘
                 │ JSON
        ┌────────▼─────────┐
        │ React / Next.js   │
        │ Dashboard UI      │
        └──────────────────┘


🛠 Tech Stack
LayerTechnologyFrontendReact / Next.jsBackendFastAPI (Python)MonitoringPrometheus + GrafanaLoggingLokiAI EngineOpenAI / LLMInfrastructureDocker, Kubernetes, AWS (EKS)CI/CDGitHub Actions

✨ Features


Real-time Metrics


CPU, memory, pod health


Container and node statistics




Centralized Log Aggregation


Search and filter logs across containers


Correlate logs with metrics




AI-Powered Insights


Error explanation in simple language


Failure prediction


Automated remediation suggestions




Modern Dashboard UI


Interactive charts and alerts


Clean, responsive interface




CI/CD Automation


Build, test, and deploy using GitHub Actions





📂 Project Structure
MahiOpsAI/
├── frontend/               # React / Next.js dashboard
│   ├── components/
│   ├── pages/
│   ├── services/
│   └── styles/
│
├── backend/                # FastAPI backend
│   ├── api/
│   │   ├── metrics.py
│   │   ├── logs.py
│   │   └── ai_engine.py
│   ├── models/
│   ├── services/
│   └── main.py
│
├── monitoring/             # Monitoring configuration
│   ├── prometheus/
│   ├── grafana/
│   └── loki/
│
├── k8s/                     # Kubernetes manifests
│   ├── deployments/
│   ├── services/
│   └── ingress/
│
├── ci-cd/                   # GitHub Actions workflows
│   └── github-actions.yml
│
├── docker-compose.yml
├── Dockerfile
├── README.md
└── LICENSE


🚀 Use Cases


DevOps Engineer Portfolio Project


AI-Driven Monitoring SaaS Prototype


Freelance / Client Demonstration


Remote Job Interview Showcase



📌 Future Enhancements


Alerting with Slack / Email / Webhooks


Cost optimization insights


Anomaly detection using ML models


Multi-cloud support (Azure, GCP)



🤝 Contributing
Contributions are welcome!
Feel free to open issues or submit pull requests.

📬 Contact
Author: Jagdish Maliwad
Role: DevOps Engineer | Cloud | AI-Ops

If you want, I can also:


Add badges (CI/CD, Docker, Kubernetes)


Make it ATS-optimized for recruiters


Write a LinkedIn + GitHub project description


Create screenshots / demo flow section


Just tell me 👍
