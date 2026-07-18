from fastapi import APIRouter, HTTPException
from typing import Optional
from ..database import mesas_collection
from ..schemas.mesa import MesaCreate, MesaUpdate, serialize_mesa

router = APIRouter(prefix="/mesas", tags=["Mesas"])


@router.get("/", summary="Listar todas las mesas")
async def list_mesas(disponible: Optional[bool] = None):
    query = {}
    if disponible is not None:
        query["disponible"] = disponible
    query["activa"] = True

    mesas = await mesas_collection.find(query).to_list(100)
    return [serialize_mesa(m) for m in mesas]


@router.get("/{mesa_id}", summary="Obtener mesa por ID")
async def get_mesa(mesa_id: str):
    mesa = await mesas_collection.find_one({"_id": mesa_id})
    if not mesa:
        raise HTTPException(status_code=404, detail="Mesa no encontrada")
    return serialize_mesa(mesa)


@router.post("/", status_code=201, summary="Crear mesa (Admin)")
async def create_mesa(dto: MesaCreate):
    doc = dto.model_dump()
    result = await mesas_collection.insert_one(doc)
    created = await mesas_collection.find_one({"_id": result.inserted_id})
    return serialize_mesa(created)


@router.put("/{mesa_id}", summary="Actualizar mesa (Admin)")
async def update_mesa(mesa_id: str, dto: MesaUpdate):
    update_data = {k: v for k, v in dto.model_dump().items() if v is not None}
    if not update_data:
        raise HTTPException(status_code=400, detail="Sin datos para actualizar")

    result = await mesas_collection.update_one({"_id": mesa_id}, {"$set": update_data})
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Mesa no encontrada")

    updated = await mesas_collection.find_one({"_id": mesa_id})
    return serialize_mesa(updated)


@router.delete("/{mesa_id}", summary="Eliminar mesa (Admin)")
async def delete_mesa(mesa_id: str):
    result = await mesas_collection.delete_one({"_id": mesa_id})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Mesa no encontrada")
    return {"message": "Mesa eliminada exitosamente"}
