import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

type Props = {
    label: string
    value: string
    onChange: (val: string) => void
    disabled?: boolean
}
export default function InputField({ label, value, onChange, disabled = false }: Props) {
    return (
        <div>
            <Label>{label}</Label>
            <Input value={value} disabled={disabled} onChange={e => onChange(e.target.value)} /> 
        </div>
    )
}