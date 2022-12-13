import { TextFieldCustom } from "../../MyComponents/TextFieldCustom";



export default function NewTransfert(props){

    return(
        <>
            <TextFieldCustom
              fullWidth
              error={false}
              id="name"
              label={'Nom'}
              required
              //defaultValue="Hello World"
              //value={displayName}
              //onChange={onChangeName}
              helperText={"Incorrect entry."}
              //theme={theme}
              placeholder={"Nom"}
            />
        </>
    )
}