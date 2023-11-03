import { useState } from "react";
import { alertSuccess } from "../../Alert/Alert";
import { DeleteModal } from "../../DeleteModal/DeleteModal";
import { deleteAccount } from "./requests";
import { logout } from "../../../tools/logout";

export let openDeleteAccountModal: ()=>void;

export function DeleteAccountModal() {
    const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);

    openDeleteAccountModal = ()=>{ setIsOpenDeleteModal(true) };

    return (
        <DeleteModal
            titleLabel={"Deletar conta"}
            showModal={isOpenDeleteModal}
            closeModal={()=>{setIsOpenDeleteModal(false)}}
            callback={async ()=>{
                const success = await deleteAccount();
                if(success) {
                    alertSuccess("Conta deletada com sucesso.")
                    setIsOpenDeleteModal(false);
                    logout();
                }
            }}
            bodyLabel={"Essa ação irá deletar sua conta."}
        />
    )
}