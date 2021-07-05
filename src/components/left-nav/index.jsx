import React, {Component} from 'react';
import {Link,withRouter} from    'react-router-dom'
import './index.less'
import logo from '../../assets/images/logo.png'
import { Menu } from 'antd';
import menuList from  '../../config/menuConfig'
import {
    // AppstoreOutlined,
    // MenuUnfoldOutlined,
    // MenuFoldOutlined,
    PieChartOutlined,
    // DesktopOutlined,
    // ContainerOutlined,
    MailOutlined,
} from '@ant-design/icons';
const { SubMenu } = Menu;
//左侧导航的组件
class LeftNav extends Component {
    UNSAFE_componentWillMount() {
        this.menuNode = this.getMenuNodes(menuList)
    }


    getMenuNodes = (menuList) =>{
       return  menuList.reduce((pre,item)=>{
            if (!item.children) {
                pre.push(
                    (<Menu.Item key={item.key} icon={<PieChartOutlined/>}>
                        <Link to ={item.key}>{item.title}</Link>
                    </Menu.Item>)
                )
            }else {
                //debugger
                const path = this.props.location.pathname
                const isfind = item.children.find(
                    (citem)=> {
                       return  path.indexOf(citem.key) === 0
                    }
                )
                if(isfind){
                    this.openKey = item.key
                }

                pre.push((
                    <SubMenu key={item.key} icon={<MailOutlined/>} title={item.title}>
                        {
                            this.getMenuNodes(item.children)
                        }
                    </SubMenu>
                ))
            }
            return pre
        },[])

    }
    render() {
        let path = this.props.location.pathname
        if (path.indexOf('/product')===0) {
            path = '/product'
        }
        return (
            <div className='left-nav'>
               <Link to='/' className='left-nav-header'>
                   <img src={logo} alt="logo"/>
                   <h1>硅谷后台</h1>
               </Link>


                <Menu
                    selectedKeys={[path]}
                    defaultOpenKeys={[this.openKey]}
                    mode="inline"
                    theme="dark"
                    //inlineCollapsed={this.state.collapsed}
                >


                    {/*<Menu.Item key="/home" icon={<PieChartOutlined />}>*/}
                    {/*     <Link to ='/home'>首页</Link>*/}
                    {/*</Menu.Item>*/}

                    {/*<SubMenu key="products" icon={<MailOutlined />} title="商品">*/}

                    {/*        <Menu.Item key="/category">*/}
                    {/*            <Link to='/category'>品类管理 </Link>*/}
                    {/*        </Menu.Item>*/}
                    {/*        <Menu.Item key="/product">*/}
                    {/*            <Link to='/product'>商品管理 </Link>*/}
                    {/*        </Menu.Item>*/}

                    {/*</SubMenu>*/}



                    {/*<Menu.Item key="/user" icon={<PieChartOutlined />}>*/}
                    {/*    <Link to='/user'>用户管理</Link>*/}
                    {/*</Menu.Item>*/}

                    {/*<Menu.Item key="/role" icon={<PieChartOutlined />}>*/}
                    {/*    <Link to='/role'>角色管理</Link>*/}
                    {/*</Menu.Item>*/}



                    {/*<SubMenu key="charts" icon={<MailOutlined />} title="图形图表">*/}
                    {/*    <Menu.Item key="/charts/bar" icon={<MailOutlined />}>*/}
                    {/*        <Link to='/charts/bar'>柱形图</Link>*/}
                    {/*    </Menu.Item>*/}
                    {/*    <Menu.Item key="/charts/line">*/}
                    {/*          <Link to='/charts/line'>折线图</Link>*/}
                    {/*    </Menu.Item>*/}
                    {/*    <Menu.Item key="/charts/pie">*/}
                    {/*         <Link to='/charts/pie'>饼图</Link>*/}
                    {/*    </Menu.Item>*/}
                    {/*</SubMenu>*/}






                    {/*<Menu.Item key="/order" icon={<PieChartOutlined />}>*/}
                    {/*    <Link>订单管理</Link>*/}
                    {/*</Menu.Item>*/}

                    {/*使用reduce方法动态生成导航菜单栏*/}
                    {this.menuNode}


                </Menu>

            </div>
        );
    }
}

export default withRouter(LeftNav)