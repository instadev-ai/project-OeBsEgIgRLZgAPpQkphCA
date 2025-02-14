import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
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

    setDescription('')
    setAmount('')
    setPaidBy('')
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">New Expense</h2>
        <p className="text-gray-500 dark:text-gray-400">Add a new expense to split</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="description" className="text-sm font-medium">Description</Label>
          <Input
            id="description"
            placeholder="Dinner, Movie tickets, etc."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="bg-white dark:bg-gray-900"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="amount" className="text-sm font-medium">Amount</Label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
            <Input
              id="amount"
              type="number"
              min="0"
              step="0.01"
              placeholder="0.00"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="pl-8 bg-white dark:bg-gray-900"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="paidBy" className="text-sm font-medium">Paid By</Label>
          <select
            id="paidBy"
            className="w-full rounded-md border border-input bg-white dark:bg-gray-900 px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring"
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

        <Button 
          type="submit" 
          className="w-full bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-700 hover:to-violet-700 text-white"
        >
          Add Expense
        </Button>
      </form>
    </div>
  )
}

export default ExpenseForm