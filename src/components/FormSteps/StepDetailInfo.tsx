import { Form, Input, InputNumber, DatePicker } from 'antd';
import { useWatch } from 'antd/es/form/Form';
import type { ApplyType } from '@/types/form';

export default function StepDetailInfo() {
  const applyType = useWatch('applyType') as ApplyType | undefined;

  return (
    <>
      {applyType === 'travel' && (
        <Form.Item
          label="目的地"
          name="destination"
          rules={[{ required: true, message: '请输入目的地' }]}
        >
          <Input placeholder="请输入目的地" />
        </Form.Item>
      )}
      {(applyType === 'purchase' || applyType === 'reimbursement' || applyType === 'other') && (
        <Form.Item
          label="金额"
          name="amount"
          rules={[{ required: true, message: '请输入金额' }, { type: 'number', min: 0.01, message: '金额必须大于 0' }]}
        >
          <InputNumber prefix="¥" style={{ width: '100%' }} precision={2} placeholder="请输入金额" />
        </Form.Item>
      )}
      <Form.Item
        label="期望日期"
        name="expectedDate"
        rules={[{ required: true, message: '请选择期望日期' }]}
      >
        <DatePicker style={{ width: '100%' }} />
      </Form.Item>
      <Form.Item label="备注" name="remark">
        <Input.TextArea rows={3} placeholder="请输入备注（选填）" showCount maxLength={200} />
      </Form.Item>
    </>
  );
}
