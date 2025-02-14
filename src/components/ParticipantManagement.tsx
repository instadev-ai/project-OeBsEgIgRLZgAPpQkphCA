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
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">Participants</h2>
        <p className="text-gray-500 dark:text-gray-400">Add friends to split bills with</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="participantName" className="text-sm font-medium">
            Add Participant
          </Label>
          <div className="flex space-x-2">
            <Input
              id="participantName"
              placeholder="Enter name"
              value={newParticipantName}
              onChange={(e) => setNewParticipantName(e.target.value)}
              className="flex-1 bg-white dark:bg-gray-900"
            />
            <Button 
              type="submit"
              className="bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-700 hover:to-violet-700 text-white"
            >
              Add
            </Button>
          </div>
        </div>
      </form>

      <div className="space-y-3">
        {participants.map((participant) => (
          <div
            key={participant.id}
            className="flex items-center justify-between rounded-lg bg-white dark:bg-gray-900 p-4 shadow-sm transition-all hover:shadow-md"
          >
            <span className="font-medium text-gray-900 dark:text-white">{participant.name}</span>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onRemoveParticipant(participant.id)}
              className="text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20"
            >
              Remove
            </Button>
          </div>
        ))}
        {participants.length === 0 && (
          <p className="text-center text-gray-500 dark:text-gray-400 py-4">
            No participants yet. Add someone to get started!
          </p>
        )}
      </div>
    </div>
  )
}

export default ParticipantManagement