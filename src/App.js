import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      users: [],
      isLoading: false,
      isError: false
    }
  }
//aysun function for get
async componentDidMount() {
  this.setState({ isLoading: true })
 
  const response = await fetch('http://jsonplaceholder.typicode.com/users')
  if (response.ok) {  
     const users = await response.json()
     console.log(users)
     
    this.setState({ users, isLoading: false })
  } else {
    this.setState({ isError: true, isLoading: false })
  }
}
renderAppHeader=()=> {
 return Object.keys(this.state.users[0]).map(attr=> <th key={attr}>
   {attr.toUpperCase()}
 </th>)
}
 renderAppRows=()=> {
    return this.state.users.map(user =>{
      return (
        <tr key ={user.id}>
          <td>{user.id}</td>
          <td>{user.name}</td>
          <td>{user.usermame}</td>
          <td>{user.email}</td>
          <td>
            {`${user.address.streer},${user.address.city}`}
          </td>
          <td>{user.phone}</td>
          <td>{user.website}</td>
          <td>{user.company.name}</td>

        </tr>
      )
    })
 }
render() {
  const { users, isLoading, isError } = this.state

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (isError) {
    return <div>Error</div>
  }

  return users.length > 0
    ? (
      <table> 
        <thead>
          <tr>
            {this.renderAppHeader()}
          </tr>
        </thead>
        <tbody>
          {this.renderAppRows()}
        </tbody>
      </table>
    ) : (
      <div>
        No users.
    </div>
    )
}

renderAppHeader = () => {
  return Object.keys(this.state.users[0]).map(attr => <th key={attr}>{attr.toUpperCase()}</th>)
}
}
