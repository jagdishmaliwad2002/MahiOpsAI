from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import psutil
import os

app = FastAPI()

# -----------------------------
# ⭐ CORS (allow frontend access)
# -----------------------------
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ----------------------------------------------------
# ⭐ Docker monitoring — only enabled when requested
# ----------------------------------------------------
DOCKER_ENABLED = os.getenv("DOCKER_ENABLED", "false").lower() == "true"

if DOCKER_ENABLED:
    import docker
    docker_client = docker.from_env()
else:
    docker_client = None


# -----------------------------
# ⭐ Root
# -----------------------------
@app.get("/")
def root():
    return {"status": "MahiOpsAI backend running"}


# -----------------------------
# ⭐ Metrics (CPU + Memory)
# -----------------------------
def get_cpu_usage():
    return round(psutil.cpu_percent(interval=1), 1)

def get_memory_usage():
    mem = psutil.virtual_memory()
    return {
        "total": mem.total,
        "used": mem.used,
        "percent": round(mem.percent, 1),
    }

@app.get("/metrics/cpu")
def cpu_metric():
    return {"cpu_usage": get_cpu_usage()}

@app.get("/metrics/memory")
def memory_metric():
    return get_memory_usage()


# -----------------------------
# ⭐ AI Prediction (simple logic for now)
# -----------------------------
@app.get("/ai/predict")
def ai_predict():
    cpu = get_cpu_usage()
    mem = get_memory_usage()["percent"]

    if cpu > 85 or mem > 85:
        return {
            "failure_prediction": "High risk — possible service outage soon",
            "auto_fix_suggestions": [
                "Scale resources",
                "Kill unused processes",
                "Check running containers",
            ],
        }

    if cpu > 60 or mem > 70:
        return {
            "failure_prediction": "Moderate load detected",
            "auto_fix_suggestions": [
                "Monitor closely",
                "Optimize heavy apps",
            ],
        }

    return {
        "failure_prediction": "System healthy",
        "auto_fix_suggestions": ["No action required"],
    }


# -----------------------------
# ⭐ Alerts
# -----------------------------
@app.get("/alerts")
def alerts():
    cpu = get_cpu_usage()
    mem = get_memory_usage()["percent"]

    if cpu > 90 or mem > 90:
        return {"status": "CRITICAL", "cpu": cpu, "memory": mem}

    if cpu > 70 or mem > 75:
        return {"status": "WARNING", "cpu": cpu, "memory": mem}

    return {"status": "OK", "cpu": cpu, "memory": mem}


# -----------------------------
# ⭐ Docker containers status
# -----------------------------
@app.get("/docker/containers")
def list_containers():
    if not docker_client:
        return {
            "containers": [],
            "message": "Docker monitoring disabled in Kubernetes",
        }

    containers = docker_client.containers.list(all=True)
    result = []

    for c in containers:
        ports = []
        if c.attrs.get("NetworkSettings", {}).get("Ports"):
            for p, val in c.attrs["NetworkSettings"]["Ports"].items():
                if val:
                    host = val[0].get("HostIp", "")
                    host_port = val[0].get("HostPort", "")
                    ports.append({
                        "container_port": p,
                        "host": host,
                        "host_port": host_port,
                        "url": f"http://localhost:{host_port}",
                    })

        result.append({
            "id": c.short_id,
            "name": c.name,
            "image": c.image.tags[0] if c.image.tags else "",
            "status": c.status,
            "ports": ports,
        })

    return {"containers": result}
