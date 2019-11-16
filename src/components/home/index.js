import React from 'react'
import { withStyles } from '@material-ui/core/styles';
import { observer, inject } from 'mobx-react'
import Output from './../Output'
import EditableQueryComponent from './../EditableQueryComponent'
import {QUERIES, } from './../../consts'

const useStyles = (theme) => ({
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  root: {
    display: 'fixed',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  drawer: {
    zIndex: 2,
    flexShrink: 0,
  },
  drawerPaper: {
  },
  content: {
    padding: theme.spacing(3),
  },
  toolbar: theme.mixins.toolbar,
})

@inject('queryModel')
@observer
class Home extends React.Component {
  
  
  state = {
    indexSelected: 0,
  }
  
  handleItemClick = async (index) => {
    this.setState({indexSelected: index})
  }
  
  render_list_items = () => {
    return(
      Object.keys(QUERIES).map((key, index) => (
        <li id={`nav-item-${index}`} class={this.state.indexSelected === index && "active"} onClick={() => this.handleItemClick(index)}>
        <a>
        <i class={QUERIES[key].icon}></i>
        <p>{QUERIES[key].displayTitle}</p>
        </a>
        </li>
        )))
      } 
      
      render = () => {
        return (<div>
          <div class="sidebar" data-color="purple" data-image="assets/img/sidebar-5.jpg">
          <div class="sidebar-wrapper">
          <div class="logo">
          <a class="simple-text">
            Tourism Query
          </a>
          </div>    
          <ul class="nav">
          {this.render_list_items()}
          </ul>
          </div>
          </div>
          <div class="main-panel">
          {this.renderNavBar()}
          <div class="content" style={{paddingBottom:'10%'}}>
          <div class="container-fluid">
          {this.state.indexSelected === 0 && <EditableQueryComponent index={this.state.indexSelected}/>}
          {this.state.indexSelected !==0 && <Output index={this.state.indexSelected} {...QUERIES[this.state.indexSelected]}/>}
          </div>
          </div>
          {this.renderFooter()}
          </div>
          </div>
          )    
        }
        renderNavBar = () => {
          return(
            <nav class="navbar navbar-default navbar-fixed">
            <div class="container-fluid">
            <div class="navbar-header">
            <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#navigation-example-2">
            <span class="sr-only">Toggle navigation</span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            </button>
            <a class="navbar-brand" >Dashboard</a>
            </div>
            <div class="collapse navbar-collapse">
            <ul class="nav navbar-nav navbar-right">
              <li>
                <a href="yasgui.html"> YASGUI</a>
              </li>
            <li class="dropdown">
            <a  class="dropdown-toggle" data-toggle="dropdown">
            <p>
              Team
            <b class="caret"></b>
            </p>
            </a>
            <ul class="dropdown-menu">
            <li><a >Team Members</a></li>
            <li class="divider"></li>
            <li><a >Abhinav Gandhi</a></li>
            <li><a >Mayur</a></li>
            <li><a >Rushikesh</a></li>
            <li><a >Mrinal</a></li>
            <li><a >Kul</a></li>
            </ul>
            </li>
            <li class="separator hidden-lg"></li>
            </ul>
            </div>
            </div>
            </nav>
            )
          }
          renderFooter = () => {
            return(
              <footer class="footer" style={{zIndex: 2003, position:'fixed',width:'inherit', bottom: 0,opacity: '1'}}>
              <div class="container-fluid">
                  <p class="copyright pull-right">
                      &copy; <script>document.write(new Date().getFullYear())</script> Group , made with love for semantic web
                  </p>
              </div>
          </footer>
            )
          }
        }
        export default withStyles(useStyles)(Home);