import { DollarSign, PieChart } from 'lucide-react';
import { BudgetBreakdown } from '../types';

interface BudgetPlannerProps {
  budget: BudgetBreakdown;
}

export default function BudgetPlanner({ budget }: BudgetPlannerProps) {
  const categories = [
    { name: 'Transport', amount: budget.transport, color: 'bg-blue-500' },
    { name: 'Accommodation', amount: budget.accommodation, color: 'bg-green-500' },
    { name: 'Food', amount: budget.food, color: 'bg-orange-500' },
    { name: 'Activities', amount: budget.activities, color: 'bg-purple-500' },
  ];

  const maxAmount = Math.max(...categories.map(c => c.amount));

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <div className="flex items-center space-x-3 mb-6">
        <PieChart className="text-green-500" size={24} />
        <h2 className="text-2xl font-bold text-gray-800">Budget Breakdown</h2>
      </div>

      {budget.budgetWarning && (
        <div className="bg-orange-50 border-l-4 border-orange-500 p-4 rounded-lg mb-6">
          <p className="text-orange-700 text-sm">{budget.budgetWarning}</p>
        </div>
      )}

      <div className="space-y-4 mb-6">
        {categories.map((category) => {
          const percentage = (category.amount / budget.total) * 100;
          const barWidth = (category.amount / maxAmount) * 100;

          return (
            <div key={category.name}>
              <div className="flex justify-between items-center mb-2">
                <span className="font-semibold text-gray-700">{category.name}</span>
                <span className="font-bold text-gray-800">
                  ${category.amount.toLocaleString()}
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                <div
                  className={`${category.color} h-full rounded-full transition-all duration-500`}
                  style={{ width: `${barWidth}%` }}
                ></div>
              </div>
              <div className="text-right text-xs text-gray-500 mt-1">
                {percentage.toFixed(1)}% of total
              </div>
            </div>
          );
        })}
      </div>

      <div className="border-t border-gray-200 pt-4">
        <div className="flex justify-between items-center mb-2">
          <span className="text-lg font-bold text-gray-800">Total Cost</span>
          <span className="text-2xl font-bold text-blue-600">
            ${budget.total.toLocaleString()} {budget.currency}
          </span>
        </div>

        {budget.localCurrency && budget.localCurrencyTotal && budget.localCurrency !== 'USD' && (
          <div className="bg-blue-50 rounded-lg p-3 mt-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <DollarSign className="text-blue-600" size={20} />
                <span className="text-sm text-gray-700">Local Currency</span>
              </div>
              <span className="text-lg font-bold text-blue-600">
                {budget.localCurrencyTotal.toLocaleString()} {budget.localCurrency}
              </span>
            </div>
            <p className="text-xs text-gray-600 mt-1">
              Approximate conversion for budgeting purposes
            </p>
          </div>
        )}
      </div>

      <div className="mt-4 grid grid-cols-2 gap-3">
        <div className="bg-gray-50 rounded-lg p-3">
          <p className="text-xs text-gray-600 mb-1">Daily Average</p>
          <p className="text-lg font-bold text-gray-800">
            ${Math.round(budget.total / ((budget.accommodation / 100) || 1))}
          </p>
        </div>
        <div className="bg-gray-50 rounded-lg p-3">
          <p className="text-xs text-gray-600 mb-1">Per Person</p>
          <p className="text-lg font-bold text-gray-800">
            ${budget.total.toLocaleString()}
          </p>
        </div>
      </div>
    </div>
  );
}
