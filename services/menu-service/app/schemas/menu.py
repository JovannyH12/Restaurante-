from pydantic import BaseModel, Field
from typing import Optional
from bson import ObjectId


class OpcionExtra(BaseModel):
    nombre: str
    costo_extra: float = 0.0


class MenuItemBase(BaseModel):
    nombre: str
    descripcion: str = ""
    categoria: str = "General"
    precio: float
    imagen_url: str = ""
    disponible: bool = True
    ingredientes: list[str] = []
    alergenos: list[str] = []
    opciones: list[OpcionExtra] = []
    tiempo_preparacion_min: int = 15
    calorias: int = 0
    tags: list[str] = []


class MenuItemCreate(MenuItemBase):
    pass


class MenuItemUpdate(BaseModel):
    nombre: Optional[str] = None
    descripcion: Optional[str] = None
    categoria: Optional[str] = None
    precio: Optional[float] = None
    imagen_url: Optional[str] = None
    disponible: Optional[bool] = None
    ingredientes: Optional[list[str]] = None
    alergenos: Optional[list[str]] = None
    opciones: Optional[list[OpcionExtra]] = None
    tiempo_preparacion_min: Optional[int] = None
    calorias: Optional[int] = None
    tags: Optional[list[str]] = None


class MenuItemResponse(MenuItemBase):
    id: str = Field(alias="_id")

    class Config:
        populate_by_name = True


def serialize_menu_item(item: dict) -> dict:
    item["_id"] = str(item["_id"])
    return item
