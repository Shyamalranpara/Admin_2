import { Divider, Layout, theme } from 'antd';
import ProfileDropdown from './ProfileDropdown';
const { Header } = Layout;

const HeaderLayout = () => {
     const {
        token: { colorBgContainer, },
    } = theme.useToken();

  return (
    <div>
        <Layout>
         <Header style={{ background: colorBgContainer, height: "18vh", lineHeight: "1.1" }}>
                        <div className='flex items-center justify-between p-[24px] '>
                            <div>
                                <h3 className='text-[18px] font-bold m-0 p-0 ' >JB rPET Industries Private Limited</h3>
                            </div>
                            <div className='flex items-center'>
                                <ProfileDropdown />
                            </div>

                        </div>

                        <Divider />

                        <div className='mt-4'>
                            <p>Report / Thermopack Report</p>
                        </div>


                    </Header>
                    </Layout>
    </div>
  )
}

export default HeaderLayout