import { Modal, Form, Input } from 'antd';

interface ApproveModalProps {
  open: boolean;
  onCancel: () => void;
  onOk: (comment: string) => void;
}

export default function ApproveModal({ open, onCancel, onOk }: ApproveModalProps) {
  const [form] = Form.useForm();

  return (
    <Modal
      open={open}
      title="审批通过"
      onCancel={() => { form.resetFields(); onCancel(); }}
      onOk={() => {
        form.validateFields().then((values) => {
          onOk(values.comment || '');
          form.resetFields();
        });
      }}
    >
      <Form form={form} layout="vertical">
        <Form.Item label="审批意见" name="comment" rules={[{ required: true, message: '请输入审批意见' }]}>
          <Input.TextArea rows={4} placeholder="请输入审批意见" />
        </Form.Item>
      </Form>
    </Modal>
  );
}
