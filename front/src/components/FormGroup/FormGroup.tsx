import { validateInput } from "../../tools/validateInputs";
import { PhoneNumberInput } from "./PhoneNumberInput/PhoneNumberInput";
import Select, { StylesConfig } from 'react-select';
import { DateInput } from "./DateInput/DateInput";

import "./FormGroup.css";

export type inputTypes = 'text' | 'number' | 'select' | 'password' | "phone_number" | "multiSelect" | "date";
export type inputSizes = '33' | '66' | '50' | '100';

export interface IFormGroupProps {
    type: inputTypes,
    size: inputSizes,
    label?: string,
    placeholder: string,
    disabled?: boolean,
    id: string,
    defaultValue?: string | Record<string, string>[] | Date,
    onChange?: (value: string | Date | string[])=>void,
    validations?: string[],
    errorMessage?: string,
    setFieldValidation?: (field: string, value: string)=>void,
    matchValue?: string;
    options?: {
        label: string | JSX.Element,
        value: string,
    }[];
    inputExtraClass?: string;
    inputContainerExtraClass?: string;
}

function FormGroup(props: IFormGroupProps) {
    return (
        <div className={`size-${props.size} ${props.inputContainerExtraClass ? `${props.inputContainerExtraClass}` : ""}`}>
            <label className="input-label">{props.label}</label>
            {_generateInput(props)}
            <div className="is-invalid-label">{props.errorMessage}</div>
        </div>
    )
}

function _generateInput(props: IFormGroupProps) {
    let input;

    switch(props.type) {
        case 'text':
            input = _generateTextInput(props);
            break;
        case 'password':
            input = _generateTextInput(props);
            break;
        case 'number':
            input = _generateTextInput(props);
            break;
        case 'select':
            input = _generateSelectInput(props);
            break;
        case 'phone_number':
            input = _generatePhoneInput(props);
            break;
        case 'multiSelect':
            input = _generateMultiSelectInput(props);
            break;
        case 'date':
            input = _generateDateInput(props);
            break;
        default:
            break;
    }

    return input;
}

function _generateMultiSelectInput(props: IFormGroupProps) {
    return (
        <Select
            options={props.options}
            isDisabled={props.disabled}
            isMulti={true}
            id={props.id}
            placeholder={props.placeholder}
            styles={{
                valueContainer: styles => ({
                    alignItems: "center",
                    display: "flex",
                    padding: "0px 7px",
                    width: "100%",
                    flexWrap: "wrap",
                }),
                multiValue: styles =>({
                    ...styles,
                    fontSize: "15px",
                }),
                
                option: styles =>({
                    ...styles,
                    fontSize: "15px",
                }),
                input: styles =>({
                    ...styles,
                    fontSize: "15px",
                    caretColor: "transparent"
                }),
                placeholder: styles =>({
                    ...styles,
                    fontSize: "15px",
                }),
                noOptionsMessage: styles =>({
                    ...styles,
                    fontSize: "15px",
                }),
                control: (styles, {isDisabled}) => ({ 
                    display:"flex",
                    borderRadius: "10px",
                    border: "1px solid rgb(202,202,202)",
                    marginTop: "4px",
                    backgroundColor: isDisabled && "#efefef",
                    color: isDisabled && "rgb(170, 170, 170)",
                    opacity: isDisabled && "1",
                }),
            } as StylesConfig}
            defaultValue={props.defaultValue as Record<string, unknown>[]}
            onChange={(selectedOptionsValues)=>{
                const selectedOptions = selectedOptionsValues as unknown as Record<string, string>[]
                if(props.onChange) {
                    const value = selectedOptions.map(option=>{
                        return option.value as string
                    })
                    if(props.validations) {
                        const validationError = validateInput(value, props.validations as string[], props.matchValue);
                        if(props.setFieldValidation){
                            props.setFieldValidation(props.id, validationError as string)
                        }
                    }
                    props.onChange(value);
                }
            }}
        />
    )
}

function _generatePhoneInput(props: IFormGroupProps) {
    return (
        <PhoneNumberInput
            disabled={props.disabled}
            id={props.id}
            defaultValue={props.defaultValue as string}
            onChange={props.onChange}
            validations={props.validations}
            setFieldValidation={props.setFieldValidation}
            errorMessage={props.errorMessage}
        />
    )
}

function _generateDateInput(props: IFormGroupProps) {
    return (
        <DateInput
            id={props.id}
            disabled={props.disabled}
            defaultValue={props.defaultValue as string}
            onChange={props.onChange}
            validations={props.validations}
            setFieldValidation={props.setFieldValidation}
            errorMessage={props.errorMessage}
        />
    )
}

function _generateTextInput(props: IFormGroupProps) {
    return (
        <input 
            className={`form-control-input ${props.errorMessage && "is-invalid-field"} ${props.inputExtraClass ? `${props.inputExtraClass}` : ""}`}
            onChange={(event)=>{
                if(props.onChange) {
                    if(props.validations) {
                        const validationError = validateInput(event.target.value, props.validations as string[], props.matchValue);
                        if(props.setFieldValidation){
                            props.setFieldValidation(props.id, validationError as string)
                        }
                    }
                    props.onChange(event.target.value);
                }
            }} 
            defaultValue={props.defaultValue as string} 
            id={props.id} 
            disabled={props.disabled}
            placeholder={props.placeholder} 
            type={props.type}
        />
    )
}

function _generateSelectInput(props: IFormGroupProps) {
    return (
        <select
            disabled={props.disabled}
            placeholder={props.placeholder}
            className={`form-control-input ${props.errorMessage && "is-invalid-field"} ${props.inputContainerExtraClass ? `${props.inputContainerExtraClass}` : ""}`}
            defaultValue={props.defaultValue as string}
            onChange={(event)=>{
                if(props.onChange) {
                    if(props.validations) {
                        const validationError = validateInput(event.target.value, props.validations as string[]);
                        if(props.setFieldValidation){
                            props.setFieldValidation(props.id, validationError as string)
                        }
                    }
                    props.onChange(event.target.value);
                }
            }} 
            id={props.id} 
        >
            <option value={""} disabled hidden>{props.placeholder}</option>
            {
                props.options && props.options.map((option)=>{
                    return (
                        <option value={option.value}>{option.label}</option>
                    )
                })
            }
        </select>
    )
}

export default FormGroup;