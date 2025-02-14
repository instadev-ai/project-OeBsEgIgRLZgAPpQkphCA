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
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">Expense History</h2>
        <p className="text-gray-500 dark:text-gray-400">Recent expenses</p>
      </div>

      <div className="space-y-4">
        {expenses.length === 0 ? (
          <div className="text-center py-8">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gray-100 dark:bg-gray-800 mb-4">
              <svg className="w-6 h-6 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <p className="text-gray-600 dark:text-gray-300">No expenses yet</p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Add your first expense to get started!</p>
          </div>
        ) : (
          expenses.map((expense) => (
            <div
              key={expense.id}
              className="p-4 rounded-lg bg-white dark:bg-gray-900 shadow-sm transition-all hover:shadow-md"
            >
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <h3 className="font-medium text-gray-900 dark:text-white text-lg">
                    {expense.description}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Paid by <span className="font-medium text-gray-700 dark:text-gray-300">{getParticipantName(expense.paidBy)}</span>
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {new Date(expense.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-semibold bg-gradient-to-r from-blue-600 to-violet-600 text-transparent bg-clip-text">
                    ${expense.amount.toFixed(2)}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    {expense.participants.length} participant{expense.participants.length !== 1 ? 's' : ''}
                  </p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default ExpenseHistory