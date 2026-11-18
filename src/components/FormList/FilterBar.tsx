import { Form, Input, Select, Button, Space } from 'antd';
import { STATUS_OPTIONS, APPLY_TYPE_OPTIONS } from '@/constants/enums';
import type { FormListQuery } from '@/types/form';

interface FilterBarProps {
  value: FormListQuery;
  onChange: (query: FormListQuery) => void;
}

export default function FilterBar({ value, onChange }: FilterBarProps) {
  const [form] = Form.useForm();

  return (
    <Form
      form={form}
      layout="inline"
      initialValues={value}
      onValuesChange={(_, allValues) => onChange({ ...value, ...allValues, page: 1 })}
    >
      <Form.Item name="keyword">
        <Input.Search placeholder="搜索编号/申请人/事由" allowClear />
      </Form.Item>
      <Form.Item name="status">
        <Select
          placeholder="状态"
          allowClear
          style={{ width: 120 }}
          options={[{ value: 'all', label: '全部状态' }, ...STATUS_OPTIONS]}
        />
      </Form.Item>
      <Form.Item name="applyType">
        <Select
          placeholder="申请类型"
          allowClear
          style={{ width: 140 }}
          options={[{ value: 'all', label: '全部类型' }, ...APPLY_TYPE_OPTIONS]}
        />
      </Form.Item>
      <Form.Item>
        <Space>
          <Button type="primary" onClick={() => onChange({ ...value, page: 1 })}>
            查询
          </Button>
          <Button onClick={() => { form.resetFields(); onChange({ page: 1, pageSize: 10 }); }}>
            重置
          </Button>
        </Space>
      </Form.Item>
    </Form>
  );
}
