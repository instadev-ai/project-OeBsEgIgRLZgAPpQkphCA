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
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Settlement Summary</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {balances.length === 0 ? (
            <p className="text-center text-muted-foreground">All settled up!</p>
          ) : (
            balances.map((balance, index) => (
              <div
                key={index}
                className="flex items-center justify-between border-b pb-4 last:border-0"
              >
                <div className="flex items-center space-x-2">
                  <span className="font-medium">
                    {getParticipantName(balance.from)}
                  </span>
                  <span className="text-muted-foreground">owes</span>
                  <span className="font-medium">
                    {getParticipantName(balance.to)}
                  </span>
                </div>
                <div className="font-medium text-primary">
                  ${balance.amount.toFixed(2)}
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  )
}

export default BalanceSummary