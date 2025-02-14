import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface Expense {
  id: string;
  description: string;
  amount: number;
  paidBy: string;
  date: string;
  participants: Array<{
    id: string;
    name: string;
    share: number;
  }>;
}

interface ExpenseHistoryProps {
  expenses: Expense[];
  getParticipantName: (id: string) => string;
}

const ExpenseHistory = ({ expenses, getParticipantName }: ExpenseHistoryProps) => {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Expense History</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {expenses.length === 0 ? (
            <p className="text-center text-muted-foreground">No expenses yet</p>
          ) : (
            expenses.map((expense) => (
              <div
                key={expense.id}
                className="flex items-center justify-between border-b pb-4 last:border-0"
              >
                <div className="space-y-1">
                  <h3 className="font-medium">{expense.description}</h3>
                  <p className="text-sm text-muted-foreground">
                    Paid by {getParticipantName(expense.paidBy)}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {new Date(expense.date).toLocaleDateString()}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-medium">
                    ${expense.amount.toFixed(2)}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {expense.participants.length} participants
                  </p>
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  )
}

export default ExpenseHistory