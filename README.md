# MahiOpsAI – AI-Powered DevOps Monitoring Platform

[![License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

---

## 🚀 Overview

**MahiOpsAI** is a web-based DevOps monitoring platform that leverages **AI/LLMs** to provide actionable insights for your infrastructure.  
It monitors **servers, containers, and Kubernetes clusters**, collects logs and metrics, and uses AI to:

- Explain errors in simple language  
- Predict failures before they happen  
- Suggest fixes automatically  

This project demonstrates **production-level DevOps skills combined with AI**, making it ideal for portfolio, remote job applications, and freelance clients.

---

## 🏗 Architecture

   ┌──────────────────┐
   │  Kubernetes/EKS  │
   │  Cluster         │
   │                  │
   │  - Pods          │
   │  - Nodes         │
   └─────┬────────────┘
         │ Metrics & Logs
 ┌───────▼────────┐
 │  Prometheus     │
 │  Grafana        │
 │  Loki           │
 └───────┬────────┘
         │ API Calls
 ┌───────▼────────┐
 │  FastAPI Backend│
 │  - Metrics API  │
 │  - Logs API     │
 │  - AI Engine    │
 └───────┬────────┘
         │ JSON
 ┌───────▼────────┐
 │ React/Next.js  │
 │ Dashboard UI   │
 └────────────────┘


---

## 🛠 Tech Stack

| Layer          | Technology                 |
|----------------|---------------------------|
| Frontend       | React / Next.js           |
| Backend        | FastAPI (Python)          |
| Monitoring     | Prometheus + Grafana      |
| Logging        | Loki                      |
| AI Engine      | OpenAI / LLM              |
| Infrastructure | Docker + Kubernetes + AWS |
| CI/CD          | GitHub Actions            |

---

## ✨ Features

- **Real-time Metrics:** CPU, memory, pod health, container stats  
- **Log Aggregation:** Search and filter logs across containers  
- **AI-Powered Insights:**  
  - Explain errors in human-readable language  
  - Predict potential failures  
  - Suggest actionable fixes  
- **Dashboard UI:** Interactive web interface for monitoring  
- **CI/CD Integration:** Automated deployment using GitHub Actions  

---

## 📂 Project Structure


