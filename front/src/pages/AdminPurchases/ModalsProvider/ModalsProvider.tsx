import { useEffect, useState } from "react";
import { DeleteModal } from "../../../components/DeleteModal/DeleteModal";
import { updateEntities } from "../AdminPurchases";

export let openDeleteModal:(targetEntity: Record<string, unknown>)=>void;

export function ModalsProvider() {
    const [targetEntity, setTargetEntity] = useState<Record<string, unknown>>({});
    const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);

    openDeleteModal = (targetEntity: Record<string, unknown>)=>{ 
        setTargetEntity({...targetEntity}); 
        setIsOpenDeleteModal(true);
    }

    return (
        <div>
            {
                isOpenDeleteModal && 
                    <DeleteModal
                        titleLabel={"Remover Produto"}
                        showModal={isOpenDeleteModal}
                        closeModal={()=>{setIsOpenDeleteModal(false)}}
                        callback={()=>{
                            //deleteEntity(targetEntity._id as string);
                            setIsOpenDeleteModal(false);
                            setTargetEntity({});
                            updateEntities();
                        }}
                        bodyLabel={"Essa ação irá remover o produto."}
                    />
            }
        </div>
    )
}