import { Modal, Form, Input } from 'antd';

interface RejectModalProps {
  open: boolean;
  onCancel: () => void;
  onOk: (comment: string) => void;
}

export default function RejectModal({ open, onCancel, onOk }: RejectModalProps) {
  const [form] = Form.useForm();

  return (
    <Modal
      open={open}
      title="审批驳回"
      onCancel={() => { form.resetFields(); onCancel(); }}
      onOk={() => {
        form.validateFields().then((values) => {
          onOk(values.comment);
          form.resetFields();
        });
      }}
    >
      <Form form={form} layout="vertical">
        <Form.Item
          label="驳回原因"
          name="comment"
          rules={[{ required: true, message: '请输入驳回原因' }]}
        >
          <Input.TextArea rows={4} placeholder="请输入驳回原因" />
        </Form.Item>
      </Form>
    </Modal>
  );
}
