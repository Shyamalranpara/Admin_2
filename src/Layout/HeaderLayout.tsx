import { Divider, Layout, theme } from 'antd';
import ProfileDropdown from './ProfileDropdown';
const { Header } = Layout;

const HeaderLayout = () => {
    const {
        token: { colorBgContainer, },
    } = theme.useToken();

    return (
        <Header 
            style={{ 
                background: colorBgContainer, 
                height: "auto", 
                width:"100%",
                minHeight: "18vh", 
                lineHeight: "1.1" 
            }} 
            className="px-2 md:px-6"
        >
            <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between p-[16px] md:p-[24px] gap-4'>
                <div>
                    <h3 className='text-[16px] md:text-[18px] font-bold m-0 p-0 text-center sm:text-left' >JB rPET Industries Private Limited</h3>
                </div>
                <div className='flex items-center justify-center sm:justify-end'>
                    <ProfileDropdown />
                </div>
            </div>

            <Divider />

            <div className='mt-4 px-4 md:px-0'>
                <p className="text-sm md:text-base text-center sm:text-left">Report / Thermopack Report</p>
            </div>
        </Header>
    )
}

export default HeaderLayout