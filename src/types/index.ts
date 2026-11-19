export type RecordType = 'income' | 'expense'

export interface RecordItem {
  id: string
  type: RecordType
  amount: number
  category: string
  remark: string
  date: string
  createdAt: number
}

export interface Category {
  id: string
  name: string
  icon: string
  type: RecordType
}

export const EXPENSE_CATEGORIES: Category[] = [
  { id: 'food', name: '餐饮', icon: 'UtensilsCrossed', type: 'expense' },
  { id: 'transport', name: '交通', icon: 'Bus', type: 'expense' },
  { id: 'shopping', name: '购物', icon: 'ShoppingBag', type: 'expense' },
  { id: 'entertainment', name: '娱乐', icon: 'Gamepad2', type: 'expense' },
  { id: 'medical', name: '医疗', icon: 'HeartPulse', type: 'expense' },
  { id: 'other_expense', name: '其他', icon: 'MoreHorizontal', type: 'expense' },
]

export const INCOME_CATEGORIES: Category[] = [
  { id: 'salary', name: '工资', icon: 'Banknote', type: 'income' },
  { id: 'parttime', name: '兼职', icon: 'Briefcase', type: 'income' },
  { id: 'investment', name: '投资', icon: 'TrendingUp', type: 'income' },
  { id: 'other_income', name: '其他', icon: 'MoreHorizontal', type: 'income' },
]

export const ALL_CATEGORIES = [...EXPENSE_CATEGORIES, ...INCOME_CATEGORIES]
