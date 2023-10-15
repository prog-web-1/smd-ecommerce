import "./LabelButton.css";

interface ILabelButtonProps {
    label: string;
    callback: ()=>void;
    extraClass?: string;
    disabled?: boolean;
    isSecondary?: boolean;
}

export function LabelButton(props: ILabelButtonProps) {
    return (
        <button className={`label-button ${!props.isSecondary ? "label-button-primary" : "label-button-secondary"} ${props.extraClass}`} type={"button"} onClick={()=>{props.callback()}} disabled={props.disabled} >{props.label}</button>
    )
}