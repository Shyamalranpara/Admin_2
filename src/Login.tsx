import React, { useState } from 'react'
import JBLOGO from './assets/LOGO.png'
import './Login.css'
import { Button, Form, Input, Flex } from 'antd';
// const { Title, Text } = Typography;
const Login: React.FC = () => {

    const [allFormData, setAllFormData] = useState<
        { email: string | number; password: string | number }[]
    >([]);

    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));


    };

    const handleSubmit = () => {
        setAllFormData(prev => [...prev, formData]);
        console.log('All Submissions:', [...allFormData, formData]);
        setFormData({ email: '', password: '' });
    };

    return (
        <div className='main'>
            <div>
                <img className="logo" src={JBLOGO} alt="JB rPET logo" />
            </div>

            <div>
                <Form
                    onFinish={handleSubmit}
                    className='form'
                    name="login"
                    initialValues={{ remember: true }}
                    style={{ maxWidth: 360 }}
                // onFinish={onFinish}
                >

                    <div className='form-header'>
                        <h1 style={{ fontSize: "2.2rem", fontWeight: "600", lineHeight: "32px" }}>LOGIN</h1>
                        <p style={{ fontWeight: "500", fontSize: "1rem" }}>Welcome back! Login to your account.</p>
                    </div>

                    <Form.Item
                        rules={[{ required: true, message: 'Email' }]}
                    >
                        <label htmlFor="Email">Email</label>
                        <Input placeholder="Email" name='email' value={formData.email}
                            onChange={handleChange} />
                    </Form.Item>

                    <label htmlFor="password">Password</label>
                    <Form.Item
                        name="password"
                        rules={[{ required: true, message: 'Password' }]}
                    >
                        <Input type="password" placeholder="Password" name='password' value={formData.password}
                            onChange={handleChange} />
                    </Form.Item>

                    <Form.Item>
                        <Flex justify="end" align="center" style={{ marginBottom: '2rem' }}>

                            <a style={{ color: "#00000073" , position:"absolute"}} href="">Forgot password?</a>
                        </Flex>
                    </Form.Item>

                    <Form.Item>
                        <Button
                            block
                            htmlType="submit"
                            style={{ backgroundColor: '#408634', color: 'white', border: 'none' }}
                        >
                            Submit
                        </Button>


                    </Form.Item>
                </Form>

            </div>
        </div>
    )
}

export default Login