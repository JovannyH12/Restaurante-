from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
import os

from .routes.menu import router as menu_router
from .routes.mesas import router as mesas_router

load_dotenv()

app = FastAPI(
    title="Menu Service - Reservaciones",
    description="API del catalogo de platillos y mesas (MongoDB)",
    version="1.0",
    docs_url="/docs",
    redoc_url="/redoc",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(menu_router, prefix="/api")
app.include_router(mesas_router, prefix="/api")


@app.get("/api/health")
async def health():
    return {"service": "menu-service", "status": "ok", "language": "python", "framework": "fastapi"}
