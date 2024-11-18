import React, { useState, useEffect } from 'react';
import { Image, Form, Input, Select, Button, InputNumber, Col, Row, App } from 'antd';
import { FileImageOutlined } from '@ant-design/icons';
import { useParams, useRouter } from '@/router/hooks';
import { useMediaQuery } from 'react-responsive';
import { Product } from '#/entity';
const { TextArea } = Input;
const { Search } = Input;
import DemoService from '@/api/services/demoService';
const { VITE_APP_HOMEPAGE: HOMEPAGE } = import.meta.env;
const ProductForm: React.FC = () => {
  const { message } = App.useApp();
  const [form] = Form.useForm();
  const params = useParams();
  const router = useRouter();
  const [imagePreview, setImagePreview] = useState<string>('');
  const param = useParams();
  const isMobile = useMediaQuery({ query: '(max-width: 767px)' });

  const handlePreview = () => {
    const imageUrl = form.getFieldValue('imageUrl');
    setImagePreview(imageUrl ? imageUrl : '');
  };

  const handleFinish = (values: Product) => {
    if (!params?.id) {
      DemoService.addProductAction({ product: values }).then(() => {
        message.success({
          content: 'The product has been successfully added.',
          duration: 3,
        });
        router.push(HOMEPAGE);
      });
    } else {
      let data = { ...values, id: params.id };
      DemoService.editProductAction({ product: data }).then(() => {
        message.success({
          content: 'The product has been successfully updated.',
          duration: 3,
        });
        router.push(HOMEPAGE);
      });
    }
  };

  useEffect(() => {
    if (params?.id) {
      DemoService.getProducDetailAction(params.id)
        .then((res) => {
          const product = res.data;
          form.setFieldsValue(product);
          setImagePreview(product.imageUrl);
        })
        .catch(() => {
          router.replace('/error');
        });
    }
  }, [params]);

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={handleFinish}
      initialValues={{
        name: '',
        description: '',
        category: '',
        price: 0,
        stock: 0,
        imageUrl: '',
      }}
    >
      <Row className="px-9" gutter={[16, 0]}>
        <Col span={24}>
          <Form.Item
            name="name"
            label={<div className="text-sm font-semibold text-ft2">Product Name</div>}
            rules={[{ required: true, message: 'Please enter the product name' }]}
          >
            <Input placeholder="Enter product name" />
          </Form.Item>
        </Col>
        <Col span={24}>
          <Form.Item
            name="description"
            label={<div className="text-sm font-semibold text-ft2">Product Description</div>}
            rules={[{ required: true, message: 'Please enter the product description' }]}
          >
            <TextArea placeholder="Enter product description" rows={4} />
          </Form.Item>
        </Col>
        <Col span={isMobile ? 24 : 12}>
          <Form.Item
            name="category"
            label={<div className="text-sm font-semibold text-ft2">Category</div>}
            rules={[{ required: true, message: 'Please select a category' }]}
          >
            <Select placeholder="Select category">
              <Select.Option value="Category1">Category1</Select.Option>
              <Select.Option value="Category2">Category2</Select.Option>
              <Select.Option value="Category3">Category3</Select.Option>
            </Select>
          </Form.Item>
        </Col>
        <Col span={isMobile ? 24 : 12}>
          <Form.Item
            name="price"
            label={<div className="text-sm font-semibold text-ft2">Price</div>}
            rules={[{ required: true, message: 'Please enter the product price' }]}
          >
            <InputNumber min={0} placeholder="Enter price" style={{ width: '100%' }} />
          </Form.Item>
        </Col>
        <Col span={isMobile ? 24 : 8}>
          <Form.Item
            name="stock"
            label={<div className="text-sm font-semibold text-ft2">In Stock Quantity</div>}
            rules={[{ required: true, message: 'Please enter stock quantity' }]}
          >
            <InputNumber min={0} placeholder="Enter stock quantity" style={{ width: '100%' }} />
          </Form.Item>
        </Col>
        <Col span={isMobile ? 24 : 16}>
          <Form.Item
            name="imageUrl"
            label={<div className="text-sm font-semibold text-ft2">Add Image Link</div>}
            rules={[{ required: true, message: 'Please enter the image URL' }]}
          >
            <Search
              enterButton={<Button onClick={handlePreview}>Preview</Button>}
              addonBefore="https://"
              placeholder="input image link"
              allowClear
              onClear={handlePreview}
            />
          </Form.Item>
        </Col>
        <Col span={24}>
          <div className="flex justify-center pt-4">
            {imagePreview ? (
              <div className="h-48 w-96 overflow-hidden rounded-lg">
                <Image src={imagePreview} alt="Preview" />
              </div>
            ) : (
              <div className="flex h-48 w-96 flex-col justify-center rounded-lg border border-dashed border-br text-center text-ft2">
                <div>
                  <FileImageOutlined className="text-2xl" />
                </div>
                <div className="text-sm, font-semibold">image preview!</div>
              </div>
            )}
          </div>
        </Col>
        <Col span={24} className="pt-6">
          <Form.Item className={isMobile ? 'text-center' : ''}>
            <Button type="primary" htmlType="submit" size="large">
              <span className="text-xs font-bold text-white">
                {param?.id ? 'Update Product' : 'Add Product'}
              </span>
            </Button>
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
};

export default ProductForm;
