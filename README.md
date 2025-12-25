# 🚀 MahiOpsAI – AI-Powered DevOps Monitoring Platform

[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/)
[![Docker](https://img.shields.io/badge/Docker-Enabled-blue)](https://www.docker.com/)
[![Kubernetes](https://img.shields.io/badge/Kubernetes-Enabled-326CE5)](https://kubernetes.io/)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.100+-009688)](https://fastapi.tiangolo.com/)
[![Next.js](https://img.shields.io/badge/Next.js-14-black)](https://nextjs.org/)
[![Python](https://img.shields.io/badge/Python-3.11+-3776AB)](https://www.python.org/)

## 🧠 Overview

**MahiOpsAI** is a production-grade, web-based DevOps monitoring platform that leverages cutting-edge AI/LLMs to transform infrastructure monitoring. Designed for modern cloud-native environments, it goes beyond traditional monitoring by providing intelligent, actionable insights that help teams prevent issues before they impact users.

### 🤖 AI-Powered Capabilities:
- **Error Explanation**: Translates complex technical errors into simple, human-readable language
- **Failure Prediction**: Uses machine learning to predict potential failures before they occur
- **Automated Remediation**: Suggests specific fixes and optimizations based on industry best practices
- **Root Cause Analysis**: Correlates metrics and logs to identify the true source of issues

This project showcases end-to-end DevOps engineering with AI integration, making it an ideal portfolio piece for job applications, freelance proposals, and technical demonstrations.

## 🏗 Architecture
  +------------------------------------------------------+
|              Kubernetes / EKS Cluster                |
|                                                      |
|   +----------------+    +----------------------+     |
|   |      Pods      |    |        Nodes         |     |
|   +----------------+    +----------------------+     |
|           |                      |                    |
|           +------ Metrics & Logs +--------------------+
|                              |
+------------------------------|-----------------------+
                               v
+------------------------------------------------------+
|                Observability Layer                   |
|                                                      |
|   +-------------+   +-----------+   +-------------+ |
|   | Prometheus  |   | Grafana   |   |    Loki     | |
|   | (Metrics)   |   | (Dashboard)|  |   (Logs)   | |
|   +-------------+   +-----------+   +-------------+ |
+------------------------------+-----------------------+
                               |
                               | REST / API Calls
                               v
+------------------------------------------------------+
|                   FastAPI Backend                    |
|                                                      |
|   +----------------+   +------------------+          |
|   |  Metrics API   |   |    Logs API      |          |
|   +----------------+   +------------------+          |
|                                                      |
|   +----------------------------------------------+   |
|   |                  AI Engine                  |   |
|   |  - Error Explanation                        |   |
|   |  - Failure Prediction                       |   |
|   |  - Auto Fix Suggestions                     |   |
|   +----------------------------------------------+   |
+------------------------------+-----------------------+
                               |
                               | JSON APIs
                               v
+------------------------------------------------------+
|             React / Next.js Dashboard                |
|                                                      |
|   - Real-time Metrics                                |
|   - Logs & Alerts                                    |
|   - AI Insights & Predictions                        |
+------------------------------------------------------+


    
## 🛠 Tech Stack

| Layer | Technology |
|-------|------------|
| **Frontend** | React / Next.js 14, TypeScript, Tailwind CSS |
| **Backend** | FastAPI (Python 3.11+), Pydantic, SQLAlchemy |
| **AI/ML** | OpenAI API, LangChain, Custom ML Models |
| **Monitoring** | Prometheus, Grafana, AlertManager |
| **Logging** | Loki, Promtail, Fluentd |
| **Infrastructure** | Docker, Kubernetes, AWS EKS, Terraform |
| **CI/CD** | GitHub Actions, ArgoCD |
| **Database** | PostgreSQL, Redis (Caching) |
| **Message Queue** | RabbitMQ / Kafka |

## ✨ Features

### 📊 **Real-time Monitoring Dashboard**
- Live CPU, memory, and pod health visualization
- Interactive node and container statistics
- Customizable alert thresholds and notifications
- Multi-cluster support with centralized view

### 🔍 **Unified Log Management**
- Centralized log aggregation across all containers
- Advanced search with regex and filtering
- Log-to-metric correlation for faster debugging
- Historical log retention and analysis

### 🧠 **Intelligent AI Insights**
- **Natural Language Error Analysis**: "Explain this error in simple terms"
- **Predictive Analytics**: Identify patterns leading to failures
- **Automated Recommendations**: Code-level fix suggestions
- **Performance Optimization**: Resource usage recommendations

### 🎨 **Modern User Experience**
- Responsive, mobile-friendly interface
- Dark/light mode toggle
- Real-time updates via WebSocket
- Exportable reports and dashboards

### ⚡ **Production-Grade Infrastructure**
- Auto-scaling with HPA
- Blue-green deployment support
- Zero-downtime updates
- Comprehensive monitoring of the monitoring system

## 📂 Project Structure
MahiOpsAI/
├── frontend/ # Next.js 14 dashboard
│ ├── app/ # App router pages
│ ├── components/ # Reusable UI components
│ ├── lib/ # Utilities and hooks
│ ├── services/ # API service clients
│ └── styles/ # Tailwind + CSS modules
│
├── backend/ # FastAPI microservices
│ ├── api/ # REST endpoints
│ │ ├── v1/ # Versioned APIs
│ │ │ ├── metrics.py
│ │ │ ├── logs.py
│ │ │ └── ai_engine.py
│ ├── core/ # Config, security, middleware
│ ├── models/ # Pydantic + SQLAlchemy models
│ ├── services/ # Business logic
│ ├── ml_models/ # Custom ML models
│ └── main.py # FastAPI app entry
│
├── monitoring/ # Monitoring stack configs
│ ├── prometheus/ # Rules, alerts, configs
│ ├── grafana/ # Dashboards, datasources
│ └── loki/ # Log aggregation config
│
├── k8s/ # Kubernetes manifests
│ ├── base/ # Common resources
│ ├── overlays/ # Environment-specific
│ │ ├── dev/
│ │ ├── staging/
│ │ └── production/
│ ├── helm/ # Helm charts (optional)
│ └── crds/ # Custom Resource Definitions
│
├── infrastructure/ # IaC configurations
│ ├── terraform/ # AWS/EKS provisioning
│ └── ansible/ # Server configuration
│
├── ci-cd/ # Pipeline configurations
│ ├── github-actions/ # Workflow definitions
│ └── argocd/ # GitOps configurations
│
├── scripts/ # Utility scripts
├── tests/ # Test suites
├── docs/ # Documentation
├── docker-compose.yml # Local development
├── Dockerfile # Multi-stage builds
├── .github/ # PR templates, issue forms
├── README.md
└── LICENSE


## 🚀 Getting Started

### Prerequisites
- Docker & Docker Compose
- Kubernetes cluster (or Minikube for local)
- Python 3.11+
- Node.js 18+
- OpenAI API key (for AI features)

### Quick Start with Docker Compose
```bash
# Clone the repository
git clone https://github.com/jagdishmaliwad/MahiOpsAI.git
cd MahiOpsAI

# Copy environment variables
cp .env.example .env
# Edit .env and add your OpenAI API key

# Start all services
docker-compose up -d

# Access the application
# Frontend: http://localhost:3000
# Backend API: http://localhost:8000
# API Docs: http://localhost:8000/docs
# Grafana: http://localhost:9090
# Apply Kubernetes manifests
kubectl apply -f k8s/base/

# For production with overlays
kubectl apply -k k8s/overlays/production/

# Check deployment status
kubectl get pods -n mahiopsai
# Backend setup
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
uvicorn main:app --reload

# Frontend setup (in another terminal)
cd frontend
npm install
npm run dev
