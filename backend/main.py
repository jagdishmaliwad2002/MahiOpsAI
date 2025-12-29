from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import psutil
import time
import docker
client = docker.from_env()

app = FastAPI(title="MahiOpsAI Backend")

# -----------------------------
# CORS (allow frontend access)
# -----------------------------
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # for development
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# -----------------------------
# Helper Functions
# -----------------------------
def get_cpu_usage():
    return psutil.cpu_percent(interval=0.5)

def get_memory_details():
    mem = psutil.virtual_memory()
    return {
        "total": mem.total,
        "used": mem.used,
        "percent": mem.percent
    }

# -----------------------------
# Root Endpoint
# -----------------------------
@app.get("/")
def root():
    return {"status": "MahiOpsAI backend running"}

# -----------------------------
# Metrics Endpoints
# -----------------------------
@app.get("/metrics/cpu")
def cpu_metrics():
    return {
        "cpu_usage": get_cpu_usage()
    }

@app.get("/metrics/memory")
def memory_metrics():
    return get_memory_details()

# -----------------------------
# AI Prediction Endpoint
# -----------------------------
@app.get("/ai/predict")
def ai_predict():
    cpu = get_cpu_usage()
    memory = get_memory_details()["percent"]

    if cpu > 80 or memory > 85:
        prediction = "High risk of failure"
        suggestions = [
            "Scale resources",
            "Restart heavy services",
            "Check memory leaks"
        ]
    elif cpu > 60 or memory > 70:
        prediction = "Moderate load detected"
        suggestions = [
            "Monitor closely",
            "Optimize running processes"
        ]
    else:
        prediction = "System healthy"
        suggestions = ["No action required"]

    return {
        "failure_prediction": prediction,
        "auto_fix_suggestions": suggestions
    }

# -----------------------------
# Alerts Endpoint
# -----------------------------
@app.get("/alerts")
def get_alerts():
    cpu = get_cpu_usage()
    memory = get_memory_details()["percent"]

    status = "OK"
    if cpu > 80 or memory > 85:
        status = "CRITICAL"
    elif cpu > 60 or memory > 70:
        status = "WARNING"

    return {
        "status": status,
        "cpu": cpu,
        "memory": memory
    }

@app.get("/docker/containers")
def list_containers():
    containers = client.containers.list(all=True)

    result = []

    for c in containers:
        ports = c.attrs.get("NetworkSettings", {}).get("Ports", {})

        exposed = []

        if ports:
            for port, mappings in ports.items():
                if mappings:
                    for m in mappings:
                        exposed.append({
                            "container_port": port,
                            "host": m.get("HostIp"),
                            "host_port": m.get("HostPort"),
                            "url": f"http://localhost:{m.get('HostPort')}"
                        })

        result.append({
            "id": c.short_id,
            "name": c.name,
            "image": c.image.tags[0] if c.image.tags else "unknown",
            "status": c.status,
            "ports": exposed
        })

    return {"containers": result}
