import React from 'react'
import { withStyles } from '@material-ui/core/styles';
import { Drawer, AppBar, Typography, CssBaseline, Toolbar, List, ListItem, ListItemIcon, ListItemText, Container, } from '@material-ui/core'
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import { observer, inject } from 'mobx-react'
import Output from './../Output'
import EditableQueryComponent from './../EditableQueryComponent'
import {QUERIES, PROJECT_NAME} from './../../consts'

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
        <ListItem button key={key} onClick={() => this.handleItemClick(index)} 
        selected={(this.state.indexSelected === key)}>
        <ListItemIcon>
        {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
        </ListItemIcon>
        <ListItemText primary={QUERIES[key].displayTitle} />
        </ListItem>
        )))
      } 
      
      render = () => {
        const { classes } = this.props;
        return (
          <div className={classes.root}>
          <CssBaseline />
          <AppBar position="fixed" className={classes.appBar} >
          <Toolbar>
          <Typography variant="h6" noWrap>
          {PROJECT_NAME}
          </Typography>
          </Toolbar>
          </AppBar>
          <Drawer
          variant="permanent"
          anchor="left"
          >
          <div className={classes.toolbar} />
          <List>
          {this.render_list_items()}
          </List>
          </Drawer>
          <Container fixed>
          <main className={classes.content}>
          <div className={classes.toolbar} />
          {this.state.indexSelected === 0 && <EditableQueryComponent index={this.state.indexSelected}/>}
          {this.state.indexSelected !==0 && <Output index={this.state.indexSelected} {...QUERIES[this.state.indexSelected]}/>}
          </main>
          </Container>
          </div>
          )    
        }
      }
      
      export default withStyles(useStyles)(Home);