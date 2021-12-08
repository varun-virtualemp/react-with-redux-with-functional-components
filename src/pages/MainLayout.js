import React, {Component} from 'react';
import $ from 'jquery'

import CommonStyle from '../assets/css/style.js';
import Header from './layouts/Header';
import Sidebar from './layouts/Sidebar';
import Footer from './layouts/Footer';

class MainLayout extends Component {
    componentDidMount(){
        $('[data-toggle=offcanvas]').click(function() {
            $('.row-offcanvas').toggleClass('active');
        });
    }

    render() {
        return(
            <CommonStyle>
                <Header {...this.props.children.props}></Header>
                <div className="container-fluid h-100" id="main">
                    <div className="row row-offcanvas row-offcanvas-left h-100 active">
                        <Sidebar {...this.props.children.props} ></Sidebar>
                        <div className="col main pt-5 mt-3">
                            {/** main content shows here */}
                            {this.props.children} 
                            
                            <Footer {...this.props.children.props}></Footer>
                        </div>
                    </div>
                </div>    
            </CommonStyle>
        )
    }
}

export default MainLayout;