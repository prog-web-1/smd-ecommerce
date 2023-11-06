import { useState } from "react";
import { DeleteModal } from "../../../components/DeleteModal/DeleteModal";
import { updateEntities } from "../AdminPurchases";
import { SaveModal } from "../../../components/SaveModal/SaveModal";
import { getSaveModalFields } from "./getSaveModalFields";
import { alertSuccess } from "../../../components/Alert/Alert";
import { deletePurchase, updatePurchaseStatus } from "./requests";

export let openDeleteModal:(targetEntity: Record<string, unknown>)=>void;
export let openDetailsModal:(targetEntity: Record<string, unknown>)=>void;

export function ModalsProvider() {
    const [targetEntity, setTargetEntity] = useState<Record<string, unknown>>({});
    const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);
    const [isOpenDetailsModal, setIsOpenDetailsModal] = useState(false);

    openDeleteModal = (targetEntity: Record<string, unknown>)=>{ 
        setTargetEntity({...targetEntity}); 
        setIsOpenDeleteModal(true);
    }

    openDetailsModal = (targetEntity: Record<string, unknown>)=>{ 
        setTargetEntity({...targetEntity});
        setIsOpenDetailsModal(true);
    }

    return (
        <div>
            {
                isOpenDeleteModal && 
                    <DeleteModal
                        titleLabel={"Remover venda"}
                        showModal={isOpenDeleteModal}
                        closeModal={()=>{setIsOpenDeleteModal(false)}}
                        callback={()=>{
                            deletePurchase(targetEntity.id as string);
                            setIsOpenDeleteModal(false);
                            setTargetEntity({});
                            updateEntities();
                        }}
                        bodyLabel={"Essa ação irá remover a venda."}
                    />
            }
            {isOpenDetailsModal &&
                    <SaveModal
                        titleLabel={"Detalhes da venda"}
                        showModal={isOpenDetailsModal}
                        closeModal={()=>{setIsOpenDetailsModal(false); setTargetEntity({});}}
                        targetEntity={targetEntity}
                        fields={
                            getSaveModalFields({
                                initialEntity: targetEntity,
                            })
                        }
                        footerButtons={targetEntity && targetEntity.status === "Pendente" ? [
                            {
                                label: "Rejeitar",
                                callback: async ()=>{
                                    const success = await updatePurchaseStatus(targetEntity.id as string, "rejeitado");

                                    if(success) {
                                        alertSuccess("Venda rejeitada com sucesso.");
                                        setTargetEntity({});
                                        setIsOpenDetailsModal(false); 
                                        updateEntities();
                                    }
                                }
                            },
                            {
                                label: "Aprovar",
                                callback: async ()=>{
                                    const success = await updatePurchaseStatus(targetEntity.id as string, "confirmado");

                                    if(success) {
                                        alertSuccess("Venda aprovada com sucesso.");
                                        setTargetEntity({});
                                        setIsOpenDetailsModal(false); 
                                        updateEntities();
                                    }
                                }
                            },
                        ] : []}
                    />
                }
        </div>
    )
}