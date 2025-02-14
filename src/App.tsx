import { useState } from 'react'
import ExpenseForm from './components/ExpenseForm'
import ExpenseHistory from './components/ExpenseHistory'
import BalanceSummary from './components/BalanceSummary'
import ParticipantManagement from './components/ParticipantManagement'
import { Toaster } from "@/components/ui/toaster"
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

interface Participant {
  id: string;
  name: string;
  share: number;
}

interface Expense {
  id: string;
  description: string;
  amount: number;
  paidBy: string;
  date: string;
  participants: Participant[];
}

interface Balance {
  from: string;
  to: string;
  amount: number;
}

const queryClient = new QueryClient()

function App() {
  const [participants, setParticipants] = useState<Participant[]>([])
  const [expenses, setExpenses] = useState<Expense[]>([])

  const addParticipant = (participant: { id: string; name: string }) => {
    setParticipants([...participants, { ...participant, share: 0 }])
  }

  const removeParticipant = (id: string) => {
    setParticipants(participants.filter(p => p.id !== id))
  }

  const addExpense = (expense: Omit<Expense, 'id'>) => {
    const newExpense = {
      ...expense,
      id: crypto.randomUUID(),
    }
    setExpenses([newExpense, ...expenses])
  }

  const getParticipantName = (id: string) => {
    return participants.find(p => p.id === id)?.name || 'Unknown'
  }

  const calculateBalances = (): Balance[] => {
    const balances: { [key: string]: number } = {}
    
    // Initialize balances for all participants
    participants.forEach(p => {
      balances[p.id] = 0
    })

    // Calculate net balance for each participant
    expenses.forEach(expense => {
      const payer = expense.paidBy
      const amountPerPerson = expense.amount / expense.participants.length

      expense.participants.forEach(participant => {
        if (participant.id === payer) {
          balances[payer] += expense.amount - amountPerPerson
        } else {
          balances[participant.id] -= amountPerPerson
          balances[payer] += amountPerPerson
        }
      })
    })

    // Convert balances to transfer instructions
    const transfers: Balance[] = []
    const debtors = Object.entries(balances)
      .filter(([_, amount]) => amount < 0)
      .sort(([, a], [, b]) => a - b)
    const creditors = Object.entries(balances)
      .filter(([_, amount]) => amount > 0)
      .sort(([, a], [, b]) => b - a)

    while (debtors.length > 0 && creditors.length > 0) {
      const [debtorId, debtorBalance] = debtors[0]
      const [creditorId, creditorBalance] = creditors[0]

      const amount = Math.min(Math.abs(debtorBalance), creditorBalance)

      if (amount > 0.01) { // Only add transfers for non-zero amounts
        transfers.push({
          from: debtorId,
          to: creditorId,
          amount: Number(amount.toFixed(2))
        })
      }

      if (Math.abs(debtorBalance) === creditorBalance) {
        debtors.shift()
        creditors.shift()
      } else if (Math.abs(debtorBalance) < creditorBalance) {
        debtors.shift()
        creditors[0][1] -= Math.abs(debtorBalance)
      } else {
        creditors.shift()
        debtors[0][1] += creditorBalance
      }
    }

    return transfers
  }

  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen bg-background p-4 md:p-8">
        <div className="mx-auto max-w-6xl space-y-8">
          <h1 className="text-4xl font-bold text-center mb-8">Split Bills</h1>
          
          <div className="grid gap-8 md:grid-cols-2">
            <div className="space-y-8">
              <ParticipantManagement
                onAddParticipant={addParticipant}
                participants={participants}
                onRemoveParticipant={removeParticipant}
              />
              
              <ExpenseForm
                onSubmit={addExpense}
                participants={participants}
              />
            </div>

            <div className="space-y-8">
              <BalanceSummary
                balances={calculateBalances()}
                getParticipantName={getParticipantName}
              />
              
              <ExpenseHistory
                expenses={expenses}
                getParticipantName={getParticipantName}
              />
            </div>
          </div>
        </div>
        <Toaster />
      </div>
    </QueryClientProvider>
  )
}

export default App