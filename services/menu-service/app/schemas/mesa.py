from pydantic import BaseModel, Field
from typing import Optional


class MesaBase(BaseModel):
    numero: int
    capacidad: int
    ubicacion: str = ""
    disponible: bool = True
    caracteristicas: list[str] = []
    activa: bool = True


class MesaCreate(MesaBase):
    pass


class MesaUpdate(BaseModel):
    numero: Optional[int] = None
    capacidad: Optional[int] = None
    ubicacion: Optional[str] = None
    disponible: Optional[bool] = None
    caracteristicas: Optional[list[str]] = None
    activa: Optional[bool] = None


def serialize_mesa(mesa: dict) -> dict:
    mesa["_id"] = str(mesa["_id"])
    return mesa
