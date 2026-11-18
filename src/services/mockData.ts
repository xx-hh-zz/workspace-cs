import type { WorkflowForm } from '@/types/form';

const now = new Date().toISOString();
const yesterday = new Date(Date.now() - 86400000).toISOString();

export const MOCK_FORMS: WorkflowForm[] = [
  {
    id: 'APP-20241118-001',
    applicantName: '张三',
    department: '研发部',
    applyType: 'purchase',
    reason: '购买开发测试设备',
    amount: 5000,
    expectedDate: '2024-11-30',
    remark: '急需',
    status: 'Approved',
    createdAt: yesterday,
    updatedAt: now,
    approvalHistory: [
      { action: 'submit', operatorName: '张三', operatedAt: yesterday, comment: '提交申请' },
      { action: 'approve', operatorName: '李经理', operatedAt: now, comment: '符合预算，同意' },
    ],
  },
  {
    id: 'APP-20241118-002',
    applicantName: '李四',
    department: '销售部',
    applyType: 'reimbursement',
    reason: '客户拜访差旅费用',
    amount: 3500,
    expectedDate: '2024-11-25',
    status: 'Pending',
    createdAt: now,
    updatedAt: now,
    approvalHistory: [
      { action: 'submit', operatorName: '李四', operatedAt: now, comment: '提交申请' },
    ],
  },
  {
    id: 'APP-20241118-003',
    applicantName: '王五',
    department: '市场部',
    applyType: 'travel',
    reason: '参加行业展会',
    destination: '上海',
    expectedDate: '2024-12-05',
    status: 'Rejected',
    createdAt: yesterday,
    updatedAt: now,
    approvalHistory: [
      { action: 'submit', operatorName: '王五', operatedAt: yesterday, comment: '提交申请' },
      { action: 'reject', operatorName: '李经理', operatedAt: now, comment: '预算不足，驳回' },
    ],
  },
];

let forms = [...MOCK_FORMS];

export const getForms = () => Promise.resolve([...forms]);

export const getFormById = (id: string) =>
  Promise.resolve(forms.find((f) => f.id === id) || null);

export const saveForm = (form: Partial<WorkflowForm>) => {
  const nowStr = new Date().toISOString();
  if (form.id) {
    const idx = forms.findIndex((f) => f.id === form.id);
    if (idx >= 0) {
      forms[idx] = { ...forms[idx], ...form, updatedAt: nowStr } as WorkflowForm;
      return Promise.resolve(forms[idx]);
    }
  }
  const newForm: WorkflowForm = {
    ...(form as WorkflowForm),
    id: `APP-${new Date().toISOString().slice(0, 10).replace(/-/g, '')}-${String(forms.length + 1).padStart(3, '0')}`,
    status: form.status || 'Draft',
    createdAt: nowStr,
    updatedAt: nowStr,
    approvalHistory: form.approvalHistory || [],
  };
  forms.push(newForm);
  return Promise.resolve(newForm);
};

export const submitForm = (id: string) => {
  const idx = forms.findIndex((f) => f.id === id);
  if (idx < 0) return Promise.reject(new Error('Form not found'));
  const nowStr = new Date().toISOString();
  forms[idx].status = 'Pending';
  forms[idx].updatedAt = nowStr;
  forms[idx].approvalHistory.unshift({
    action: 'submit',
    operatorName: forms[idx].applicantName,
    operatedAt: nowStr,
    comment: '提交申请',
  });
  return Promise.resolve(forms[idx]);
};

export const approveForm = (id: string, comment: string) => {
  const idx = forms.findIndex((f) => f.id === id);
  if (idx < 0) return Promise.reject(new Error('Form not found'));
  const nowStr = new Date().toISOString();
  forms[idx].status = 'Approved';
  forms[idx].updatedAt = nowStr;
  forms[idx].approvalHistory.unshift({
    action: 'approve',
    operatorName: '李经理',
    operatedAt: nowStr,
    comment,
  });
  return Promise.resolve(forms[idx]);
};

export const rejectForm = (id: string, comment: string) => {
  const idx = forms.findIndex((f) => f.id === id);
  if (idx < 0) return Promise.reject(new Error('Form not found'));
  const nowStr = new Date().toISOString();
  forms[idx].status = 'Rejected';
  forms[idx].updatedAt = nowStr;
  forms[idx].approvalHistory.unshift({
    action: 'reject',
    operatorName: '李经理',
    operatedAt: nowStr,
    comment,
  });
  return Promise.resolve(forms[idx]);
};
