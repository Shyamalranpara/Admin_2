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
        <div className='w-[100%] h-[98vh] flex flex-col lg:flex-row justify-center items-center gap-[50px] lg:gap-[100px] bg-[#e6f6ff] px-4 py-8'>
            <div className="order-2 lg:order-1">
                <img className="w-[140px] h-[32px] md:w-[177px] md:h-[40px]" src={JBLOGO} alt="JB rPET logo" />
            </div>

            <div className="order-1 lg:order-2">
                <Form
                    onFinish={handleSubmit}
                    className='w-full max-w-[382px] h-auto min-h-[376px]'
                    name="login"
                    initialValues={{ remember: true }}
                    style={{ maxWidth: 360 }}
                // onFinish={onFinish}
                >

                    <div className='text-center mb-[40px] md:mb-[60px] line-height-[32px] '>
                        <h1 style={{ fontSize: "1.8rem", fontWeight: "600", lineHeight: "32px" }} className="md:text-[2.2rem]">LOGIN</h1>
                        <p className='mt-3 md:mt-5' style={{ fontWeight: "500", fontSize: "0.9rem" }} className="md:text-[1rem]">Welcome back! Login to your account.</p>
                    </div>

                    <Form.Item
                        rules={[{ required: true, message: 'Email' }]}
                    >
                        <label htmlFor="Email" className="block mb-2 text-sm md:text-base">Email</label>
                        <Input className='input-border' placeholder="Email" name='email' value={formData.email}
                            onChange={handleChange} />
                    </Form.Item>

                    <label htmlFor="password" className="block mb-2 text-sm md:text-base">Password</label>
                    <Form.Item
                        name="password"
                        rules={[{ required: true, message: 'Password' }]}
                    >
                        <Input className='input-border' type="password" placeholder="Password" name='password' value={formData.password}
                            onChange={handleChange} />
                    </Form.Item>

                    <Form.Item>
                        <Flex justify="end" align="center" style={{ marginBottom: '2rem' }}>

                            <a className='text-[#00000073] absolute'  href="">Forgot password?</a>
                        </Flex>
                    </Form.Item>

                    <Form.Item>
                        <Button
                        className='input-border '
                            block
                            htmlType="submit"
                            style={{ backgroundColor: '#408634', color: 'white', border: 'none' }}
                        >
                            Login
                        </Button>


                    </Form.Item>
                </Form>

            </div>
        </div>
    )
}

export default Login