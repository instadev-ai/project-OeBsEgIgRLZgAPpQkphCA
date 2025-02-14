import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/components/ui/use-toast"

interface Participant {
  id: string;
  name: string;
}

interface ParticipantManagementProps {
  onAddParticipant: (participant: Participant) => void;
  participants: Participant[];
  onRemoveParticipant: (id: string) => void;
}

const ParticipantManagement = ({
  onAddParticipant,
  participants,
  onRemoveParticipant
}: ParticipantManagementProps) => {
  const { toast } = useToast()
  const [newParticipantName, setNewParticipantName] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!newParticipantName.trim()) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please enter a name",
      })
      return
    }

    onAddParticipant({
      id: crypto.randomUUID(),
      name: newParticipantName.trim()
    })
    
    setNewParticipantName('')
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Participants</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="participantName">Add Participant</Label>
            <div className="flex space-x-2">
              <Input
                id="participantName"
                placeholder="Enter name"
                value={newParticipantName}
                onChange={(e) => setNewParticipantName(e.target.value)}
              />
              <Button type="submit">Add</Button>
            </div>
          </div>
        </form>

        <div className="mt-4 space-y-2">
          {participants.map((participant) => (
            <div
              key={participant.id}
              className="flex items-center justify-between rounded-lg border p-2"
            >
              <span>{participant.name}</span>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onRemoveParticipant(participant.id)}
              >
                Remove
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

export default ParticipantManagement