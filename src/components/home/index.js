import React from 'react'
import { withStyles } from '@material-ui/core/styles';
import { Drawer, AppBar, Typography, CssBaseline, Toolbar, List, ListItem, ListItemIcon, ListItemText, Container, } from '@material-ui/core'
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import { observer, inject } from 'mobx-react'
import ApiService from '../../services/ApiService';
import Output from './../Output'
import Yasgui from './../Yasgui'


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
    indexSelected: 0
  }

handleItemClick = async (index) => {
  const data = ApiService.sample_output()
  this.setState({indexSelected: index, response: data})
}

  render_list_items = () => {
    return( ['Editable','Query 1', 'Query 2', 'Query 3', 'Query 4'].map((text, index) => (
      <ListItem button key={text} onClick={() => this.handleItemClick(index)} selected={(this.state.indexSelected === index)}>
        <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
        <ListItemText primary={text} />
      </ListItem>
    )))
  } 
  
  render = () => {
    console.log('Home render ' + this.state.response)
    const { classes } = this.props;
        return (
             <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar} >
        <Toolbar>
          <Typography variant="h6" noWrap>
            KDE
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
        {this.state.indexSelected === 0 && <Yasgui/>}
        {this.state.indexSelected !==0 && <Output response={this.state.response}/>}
        </main>
        </Container>
        </div>
        )    
        }
}

export default withStyles(useStyles)(Home);