import { Tag } from 'antd';
import type { FormStatus } from '@/types/form';
import { FORM_STATUS_MAP } from '@/constants/enums';

const colorMap: Record<FormStatus, string> = {
  Draft: 'default',
  Pending: 'orange',
  Approved: 'green',
  Rejected: 'red',
};

export default function StatusTag({ status }: { status: FormStatus }) {
  return <Tag color={colorMap[status]}>{FORM_STATUS_MAP[status]}</Tag>;
}
