MahiOpsAI/
├── frontend/               # Next.js 14 dashboard
│   ├── app/               # App router pages
│   ├── components/        # Reusable UI components
│   ├── lib/              # Utilities and hooks
│   ├── services/         # API service clients
│   └── styles/           # Tailwind + CSS modules
│
├── backend/               # FastAPI microservices
│   ├── api/              # REST endpoints
│   │   ├── v1/           # Versioned APIs
│   │   │   ├── metrics.py
│   │   │   ├── logs.py
│   │   │   └── ai_engine.py
│   ├── core/             # Config, security, middleware
│   ├── models/           # Pydantic + SQLAlchemy models
│   ├── services/         # Business logic
│   ├── ml_models/        # Custom ML models
│   └── main.py           # FastAPI app entry
│
├── monitoring/            # Monitoring stack configs
│   ├── prometheus/       # Rules, alerts, configs
│   ├── grafana/          # Dashboards, datasources
│   └── loki/             # Log aggregation config
│
├── k8s/                   # Kubernetes manifests
│   ├── base/             # Common resources
│   ├── overlays/         # Environment-specific
│   │   ├── dev/
│   │   ├── staging/
│   │   └── production/
│   ├── helm/             # Helm charts (optional)
│   └── crds/             # Custom Resource Definitions
│
├── infrastructure/        # IaC configurations
│   ├── terraform/        # AWS/EKS provisioning
│   └── ansible/          # Server configuration
│
├── ci-cd/                 # Pipeline configurations
│   ├── github-actions/   # Workflow definitions
│   └── argocd/           # GitOps configurations
│
├── scripts/               # Utility scripts
├── tests/                 # Test suites
├── docs/                  # Documentation
├── docker-compose.yml     # Local development
├── Dockerfile            # Multi-stage builds
├── .github/              # PR templates, issue forms
├── README.md
└── LICENSE
