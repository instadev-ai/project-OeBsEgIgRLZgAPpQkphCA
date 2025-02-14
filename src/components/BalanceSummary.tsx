import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface Balance {
  from: string;
  to: string;
  amount: number;
}

interface BalanceSummaryProps {
  balances: Balance[];
  getParticipantName: (id: string) => string;
}

const BalanceSummary = ({ balances, getParticipantName }: BalanceSummaryProps) => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">Settlement Summary</h2>
        <p className="text-gray-500 dark:text-gray-400">Who owes whom</p>
      </div>

      <div className="space-y-4">
        {balances.length === 0 ? (
          <div className="text-center py-8">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-green-100 dark:bg-green-900 mb-4">
              <svg className="w-6 h-6 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <p className="text-gray-600 dark:text-gray-300 font-medium">All settled up!</p>
          </div>
        ) : (
          balances.map((balance, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-4 rounded-lg bg-white dark:bg-gray-900 shadow-sm transition-all hover:shadow-md"
            >
              <div className="flex items-center space-x-2">
                <span className="font-medium text-gray-900 dark:text-white">
                  {getParticipantName(balance.from)}
                </span>
                <span className="text-gray-500 dark:text-gray-400">owes</span>
                <span className="font-medium text-gray-900 dark:text-white">
                  {getParticipantName(balance.to)}
                </span>
              </div>
              <div className="text-lg font-semibold bg-gradient-to-r from-blue-600 to-violet-600 text-transparent bg-clip-text">
                ${balance.amount.toFixed(2)}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default BalanceSummary