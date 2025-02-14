import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/components/ui/use-toast"

interface Participant {
  id: string;
  name: string;
  share: number;
}

interface ExpenseFormProps {
  onSubmit: (expense: {
    description: string;
    amount: number;
    paidBy: string;
    participants: Participant[];
    date: string;
  }) => void;
  participants: Participant[];
}

const ExpenseForm = ({ onSubmit, participants }: ExpenseFormProps) => {
  const { toast } = useToast()
  const [description, setDescription] = useState('')
  const [amount, setAmount] = useState('')
  const [paidBy, setPaidBy] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!description || !amount || !paidBy) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please fill in all required fields",
      })
      return
    }

    onSubmit({
      description,
      amount: parseFloat(amount),
      paidBy,
      participants,
      date: new Date().toISOString(),
    })

    // Reset form
    setDescription('')
    setAmount('')
    setPaidBy('')
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Add New Expense</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Input
              id="description"
              placeholder="Dinner, Movie tickets, etc."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="amount">Amount</Label>
            <Input
              id="amount"
              type="number"
              min="0"
              step="0.01"
              placeholder="0.00"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="paidBy">Paid By</Label>
            <select
              id="paidBy"
              className="w-full rounded-md border border-input bg-background px-3 py-2"
              value={paidBy}
              onChange={(e) => setPaidBy(e.target.value)}
            >
              <option value="">Select person</option>
              {participants.map((participant) => (
                <option key={participant.id} value={participant.id}>
                  {participant.name}
                </option>
              ))}
            </select>
          </div>

          <Button type="submit" className="w-full">
            Add Expense
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}

export default ExpenseForm