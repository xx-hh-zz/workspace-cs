import { Descriptions } from 'antd';
import { APPLY_TYPE_MAP } from '@/constants/enums';
import type { WorkflowForm, ApplyType } from '@/types/form';

interface StepConfirmProps {
  values: Partial<WorkflowForm>;
}

export default function StepConfirm({ values }: StepConfirmProps) {
  return (
    <Descriptions bordered column={1}>
      <Descriptions.Item label="申请人">{values.applicantName}</Descriptions.Item>
      <Descriptions.Item label="部门">{values.department}</Descriptions.Item>
      <Descriptions.Item label="申请类型">{APPLY_TYPE_MAP[values.applyType as ApplyType]}</Descriptions.Item>
      <Descriptions.Item label="申请事由">{values.reason}</Descriptions.Item>
      {values.destination && <Descriptions.Item label="目的地">{values.destination}</Descriptions.Item>}
      {values.amount !== undefined && <Descriptions.Item label="金额">¥{values.amount}</Descriptions.Item>}
      {values.expectedDate && <Descriptions.Item label="期望日期">{values.expectedDate}</Descriptions.Item>}
      {values.remark && <Descriptions.Item label="备注">{values.remark}</Descriptions.Item>}
    </Descriptions>
  );
}
