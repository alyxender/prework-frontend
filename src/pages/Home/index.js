import React, { Component } from 'react'
import Content from './Content'
import SignIn from './SignIn'

class Home extends Component{
  render(){
    let { lessons, modules, questions, resources, loggedIn} = this.props
    
    return(
      <>
        {/* if user is logged in, show content*/}
        {loggedIn &&
        <Content lessons={lessons} modules={modules} questions={questions} resources={resources}/>
        }
        {/* otherwise, show signin component */}
        {!loggedIn &&
        <SignIn />
        }
      </>
    )
  }
}
export default Home