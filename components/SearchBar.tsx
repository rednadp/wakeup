import { TextInput } from "react-native";

type Props = {
    value: string
}


export default function SearchBar({value}: Props) {
    return (
        <TextInput value={value}></TextInput>
    )
}
