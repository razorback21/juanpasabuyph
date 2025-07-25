import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function ImageUpload() {
  return (
    <div className="grid w-full max-w-sm items-center gap-3">
      <Label htmlFor="picture">Picture</Label>
      <Input id="picture" type="file" />
    </div>
  )
}
