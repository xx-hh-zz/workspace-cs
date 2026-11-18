import { Form, Input, Select } from 'antd';
import { APPLY_TYPE_OPTIONS } from '@/constants/enums';

export default function StepBasicInfo() {
  return (
    <>
      <Form.Item
        label="申请人"
        name="applicantName"
        rules={[{ required: true, message: '请输入申请人' }]}
      >
        <Input placeholder="请输入申请人" />
      </Form.Item>
      <Form.Item
        label="部门"
        name="department"
        rules={[{ required: true, message: '请输入部门' }]}
      >
        <Input placeholder="请输入部门" />
      </Form.Item>
      <Form.Item
        label="申请类型"
        name="applyType"
        rules={[{ required: true, message: '请选择申请类型' }]}
      >
        <Select placeholder="请选择申请类型" options={APPLY_TYPE_OPTIONS} />
      </Form.Item>
      <Form.Item
        label="申请事由"
        name="reason"
        rules={[
          { required: true, message: '请输入申请事由' },
          { min: 5, max: 200, message: '申请事由长度为 5-200 字符' },
        ]}
      >
        <Input.TextArea rows={4} placeholder="请输入申请事由" showCount maxLength={200} />
      </Form.Item>
    </>
  );
}
